import React from "react";
import step1 from "../assets/step1.svg";
import step2 from "../assets/step2.svg";
import step3 from "../assets/step3.svg";
import step4 from "../assets/step4.svg";

// A component for rendering each step
const Step = ({ image, altText, description }) => (
  <div>
    <img src={image} alt={altText} width={80} />
    <p>{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <div>
      <h1 className="text-gradient mt-8 fs-4 mb-0">So, how does it work?</h1>
      <p className="mt-0 text-light">
        It takes 4 simple steps to start minting your NFT:
      </p>

      <div className="steps mt-4">
        {/* Render the four steps using the Step component */}
        <Step
          image={step1}
          altText="Step 1"
          description="Click on the 'Mint NFT' button below to start the process. Please note that the only supported network is ETH."
        />
        <Step
          image={step2}
          altText="Step 2"
          description="Confirm the details for your NFT, such as its price. Initiate the minting process by submitting the information once you're satisfied with the details."
        />
        <Step
          image={step3}
          altText="Step 3"
          description="The website sends the transaction to the selected network for validation and inclusion in the blockchain after the user signs it."
        />
        <Step
          image={step4}
          altText="Step 4"
          description="The website displays a confirmation message that the NFT has been successfully minted and provides information about the new NFT being minted."
        />
      </div>
    </div>
  );
};

export default HowItWorks;
