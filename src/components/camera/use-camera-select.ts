import { useMemo } from 'react'
import { useMediaDevices } from 'react-media-devices'
import { useLocalStorage } from 'react-use'

export function useCameraSelect(options?: { localStorageKey?: string }) {
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
    options?.localStorageKey ?? 'cameraId'
  )

  const safeDeviceId = useMemo(() => {
    if (devices && devices.some((val) => deviceId === val.deviceId)) {
      return deviceId
    }

    return undefined
  }, [deviceId, devices])

  return {
    cameras: filteredDevices,
    selectedId: safeDeviceId,
    setSelectedId: setDeviceId,
    loading,
  }
}
