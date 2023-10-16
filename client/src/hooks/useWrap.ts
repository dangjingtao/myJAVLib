import { useState, useEffect } from "react";
const useWrap = ({ el = document.querySelector(".semi-layout-content") }) => {
  const [wrap, setWrap] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const onResize = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrapDom: Element | any = el;
      const h = wrapDom?.offsetHeight || 0;

      const w = wrapDom?.offsetWidth;
      setWrap({ height: h, width: w - 40 });
    };
    onResize();
    const onMyResize = () => window.setTimeout(onResize, 200);
    window.addEventListener("resize", onResize);
    window.addEventListener("my_resize", onMyResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("my_resize", onMyResize);
    };
  }, [el]);

  return [wrap, setWrap];
};

export default useWrap;
