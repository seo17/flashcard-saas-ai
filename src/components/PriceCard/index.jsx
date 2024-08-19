"use client";
import React from "react";
import toast from "react-hot-toast";

function PriceCard({ name, price, features, forWho, link }) {
  return (
    <div className="w-full flex flex-col gap-3 border border-black rounded-lg p-5 ">
      <div className="flex flex-row justify-between items-center">
        <p className="font-bold text-xl">{name}</p>
        <p className=" text-xl">
          {price}
          <span className="text-xs font-bold">/month</span>
        </p>
      </div>

      <div>
        <ul className="list-disc list-inside">
          {features.map((item, idx) => (
            <li key={idx} className="text-base">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <p className="italic text-sm">{forWho}</p>
        <button className="bg-black text-white p-2 rounded-lg text-base">
          Coming Soon!
        </button>
      </div>
    </div>
  );
}

export default PriceCard;
