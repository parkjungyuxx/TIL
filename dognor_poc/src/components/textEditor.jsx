import React, { useRef, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // React Quill 기본 스타일 가져오기

const imageApi = async ({ img }) => {
  const formData = new FormData();
  formData.append("file", img);

  // 테스트용 임시 URL
  const response = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Image upload failed");

  const data = await response.json();
  console.log("Server Response:", data);
  return data;
};

export default function MyComponent() {
  const quillRef = useRef(null);
  const [html, setHtml] = useState("");

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        await imageApi({ img: file });
        const imgUrl = "https://via.placeholder.com/150"; // 테스트 이미지 URL
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", imgUrl);
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          ["image"],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "image",
  ];

  const quillStyle = {
    minHeight: "300px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "10px",
  };

  return (
    <ReactQuill
      ref={quillRef}
      value={html}
      onChange={setHtml}
      style={quillStyle} // 스타일 객체 적용
      modules={modules}
      formats={formats}
      placeholder="후원받고자 하는 동물의 자세한 정보를 입력해주세요!"
      theme="snow"
    />
  );
}
