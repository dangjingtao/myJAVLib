import { useState, useEffect } from "react";

export default () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isCollapsed, setIsCollapsed] = useState<any>(false);

  const onResize = () => {
    setIsCollapsed(window.innerWidth < 1400);
  };
  useEffect(() => {
    setIsCollapsed(window.innerWidth < 1400);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return [isCollapsed, setIsCollapsed];
};
