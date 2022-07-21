import dynamic from "next/dynamic";
import {
  Dispatch,
  FC,
  ReactChild,
  SetStateAction,
  Suspense,
  useState,
} from "react";
import { SuspenseReader, useSuspense } from "src/hooks/suspense";
import {
  ToolsCard,
  ToolsContentLayout,
  ToolsLabel,
  ToolsList,
  ToolsRadioGroup,
  ToolsRadioGroupItem,
  ToolsTextArea,
  ToolsTextAreaPulseAnimation,
} from "~/components/tools/tools";
import { encodeBase64 } from "~/lib/base64";

interface GenerateKeyMode {
  id: string;
  title: string;
  description: ReactChild;
}

const generateECKeyPair = async (
  params: EcKeyGenParams,
) => {
  return await crypto.subtle.generateKey(
    params,
    true,
    params.name === "ECDSA" ? ["sign", "verify"] : ["deriveKey", "deriveBits"],
  );
};

// https://developer.mozilla.org/en-US/docs/Web/API/RsaHashedKeyGenParams#properties
const generateRSAKeyPair = async (
  params: Omit<RsaHashedKeyGenParams, "publicExponent" | "modulusLength">,
) => {
  return await crypto.subtle.generateKey(
    {
      // Some organizations are now recommending that it should be 4096.
      modulusLength: 4096,
      // The public exponent. Unless you have a good reason to use something else, specify 65537.
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      ...params,
    },
    true,
    params.name === "RSA-OAEP" ? ["encrypt", "decrypt", "wrapKey", "unwrapKey"] : ["sign", "verify"],
  );
};

const exportKeyPair = async (
  format: "jwk" | "pem",
  key: CryptoKey,
  isPrivate: boolean,
): Promise<string> => {
  if (format === "jwk") {
    const exported = await crypto.subtle.exportKey(format, key);
    return JSON.stringify(exported);
  }
  // pem
  const exported = await crypto.subtle.exportKey(
    isPrivate ? "pkcs8" : "spki",
    key,
  );
  const b64 = encodeBase64(exported).match(/.{1,64}/g)?.join("\n");
  const msg = isPrivate ? "PRIVATE KEY" : "PUBLIC KEY";
  return `-----BEGIN ${msg}-----\n${b64}\n-----END ${msg}-----`;
};

const generateKeyMode: GenerateKeyMode[] = [
  {
    id: "RSA-based",
    title: "RSA",
    description: (
      <>
        Generating any RSA-based key pair: that is, when the algorithm is
        identified as any of{" "}
        <a
          className="underline"
          href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#rsassa-pkcs1-v1_5"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSASSA-PKCS1-v1_5
        </a>,{" "}
        <a
          className="underline"
          href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#rsa-pss"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSA-PSS
        </a>, or{" "}
        <a
          className="underline"
          href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#rsa-oaep"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSA-OAEP
        </a>.
      </>
    ),
  },
  {
    id: "elliptic-curve-based",
    title: "Elliptic-curve",
    description: (
      <>
        Generating any elliptic-curve-based key pair: that is, when the
        algorithm is identified as either of{" "}
        <a
          className="underline"
          href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#ecdsa"
          target="_blank"
          rel="noopener noreferrer"
        >
          ECDSA
        </a>{" "}
        or{" "}
        <a
          className="underline"
          href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#ecdh"
          target="_blank"
          rel="noopener noreferrer"
        >
          ECDH
        </a>.
      </>
    ),
  },
];

const KeyGenerateModeList: FC<{
  selected: GenerateKeyMode;
  setSelected: Dispatch<SetStateAction<GenerateKeyMode>>;
}> = ({
  selected,
  setSelected,
}) => {
  return (
    <ToolsList
      list={generateKeyMode}
      selected={selected}
      setSelected={setSelected}
    />
  );
};

const RSAAlgorithms = ["RSASSA-PKCS1-v1_5", "RSA-PSS", "RSA-OAEP"].map((v) => ({
  label: v,
  value: v,
}));

const HashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"].map((v) => ({
  label: v,
  value: v,
}));

const EcAlgorithms = ["ECDSA", "ECDH"].map((v) => ({
  label: v,
  value: v,
}));

const EllipticCurves = ["P-256", "P-384", "P-521"].map((v) => ({
  label: v,
  value: v,
}));

interface ExportFormat extends ToolsRadioGroupItem {
  label: string;
  value: "pem" | "jwk";
}
const ExportFormats: ExportFormat[] = [
  {
    label: "PEM",
    value: "pem",
  },
  {
    label: "JSON Web Key",
    value: "jwk",
  },
];

interface KeyResultProps {
  keyPairExporter: SuspenseReader<{
    privateKey: string;
    publicKey: string;
  }>;
  exportFormat: ExportFormat;
}

const KeyResult: FC<KeyResultProps> = ({
  keyPairExporter,
  exportFormat,
}) => {
  const keyPair = keyPairExporter.read();
  const ext = exportFormat.value === "jwk" ? "json" : exportFormat.value;
  return (
    <div className="flex flex-col space-y-8 border-t py-4">
      <div className="flex flex-col space-y-2">
        <ToolsLabel label="Private Key" />
        <ToolsTextArea
          placeholder="Private Key goes here"
          value={keyPair.privateKey}
          saveAs={{
            filename: `private-key.${ext}`,
          }}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <ToolsLabel label="Public Key" />
        <ToolsTextArea
          placeholder="Public Key goes here"
          value={keyPair.publicKey}
          saveAs={{
            filename: `public-key.${ext}`,
          }}
          readOnly
        />
      </div>
    </div>
  );
};

