/* eslint-disable @typescript-eslint/no-explicit-any */
export type Record = {
  id?: string | number;
  name?: string;
  rate?: string | number;
  name_CN?: string | number;
  name_JP?: string | number;
  name_EN?: string | number;
  birth?: string;
  tall?: string | number;
  breast?: string | number;
  waist?: string | number;
  hip?: string | number;
  store?: string | any;
  cover?: string;
  tmp_store?: string;
  cup?: string;
  isRetierd?: number;
  tags?: string[];
  airav_tags?: string;
  description?: string;
  images?: string[];
  [key: string]: any;
};
