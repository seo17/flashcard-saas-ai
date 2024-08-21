import React from "react";

function FeatureCard({ name, description }) {
  return (
    <div className="md:w-[35%] flex flex-col text-start">
      <p className="font-bold text-2xl">{name}</p>

      <p className="text-base">{description}</p>
    </div>
  );
}

export default FeatureCard;
