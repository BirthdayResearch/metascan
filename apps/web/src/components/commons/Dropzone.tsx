import React from "react";
import Dropzone from "react-dropzone";
import { MdCheckCircle, MdClear } from "react-icons/md";

function FileRow({ name, onClear }: { name: string; onClear: () => void }) {
  return (
    <button
      type="button"
      aria-label="File drop zone"
      className="px-4 py-1 w-full bg-black-200 rounded-[10px] w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-row items-center space-x-2">
        <div>
          <MdCheckCircle size={24} className="text-green-800" />
        </div>
        <div className="flex-1 flex flex-col items-start">
          <div className="text-base font-semibold text-white-50 break-all">
            {name}
          </div>
          <div className="text-sm text-white-50">Files uploaded</div>
        </div>
        <button type="button" onClick={onClear} aria-label="clear">
          <MdClear size={24} className="text-white-50" />
        </button>
      </div>
    </button>
  );
}

export default function DropzoneComponent({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (file: File[]) => void;
}) {
  const onDrop = (value: File[]) => {
    setFiles([...files, ...value]);
  };
  const onClear = (index: number) => {
    setFiles(files.filter((_val, i) => i !== index));
  };
  const onAllClear = () => {
    setFiles([]);
  };
  return (
    <div>
      <div className="items-center border-[0.5px] border-white-900 rounded-[10px] border-dashed	py-6 overflow-auto">
        <Dropzone
          onDrop={onDrop}
          accept={{ "text/sol": [".sol"] }}
          maxFiles={10}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="flex flex-col items-center px-6 max-h-60"
            >
              <div className="space-y-2 w-full">
                {files?.map((file, index) => (
                  <FileRow
                    name={file.name}
                    key={file.name}
                    onClear={() => onClear(index)}
                  />
                ))}
              </div>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center w-full py-10">
                <button
                  type="button"
                  className="flex-1 border border-white-50 rounded-[50px] py-3 px-8 text-white-50"
                >
                  Upload files
                </button>
                <div className="my-4 text-white-50 -tracking-[0.032em]">or</div>
                <div className="text-base text-white-50 -tracking-[0.032em] text-center w-full">
                  drag and drop files here
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      </div>
      {files.length && (
        <div className="flex flex-row justify-between py-[18px] pl-6 pr-2">
          <div className="flex flex-row items-center space-x-2">
            <MdCheckCircle size={20} className="text-green-800" />
            <div className="text-sm text-white-50">
              {files.length} files uploaded
            </div>
          </div>
          <button
            type="button"
            onClick={onAllClear}
            className="text-lightBlue brand-gradient-1 active:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300 font-medium"
          >
            Clear uploads
          </button>
        </div>
      )}
    </div>
  );
}
