import { useCallback, useDeferredValue } from 'react'

import { useTorrentDataStore } from '../stores'

interface NumberValueCellProps {
  rowIndex: number
  field: string
  decimals?: number
  /** qBittorrent sentinel handling: -1 = unlimited, -2 = global */
  treatNegativeAsSentinel?: boolean
}

const selectNumber = (
  state: any,
  rowIndex: number,
  field: string,
): number | undefined => {
  const torrent = state.sortedTorrents[rowIndex]
  const v = torrent?.[field]
  return typeof v === 'number' ? v : undefined
}

export const NumberValueCell = ({
  rowIndex,
  field,
  decimals,
  treatNegativeAsSentinel = false,
}: NumberValueCellProps) => {
  const deferredRowIndex = useDeferredValue(rowIndex)

  const value = useTorrentDataStore(
    useCallback(
      state => selectNumber(state, deferredRowIndex, field),
      [deferredRowIndex, field],
    ),
  )

  let display = '-'
  if (value !== undefined) {
    if (treatNegativeAsSentinel && value === -1) { display = '∞' }
    else if (treatNegativeAsSentinel && value === -2) { display = '—' }
    else if (decimals !== undefined) { display = value.toFixed(decimals) }
    else { display = String(value) }
  }

  return (
    <div className="flex items-center justify-start px-2 py-4 text-sm text-text tabular-nums">
      {display}
    </div>
  )
}
