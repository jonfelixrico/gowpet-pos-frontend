import { Select } from '@chakra-ui/react'

export default function CameraSelect({
  selectedId,
  setSelectedId,
  cameras,
  isLoading,
}: {
  selectedId?: string
  setSelectedId: (deviceId: string) => void
  cameras: MediaDeviceInfo[]
  isLoading?: boolean
}) {
  if (isLoading) {
    return <Select isDisabled={true} placeholder="Detecting cameras..." />
  }

  if (!cameras?.length) {
    return <Select isDisabled={true} placeholder="No cameras detected" />
  }

  return (
    <Select
      placeholder="Select Camera"
      onChange={(event) => {
        setSelectedId(event.currentTarget.value)
      }}
      value={selectedId}
    >
      {cameras.map(({ deviceId, label }) => (
        <option value={deviceId} key={deviceId}>
          {label}
        </option>
      ))}
    </Select>
  )
}
