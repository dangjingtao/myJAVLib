export type Row = {
  id: string | number;
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
