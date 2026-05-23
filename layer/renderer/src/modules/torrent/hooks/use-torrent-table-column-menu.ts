import * as React from 'react'
import { useTranslation } from 'react-i18next'

import {
  MENU_ITEM_SEPARATOR,
  MenuItemText,
  useShowContextMenu,
} from '~/atoms/context-menu'

import { COLUMN_LABEL_KEYS, getAllColumns } from '../constants'
import {
  getTorrentTableActions,
  useTorrentTableSelectors,
} from '../stores/torrent-table-store'

export interface TorrentTableColumnMenu {
  openColumnsMenu: (e: React.MouseEvent) => void
}

export const useTorrentTableColumnMenu = (): TorrentTableColumnMenu => {
  const { t } = useTranslation()
  const columnVisibility = useTorrentTableSelectors.useColumnVisibility()
  const actions = getTorrentTableActions()

  const showContextMenu = useShowContextMenu()

  // Column chooser menu
  const openColumnsMenu = React.useCallback(
    (e: React.MouseEvent) => {
      const allColumns = getAllColumns()
      const items = [
        ...allColumns
          .filter(c => c.id !== 'select' && c.enableHiding !== false)
          .map((c) => {
            const columnId = c.id as string
            const labelKey = COLUMN_LABEL_KEYS[columnId]
            const label = labelKey ? t(labelKey) : columnId
            return new MenuItemText({
              label,
              checked: columnVisibility[columnId] !== false,
              click: () => {
                actions.updateColumnVisibility((prev) => {
                  const next = { ...prev }
                  const willHide = next[columnId] !== false
                  // Prevent hiding last visible column (besides select and non-hideable columns)
                  const numVisible = allColumns.filter(
                    x =>
                      x.id !== 'select'
                      && x.enableHiding !== false
                      && next[x.id as string] !== false,
                  ).length
                  if (willHide && numVisible <= 1) { return prev }
                  next[columnId] = !willHide
                  // sync array form
                  const visible = allColumns
                    .filter(x => x.id !== 'select')
                    .map(x => x.id as string)
                    .filter(k => next[k] !== false)
                  actions.setVisibleColumns(visible)
                  return next
                })
              },
            })
          }),
        MENU_ITEM_SEPARATOR,
        new MenuItemText({
          label: t('torrent.columnsMenu.reset'),
          click: actions.resetToDefaults,
          icon: React.createElement('i', {
            className: 'i-lucide-rotate-ccw',
          }),
        }),
      ]
      showContextMenu(items, e)
    },
    [columnVisibility, showContextMenu, actions, t],
  )

  return {
    openColumnsMenu,
  }
}
