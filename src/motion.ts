import type { Variants, Transition } from 'framer-motion'

// ---------------------------------------------------------------------------
// Spring presets — physical, not tween-based
// ---------------------------------------------------------------------------

export const spring = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 } as const,
  smooth: { type: 'spring', stiffness: 200, damping: 25 } as const,
  gentle: { type: 'spring', stiffness: 80, damping: 20 } as const,
  entrance: { type: 'spring', stiffness: 120, damping: 20, mass: 0.8 } as const,
}

// ---------------------------------------------------------------------------
// Duration tokens (seconds)
// ---------------------------------------------------------------------------

export const duration = {
  fast: 0.15,
  base: 0.35,
  slow: 0.55,
} as const

// ---------------------------------------------------------------------------
// Entrance variant presets (with blur for premium reveal)
// ---------------------------------------------------------------------------

export const entrance = {
  fadeUp: {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
} satisfies Record<string, Variants>

// ---------------------------------------------------------------------------
// Stagger container helpers
// ---------------------------------------------------------------------------

export function staggerContainer(stagger = 0.1, delay = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
}

// ---------------------------------------------------------------------------
// Shared viewport config
// ---------------------------------------------------------------------------

export const viewportOnce = { once: true, amount: 0.15 } as const

// ---------------------------------------------------------------------------
// Shared transitions
// ---------------------------------------------------------------------------

export const defaultTransition: Transition = {
  ...spring.entrance,
}
