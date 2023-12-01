'use client'

import pMemoize from 'p-memoize'

const getPrintingDevice = pMemoize(async () => {
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
})

async function preparePrinter(device: BluetoothDevice) {
  if (!device.gatt) {
    throw new Error('No GATT server found')
  }

  let gattServer = device.gatt
  if (!gattServer.connected) {
    console.debug('Connecting to GATT server...')
    gattServer = await gattServer.connect()
  }

  const service = await gattServer.getPrimaryService(
    '000018f0-0000-1000-8000-00805f9b34fb'
  )
  const characteristic = await service.getCharacteristic(
    '00002af1-0000-1000-8000-00805f9b34fb'
  )

  return characteristic
}

export async function sendToThermalPrinter(toSend: Uint8Array) {
  const device = await getPrintingDevice()
  if (!device) {
    throw new Error('No printer found!')
  }
  const printer = await preparePrinter(device)

  /*
    We have to chunk the data by 512 because that's all the characteristic can send
    at a time. See https://github.com/WebBluetoothCG/demos/blob/7b7397df596888b51043586a187a5b2e08f14ecd/bluetooth-printer/index.html#L196
   */

  let index = 0
  while (index + 512 < toSend.length) {
    await printer.writeValueWithResponse(toSend.slice(index, index + 512))
    index += 512
  }

  if (index < toSend.length) {
    await printer.writeValueWithResponse(toSend.slice(index, toSend.length))
  }
}
