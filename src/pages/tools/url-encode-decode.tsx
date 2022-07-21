import { FC, useCallback, useState } from "react";
import {
  ToolsContentLayout,
  ToolsLabel,
  ToolsRadioGroup,
  ToolsRadioGroupItem,
  ToolsTextArea,
} from "~/components/tools/tools";

type Mode = "encode" | "decode";

interface UrlEncodeDecodeMode extends ToolsRadioGroupItem {
  value: Mode;
}

const UrlEncodeDecodeMode: UrlEncodeDecodeMode[] = [
  {
    label: "URL Encode",
    value: "encode",
  },
  {
    label: "URL Decode",
    value: "decode",
  },
];

const UrlEncodeDecodeContent: FC<{ mode: Mode }> = ({ mode }) => {
  const [enter, setEnter] = useState("");
  const run = useCallback((text: string) => {
    if (mode === "decode") {
      return decodeURI(text);
    }
    return encodeURI(text);
  }, [mode]);
  const result = run(enter);
  return (
    <div className="flex flex-col space-y-8 border-t py-4">
      <div className="flex flex-col space-y-2">
        <ToolsLabel label="Enter text" />
        <ToolsTextArea
          placeholder="Enter text"
          onChange={(e) => setEnter(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <ToolsLabel label="Result" />
        <ToolsTextArea
          placeholder="Result goes here"
          value={result}
          readOnly
        />
      </div>
    </div>
  );
};

const UrlEncodeDecodePage = () => {
  const [selected, setSelected] = useState(UrlEncodeDecodeMode[0]);
  return (
    <ToolsContentLayout
      title={"URL encoder & decoder"}
      subTitle={"A tool for URL encoding text and vice versa"}
    >
      <div className="mt-4 p-4 bg-slate-800">
        <div className="flex flex-col space-y-4">
          <ToolsRadioGroup
            title="What do you want?"
            items={UrlEncodeDecodeMode}
            selected={selected}
            setSelected={setSelected}
          />
          <UrlEncodeDecodeContent mode={selected.value} />
        </div>
      </div>
    </ToolsContentLayout>
  );
};

export default UrlEncodeDecodePage;
