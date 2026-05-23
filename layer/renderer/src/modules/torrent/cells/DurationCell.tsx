import { useCallback, useDeferredValue } from 'react'

import { useTorrentDataStore } from '../stores'

interface DurationCellProps {
  rowIndex: number
  field: string
  /** Unit of the stored value */
  unit?: 'seconds' | 'minutes'
  /** qBittorrent sentinel handling: -1 = unlimited, -2 = global */
  treatNegativeAsSentinel?: boolean
}

const selectDuration = (state: any, rowIndex: number, field: string): number => {
  const torrent = state.sortedTorrents[rowIndex]
  const v = torrent?.[field]
  return typeof v === 'number' ? v : 0
}

const formatDuration = (seconds: number): string => {
  if (seconds <= 0) { return '-' }

  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (days > 0) { return `${days}d ${hours}h` }
  if (hours > 0) { return `${hours}h ${minutes}m` }
  if (minutes > 0) { return `${minutes}m ${secs}s` }
  return `${secs}s`
}

export const DurationCell = ({
  rowIndex,
  field,
  unit = 'seconds',
  treatNegativeAsSentinel = false,
}: DurationCellProps) => {
  const deferredRowIndex = useDeferredValue(rowIndex)

  const raw = useTorrentDataStore(
    useCallback(
      state => selectDuration(state, deferredRowIndex, field),
      [deferredRowIndex, field],
    ),
  )

  let display: string
  if (treatNegativeAsSentinel && raw === -1) { display = '∞' }
  else if (treatNegativeAsSentinel && raw === -2) { display = '—' }
  else {
    const seconds = unit === 'minutes' ? raw * 60 : raw
    display = formatDuration(seconds)
  }

  return (
    <div className="flex items-center justify-start px-2 py-4 text-sm text-text tabular-nums">
      {display}
    </div>
  )
}
