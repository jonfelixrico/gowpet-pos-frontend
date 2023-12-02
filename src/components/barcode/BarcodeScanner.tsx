import { Center, Flex, FlexProps, Select, Text } from '@chakra-ui/react'
import BarcodeCamera, { BarcodeCameraProps } from './BarcodeCamera'
import { useMemo, useState } from 'react'
import { useMediaDevices } from 'react-media-devices'
import { useLocalStorage } from 'react-use'

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
  isLoading,
}: {
  deviceId?: string
  setDeviceId: (deviceId: string) => void
  devices: MediaDeviceInfo[]
  isLoading?: boolean
}) {
  if (isLoading) {
    return <Select isDisabled={true} placeholder="Detecting cameras..." />
  }

  if (!devices?.length) {
    return <Select isDisabled={true} placeholder="No cameras detected" />
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

function useDeviceId(): [string | undefined, (value: string) => void] {
  const [persistedValue, setPersistedValue] = useLocalStorage<string>(
    'barcodeScannerDeviceId'
  )
  const [value, setValue] = useState<string | undefined>(persistedValue)

  return [
    value,
    (value: string) => {
      setValue(value)
      setPersistedValue(value)
    },
  ]
}

export default function BarcodeScanner({
  onDetect,
  onError = () => {},
  ...flexProps
}: Pick<BarcodeCameraProps, 'onDetect' | 'onError'> & FlexProps) {
  const [deviceId, setDeviceId] = useDeviceId()
  const { devices, loading } = useMediaDevices({
    constraints: {
      video: true,
      audio: false,
    },
  })
  const filteredDevices = useMemo(() => {
    if (!devices) {
      return []
    }

    return devices.filter(({ deviceId }) => !!deviceId)
  }, [devices])

  return (
    <Flex {...flexProps} direction="column" gap={2}>
      <BarcodeCameraView
        onDetect={onDetect}
        onError={onError}
        deviceId={deviceId}
        flex={1}
      />

      <DeviceSelector
        deviceId={deviceId}
        setDeviceId={setDeviceId}
        devices={filteredDevices}
        isLoading={loading}
      />
    </Flex>
  )
}
