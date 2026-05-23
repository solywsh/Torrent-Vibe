import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { createAtomHooks } from '~/lib/jotai'

// Detail panel state
export const detailPanelVisibleAtom = atom<boolean>(false)
export const detailPanelWidthAtom = atomWithStorage<number>(
  'detailPanelWidth',
  520,
  undefined,
  { getOnInit: true },
)

// Create hooks for all atoms
export const [
  detailPanelVisibleAtomInternal,
  useDetailPanelVisible,
  useDetailPanelVisibleValue,
  useSetDetailPanelVisible,
] = createAtomHooks(detailPanelVisibleAtom)

export const [
  detailPanelWidthAtomInternal,
  useDetailPanelWidth,
  useDetailPanelWidthValue,
  useSetDetailPanelWidth,
] = createAtomHooks(detailPanelWidthAtom)
