"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageChange?: (file: File) => void;
}

export function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (onImageChange) {
      onImageChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div
      className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="image-upload"
        className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
      >
        {previewUrl ? (
          <div className="w-full h-full relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
              <p className="text-white text-sm">Change Image</p>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-full bg-gray-100 p-2 mb-2">
              <Upload className="w-5 h-5 text-gray-500" />
            </div>
            <p className="text-sm text-gray-500">
              Upload or Drag & Drop an image
            </p>
          </>
        )}
      </label>
    </div>
  );
}
