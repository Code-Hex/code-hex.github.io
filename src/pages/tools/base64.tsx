import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import {
  decodeBase64,
  decodeBase64Url,
  encodeBase64,
  encodeBase64Url,
} from "~/lib/base64";
import { utf8Decoder, utf8Encoder } from "~/lib/utf8";
import { Listbox } from "@headlessui/react";
import {
  CheckIcon,
  CloudUploadIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { useDropzone } from "react-dropzone";
import {
  ToolsContentLayout,
  ToolsTabs,
  ToolsTextArea,
} from "~/components/tools/tools";

interface Base64Mode {
  id: "encode" | "decode" | "url_encode" | "url_decode";
  title: string;
  description: string;
  run: (s: string | ArrayBuffer) => string;
}

const base64Mode: ReadonlyArray<Base64Mode> = [
  {
    id: "encode",
    title: "Base64 encode",
    description: "Encode a UTF-8 text to Base64 as you type or paste",
    run: (s) => {
      if (s instanceof ArrayBuffer) {
        return encodeBase64(s);
      }
      const binary = utf8Encoder.encode(s);
      return encodeBase64(binary);
    },
  },
  {
    id: "decode",
    title: "Base64 decode",
    description: "Decode a Base64 to UTF-8 text as you type or paste",
    run: (s) => {
      if (s instanceof ArrayBuffer) {
        throw new Error("unexpected array buffer in decode");
      }
      const decoded = decodeBase64(s);
      return utf8Decoder.decode(decoded);
    },
  },
  {
    id: "url_encode",
    title: "Base64 URL encode",
    description: "Encode a UTF-8 text to Base64 URL as you type or paste",
    run: (s) => {
      if (s instanceof ArrayBuffer) {
        return encodeBase64Url(s);
      }
      const binary = utf8Encoder.encode(s);
      return encodeBase64Url(binary);
    },
  },
  {
    id: "url_decode",
    title: "Base64 URL decode",
    description: "Decode a Base64 URL to UTF-8 text as you type or paste",
    run: (s) => {
      if (s instanceof ArrayBuffer) {
        throw new Error("unexpected array buffer in decode");
      }
      const decoded = decodeBase64Url(s);
      return utf8Decoder.decode(decoded);
    },
  },
];

const Base64ModeList: FC<{
  selected: Base64Mode;
  setSelected: Dispatch<SetStateAction<Base64Mode>>;
}> = ({
  selected,
  setSelected,
}) => {
  return (
    <div className="w-56">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-50 text-gray-900 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <span className="block truncate">{selected.title}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
            {base64Mode.map((mode) => (
              <Listbox.Option
                key={mode.id}
                value={mode}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                  }`}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {mode.title}
                    </span>
                    {selected
                      ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )
                      : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

interface EncodeBase64SourceProps {
  selected: Base64Mode;
  setSource: Dispatch<SetStateAction<string | ArrayBuffer>>;
}

const EncodeBase64TextSource: FC<EncodeBase64SourceProps> = (
  { selected, setSource },
) => {
  return (
    <ToolsTextArea
      label={selected.description}
      placeholder="Type (or paste) here..."
      onChange={(e) => setSource(e.target.value)}
    />
  );
};

const EncodeBase64UploadedSource: FC<EncodeBase64SourceProps> = (
  { setSource },
) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      throw new Error("accept only PNG, JPG or GIF images.");
    }
    acceptedFiles[0].arrayBuffer().then((buf) => setSource(buf));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    onError: (err: Error) => alert(err),
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center w-full"
    >
      <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col justify-center items-center pt-5 pb-6">
          <CloudUploadIcon className="w-10 h-10" />
          <p className="mb-2 text-sm">
            <span className="font-semibold">
              {isDragActive
                ? "Drop the files here ..."
                : "Click to upload or drag and drop"}
            </span>
          </p>
          <p className="text-xs">
            PNG, JPG or GIF
          </p>
        </div>
        <input {...getInputProps()} />
      </label>
    </div>
  );
};

const sourceCategories = [
  {
    id: "text",
    title: "UTF-8 Text",
    Content: EncodeBase64TextSource,
  },
  {
    id: "file",
    title: "File Upload",
    Content: EncodeBase64UploadedSource,
  },
];

const EncodeBase64SourceTabs: FC<EncodeBase64SourceProps> = (
  { selected, setSource },
) => {
  return (
    <ToolsTabs categories={sourceCategories}>
      {(category) => (
        <category.Content selected={selected} setSource={setSource} />
      )}
    </ToolsTabs>
  );
};

interface DecodeBase64DestProps {
  source: string | ArrayBuffer;
  run: (src: string | ArrayBuffer) => string;
}

const DecodeBase64DestText: FC<DecodeBase64DestProps> = ({ source, run }) => {
  return (
    <ToolsTextArea
      label={"Result"}
      placeholder={"Result goes here"}
      value={run(source)}
      readOnly
    />
  );
};

const DecodeBase64DestImage = (mime: string): FC<DecodeBase64DestProps> => {
  return function DecodeBase64DestImageComponent({ source }) {
    return (
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="message"
          className="text-md font-semibold"
        >
          Result
        </label>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="result is displayed as date uri"
            src={`data:${mime};base64,${source}`}
          />
        </div>
      </div>
    );
  };
};

const destCategories = [
  {
    id: "text",
    title: "UTF-8",
    Content: DecodeBase64DestText,
  },
  {
    id: "jpg",
    title: "JPG",
    Content: DecodeBase64DestImage("image/jpeg"),
  },
  {
    id: "png",
    title: "PNG",
    Content: DecodeBase64DestImage("image/png"),
  },
  {
    id: "gif",
    title: "GIF",
    Content: DecodeBase64DestImage("image/gif"),
  },
];

const DecodeBase64DestTabs: FC<DecodeBase64DestProps> = (
  { source, run },
) => {
  return (
    <ToolsTabs categories={destCategories}>
      {(category) => <category.Content source={source} run={run} />}
    </ToolsTabs>
  );
};

const Base64Content: FC<{
  selected: Base64Mode;
  run: (src: string | ArrayBuffer) => string;
}> = ({ selected, run }) => {
  const [source, setSource] = useState<string | ArrayBuffer>("");
  const isEncodeMode = selected.id.includes("encode");
  return (
    <>
      {isEncodeMode
        ? (
          <EncodeBase64SourceTabs
            selected={selected}
            setSource={setSource}
          />
        )
        : (
          <EncodeBase64TextSource
            selected={selected}
            setSource={setSource}
          />
        )}

      {isEncodeMode
        ? (
          <ToolsTextArea
            label={"Result"}
            placeholder={"Result goes here"}
            value={run(source)}
            readOnly
          />
        )
        : (
          <DecodeBase64DestTabs
            source={source}
            run={run}
          />
        )}
    </>
  );
};

const Base64Page = () => {
  const [selected, setSelected] = useState(base64Mode[0]);
  const run = useCallback((src: string | ArrayBuffer) => {
    try {
      return selected.run(src);
    } catch (err) {
      return `error has caught: ${err}`;
    }
  }, [selected]);
  return (
    <ToolsContentLayout
      title={"Base64 encoder & decoder"}
      subTitle={"A tool for encoding text or binary data like images to base64 and vice versa"}
    >
      <div className="mt-4 p-4 bg-slate-800">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-end">
            <Base64ModeList selected={selected} setSelected={setSelected} />
          </div>
          {/* https://beta.reactjs.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes */}
          <Base64Content key={selected.id} selected={selected} run={run} />
        </div>
      </div>
    </ToolsContentLayout>
  );
};

export default Base64Page;
