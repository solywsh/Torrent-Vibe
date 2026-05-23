import type { ColumnDef, RowData } from '@tanstack/react-table'
import * as React from 'react'

import type { TorrentInfo } from '~/types/torrent'

import { HeaderCheckboxCell } from './cells/CheckboxCell'
import { HeaderCell } from './cells/HeaderCell'
import { CELL_RENDERERS } from './cells/StaticCellRenderers'

// Extend TableMeta to include our custom properties
declare module '@tanstack/react-table' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface TableMeta<TData extends RowData> {
    sortState?: {
      sortKey?: keyof TorrentInfo
      sortDirection?: 'asc' | 'desc'
    }
    handleSort?: (key: keyof TorrentInfo, direction: 'asc' | 'desc') => void
  }
}

// All available columns that can be displayed
const tableAllColumns: ColumnDef<TorrentInfo>[] = [
  {
    id: 'select',
    header: () => <HeaderCheckboxCell />,
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.select
      return <Renderer rowIndex={row.index} />
    },
    size: 48,
    minSize: 48,
    maxSize: 48,
    enableResizing: false,
    enableHiding: false,
  },
  {
    id: 'name',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.name"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="name"
          align="left"
          cellClassName="px-4"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.name
      return <Renderer rowIndex={row.index} />
    },
    size: 600,
    minSize: 300,
    maxSize: 1200,
    enableResizing: true,
    enableHiding: false,
  },
  {
    id: 'size',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.size"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="size"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.size
      return <Renderer rowIndex={row.index} />
    },
    size: 86,
    minSize: 80,
    maxSize: 150,
    enableResizing: true,
    enableHiding: true,
  },
  {
    id: 'progress',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.progress"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="progress"
          align="center"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.progress
      return <Renderer rowIndex={row.index} />
    },
    size: 120,
    minSize: 100,
    maxSize: 200,
    enableResizing: false,
    enableHiding: true,
  },
  {
    id: 'dlspeed',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.downloadSpeed"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="dlspeed"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.dlspeed
      return <Renderer rowIndex={row.index} />
    },
    size: 100,
    minSize: 80,
    maxSize: 120,
    enableResizing: true,
    enableHiding: true,
  },
  {
    id: 'upspeed',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.uploadSpeed"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="upspeed"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.upspeed
      return <Renderer rowIndex={row.index} />
    },
    size: 100,
    minSize: 80,
    maxSize: 120,
    enableResizing: true,
    enableHiding: true,
  },
  {
    id: 'eta',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.eta"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="eta"
          align="center"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.eta
      return <Renderer rowIndex={row.index} />
    },
    size: 120,
    enableResizing: false,
    enableHiding: true,
  },
  {
    id: 'ratio',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.ratio"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="ratio"
          align="center"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.ratio
      return <Renderer rowIndex={row.index} />
    },
    size: 100,
    minSize: 80,
    maxSize: 160,
    enableResizing: true,
    enableHiding: true,
  },
  {
    id: 'state',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.status"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="state"
          align="center"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.state
      return <Renderer rowIndex={row.index} />
    },
    size: 120,

    enableResizing: false,
    enableHiding: true,
  },
  // Priority column
  {
    id: 'priority',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.priority"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="priority"
          align="center"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.priority
      return <Renderer rowIndex={row.index} />
    },
    size: 80,
    minSize: 80,
    maxSize: 120,
    enableResizing: true,
    enableHiding: true,
  },
  // Tracker column
  {
    id: 'tracker',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.tracker"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="tracker"
          align="left"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.tracker
      return <Renderer rowIndex={row.index} />
    },
    size: 120,
    minSize: 100,
    maxSize: 200,
    enableResizing: true,
    enableHiding: true,
  },
  // Category column
  {
    id: 'category',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.category"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="category"
          align="left"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.category
      return <Renderer rowIndex={row.index} />
    },
    size: 100,
    minSize: 80,
    maxSize: 150,
    enableResizing: true,
    enableHiding: true,
  },
  // Tags column
  {
    id: 'tags',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.tags"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="tags"
          align="left"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.tags
      return <Renderer rowIndex={row.index} />
    },
    size: 120,
    minSize: 100,
    maxSize: 200,
    enableResizing: true,
    enableHiding: true,
  },
  // Seeds column
  {
    id: 'num_seeds',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.seeds"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="num_seeds"
          align="center"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.num_seeds
      return <Renderer rowIndex={row.index} />
    },
    size: 80,
    minSize: 70,
    maxSize: 100,
    enableResizing: true,
    enableHiding: true,
  },
  // Peers column
  {
    id: 'num_leechs',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.peers"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="num_leechs"
          align="center"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.num_leechs
      return <Renderer rowIndex={row.index} />
    },
    size: 80,
    minSize: 70,
    maxSize: 100,
    enableResizing: true,
    enableHiding: true,
  },
  // Downloaded column
  {
    id: 'downloaded',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.downloaded"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="downloaded"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.downloaded
      return <Renderer rowIndex={row.index} />
    },
    size: 90,
    minSize: 70,
    maxSize: 120,
    enableResizing: true,
    enableHiding: true,
  },
  // Uploaded column
  {
    id: 'uploaded',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.uploaded"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="uploaded"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.uploaded
      return <Renderer rowIndex={row.index} />
    },
    size: 90,
    minSize: 70,
    maxSize: 120,
    enableResizing: true,
    enableHiding: true,
  },
  // Remaining column
  {
    id: 'amount_left',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.remaining"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="amount_left"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.amount_left
      return <Renderer rowIndex={row.index} />
    },
    size: 100,
    minSize: 80,
    maxSize: 120,
    enableResizing: true,
    enableHiding: true,
  },
  // Time Active column
  {
    id: 'time_active',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.activeTime"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="time_active"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.time_active
      return <Renderer rowIndex={row.index} />
    },
    size: 90,
    minSize: 70,
    maxSize: 120,
    enableResizing: true,
    enableHiding: true,
  },
  // Seeding Time column
  {
    id: 'seeding_time',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.seedingTime"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="seeding_time"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.seeding_time
      return <Renderer rowIndex={row.index} />
    },
    size: 90,
    minSize: 70,
    maxSize: 120,
    enableResizing: true,
    enableHiding: true,
  },
  // Added On column
  {
    id: 'added_on',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.addedOn"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="added_on"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.added_on
      return <Renderer rowIndex={row.index} />
    },
    size: 170,
    enableResizing: true,
    enableHiding: true,
  },
  // Completion On column
  {
    id: 'completion_on',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.completedOn"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="completion_on"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.completion_on
      return <Renderer rowIndex={row.index} />
    },
    size: 170,

    enableResizing: true,
    enableHiding: true,
  },
  // Last Activity column
  {
    id: 'last_activity',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.lastActivity"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="last_activity"
          align="right"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.last_activity
      return <Renderer rowIndex={row.index} />
    },
    size: 100,
    enableResizing: true,
    enableHiding: true,
  },
  // Save Path column
  {
    id: 'save_path',
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label="torrent.columns.savePath"
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey="save_path"
          align="left"
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = CELL_RENDERERS.save_path
      return <Renderer rowIndex={row.index} />
    },
    size: 200,
    minSize: 150,
    maxSize: 300,
    enableResizing: true,
    enableHiding: true,
  },
  // --- New columns aligned with VueTorrent ---
  ...buildExtraColumns(),
]

