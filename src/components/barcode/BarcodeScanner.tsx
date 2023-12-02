import { Center, Flex, FlexProps, Select, Text } from '@chakra-ui/react'
import BarcodeCamera, { BarcodeCameraProps } from './BarcodeCamera'
import If from '../common/If'
import { useState } from 'react'
import { useMediaDevices } from 'react-media-devices'

function BarcodeCameraView({
  deviceId,
  onDetect,
  onError,
  ...flexProps
}: Pick<BarcodeCameraProps, 'onDetect' | 'onError'> & {
  deviceId?: string
} & FlexProps) {
  if (!deviceId) {
    return (
      <Center as={Flex} {...flexProps}>
        Please select a device
      </Center>
    )
  }

  return (
    <Flex {...flexProps}>
      <BarcodeCamera
        onDetect={onDetect}
        onError={onError}
        videoConstraints={{
          deviceId: deviceId as string,
        }}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </Flex>
  )
}

function DeviceSelector({
  deviceId,
  setDeviceId,
  devices,
}: {
  deviceId?: string
  setDeviceId: (deviceId: string) => void
  devices: MediaDeviceInfo[]
}) {
  if (!devices?.length) {
    return <Text align="center">No cameras detected</Text>
  }

  return (
    <Select
      placeholder="Select Camera"
      onChange={(event) => {
        setDeviceId(event.currentTarget.value)
      }}
      value={deviceId}
    >
      {devices.map(({ deviceId, label }) => (
        <option value={deviceId} key={deviceId}>
          {label}
        </option>
      ))}
    </Select>
  )
}

export default function BarcodeScanner({
  onDetect,
  onError = () => {},
  ...flexProps
}: Pick<BarcodeCameraProps, 'onDetect' | 'onError'> & FlexProps) {
  const [deviceId, setDeviceId] = useState<undefined | string>(undefined)
  const { devices } = useMediaDevices()

  return (
    <Flex {...flexProps} direction="column" gap={2}>
      <BarcodeCameraView
        onDetect={onDetect}
        onError={onError}
        deviceId={deviceId}
      />

      <DeviceSelector
        deviceId={deviceId}
        setDeviceId={setDeviceId}
        devices={devices ?? []}
      />
    </Flex>
  )
}
