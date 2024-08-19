import React from "react";
import PriceCard from "../PriceCard";
import { plans } from "@/lib";

function Pricing() {
  return (
    <section id="pricing">
      <div className="flex flex-col px-12 items-center gap-10 justify-center text-black pt-10 ">
        {plans.map((item) => (
          <PriceCard
            key={item.name}
            name={item.name}
            price={item.price}
            features={item.features}
            forWho={item.forWho}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
}

export default Pricing;
