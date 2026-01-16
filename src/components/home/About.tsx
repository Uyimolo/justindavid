import React from "react";
import { Heading2, Paragraph } from "../shared/Text";

const About = () => {
  return (
    <section className="space-y-10">
      <blockquote className="text-center relative p-6 border rounded text-xl w-fit mx-auto">
        <span className="text-6xl absolute -top-2.5 left-1">"</span>I enjoy
        making complex things feel simple.
        <span className="text-6xl absolute -bottom-12 right-1">"</span>
      </blockquote>

      <Heading2>A little about me</Heading2>

      <Paragraph>
        I build web interfaces with
        React, Next.js, and Tailwind that are fast, intuitive, and reliable.
        <br /> I help startups and small businesses turn ideas into polished,
        scalable web experiences.<br /> I’m always looking for ways to make the web a
        little faster, a little smoother, and a lot more enjoyable.
      </Paragraph>
    </section>
  );
};

export default About;
