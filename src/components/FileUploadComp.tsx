"use client";

import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";

const FileUploadComp = ({ profile, setProfile }: any) => {
  const [draggable, setDraggable] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDraggable(true);
  };

  const handleDragLeave = () => {
    setDraggable(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();

    const uploadedFile = e.dataTransfer.files[0];

    if (validateFile(uploadedFile)) {
      setProfile(uploadedFile);
    }
  };

  const validateFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 10 * 1024 * 1024; //Max 10 mb

    if (!allowedTypes.includes(file.type)) {
      toast.error("Not a valid type");
      return false;
    }
    if (file.size > maxSize) {
      toast.error("Ma size limit x 10 MB");
      return false;
    }

    return true;
  };

  return (
    <>
      <div
        className="border-2 border-dashed border-blue-400 px-3 py-3 max-w-[400px] min-w-[220px]"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <div className="flex justify-center items-center mb-6">
          <FaFileUpload size={30} />
        </div>

        <div className="">
          <input
            type="file"
            className="hidden"
            id="fileinput"
            accept="image/jpeg, image/png"
            onChange={(e: any) => setProfile(e.target.files[0])}
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <p
            className="text-indigo-500 font-semibold cursor-pointer"
            onClick={() => document.getElementById("fileinput")?.click()}>
            Click here to upload
          </p>
          <p className="font-semibold text-gray-400">Or</p>
          <p className="text-gray-800 font-semibold">drag and drop</p>
        </div>
        <div className="text-gray-600 text-center">
          PNG or JPEG only (Max 25 MB)
        </div>

        {profile && (
          <div className="text-xs mt-3 max-w-fit truncate">
            <p>Uploaded: {profile.name}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploadComp;
