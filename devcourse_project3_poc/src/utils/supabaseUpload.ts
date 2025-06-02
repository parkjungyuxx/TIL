import { supabase } from "./supabaseClient";

export const uploadDrawing = async (userId: string, image: string) => {
  const { error } = await supabase.from("drawings").insert([
    {
      user_id: userId,
      image: image,
    },
  ]);

  if (error) {
    console.error("업로드 실패:", error.message);
  } else {
    console.log("이미지 업로드 성공");
  }
};
