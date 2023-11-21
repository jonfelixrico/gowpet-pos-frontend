'use client'

async function requestPrinter() {
  // from https://github.com/WebBluetoothCG/demos/blob/gh-pages/bluetooth-printer/index.html

  const device = await navigator.bluetooth.requestDevice({
    filters: [
      {
        services: ['000018f0-0000-1000-8000-00805f9b34fb'],
      },
    ],
  })

  console.log('Found %s', device.name)

  if (!device.gatt) {
    throw new Error('No GATT server found')
  }

  console.log('Connecting to GATT server...')
  const gattServer = await device.gatt.connect()
  const service = await gattServer.getPrimaryService(
    '000018f0-0000-1000-8000-00805f9b34fb'
  )
  const characteristic = await service.getCharacteristic(
    '00002af1-0000-1000-8000-00805f9b34fb'
  )

  console.log('Finished setting up the thermal printer')

  return characteristic
}

let printerPromise: Promise<BluetoothRemoteGATTCharacteristic> | null = null
async function getPrinter() {
  if (!printerPromise) {
    console.log('No printers found yet. Requesting...')
    printerPromise = requestPrinter()
  }

  return await printerPromise
}

export async function sendToThermalPrinter(toSend: Uint8Array) {
  const printer = await getPrinter()
  if (!printer) {
    throw new Error('No printer found!')
  }

  let index = 0
  while (index + 512 < toSend.length) {
    await printer.writeValue(toSend.slice(index, index + 512))
    index += 512
  }

  if (index < toSend.length) {
    await printer.writeValue(toSend.slice(index, toSend.length))
  }
}
