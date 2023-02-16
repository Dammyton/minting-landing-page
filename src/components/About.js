import React from "react";
import Typewriter from "typewriter-effect";
import hero from "../assets/hero.svg";

const About = () => {
  // Define the typewriter strings
  const typewriterStrings = `Welcome to our platform, where you can easily mint your own NFT. NFTs
          are a revolutionary new way to own and trade digital assets, and we're
          excited to offer an easy-to-use interface for users to get started.`;

  return (
    <div className="wrapper mt-8">
      <div className="about">
        <h1 className="text-gradient fs-3 "> Mint Your Own NFT Today</h1>
        <Typewriter
          options={{
            // Pass the typewriter strings to Typewriter
            strings: [typewriterStrings],
            autoStart: true,
            loop: true,
            // Pause the typewriter indefinitely
            pauseFor: Number.POSITIVE_INFINITY,
            wrapperClassName: "content",
            cursorClassName: "content",
          }}
        />
      </div>
      <img src={hero} alt="hero" width="100%" />
    </div>
  );
};

export default About;