type ExtraColumnSpec = {
  id: keyof TorrentInfo
  labelKey: I18nKeys
  align: 'left' | 'center' | 'right'
  size?: number
  minSize?: number
  maxSize?: number
}

// Wrapper to keep `id` typed against CELL_RENDERERS keys.
// Declared as a function (hoisted) because `buildExtraColumns` is called
// during initial evaluation of `tableAllColumns`.
function makeExtraColumn(spec: ExtraColumnSpec): ColumnDef<TorrentInfo> {
  const { id, labelKey, align, size = 120, minSize = 80, maxSize = 400 } = spec
  return {
    id,
    header: ({ table }) => {
      const { sortKey, sortDirection } = table.options.meta?.sortState || {}
      return (
        <HeaderCell
          label={labelKey}
          sortable={true}
          onSort={table.options.meta?.handleSort}
          sortKey={sortKey as keyof TorrentInfo}
          sortDirection={sortDirection}
          columnKey={id}
          align={align}
        />
      )
    },
    cell: ({ row }) => {
      const Renderer = (CELL_RENDERERS as Record<string, React.ComponentType<{ rowIndex: number }>>)[
        id as string
      ]
      return Renderer ? <Renderer rowIndex={row.index} /> : null
    },
    size,
    minSize,
    maxSize,
    enableResizing: true,
    enableHiding: true,
  }
}

