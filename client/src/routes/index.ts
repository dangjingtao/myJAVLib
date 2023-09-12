/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { RouteObject } from "react-router-dom";
import {
  IconHome,
  IconHistogram,
  IconUserSetting,
  IconBookmark,
  IconLive,
  IconSetting,
  IconGridSquare,
  IconUserCardVideo,
  IconDownload,
  IconBox,
  IconCustomize,
  IconPriceTag,
  IconGlobeStroke,
} from "@douyinfe/semi-icons";
import { routerConfig } from "./types";
import { transfer2Routes } from "./lib";

export const routerConfigs: routerConfig[] = [
  {
    path: "/",
    layoutName: "admin",
    elePath: "@/layouts/Admin",
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        path: "/home",
        name: "首页",
        icon: IconHome,
        elePath: "@/pages/Home",
      },
      {
        path: "/console",
        name: "控制台",
        icon: IconHistogram,
        elePath: "@/pages/Console",
      },
      {
        path: "/dataSet/toolbox",
        name: "本地高级搜索",
        icon: IconCustomize,
        elePath: "@/pages/SeniorSearch",
      },
      {
        path: "/dataSet",
        name: "数据维护",
        icon: IconGridSquare,
        children: [
          {
            path: "/dataSet/gather",
            name: "采集",
            icon: IconDownload,
            elePath: "@/pages/Gather",
          },
          {
            path: "/dataSet/tags",
            name: "标签",
            elePath: "@/pages/Tags",
            icon: IconPriceTag,
          },
          {
            path: "/dataSet/studios",
            name: "制作商",
            elePath: "@/pages/Studios",
            // elePath: "@/pages/Gather",
            icon: IconUserCardVideo,
          },
          {
            path: "/dataSet/labels",
            name: "发行商",
            elePath: "@/pages/Labels",
            icon: IconGlobeStroke,
          },
          {
            path: "/dataSet/director",
            name: "导演",
            elePath: "@/pages/Directors",
            icon: IconUserSetting,
          },
          {
            path: "/dataSet/series",
            name: "系列",
            elePath: "@/pages/Series",
            icon: IconBookmark,
          },
        ],
      },
      {
        path: "/setting",
        name: "设置",
        icon: IconSetting,
        elePath: "@/pages/Console",
      },
      {
        path: "/detail",
        name: "详情",
        hide: false,
        icon: IconUserCardVideo,
        elePath: "@/pages/Detail",
      },
      {
        path: "/toolbox",
        name: "实用工具箱",
        icon: IconBox,
        elePath: "@/pages/Profiles",
      },
    ],
  },
  {
    name: "登录",
    path: "/login",
    elePath: "@/pages/Login/",
  },
];

export const routers: RouteObject[] = transfer2Routes(routerConfigs);
