import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function MyComponent() {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline"],
      ],
    },
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      style={{ width: "1000px", height: "720px" }}
      modules={modules}
    />
  );
}
