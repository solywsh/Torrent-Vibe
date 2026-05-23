import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core'
import type { Column, Table } from '@tanstack/react-table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { titleCase } from 'title-case'
import { useShallow } from 'zustand/shallow'

import type { TorrentInfo } from '~/types'

import { DragPreview } from './components/DragComponents'
import { TableBody } from './components/TableBody'
import { TableHeader } from './components/TableHeader'
import { TablePagination } from './components/TablePagination'
import { BASE_ROW_HEIGHT, getAllColumns } from './constants'
import { useTorrentTableColumnMenu } from './hooks/use-torrent-table-column-menu'
import { useTorrentTableDragDrop } from './hooks/use-torrent-table-drag-drop'
import { useTorrentTableHotkeys } from './hooks/use-torrent-table-hotkeys'
import { torrentDataStoreSetters, useTorrentDataStore } from './stores'
import {
  selectFilterState,
  selectSortedTorrents,
  selectSortState,
  selectTorrentsLength,
} from './stores/torrent-selectors'
import {
  getTorrentTableActions,
  useTorrentTableSelectors,
} from './stores/torrent-table-store'

const MemoTableHeader = React.memo(TableHeader)

export interface TorrentTableConfig {
  table: Table<TorrentInfo>
  data: TorrentInfo[]
  getRowHeight: (index: number) => number
  visibleLeafColumns: Column<TorrentInfo>[]
  visibleColumnIds: string[]
  gridTemplateColumns: string
  minTableWidth: number
  // cumulative left offsets per visible column id (in px)
  columnOffsets: Record<string, number>
}

export const TorrentTableList = () => {
  const { t } = useTranslation()
  const torrentsLength = useTorrentDataStore(selectTorrentsLength)

  if (torrentsLength === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background text-center">
        <i className="i-mingcute-folder-open-line text-4xl text-text-tertiary mb-4" />
        <h3 className="text-lg font-medium text-text mb-2">
          {t('torrent.emptyState.title')}
        </h3>
        <p className="text-text-secondary">
          {t('torrent.emptyState.description')}
        </p>
      </div>
    )
  }
  return <TorrentTableListImpl />
}
function TorrentTableListImpl() {
  const sortTorrents = useTorrentDataStore(selectSortedTorrents)
  const dragState = useTorrentTableSelectors.useDragState()
  const columnOrder = useTorrentTableSelectors.useColumnOrder()
  const columnVisibility = useTorrentTableSelectors.useColumnVisibility()
  const columnSizing = useTorrentTableSelectors.useColumnSizing()
  const sortState = useTorrentTableSelectors.useSortState()
  const storeSortState = useTorrentDataStore(useShallow(selectSortState))

  // Table hotkeys and focus scope management
  const { setTableScopeRef } = useTorrentTableHotkeys()

  // Get actions
  const actions = getTorrentTableActions()

  // Sorting via store and persistence
  const handleSort = React.useCallback(
    (key: string, direction: 'asc' | 'desc') => {
      torrentDataStoreSetters.setSorting(key as keyof TorrentInfo, direction)
      actions.updateSort(key, direction)
    },
    [actions],
  )

  // Initialize sort state on mount (only if not already set)
  React.useEffect(() => {
    if (sortState.sortKey && sortState.sortDirection) {
      const currentSort = selectSortState(useTorrentDataStore.getState())
      if (
        currentSort.sortKey !== sortState.sortKey
        || currentSort.sortDirection !== sortState.sortDirection
      ) {
        torrentDataStoreSetters.setSorting(
          sortState.sortKey as keyof TorrentInfo,
          sortState.sortDirection,
        )
      }
    }
  }, [sortState.sortKey, sortState.sortDirection])

  // Dynamic row height calculation using store data
  const getRowHeight = React.useCallback(() => {
    return BASE_ROW_HEIGHT
  }, [])

  // TanStack Table returns un-memoizable functions, so the React Compiler skips
  // this component; that's expected here and safe — cells subscribe to the store
  // for their own updates rather than relying on compiler memoization.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: sortTorrents,
    columns: getAllColumns(),
    state: {
      columnOrder,
      columnVisibility,
      columnSizing,
    },

    onColumnOrderChange: (updater) => {
      actions.updateColumnOrder((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        // keep 'select' at index 0
        const filtered = next.filter((k: string) => k !== 'select')
        actions.setOrderedColumns(filtered)
        return ['select', ...filtered]
      })
    },
    onColumnVisibilityChange: (updater) => {
      actions.updateColumnVisibility((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        const visible = getAllColumns()
          .filter(c => c.id !== 'select')
          .map(c => c.id as string)
          .filter(k => next[k])
        // Ensure at least one column visible (besides select)
        if (visible.length === 0) {
          return prev
        }
        actions.setVisibleColumns(visible)
        return next
      })
    },
    onColumnSizingChange: (updater) => {
      actions.updateColumnSizing(updater)
    },

    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: false,
    meta: {
      sortState: {
        sortKey: storeSortState.sortKey || undefined,
        sortDirection: storeSortState.sortDirection,
      },
      handleSort,
    },
  })

  // Derive from TanStack state each render so changes (visibility/order/size)
  // immediately reflect in layout without stale memoization
  const visibleLeafColumns = table.getVisibleLeafColumns()
  const visibleColumnIds = visibleLeafColumns.map(c => c.id)

  const gridTemplateColumns = visibleLeafColumns
    .map(c => `${c.getSize()}px`)
    .join(' ')

  // Compute cumulative left offsets for sticky support
  const columnOffsets: Record<string, number> = (() => {
    const offsets: Record<string, number> = {}
    let acc = 0
    for (const col of visibleLeafColumns) {
      offsets[col.id] = acc
      acc += col.getSize()
    }
    return offsets
  })()

  const minTableWidth = visibleLeafColumns.reduce(
    (sum: number, c: Column<TorrentInfo>) => sum + c.getSize(),
    0,
  )

  const tableConfig: TorrentTableConfig = {
    table,
    data: sortTorrents,
    getRowHeight,
    visibleLeafColumns,
    visibleColumnIds,
    gridTemplateColumns,
    minTableWidth,
    columnOffsets,
  }

  // Extract behavior logic into custom hooks
  const dragDrop = useTorrentTableDragDrop()
  const columnMenu = useTorrentTableColumnMenu()

  return (
    <DndContext
      sensors={dragDrop.sensors}
      collisionDetection={closestCenter}
      onDragStart={dragDrop.handleDragStart}
      onDragEnd={dragDrop.handleDragEnd}
    >
      <TorrentTablePaginatedViewport
        columnMenu={columnMenu}
        dragState={dragState}
        setTableScopeRef={setTableScopeRef}
        tableConfig={tableConfig}
        torrentsLength={sortTorrents.length}
      />
    </DndContext>
  )
}

