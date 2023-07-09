import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

function ImageUpload(props) {
  const FileUpload = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/notice/image/upload", formData).then((response) => {
      props.setImage(response.data.filePath);
    });
  };

  return (
    <div>
      <label>이미지 업로드</label>
      <Form.Control
        type="file"
        className="shadow-none"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
}

export default ImageUpload;
