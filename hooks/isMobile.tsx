import { useEffect, useState } from "react";

export const useIsMobileUa = () => {
  const [isMobileUa, setIsMobileUa] = useState<boolean>(false)
  return {
    isMobileUa, setIsMobileUa
  }
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Don't forget to remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const useIsMobile = () => {

  // todo useIsMobileUa并没有做

  const isSsrMobile = useIsMobileUa().isMobileUa
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 541;

  return isSsrMobile || isBrowserMobile;
};