/* eslint-disable @typescript-eslint/no-explicit-any */
export type routerConfig = {
  path: string;
  layoutName?: string;
  elePath?: string;
  children?: routerConfig[] | undefined;
  name?: string;
  icon?: any;
  hide?: boolean;
};
