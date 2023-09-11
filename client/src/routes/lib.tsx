import { lazy, ReactNode, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import Loading from "@/components/Loading";
import { routerConfig } from "./types";
// 实现懒加载的用Suspense包裹 定义函数
const suspenseLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

// 处理路由信息，返回路有对象
export const transfer2Routes = (
  cfgs: routerConfig[],
  walk: RouteObject[] = []
) => {
  // console.log(cfgs);
  for (let i = 0; i < cfgs.length; i++) {
    const { path, elePath, children } = cfgs[i];
    const Element = elePath
      ? lazy(() => import(/* @vite-ignore */ elePath?.replace("@", "..")))
      : () => <></>;
    const element = elePath ? suspenseLoad(<Element />) : null;

    const item: RouteObject = {
      path,
      element,
    };
    if (Array.isArray(children)) {
      item.children = transfer2Routes(children);
    }

    walk.push(item);
  }
  return walk;
};
