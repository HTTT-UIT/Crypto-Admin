import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Label from "../Label";
import { formats, modules } from "./data";
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}
const RichInput: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <div style={{ minHeight: "400px" }}>
      <Label text="Blog content" requiredMark />
      <ReactQuill
        theme="snow"
        onChange={onChange}
        value={value}
        modules={modules}
        formats={formats}
        placeholder={"Write blog content"}
        className="bg-white"
        style={{ height: "320px" }}
      />
      {/* Use this when display html */}
      {/* <ReactQuill value={body} readOnly={true} theme={'bubble'} /> */}
    </div>
  );
};

export default RichInput;
