export type Record = {
  id: string | number;
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
  //   cn?: string;
  //   code?: string;
  //   jp?: string;
  //   en?: string;
  //   zh_tw?: string;
  //   color?: string;
  //   classType?: "censored" | "uncensored";
  //   class?: string;
  //   note?: string;
  //   no_active: boolean;
};

export type Cover = {
  width?: number;
  height?: number;
};

export type Tag = {
  id: string | number;
  cover: string;
  cn?: string;
  code?: string;
  jp?: string;
  en?: string;
  zh_tw?: string;
  color?: string;
  classType?: "censored" | "uncensored";
  class?: string;
  note?: string;
  no_active: boolean;
};

export type ShowTag = {
  name: string;
  value: string;
};
