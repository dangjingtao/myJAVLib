/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { Layout, Nav, Button, Avatar, Dropdown } from "@douyinfe/semi-ui";
import { IconGithubLogo, IconBell, IconHelpCircle } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import { routers, routerConfigs } from "../../routes";
// import _ from "lodash";
import useCollapsed from "./hooks/useCollapsed";
import Titlebar from "@/components/Titlebar";

const { Header, Footer, Sider, Content } = Layout;

const Auth = ({ children }) => {
  // check...
  const checked = localStorage.getItem("login");
  if (checked === "true") {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

const Base = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useCollapsed();

  const transferRoutes2Nav = (rs: any, ret: any[] = []) => {
    rs?.children?.forEach((x: any) => {
      const { icon: Icon, name, path, children } = x;
      const item: any = {
        itemKey: path,
        text: name,
        icon: Icon ? <Icon size="large" /> : null,
        onClick: () => {
          !Array.isArray(children) && navigate(x.path);
        },
        items: [],
      };

      if (Array.isArray(children)) {
        item.items = transferRoutes2Nav(x);
      }

      ret.push(item);
    });
    return ret;
  };

  useEffect(() => {
    const routes = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr: string[] = [];
    if (routes !== null) {
      routes.forEach((item) => {
        const path = item.route.path;
        if (path) {
          pathArr.push(path);
        }
      });
    }
    setOpenKeys(pathArr);
    setSelectedKeys(pathArr);
  }, [location.pathname]);

  useEffect(() => {
    const t_e = new Event("my_resize");
    window.dispatchEvent(t_e);
  }, [isCollapsed]);

  const onCollapseChange = (isCollapsed: boolean) => {
    setIsCollapsed(isCollapsed);
  };
  const onSelect = (data: any) => {
    setSelectedKeys([...data.selectedKeys]);
  };
  const onOpenChange = (data: any) => {
    setOpenKeys([...data.openKeys]);
  };

  const matchedRoutes: any = routerConfigs.find(
    (x: any) => x.layoutName === "admin"
  );
  const navs = transferRoutes2Nav(matchedRoutes);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Titlebar type="common" />
      <Layout
        style={{
          position: "fixed",
          width: "100%",
          top: "36px",
          bottom: 0,
          // height: "100%",
        }}
      >
        <Sider className="semi-always-dark">
          <Nav
            isCollapsed={isCollapsed}
            limitIndent={false}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            style={{ height: "100%" }}
            items={navs}
            onCollapseChange={onCollapseChange}
            onOpenChange={onOpenChange}
            onSelect={onSelect}
            header={{
              logo: <IconGithubLogo color="#fff" style={{ fontSize: 36 }} />,
              text: "MYJAVLIB",
            }}
            footer={{
              collapseButton: true,
            }}
          />
        </Sider>
        <Layout>
          <>
            {1 ? (
              <Header
                style={{
                  backgroundColor: "var(--semi-color-bg-1)",
                  position: "sticky",
                  top: "0px",
                  zIndex: 98,
                }}
              >
                <Nav
                  mode="horizontal"
                  footer={
                    <>
                      <Button
                        theme="borderless"
                        icon={<IconBell size="large" />}
                        style={{
                          color: "var(--semi-color-text-2)",
                          marginRight: "12px",
                        }}
                      />
                      <Button
                        theme="borderless"
                        icon={<IconHelpCircle size="large" />}
                        style={{
                          color: "var(--semi-color-text-2)",
                          marginRight: "12px",
                        }}
                      />
                      <Dropdown
                        render={
                          <Dropdown.Menu>
                            <Dropdown.Item>个人中心</Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                window.app?.logout();
                                localStorage.setItem("login", "false");
                                navigate("/login");
                              }}
                            >
                              退出
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        }
                      >
                        <Avatar color="purple" size="small">
                          TAO
                        </Avatar>
                      </Dropdown>
                    </>
                  }
                ></Nav>
              </Header>
            ) : null}
          </>
          <Content
            style={{
              padding: "24px",
              backgroundColor: "var(--semi-color-bg-0)",
              position: "relative",
              overflow: "auto",
            }}
          >
            <div
              style={{
                borderRadius: "10px",
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              color: "var(--semi-color-text-2)",
              backgroundColor: "rgba(var(--semi-grey-0), 1)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconGithubLogo size="large" style={{ marginRight: "8px" }} />
              <span>Copyright © 2023 dangjingtao All Rights Reserved. </span>
            </span>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

const Index = () => (
  <Auth>
    <Base />
  </Auth>
);

export default Index;
