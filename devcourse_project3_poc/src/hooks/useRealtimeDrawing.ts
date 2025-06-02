import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function useRealtimeDrawing() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchInitial = async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        const urls = data.map((item) => item.url);
        setImageUrls(urls);
      } else {
        console.error("초기 이미지 불러오기 실패:", error);
      }
    };

    fetchInitial();

    const channel = supabase
      .channel("images_realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "images",
        },
        (payload) => {
          console.log("새 이미지 업로드:", payload);
          const newUrl = payload.new.url;
          setImageUrls((prev) => [newUrl, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return imageUrls;
}
