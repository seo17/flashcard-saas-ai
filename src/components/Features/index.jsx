import { features } from "@/lib";
import React from "react";
import FeatureCard from "../FeatureCard";

function Features() {
  return (
    <section>
      <div className="w-full flex flex-row items-center justify-between gap-10 px-12 pb-[50px]">
        {features.map((item) => (
          <FeatureCard
            key={item.name}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;
