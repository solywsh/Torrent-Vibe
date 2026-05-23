import { useCallback, useDeferredValue } from 'react'

import { useTorrentDataStore } from '../stores'

interface TextValueCellProps {
  rowIndex: number
  field: string
  /** Render as monospaced (for hashes / magnet URIs) */
  mono?: boolean
  /** When set, only display the last N path segments */
  pathTail?: number
  /** When set, truncate long strings to N characters with ellipsis */
  truncateChars?: number
  align?: 'left' | 'center' | 'right'
}

const selectText = (state: any, rowIndex: number, field: string): string => {
  const torrent = state.sortedTorrents[rowIndex]
  const v = torrent?.[field]
  return typeof v === 'string' ? v : ''
}

const tailOfPath = (path: string, n: number): string => {
  const parts = path.split(/[/\\]/).filter(Boolean)
  if (parts.length <= n) { return path }
  return `.../${parts.slice(-n).join('/')}`
}

const truncate = (s: string, n: number): string =>
  s.length > n ? `${s.slice(0, n)}…` : s

export const TextValueCell = ({
  rowIndex,
  field,
  mono = false,
  pathTail,
  truncateChars,
  align = 'left',
}: TextValueCellProps) => {
  const deferredRowIndex = useDeferredValue(rowIndex)

  const value = useTorrentDataStore(
    useCallback(
      state => selectText(state, deferredRowIndex, field),
      [deferredRowIndex, field],
    ),
  )

  if (!value) {
    return (
      <div className="flex items-center px-2 py-4 text-sm text-text-secondary">
        -
      </div>
    )
  }

  let display = value
  if (pathTail) { display = tailOfPath(value, pathTail) }
  if (truncateChars) { display = truncate(display, truncateChars) }

  // align prop is preserved on the API but ignored — cells are always left-aligned.
  void align

  return (
    <div
      className="flex items-center px-2 py-4 text-sm text-text justify-start"
    >
      <span
        title={value}
        className={`truncate ${mono ? 'font-mono text-xs' : ''}`}
      >
        {display}
      </span>
    </div>
  )
}
