export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

export interface RegistryPackage {
  name: string;
  "dist-tags": {
    latest: string;
    [tag: string]: string;
  };
  time: Record<string, string>;
  versions: Record<string, VersionData>;
  description?: string;
}

export interface VersionData {
  deprecated?: string;
  types?: string;
  typings?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface DownloadsResponse {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export interface DependencyHealth {
  name: string;
  installedVersion: string;
  latestVersion: string;
  score: number;
  breakdown: ScoreBreakdown;
  deprecated: boolean;
  deprecationMessage?: string;
  lastPublished: Date | null;
  versionsBehind: VersionDelta;
  hasTypes: boolean;
  weeklyDownloads: number;
  isDev: boolean;
}

export interface ScoreBreakdown {
  freshness: number;
  recency: number;
  deprecation: number;
  popularity: number;
  total: number;
}

export interface VersionDelta {
  major: number;
  minor: number;
  patch: number;
}

export interface AnalysisResult {
  packageName: string;
  packageVersion: string;
  analyzedAt: Date;
  dependencies: DependencyHealth[];
  overallScore: number;
  summary: {
    critical: number;
    warning: number;
    healthy: number;
    total: number;
  };
}

export type HealthCategory = "CRITICAL" | "WARNING" | "HEALTHY";