const GenerateRSAKeyContent = () => {
  const [algorithm, setAlgorithm] = useState<ToolsRadioGroupItem>(
    RSAAlgorithms[0],
  );
  const [hashAlgorithm, setHashAlgorithm] = useState<ToolsRadioGroupItem>(
    HashAlgorithms[1],
  );

  const [exportFormat, setExportFormat] = useState<ExportFormat>(
    ExportFormats[0],
  );

  const keyPairReader = useSuspense(generateRSAKeyPair({
    name: algorithm.value,
    hash: hashAlgorithm.value,
  }));

  return (
    <div className="flex flex-col space-y-6">
      <ToolsRadioGroup
        title="Algorithm"
        items={RSAAlgorithms}
        selected={algorithm}
        setSelected={setAlgorithm}
      />

      <ToolsRadioGroup
        title="Hash Algorithm"
        items={HashAlgorithms}
        selected={hashAlgorithm}
        setSelected={setHashAlgorithm}
      />

      <ToolsRadioGroup
        title="Export Format"
        items={ExportFormats}
        selected={exportFormat}
        setSelected={setExportFormat}
      />

      <Suspense fallback={<LoadingKeyResult />}>
        <ExportKeyResult
          keyPairReader={keyPairReader}
          exportFormat={exportFormat}
        />
      </Suspense>
    </div>
  );
};

interface ExportKeyResultProps {
  keyPairReader: SuspenseReader<CryptoKeyPair>;
  exportFormat: ExportFormat;
}

const _ExportKeyResult: FC<ExportKeyResultProps> = (
  { keyPairReader, exportFormat },
) => {
  const keyPair = keyPairReader.read();
  const _keyPairExporter = Promise.all([
    exportKeyPair(
      exportFormat.value,
      keyPair.privateKey,
      true,
    ),
    exportKeyPair(
      exportFormat.value,
      keyPair.publicKey,
      false,
    ),
  ]).then(([privateKey, publicKey]) => ({
    privateKey,
    publicKey,
  }));
  const keyPairExporter = useSuspense(_keyPairExporter);

  return (
    <Suspense fallback={<LoadingKeyResult />}>
      <KeyResult
        keyPairExporter={keyPairExporter}
        exportFormat={exportFormat}
      />
    </Suspense>
  );
};

const ExportKeyResult = dynamic(() => Promise.resolve(_ExportKeyResult), {
  ssr: false,
});

const LoadingKeyResult = () => {
  return (
    <div className="flex flex-col space-y-8 border-t py-4">
      <div className="flex flex-col space-y-2">
        <ToolsLabel label="Private Key" />
        <ToolsTextAreaPulseAnimation />
      </div>
      <div className="flex flex-col space-y-2">
        <ToolsLabel label="Public Key" />
        <ToolsTextAreaPulseAnimation />
      </div>
    </div>
  );
};

const GenerateEcKeyContent = () => {
  const [algorithm, setAlgorithm] = useState<ToolsRadioGroupItem>(
    EcAlgorithms[0],
  );
  const [ellipticCurve, setEllipticCurve] = useState<ToolsRadioGroupItem>(
    EllipticCurves[0],
  );
  const [exportFormat, setExportFormat] = useState<ExportFormat>(
    ExportFormats[0],
  );

  const keyPairReader = useSuspense(generateECKeyPair({
    name: algorithm.value,
    namedCurve: ellipticCurve.value,
  }));

  return (
    <div className="flex flex-col space-y-6">
      <ToolsRadioGroup
        title="Algorithm"
        items={EcAlgorithms}
        selected={algorithm}
        setSelected={setAlgorithm}
      />

      <ToolsRadioGroup
        title="Elliptic Curve"
        items={EllipticCurves}
        selected={ellipticCurve}
        setSelected={setEllipticCurve}
      />

      <ToolsRadioGroup
        title="Export Format"
        items={ExportFormats}
        selected={exportFormat}
        setSelected={setExportFormat}
      />

      <Suspense fallback={<LoadingKeyResult />}>
        <ExportKeyResult
          keyPairReader={keyPairReader}
          exportFormat={exportFormat}
        />
      </Suspense>
    </div>
  );
};

const GenerateKeyContent: FC<{ mode: GenerateKeyMode }> = ({ mode }) => {
  return (
    <div key={mode.id} className="flex flex-col space-y-4">
      <div>{mode.description}</div>
      {mode.id === "RSA-based" && <GenerateRSAKeyContent />}
      {mode.id === "elliptic-curve-based" && <GenerateEcKeyContent />}
    </div>
  );
};

const GenerateKeyPage = () => {
  const [selected, setSelected] = useState(generateKeyMode[0]);
  return (
    <ToolsContentLayout
      title={"Private Key & Public Key Generator"}
      subTitle={"A tool to generate public key and private key pair. Supported Elliptic-curve-based algorithm and RSA-based algorithm."}
    >
      <ToolsCard>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-end">
            <KeyGenerateModeList
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          {/* https://beta.reactjs.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes */}
          <GenerateKeyContent key={selected.id} mode={selected} />
        </div>
      </ToolsCard>
    </ToolsContentLayout>
  );
};

export default GenerateKeyPage;
