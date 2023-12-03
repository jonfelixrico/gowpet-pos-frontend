'use client'

import { Center, Flex, FlexProps } from '@chakra-ui/react'
import BarcodeCamera, { BarcodeCameraProps } from './BarcodeCamera'
import { If, Then, Else } from 'react-if'
import { useCameraSelect } from '../camera/use-camera-select'
import CameraSelect from '../camera/CameraSelect'

export type BarcodeScannerProps = BarcodeCameraProps &
  Omit<FlexProps, 'children'>

export default function BarcodeScannerControls({
  onDetect,
  onError = () => {},
  formats,
  frequency,
  ...flexProps
}: BarcodeScannerProps) {
  const { cameras, loading, selectedId, setSelectedId } = useCameraSelect()

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

      <CameraSelect
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        cameras={cameras}
        isLoading={loading}
      />
    </Flex>
  )
}
