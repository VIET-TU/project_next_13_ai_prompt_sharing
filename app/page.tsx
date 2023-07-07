import Feed from "@/components/Feed";
import Image from "next/image";

const Home = () => (
  <section className="flex flex-col items-center w-full">
    <h1 className="text-center head_text">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="text-center orange_gradient"> AI-Powered Prompts</span>
    </h1>
    <p className="text-center desc">
      Promptopia is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>
    <Feed></Feed>
  </section>
);

export default Home;
