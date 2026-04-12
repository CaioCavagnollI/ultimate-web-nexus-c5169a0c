/**
 * Feature flags for the Nexus platform.
 * Adapted from V700 enterprise bundle — centralized feature toggles.
 * These flags control UI visibility; actual access is enforced server-side via entitlements.
 */
export const features = {
  // Core modules
  store: true,
  atlasChat: true,
  atlasMentor: true,
  atlasExplain: true,
  atlasResearch: true,
  atlasPrescription: true,
  atlasAnalyzer: true,
  atlasEditorial: true,

  // Tools
  scanner: true,
  nexusLab: true,
  performance: true,
  uploads: true,
  library: true,

  // Admin
  admin: true,

  // Disabled / future
  community: false,
  forum: false,
  affiliates: false,
  wearableSync: false,
} as const;

export type FeatureKey = keyof typeof features;

export function isFeatureEnabled(key: FeatureKey): boolean {
  return features[key] === true;
}
