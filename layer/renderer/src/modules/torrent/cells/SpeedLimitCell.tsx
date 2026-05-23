import { useCallback, useDeferredValue } from 'react'

import { formatSpeed } from '~/lib/format'

import { useTorrentDataStore } from '../stores'

interface SpeedLimitCellProps {
  rowIndex: number
  field: 'dl_limit' | 'up_limit'
}

const selectLimit = (state: any, rowIndex: number, field: string): number => {
  const torrent = state.sortedTorrents[rowIndex]
  const v = torrent?.[field]
  return typeof v === 'number' ? v : -1
}

export const SpeedLimitCell = ({ rowIndex, field }: SpeedLimitCellProps) => {
  const deferredRowIndex = useDeferredValue(rowIndex)

  const limit = useTorrentDataStore(
    useCallback(
      state => selectLimit(state, deferredRowIndex, field),
      [deferredRowIndex, field],
    ),
  )

  const display = limit <= 0 ? '∞' : formatSpeed(limit)

  return (
    <div className="flex items-center justify-start px-2 py-4 text-sm text-text tabular-nums">
      {display}
    </div>
  )
}