function buildExtraColumns(): ColumnDef<TorrentInfo>[] {
  const specs: ExtraColumnSpec[] = [
    // qBittorrent standard fields
    { id: 'availability', labelKey: 'torrent.columns.availability', align: 'right', size: 100 },
    { id: 'auto_tmm', labelKey: 'torrent.columns.autoTmm', align: 'center', size: 80 },
    { id: 'content_path', labelKey: 'torrent.columns.contentPath', align: 'left', size: 200, maxSize: 400 },
    { id: 'dl_limit', labelKey: 'torrent.columns.dlLimit', align: 'right', size: 100 },
    { id: 'up_limit', labelKey: 'torrent.columns.upLimit', align: 'right', size: 100 },
    { id: 'downloaded_session', labelKey: 'torrent.columns.downloadedSession', align: 'right', size: 110 },
    { id: 'uploaded_session', labelKey: 'torrent.columns.uploadedSession', align: 'right', size: 110 },
    { id: 'magnet_uri', labelKey: 'torrent.columns.magnetUri', align: 'left', size: 240, maxSize: 600 },
    { id: 'f_l_piece_prio', labelKey: 'torrent.columns.firstLastPiecePrio', align: 'center', size: 80 },
    { id: 'force_start', labelKey: 'torrent.columns.forceStart', align: 'center', size: 80 },
    { id: 'ratio_limit', labelKey: 'torrent.columns.ratioLimit', align: 'right', size: 90 },
    { id: 'seeding_time_limit', labelKey: 'torrent.columns.seedingTimeLimit', align: 'right', size: 110 },
    { id: 'seen_complete', labelKey: 'torrent.columns.seenComplete', align: 'right', size: 130 },
    { id: 'seq_dl', labelKey: 'torrent.columns.sequentialDownload', align: 'center', size: 80 },
    { id: 'super_seeding', labelKey: 'torrent.columns.superSeeding', align: 'center', size: 80 },
    { id: 'total_size', labelKey: 'torrent.columns.totalSize', align: 'right', size: 100 },
    // qBittorrent 5.0+ fields
    { id: 'infohash_v1', labelKey: 'torrent.columns.infohashV1', align: 'left', size: 140, maxSize: 360 },
    { id: 'infohash_v2', labelKey: 'torrent.columns.infohashV2', align: 'left', size: 140, maxSize: 360 },
    { id: 'popularity', labelKey: 'torrent.columns.popularity', align: 'right', size: 100 },
    { id: 'comment', labelKey: 'torrent.columns.comment', align: 'left', size: 200, maxSize: 500 },
    { id: 'private', labelKey: 'torrent.columns.isPrivate', align: 'center', size: 80 },
    { id: 'has_metadata', labelKey: 'torrent.columns.hasMetadata', align: 'center', size: 80 },
    { id: 'reannounce', labelKey: 'torrent.columns.reannounce', align: 'right', size: 100 },
    { id: 'root_path', labelKey: 'torrent.columns.rootPath', align: 'left', size: 200, maxSize: 400 },
    { id: 'download_path', labelKey: 'torrent.columns.downloadPath', align: 'left', size: 200, maxSize: 400 },
    { id: 'trackers_count', labelKey: 'torrent.columns.trackersCount', align: 'right', size: 90 },
    { id: 'inactive_seeding_time_limit', labelKey: 'torrent.columns.inactiveSeedingTimeLimit', align: 'right', size: 130 },
  ]
  return specs.map(makeExtraColumn)
}

