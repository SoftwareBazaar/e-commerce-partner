import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const RefCapture = () => {
  const [params] = useSearchParams();
  useEffect(() => {
    const ref = params.get("ref");
    if (ref) localStorage.setItem("ref_code", ref);
  }, [params]);
  return null;
};
