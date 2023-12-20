export interface box {
  id: number;
  lenses: lense[];
}

export interface lense {
  label: string;
  box: number;
  focalLen?: number;
  dash?: boolean;
}