// Default columns that are visible by default (aligned with VueTorrent defaults)
export const DEFAULT_VISIBLE_COLUMNS = [
  'name',
  'size',
  'progress',
  'state',
  'dlspeed',
  'upspeed',
  'eta',
  'ratio',
  'downloaded',
  'uploaded',
  'category',
  'tags',
  'num_seeds',
  'num_leechs',
  'availability',
  'added_on',
]

// Function to get all columns with translations
export const getAllColumns = () => tableAllColumns

// Single source of truth: map every column id to its i18n key.
// Used by the column visibility menu so all columns get translated labels.
export const COLUMN_LABEL_KEYS: Record<string, I18nKeys> = {
  // Existing columns
  name: 'torrent.columns.name',
  size: 'torrent.columns.size',
  progress: 'torrent.columns.progress',
  dlspeed: 'torrent.columns.downloadSpeed',
  upspeed: 'torrent.columns.uploadSpeed',
  eta: 'torrent.columns.eta',
  ratio: 'torrent.columns.ratio',
  state: 'torrent.columns.status',
  priority: 'torrent.columns.priority',
  tracker: 'torrent.columns.tracker',
  category: 'torrent.columns.category',
  tags: 'torrent.columns.tags',
  num_seeds: 'torrent.columns.seeds',
  num_leechs: 'torrent.columns.peers',
  downloaded: 'torrent.columns.downloaded',
  uploaded: 'torrent.columns.uploaded',
  amount_left: 'torrent.columns.remaining',
  time_active: 'torrent.columns.activeTime',
  seeding_time: 'torrent.columns.seedingTime',
  added_on: 'torrent.columns.addedOn',
  completion_on: 'torrent.columns.completedOn',
  last_activity: 'torrent.columns.lastActivity',
  save_path: 'torrent.columns.savePath',
  // qBittorrent standard fields (new)
  availability: 'torrent.columns.availability',
  auto_tmm: 'torrent.columns.autoTmm',
  content_path: 'torrent.columns.contentPath',
  dl_limit: 'torrent.columns.dlLimit',
  up_limit: 'torrent.columns.upLimit',
  downloaded_session: 'torrent.columns.downloadedSession',
  uploaded_session: 'torrent.columns.uploadedSession',
  magnet_uri: 'torrent.columns.magnetUri',
  f_l_piece_prio: 'torrent.columns.firstLastPiecePrio',
  force_start: 'torrent.columns.forceStart',
  ratio_limit: 'torrent.columns.ratioLimit',
  seeding_time_limit: 'torrent.columns.seedingTimeLimit',
  seen_complete: 'torrent.columns.seenComplete',
  seq_dl: 'torrent.columns.sequentialDownload',
  super_seeding: 'torrent.columns.superSeeding',
  total_size: 'torrent.columns.totalSize',
  // qBittorrent 5.0+ fields
  infohash_v1: 'torrent.columns.infohashV1',
  infohash_v2: 'torrent.columns.infohashV2',
  popularity: 'torrent.columns.popularity',
  comment: 'torrent.columns.comment',
  private: 'torrent.columns.isPrivate',
  has_metadata: 'torrent.columns.hasMetadata',
  reannounce: 'torrent.columns.reannounce',
  root_path: 'torrent.columns.rootPath',
  download_path: 'torrent.columns.downloadPath',
  trackers_count: 'torrent.columns.trackersCount',
  inactive_seeding_time_limit: 'torrent.columns.inactiveSeedingTimeLimit',
}

export const BASE_ROW_HEIGHT = 56 // Base height for torrent rows
