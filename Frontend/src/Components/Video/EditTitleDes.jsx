import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditTitleDes() {
  const { VideoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Define the update handler outside of useEffect
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `/videos/update/c/${VideoId}`,
        {
           title : title,
           description: description
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Video updated successfully:", response.data);
    } catch (error) {
      console.log(error, "Error while editing video details");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new title"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter new description"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          rows="3"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded"
      >
        Update
      </button>
    </div>
  );
}

export default EditTitleDes;
