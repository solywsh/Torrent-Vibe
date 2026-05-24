/**
 * Derives a stable, on-theme color for a tag / category chip from its name.
 *
 * Colors come from the pastel-palette named tokens (the same ones used by
 * `status.ts`), kept to the existing chip style — a 20%-opacity tinted
 * background with full-strength colored text, matching `bg-accent/20 text-accent`.
 *
 * Class strings are written out literally so Tailwind's JIT can see them.
 */

// Hand-picked so every entry sits on a clearly different oklch hue (≥15° apart,
// with chroma/lightness differences where hues are closest). This avoids
// near-identical pairs such as green(155°)/emerald(160°) reading as "the same
// color". Order is stable, so a given name always maps to the same color.
const TAG_COLOR_CLASSES = [
  'bg-red/20 text-red',
  'bg-green/20 text-green',
  'bg-blue/20 text-blue',
  'bg-amber/20 text-amber',
  'bg-purple/20 text-purple',
  'bg-teal/20 text-teal',
  'bg-orange/20 text-orange',
  'bg-indigo/20 text-indigo',
  'bg-lime/20 text-lime',
  'bg-pink/20 text-pink',
  'bg-sky/20 text-sky',
  'bg-brown/20 text-brown',
] as const

// FNV-1a + MurmurHash3 fmix32 finalizer: cheap and distributes short strings
// (e.g. 2-character CJK tag names) evenly across the palette buckets.
const hashString = (str: string): number => {
  let hash = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  hash ^= hash >>> 16
  hash = Math.imul(hash, 2246822507)
  hash ^= hash >>> 13
  hash = Math.imul(hash, 3266489909)
  hash ^= hash >>> 16
  return hash >>> 0
}

export const getTagColorClassName = (name: string): string =>
  TAG_COLOR_CLASSES[hashString(name) % TAG_COLOR_CLASSES.length]
