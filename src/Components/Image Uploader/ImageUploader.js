import React, { useEffect, useState } from "react";
import Nav from "../Home/Nav/Nav";
import { data, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./photos.css";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  const submitImg = async (e) => {
    e.preventDefault();

    if (!image) {
      console.error("No image selected!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try{
      const result = await axios.post(
        "http://localhost:5000/uploadimg",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      getImg();
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const onImgChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getImg = async () => {
    try {
      const result = await axios.get("http://localhost:5000/getImage");
      setAllImage(result.data.data);
    } catch (e) {
      console.error("Error getting image", e);
    }
  };
  useEffect(() => {
    getImg();
  }, []);

  return (
    <div className="photos-container">
      <Nav />
      <h1 className="photos-title">Images</h1>
      <form onSubmit={submitImg} className="upload-form">
        <input
          type="file"
          accept="image/*"
          onChange={onImgChange}
          className="file-input"
        />
        <button type="submit" className="upload-btn">
          Upload
        </button>
      </form>

      <div className="image-gallery">
        {allImage === null ? (
          <p>No images uploaded yet.</p>
        ) : (
          allImage.map((data) => (
            <div key={data._id} className="image-item">
              <img
                src={`http://localhost:5000/files/${data.image}`}
                height={100}
                width={100}
                alt="Uploaded photo"
                className="image-thumbnail"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
