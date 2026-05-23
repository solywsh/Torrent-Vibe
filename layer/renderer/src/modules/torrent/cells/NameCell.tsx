import { useCallback, useDeferredValue } from 'react'
import { useShallow } from 'zustand/shallow'

import { TorrentStateIcon } from '../../../components/ui/torrent-state-icon'
import { TorrentAiMetadataRow } from '../components/TorrentAiMetadataRow'
import { useTorrentDataStore } from '../stores'
import {
  selectTorrentName,
  selectTorrentProgress,
} from '../stores/torrent-selectors'

interface NameCellProps {
  rowIndex: number
  isInViewport?: boolean
}

export const NameCell = ({ rowIndex, isInViewport }: NameCellProps) => {
  const deferredRowIndex = useDeferredValue(rowIndex)

  // Use granular selectors for just the name and progress data we need
  const nameData = useTorrentDataStore(
    useShallow(
      useCallback(
        state => selectTorrentName(state, deferredRowIndex),
        [deferredRowIndex],
      ),
    ),
  )

  const { progress, state } = useTorrentDataStore(
    useShallow(
      useCallback(
        state => selectTorrentProgress(state, deferredRowIndex),
        [deferredRowIndex],
      ),
    ),
  )

  if (!nameData.name) {
    return (
      <div className="absolute inset-0">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex-shrink-0">
            <TorrentStateIcon
              state="unknown"
              className="text-lg text-text-tertiary"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-tertiary">
              Loading...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex items-center gap-3 px-4 py-2">
      <div className="flex-shrink-0 pt-0.5">
        <TorrentStateIcon
          state={state}
          progress={progress}
          className="text-lg"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="text-sm font-medium text-text truncate">
          {nameData.name || 'Untitled'}
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary min-w-0">
          <span className="truncate text-text-secondary">
            {nameData.category || 'Uncategorized'}
          </span>

          {isInViewport
            ? (
                <div className="ml-auto shrink-0 h-0 -translate-y-3 translate-x-2">
                  <TorrentAiMetadataRow
                    hash={nameData.hash}
                    rawName={nameData.name}
                    isInViewport={isInViewport}
                  />
                </div>
              )
            : null}
        </div>
      </div>
    </div>
  )
}
