import { Heading1, Paragraph } from "../shared/Text";
import Image from "next/image";
import codeEditor from "@/src/assets/images/code-editor.png";

const Hero = () => {
  return (
    <section className="py-10 lg:min-h-150 lg:py-20">
      <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-10 lg:gap-20 ">
        <div className="space-y-6 max-w-md lg:max-w-1/2">
          <Heading1>
            I design and{" "}
            <span className="text-blue-500">build web interfaces</span> that
            feel effortless to use
          </Heading1>

          <Paragraph className="max-w-lg">
            I am a frontend developer helping businesses turn ideas into fast,
            reliable, and thoughtfully crafted websites.
          </Paragraph>

          <button className="py-2 border border-blue-600 dark:border-blue-400 rounded px-6">
            Contact me
          </button>
        </div>

        <div className="aspect-squar relative overflow-hidden w-full border-2 border-grey-700 rounded-xl">
          <Image
            src={codeEditor}
            className="w-full rounded-xl border-5"
            alt="me"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
