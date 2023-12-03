import { Center, Flex, FlexProps, Select, Text } from '@chakra-ui/react'
import BarcodeCamera, { BarcodeCameraProps } from './BarcodeCamera'
import { useMemo, useState } from 'react'
import { useMediaDevices } from 'react-media-devices'
import { useLocalStorage } from 'react-use'

function CameraSection({
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

function DeviceSelectSection({
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

function useDevices() {
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

  const [deviceId, setDeviceId] = useDeviceId()
  const safeDeviceId = useMemo(() => {
    if (devices && devices.some((val) => deviceId === val.deviceId)) {
      return deviceId
    }

    return undefined
  }, [deviceId, devices])

  return {
    devices: filteredDevices,
    selectedDeviceId: safeDeviceId,
    setSelectedDeviceId: setDeviceId,
    loading,
  }
}

export type BarcodeScannerProps = Pick<
  BarcodeCameraProps,
  'onDetect' | 'onError'
> &
  Omit<FlexProps, 'children'>

export default function BarcodeScannerControls({
  onDetect,
  onError = () => {},
  ...flexProps
}: BarcodeScannerProps) {
  const { devices, loading, selectedDeviceId, setSelectedDeviceId } =
    useDevices()

  return (
    <Flex {...flexProps} direction="column" gap={2}>
      <CameraSection
        onDetect={onDetect}
        onError={onError}
        deviceId={selectedDeviceId}
        flex={1}
      />

      <DeviceSelectSection
        deviceId={selectedDeviceId}
        setDeviceId={setSelectedDeviceId}
        devices={devices}
        isLoading={loading}
      />
    </Flex>
  )
}
