/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

export interface SplitProps {
  /**
   * 最大的尺寸
   */
  maxSize?: number;
  /**
   * 最小的尺寸
   */
  minSize?: number;
  /**
   * 表示split的数量或主次
   */
  primary?: "first" | "second";
  /**
   * split的方向
   */
  split?: "vertical" | "horizontal";
  /**
   * pane的样式
   */
  paneStyle?: Record<string, any>;
  /**
   * 整体样式
   */
  style?: Record<string, any>;
  /**
   * 内部children属性
   */
  children?: ReactNode;

  onChange?: (n: number) => void;

  onToggleClick?: (isMin: boolean) => void;
}
