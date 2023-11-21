'use client'

async function requestForBluetoothPrinter() {
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
    console.warn('No GATT server found. Aborting.')
    return
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
async function getThermalPrinterViaBluetooth() {
  if (!printerPromise) {
    console.log('No printers found yet. Requesting...')
    return await requestForBluetoothPrinter()
  }

  return await printerPromise
}
