import { useAtomValue } from 'jotai'
import * as React from 'react'

import { dragDropStateAtom } from '~/atoms/drag-drop'
import { DragOverlay } from '~/components/ui/drag-overlay'
import { isMacOS } from '~/constants/os'
import { useMagnetClipboardOnFocus } from '~/hooks/use-magnet-clipboard-on-focus'
import {
  useDetailPanelVisibleValue,
  useDetailPanelWidthValue,
  useSetDetailPanelWidth,
} from '~/modules/detail/atoms'
import {
  HotkeyScope,
  ScopeActivationStrategy,
  useFocusScope,
} from '~/modules/hotkey'
import { ResizableLayout } from '~/modules/layout'
import {
  usePrefetchTorrents,
  usePrefetchTransferInfo,
} from '~/modules/torrent/hooks/use-prefetch-data'
import { TorrentTableList } from '~/modules/torrent/TorrentTableList'
import { TorrentTableToolbar } from '~/modules/torrent/TorrentTableToolbar'

import { DetailPanelFixed } from '../../../detail/DetailPanel'
import { DetailPanelContent } from '../../../detail/DetailPanelContent'
import { useRegisterAppBridgeEvents } from '../hooks/use-register-app-bridge-events'
import { useRegisterAppHotkeys } from '../hooks/use-register-app-hotkeys'
import { Header } from './Header'
import type { ResizablePanelConfig } from './ResizableLayout'

const PrefetchTorrents = () => {
  usePrefetchTorrents()
  usePrefetchTransferInfo()
  return null
}

const MainContent = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <TorrentTableToolbar />

      {/* Table */}
      <TorrentTableList />
    </div>
  )
}

export const Layout = () => {
  const dragDropState = useAtomValue(dragDropStateAtom)
  useMagnetClipboardOnFocus()

  // Calculate header height based on platform
  const isMacOSElectron = ELECTRON && isMacOS
  const headerHeightClass = isMacOSElectron ? 'pt-20' : 'pt-[60px]'

  // Setup app-level focus scope
  const [appScopeRef] = useFocusScope<HTMLDivElement>(HotkeyScope.APP, {
    strategy: ScopeActivationStrategy.UNION,
    parentScope: HotkeyScope.GLOBAL,
    priority: 10,
    autoActivate: true,
  })

  // Global registrations
  useRegisterAppHotkeys()
  useRegisterAppBridgeEvents()

  const detailPanelVisible = useDetailPanelVisibleValue()
  const detailPanelWidth = useDetailPanelWidthValue()
  const setDetailPanelWidth = useSetDetailPanelWidth()

  const showDetailInLayout = detailPanelVisible

  const resizablePanel = React.useMemo<ResizablePanelConfig | undefined>(() => {
    if (!showDetailInLayout) { return }

    return {
      isVisible: true,
      width: detailPanelWidth,
      minWidth: 280,
      maxWidth: 800,
      onResize: (nextWidth: number) => {
        setDetailPanelWidth(nextWidth)
      },
      onResizeEnd: (nextWidth: number) => {
        setDetailPanelWidth(nextWidth)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('resize'))
        }
      },
      render: ({ width }) => (
        <React.Suspense>
          <DetailPanelFixed
            className="h-full overflow-y-auto"
            style={{ width }}
          >
            <DetailPanelContent />
          </DetailPanelFixed>
        </React.Suspense>
      ),
    }
  }, [detailPanelWidth, setDetailPanelWidth, showDetailInLayout])

  return (
    <div ref={appScopeRef} className="h-screen flex flex-col text-text">
      <PrefetchTorrents />
      {/* Fixed Header */}
      {ELECTRON && <div className="fixed top-0 inset-x-0 h-10 drag-region" />}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Main content with proper top offset */}
      <ResizableLayout
        className={headerHeightClass}
        mainContent={<MainContent />}
        resizablePanel={resizablePanel}
      />

      <DragOverlay
        isVisible={dragDropState.isDragging && dragDropState.hasValidFiles}
        isDragOver={dragDropState.isDragOver}
      />
    </div>
  )
}
