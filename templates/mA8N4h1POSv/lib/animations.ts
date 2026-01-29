export type AnimationVariant = "down" | "up" | "left" | "right";

interface AnimationKeyframes {
  old: Keyframe[];
  new: Keyframe[];
}

interface AnimationConfig {
  duration: number;
  easing: string;
}

const DEFAULT_CONFIG: AnimationConfig = {
  duration: 800,
  easing: "cubic-bezier(0.87, 0, 0.13, 1)",
};

const FILTER_START = "brightness(1)";
const FILTER_END = "brightness(0.8)";

export const ANIMATION_VARIANTS: Record<AnimationVariant, AnimationKeyframes> =
  {
    down: {
      old: [
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          filter: FILTER_START,
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          filter: FILTER_END,
        },
      ],
      new: [
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
      ],
    },
    up: {
      old: [
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          filter: FILTER_START,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          filter: FILTER_END,
        },
      ],
      new: [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
      ],
    },
    left: {
      old: [
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          filter: FILTER_START,
        },
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          filter: FILTER_END,
        },
      ],
      new: [
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
      ],
    },
    right: {
      old: [
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          filter: FILTER_START,
        },
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          filter: FILTER_END,
        },
      ],
      new: [
        {
          clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
      ],
    },
  };

export function createViewTransition(
  variant: AnimationVariant,
  config: Partial<AnimationConfig> = {}
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const { old, new: newAnim } = ANIMATION_VARIANTS[variant];

  // Main clip path animations (synced timing)
  document.documentElement.animate(old, {
    duration: finalConfig.duration,
    easing: finalConfig.easing,
    pseudoElement: "::view-transition-old(root)",
  });

  document.documentElement.animate(newAnim, {
    duration: finalConfig.duration,
    easing: finalConfig.easing,
    pseudoElement: "::view-transition-new(root)",
  });
}
