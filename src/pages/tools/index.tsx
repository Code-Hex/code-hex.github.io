import Link from "next/link";
import { ToolsContentLayout } from "~/components/tools/tools";

const IndexPage = () => {
  return (
    <ToolsContentLayout
      title="Serverless Tools"
      subTitle="An online web tools but they are `server-independent`"
    >
      <p className="leading-6 mt-4">
        Sensitive information can be{" "}
        <span className="font-bold underline decoration-pink-500 underline-offset-2 decoration-2">
          safely used as parameters
        </span>. Because all the tools provided on this site are{" "}
        <span className="font-bold underline decoration-pink-500 underline-offset-2 decoration-2">
          processed only on your browser
        </span>.
      </p>
      <p className="mt-4">
        They are intended for software developers, web coders, and admins.
      </p>
      <h3 className="font-bold text-xl py-4">
        List of currently available tools
      </h3>
      <ul className="list-disc ml-6">
        {[
          {
            title: "Base64 encoder & decoder",
            href: "/base64/",
          },
          {
            title: "Private Key & Public Key Generator",
            href: "/keypair-generator/",
          },
        ].map((v) => (
          <li key={v.title} className="underline">
            <Link href={`/tools${v.href}`}>{v.title}</Link>
          </li>
        ))}
      </ul>
    </ToolsContentLayout>
  );
};

export default IndexPage;
