'use client'

import { Center, Flex, FlexProps, Select } from '@chakra-ui/react'
import BarcodeCamera, { BarcodeCameraProps } from './BarcodeCamera'
import { If, Then, Else } from 'react-if'
import { useDeviceSelect } from './use-device-select'

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

export type BarcodeScannerProps = BarcodeCameraProps &
  Omit<FlexProps, 'children'>

export default function BarcodeScannerControls({
  onDetect,
  onError = () => {},
  formats,
  frequency,
  ...flexProps
}: BarcodeScannerProps) {
  const { devices, loading, selectedId, setSelectedId } = useDeviceSelect()

  return (
    <Flex {...flexProps} direction="column" gap={2}>
      <If condition={selectedId}>
        <Then>
          <BarcodeCamera
            onDetect={onDetect}
            onError={onError}
            videoConstraints={{
              deviceId: selectedId,
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
        deviceId={selectedId}
        setDeviceId={setSelectedId}
        devices={devices}
        isLoading={loading}
      />
    </Flex>
  )
}
