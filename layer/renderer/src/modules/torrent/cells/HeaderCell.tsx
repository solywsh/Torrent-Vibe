import { useTranslation } from 'react-i18next'

import { clsxm } from '~/lib/cn'
import type { TorrentInfo } from '~/types/torrent'

interface HeaderCellProps {
  label: I18nKeys
  sortable?: boolean
  onSort?: (key: keyof TorrentInfo, direction: 'asc' | 'desc') => void
  sortKey?: keyof TorrentInfo
  sortDirection?: 'asc' | 'desc'
  columnKey: keyof TorrentInfo | 'select'
  align?: 'left' | 'center' | 'right'
  cellClassName?: string
}

export const HeaderCell = ({
  label,
  sortable = false,
  onSort,
  sortKey,
  sortDirection,
  columnKey,
  align = 'left',
  cellClassName,
}: HeaderCellProps) => {
  const { t } = useTranslation()
  const handleSort = () => {
    if (!onSort || !sortable || columnKey === 'select') { return }

    const newDirection
      = sortKey === columnKey && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(columnKey as keyof TorrentInfo, newDirection)
  }

  const getSortIcon = () => {
    if (!sortable || columnKey === 'select') { return null }

    const isActive = sortKey === columnKey
    const iconClass
      = isActive && sortDirection === 'desc'
        ? 'i-mingcute-arrow-down-line'
        : 'i-mingcute-arrow-up-line'

    return (
      <i
        aria-hidden={!isActive}
        className={clsxm(
          iconClass,
          'shrink-0 !text-accent',
          !isActive && 'invisible',
        )}
      />
    )
  }

  // Headers are always centered regardless of the cell content alignment.
  // The `align` prop is preserved on the API but intentionally ignored here.
  void align
  const alignmentClass = 'justify-center'

  return (
    <div
      className={clsxm(
        'flex items-center px-2 py-2 absolute inset-0 justify-center border-border border-r last:border-r-0',
        cellClassName,
      )}
    >
      {sortable && onSort
        ? (
            <button
              type="button"
              onClick={handleSort}
              className={`flex items-center w-full min-w-0 ${alignmentClass} gap-2 text-sm font-semibold text-text-secondary hover:text-accent transition-colors`}
            >
              <span className="truncate" title={t(label)}>
                {t(label)}
              </span>
              {getSortIcon()}
            </button>
          )
        : (
            <span
              className="truncate text-sm font-semibold text-text-secondary"
              title={t(label)}
            >
              {t(label)}
            </span>
          )}
    </div>
  )
}
