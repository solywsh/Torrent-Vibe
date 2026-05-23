import { useCallback, useDeferredValue } from 'react'

import { formatBytes } from '~/lib/format'
import type { TorrentInfo } from '~/types/torrent'

import { useTorrentDataStore } from '../stores'

type NumericKey = keyof {
  [K in keyof TorrentInfo as TorrentInfo[K] extends number | undefined
    ? K
    : never]: TorrentInfo[K]
}

interface BytesValueCellProps {
  rowIndex: number
  field: NumericKey
}

const selectBytes = (state: any, rowIndex: number, field: string): number => {
  const torrent = state.sortedTorrents[rowIndex]
  const v = torrent?.[field]
  return typeof v === 'number' ? v : 0
}

export const BytesValueCell = ({ rowIndex, field }: BytesValueCellProps) => {
  const deferredRowIndex = useDeferredValue(rowIndex)

  const bytes = useTorrentDataStore(
    useCallback(
      state => selectBytes(state, deferredRowIndex, field as string),
      [deferredRowIndex, field],
    ),
  )

  return (
    <div className="flex items-center justify-start px-2 py-4 text-sm text-text tabular-nums">
      {bytes > 0 ? formatBytes(bytes) : '-'}
    </div>
  )
}
