import { useCallback, useDeferredValue } from 'react'

import { useTorrentDataStore } from '../stores'

interface BooleanCellProps {
  rowIndex: number
  field: string
}

const selectBool = (
  state: any,
  rowIndex: number,
  field: string,
): boolean | undefined => {
  const torrent = state.sortedTorrents[rowIndex]
  const v = torrent?.[field]
  return typeof v === 'boolean' ? v : undefined
}

export const BooleanCell = ({ rowIndex, field }: BooleanCellProps) => {
  const deferredRowIndex = useDeferredValue(rowIndex)

  const value = useTorrentDataStore(
    useCallback(
      state => selectBool(state, deferredRowIndex, field),
      [deferredRowIndex, field],
    ),
  )

  if (value === undefined) {
    return (
      <div className="flex items-center justify-start px-2 py-4 text-sm text-text-secondary">
        -
      </div>
    )
  }

  return (
    <div className="flex items-center justify-start px-2 py-4 text-base">
      {value
        ? (
            <i className="i-mingcute-check-fill text-accent" />
          )
        : (
            <i className="i-mingcute-close-fill text-text-secondary" />
          )}
    </div>
  )
}
