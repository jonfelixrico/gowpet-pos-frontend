'use client'

import { Center, Flex, FlexProps, Select } from '@chakra-ui/react'
import BarcodeCamera, { BarcodeCameraProps } from './BarcodeCamera'
import { useMemo } from 'react'
import { useMediaDevices } from 'react-media-devices'
import { useLocalStorage } from 'react-use'
import { If, Then, Else } from 'react-if'

function DeviceSelect({
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

  const [deviceId, setDeviceId] = useLocalStorage<string>(
    'barcodeScannerDeviceId'
  )

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

export type BarcodeScannerProps = BarcodeCameraProps &
  Omit<FlexProps, 'children'>

export default function BarcodeScannerControls({
  onDetect,
  onError = () => {},
  formats,
  frequency,
  ...flexProps
}: BarcodeScannerProps) {
  const { devices, loading, selectedDeviceId, setSelectedDeviceId } =
    useDevices()

  return (
    <Flex {...flexProps} direction="column" gap={2}>
      <If condition={selectedDeviceId}>
        <Then>
          <BarcodeCamera
            onDetect={onDetect}
            onError={onError}
            videoConstraints={{
              deviceId: selectedDeviceId,
            }}
            style={{
              height: '100%',
              width: '100%',
            }}
            formats={formats}
            frequency={frequency}
          />
        </Then>

        <Else>
          <Center flex={1}>Please select a device</Center>
        </Else>
      </If>

      <DeviceSelect
        deviceId={selectedDeviceId}
        setDeviceId={setSelectedDeviceId}
        devices={devices}
        isLoading={loading}
      />
    </Flex>
  )
}
