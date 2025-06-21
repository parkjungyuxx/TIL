import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export function useRealtimeDrawing() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("realtime drawings")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "storage",
          table: "objects",
          filter: "bucket_id=eq.drawings",
        },
        async (payload) => {
          console.log(payload);

          const filePath = payload.new.name;
          const { data } = supabase.storage
            .from("drawings")
            .getPublicUrl(filePath);

          setImageUrls((prev) => [...prev, data.publicUrl]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return imageUrls;
}
