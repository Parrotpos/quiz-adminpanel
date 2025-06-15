"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  value,
  onChange,
  label,
  error,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      if (value instanceof File) {
        setPreview(URL.createObjectURL(value));
      } else {
        setPreview(value);
      }
    }
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange?.(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreview(null);
    onChange?.(null);
  };

  return (
    <div className="">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div
        {...getRootProps()}
        className={`w-full h-30 border-1 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragActive
            ? "bg-blue-50 border-blue-300"
            : "border-gray-300 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={preview}
              alt="Uploaded"
              className="rounded-md !w-full !h-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow cursor-pointer"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ) : (
          <>
            <div className="bg-[#e5e9f3] p-3 rounded-4xl text-[#22489c]">
              <Upload />
            </div>
            <p className="text-sm mt-3 text-[#575757]">
              Upload or Drag & Drop an image
            </p>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ImageDropzone;
