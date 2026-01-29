export const KEYBOARD_COLORS = {
  // Top row - QWERTYUIOP
  Q: { color: "#E5E7EB", label: "Light Gray" },
  W: { color: "#FFFFFF", label: "White" },
  E: { color: "#10B981", label: "Emerald" },
  R: { color: "#EF4444", label: "Red" },
  T: { color: "#14B8A6", label: "Teal" },
  Y: { color: "#FACC15", label: "Yellow" },
  U: { color: "#3B82F6", label: "Ultramarine" },
  I: { color: "#6366F1", label: "Indigo" },
  O: { color: "#FB923C", label: "Orange" },
  P: { color: "#A78BFA", label: "Purple" },

  // Middle row - ASDFGHJKL
  A: { color: "#9CA3AF", label: "Gray" },
  S: { color: "#DC2626", label: "Scarlet" },
  D: { color: "#F97316", label: "Dark Orange" },
  F: { color: "#E879F9", label: "Fuchsia" },
  G: { color: "#22C55E", label: "Green" },
  H: { color: "#EC4899", label: "Hot Pink" },
  J: { color: "#16A34A", label: "Jade" },
  K: { color: "#F59E0B", label: "Khaki" },
  L: { color: "#A3E635", label: "Lime" },

  // Bottom row - ZXCVBNM
  Z: { color: "#000000", label: "Black" },
  X: { color: "#92400E", label: "Brown" },
  C: { color: "#06B6D4", label: "Cyan" },
  V: { color: "#8B5CF6", label: "Violet" },
  B: { color: "#60A5FA", label: "Blue" },
  N: { color: "#0F766E", label: "Navy" },
  M: { color: "#F472B6", label: "Magenta" },
} as const;


export const getColorByShortcut = (shortcut: string) => {
  return KEYBOARD_COLORS[shortcut.toUpperCase() as keyof typeof KEYBOARD_COLORS]
}

export const getAllColors = () => {
  return Object.entries(KEYBOARD_COLORS).map(([shortcut, { color, label }]) => ({
    shortcut,
    color,
    label
  }))
}

export const getKeyboardRows = () => {
  const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
  const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  
  return {
    topRow: topRow.map(key => ({ shortcut: key, ...KEYBOARD_COLORS[key as keyof typeof KEYBOARD_COLORS] })),
    middleRow: middleRow.map(key => ({ shortcut: key, ...KEYBOARD_COLORS[key as keyof typeof KEYBOARD_COLORS] })),
    bottomRow: bottomRow.map(key => ({ shortcut: key, ...KEYBOARD_COLORS[key as keyof typeof KEYBOARD_COLORS] }))
  }
}
