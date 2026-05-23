import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '~/components/ui/button/Button'
import { cn } from '~/lib/cn'
import { useSetDetailPanelVisible } from '~/modules/detail/atoms'

import type { DetailPanelProps } from '../layout/types'

// Fixed variant: used inside the resizable layout
export const DetailPanelFixed = ({
  className,
  children,
  style,
}: DetailPanelProps & { style?: React.CSSProperties }) => {
  const setVisible = useSetDetailPanelVisible()
  const { t } = useTranslation()

  return (
    <aside
      className={cn(
        'bg-background border-border flex flex-col  container-type-[inline-size]',
        className,
      )}
      style={style}
    >
      <div className="flex items-center justify-between pl-4 border-b border-l border-border h-[51px]">
        <h2 className="font-medium text-text">{t('detail.title')}</h2>
        <div className="flex items-center pr-2">
          <Button
            variant="ghost"
            className="!p-2"
            onClick={() => setVisible(false)}
          >
            <i className="i-mingcute-close-line text-lg" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto border-l border-border">
        {children}
      </div>
    </aside>
  )
}
