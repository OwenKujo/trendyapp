import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    inputRef.current.click();
  };

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const [link, setLink] = useState(""); // Keep it as a string
  const [tags, setTags] = useState([]); // New state for tags
  const { addPin } = PinData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const addPinHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);
    formData.append("link", link);
    formData.append("tags", JSON.stringify(tags)); // Include tags

    try {
      const response = await addPin(formData);
      if (response && response._id) {
        navigate(`/pin/${response._id}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding pin:", error);
      navigate("/");
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]); // Use the previous state to avoid stale closure
    }
  };
  
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newTags = e.target.value.trim().split(" "); // Split by space
      newTags.forEach((tag) => addTag(tag)); // Add each tag
      e.target.value = ''; // Clear the input field after adding tags
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-80 h-auto p-6 bg-white rounded-lg shadow-lg">
            {filePrev && <img src={filePrev} alt="Preview" />}
            <div
              className="flex flex-col items-center justify-center h-full cursor-pointer"
              onClick={handleClick}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeFileHandler}
              />
              <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gray-200 rounded-full">
                <FaPlus />
              </div>
              <p className="text-gray-500">Choose a file</p>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              We recommend using high-quality .jpg files but less than 10MB
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center bg-gray-100">
            <form
              className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"
              onSubmit={addPinHandler}
            >
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="common-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pin"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="pin"
                  className="common-input"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700"
              >
                Link
              </label>
              <input
                type="url"
                id="pin"
                className="common-input"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Optional"
              />
            </div>
                <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags (Press Enter to add)
                </label>
                <input
                  type="text"
                  id="tags"
                  className="common-input"
                  onKeyPress={handleAddTag}
                  placeholder="Add a tag"
                />
                <div className="mt-2 flex flex-wrap">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-800 mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button className="common-btn">Add+</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
