/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

export default function useIsMobile() {
  if (!(typeof window != "undefined" && window.document)) return;
  const getIsMobile = () => window.innerWidth <= 768;
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return isMobile;
}
