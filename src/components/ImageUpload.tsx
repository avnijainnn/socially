"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  endpoint: "postImage";
  value: string;
  onChange: (url?: string) => void;
}

export default function ImageUpload({
  endpoint,
  value,
  onChange
}: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative h-48 mt-4">
        <Image
          src={value}
          alt="Upload"
          className="rounded-md object-cover"
          layout="fill"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0) {
          onChange(res[0].url);
        } else {
          console.error("Upload failed: No response from server");
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
      }}
    />
  );
}
