export interface part {
  x: number;
  m: number;
  a: number;
  s: number;
  pos: string;
  accepted: boolean;
  rejected: boolean;
}

export interface workflow {
  name: string;
  rules: string[];
}

export interface rule {
  category?: string;
  sign?: string;
  num?: number;
  sendTo?: string;
  accepted?: boolean;
}