const HEADER_HEIGHT = 48

interface TorrentTablePaginatedViewportProps {
  columnMenu: ReturnType<typeof useTorrentTableColumnMenu>
  dragState: ReturnType<typeof useTorrentTableSelectors.useDragState>
  setTableScopeRef: React.Dispatch<React.SetStateAction<HTMLDivElement>>
  tableConfig: TorrentTableConfig
  torrentsLength: number
}

function TorrentTablePaginatedViewport({
  columnMenu,
  dragState,
  setTableScopeRef,
  tableConfig,
  torrentsLength,
}: TorrentTablePaginatedViewportProps) {
  const bodyRef = React.useRef<HTMLDivElement | null>(null)
  const [bodyHeight, setBodyHeight] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)

  // Reset to the first page whenever the "view" changes (filter / search /
  // sort). Background count drift (a torrent finishing, polling) is handled by
  // the clamp effect below instead, so the user is not yanked back to page 1.
  const filterState = useTorrentDataStore(selectFilterState)
  const searchQuery = useTorrentDataStore(state => state.searchQuery)
  const sortState = useTorrentDataStore(useShallow(selectSortState))
  React.useEffect(() => {
    setCurrentPage(1)
  }, [filterState, searchQuery, sortState.sortKey, sortState.sortDirection])

  // Measure the body region so page size auto-fits the visible area (no scroll).
  React.useEffect(() => {
    const el = bodyRef.current
    if (!el) {
      return
    }
    const measure = () =>
      setBodyHeight(Math.floor(el.getBoundingClientRect().height))
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(el)
    measure()
    return () => resizeObserver.disconnect()
  }, [])

  const pageSize = Math.max(
    1,
    Math.floor((bodyHeight || HEADER_HEIGHT * 8) / BASE_ROW_HEIGHT),
  )
  const totalPages = Math.max(1, Math.ceil(torrentsLength / pageSize))
  const clampedPage = Math.min(currentPage, totalPages)

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const pageStartIndex = (clampedPage - 1) * pageSize

  return (
    <div
      id="fixed-data-table"
      ref={(el) => {
        // attach TABLE focus scope to the viewport element
        if (el) {
          setTableScopeRef(el)
        }
      }}
      className="relative flex flex-1 h-0 min-h-100 w-full flex-col overflow-hidden bg-background outline-none"
      tabIndex={-1}
      onMouseDown={(event) => {
        event.currentTarget.focus({ preventScroll: true })
      }}
    >
      {/* Horizontal scroll container: header + body scroll together so all
          columns are reachable when they exceed the viewport width. */}
      <div className="flex min-h-0 flex-1 flex-col overflow-x-auto overflow-y-hidden">
        <div
          className="flex min-h-0 flex-1 flex-col"
          style={{ minWidth: tableConfig.minTableWidth }}
        >
          <MemoTableHeader {...tableConfig} columnMenu={columnMenu} />

          <div ref={bodyRef} className="relative min-h-0 flex-1">
            <TableBody
              {...tableConfig}
              paginated
              pageStartIndex={pageStartIndex}
              pageSize={pageSize}
              viewportHeight={bodyHeight}
              headerHeight={0}
              isScrolling={false}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {dragState.isDragging && dragState.draggedColumnId
          ? (
              <DragPreview columnId={dragState.draggedColumnId}>
                {titleCase(dragState.draggedColumnId)}
              </DragPreview>
            )
          : null}
      </DragOverlay>

      <TablePagination
        totalItems={torrentsLength}
        pageSize={pageSize}
        currentPage={clampedPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
