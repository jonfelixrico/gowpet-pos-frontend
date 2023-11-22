'use client'

async function requestPrintingDevice() {
  // from https://github.com/WebBluetoothCG/demos/blob/gh-pages/bluetooth-printer/index.html

  console.debug('Requesting for printer...')
  const device = await navigator.bluetooth.requestDevice({
    filters: [
      {
        services: ['000018f0-0000-1000-8000-00805f9b34fb'],
      },
    ],
  })

  console.log('Obtained printer %s', device.name)

  return device
}

let printerPromise: Promise<BluetoothDevice> | null = null
async function getPrintingDevice() {
  if (!printerPromise) {
    console.log('No printers found yet. Requesting...')
    printerPromise = requestPrintingDevice()
  }

  return await printerPromise
}

async function preparePrinter(device: BluetoothDevice) {
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

  console.log('Finished preparing the printer')

  return characteristic
}

export async function sendToThermalPrinter(toSend: Uint8Array) {
  const device = await getPrintingDevice()
  if (!device) {
    throw new Error('No printer found!')
  }
  const printer = await preparePrinter(device)

  let index = 0
  while (index + 512 < toSend.length) {
    await printer.writeValue(toSend.slice(index, index + 512))
    index += 512
  }

  if (index < toSend.length) {
    await printer.writeValue(toSend.slice(index, toSend.length))
  }
}
