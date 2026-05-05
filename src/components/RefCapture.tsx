import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const RefCapture = () => {
  const [params] = useSearchParams();
  useEffect(() => {
    const ref = params.get("ref");
    if (!ref) return;
    localStorage.setItem("ref_code", ref);
    // bump click counter (best-effort, ignore errors)
    supabase.rpc as any; // no-op typing
    supabase.from("affiliates").select("clicks,id").eq("code", ref).maybeSingle().then(({ data }) => {
      if (data) supabase.from("affiliates").update({ clicks: (data.clicks ?? 0) + 1 }).eq("id", data.id).then(() => {});
    });
  }, [params]);
  return null;
};
