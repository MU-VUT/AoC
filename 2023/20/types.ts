interface ModuleType {
  moduleType: string;
}

export interface Button extends ModuleType {
  numOfPress: number;
  maxNumOfPress: number;
}

export interface Broadcaster extends ModuleType {
  destModules: string[];
  sendPulse: { (lowPulse: boolean, destModules: string[]): Pulse[] };
}

export interface FF extends ModuleType {
  name: string;
  destModules: string[];
  state: boolean;
  FFMethod: {
    (lowPulse: boolean, destModules: string[], state: boolean): Pulse[];
  };
}

export interface Con extends ModuleType {
  name: string;
  destModules: string[];
  stateLowPulse: boolean;
  // ConMethod: () => {};
}

export interface Pulse {
  lowPulse: boolean;
  sendTo: string;
}
