import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
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

const UrlEncodeDecodeContent: FC<
  {
    mode: Mode;
    result: string;
    setResult: Dispatch<SetStateAction<string>>;
  }
> = ({ mode, result, setResult }) => {
  const [enter, setEnter] = useState(result);
  const run = useMemo(() => mode === "decode" ? decodeURI : encodeURI, [mode]);
  useEffect(() => setResult(run(enter)), [enter, setResult]);
  return (
    <div className="flex flex-col space-y-8 border-t py-4">
      <div className="flex flex-col space-y-2">
        <ToolsLabel label="Enter text" />
        <ToolsTextArea
          placeholder="Enter text"
          value={enter}
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
  const [result, setResult] = useState("");
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
          <UrlEncodeDecodeContent
            key={selected.value}
            mode={selected.value}
            result={result}
            setResult={setResult}
          />
        </div>
      </div>
    </ToolsContentLayout>
  );
};

export default UrlEncodeDecodePage;
