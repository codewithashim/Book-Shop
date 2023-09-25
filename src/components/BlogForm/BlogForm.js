import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function BlogForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImageAndGetUrl();
    if (imageUrl) {
      addData(imageUrl);
    } else {
      addData();
    }
  };

  const uploadImageAndGetUrl = async () => {
    if (!imageFile) return null;

    const date = Date.now();
    const storage = getStorage();
    const imageName = `images/${date}/${imageFile.name}`;
    const imageRef = ref(storage, imageName);

    try {
      await uploadBytes(imageRef, imageFile);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const addData = async (imageUrl) => {
    const date = Date.now();
    try {
      await addDoc(collection(db, "blogs"), {
        title: title,
        subtitle: subtitle,
        content: content,
        imageUrl: imageUrl ? imageUrl : "",
        date: date,
      });
      window.alert("Blog Added");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="form-container">
      <div>Add Blog</div>
      <form onSubmit={handleSubmit}>
        <label className="formlabel">
          Title:
          <input
            className="forminput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="formlabel">
          Subtitle:
          <input
            className="forminput"
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </label>
        <label className="formlabel">
          Image:
          <input
            className="forminput"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>
        <label className="formlabel">
          Content:
          <textarea
            className="forminput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button className="forminput" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
