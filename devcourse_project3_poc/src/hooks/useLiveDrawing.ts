import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export function useLiveDrawing() {
  const [incomingImage, setIncomingImage] = useState<string | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel("drawings-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "drawings",
        },
        (payload) => {
          const image = payload.new.image;
          setIncomingImage(image);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return incomingImage;
}
