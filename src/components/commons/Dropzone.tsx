import React from "react";
import Dropzone from "react-dropzone";

export default function DropzoneComponent({
  setFiles,
}: {
  files?: File[];
  setFiles: (file: File[]) => void;
}) {
  return (
    <div className="items-center border-[0.5px] border-white-900 rounded-[10px]">
      <Dropzone onDrop={setFiles} accept={{ "text/sol": [".sol"] }}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="h-40 flex items-center">
            <input {...getInputProps()} />
            <div className="text-base text-white-700 -tracking-[0.02em] text-center w-full">
              Drag &apos;n&apos; drop some files here, or click to select files
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
