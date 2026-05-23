import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '~/lib/cn'

interface TablePaginationProps {
  totalItems: number
  pageSize: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PageItem = number | 'left-ellipsis' | 'right-ellipsis'

// Build the list of page buttons to show, collapsing long ranges with
// ellipsis. Always keeps the first/last page and a window around the current.
function getPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items: PageItem[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  if (left > 2) {
    items.push('left-ellipsis')
  }
  for (let page = left; page <= right; page++) {
    items.push(page)
  }
  if (right < total - 1) {
    items.push('right-ellipsis')
  }
  items.push(total)

  return items
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  totalItems,
  pageSize: _pageSize,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation()
  const [jumpValue, setJumpValue] = React.useState('')

  const pageItems = React.useMemo(
    () => getPageItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  const goTo = React.useCallback(
    (page: number) => {
      const next = Math.min(Math.max(1, Math.trunc(page)), totalPages)
      if (next !== currentPage) {
        onPageChange(next)
      }
    },
    [currentPage, totalPages, onPageChange],
  )

  const commitJump = React.useCallback(() => {
    const parsed = Number.parseInt(jumpValue, 10)
    if (!Number.isNaN(parsed)) {
      goTo(parsed)
    }
    setJumpValue('')
  }, [jumpValue, goTo])

  const navButtonClass
    = 'flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent-10'

  return (
    <div className="flex h-11 shrink-0 select-none items-center justify-end gap-6 border-t border-border bg-background px-4 text-sm text-text-secondary">
      <span className="tabular-nums">
        {t('torrent.pagination.totalItems', { count: totalItems })}
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className={navButtonClass}
          disabled={currentPage <= 1}
          onClick={() => goTo(currentPage - 1)}
          aria-label="Previous page"
        >
          <i className="i-lucide-chevron-left" />
        </button>

        {pageItems.map((item) => {
          if (item === 'left-ellipsis' || item === 'right-ellipsis') {
            return (
              <span
                key={item}
                className="flex h-7 w-7 items-center justify-center text-text-tertiary"
              >
                <i className="i-lucide-more-horizontal" />
              </span>
            )
          }

          const isActive = item === currentPage
          return (
            <button
              key={item}
              type="button"
              className={cn(
                'flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-sm tabular-nums transition-colors',
                isActive
                  ? 'bg-accent text-white'
                  : 'hover:bg-accent-10 text-text',
              )}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => goTo(item)}
            >
              {item}
            </button>
          )
        })}

        <button
          type="button"
          className={navButtonClass}
          disabled={currentPage >= totalPages}
          onClick={() => goTo(currentPage + 1)}
          aria-label="Next page"
        >
          <i className="i-lucide-chevron-right" />
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <span>{t('torrent.pagination.jumpTo')}</span>
        <input
          type="text"
          inputMode="numeric"
          value={jumpValue}
          placeholder={String(currentPage)}
          onChange={e => setJumpValue(e.target.value.replaceAll(/\D/g, ''))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              commitJump()
            }
          }}
          onBlur={commitJump}
          className="h-7 w-12 rounded-md border border-border bg-background-secondary px-2 text-center text-sm tabular-nums text-text outline-none focus:border-accent"
        />
        <span>{t('torrent.pagination.pageUnit')}</span>
      </div>
    </div>
  )
}
