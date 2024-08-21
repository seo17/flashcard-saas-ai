"use client";
import React from "react";
import toast from "react-hot-toast";

function PriceCard({ name, price, features, forWho, link }) {
  return (
    <div className=" h-[521px] flex flex-col justify-between gap-3 border border-black rounded-lg p-5 ">
      <div>
        <div className="flex flex-col gap-4">
          <p className="text-sm">{name}</p>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-4xl">
              {price}
              <span className="text-xs font-bold">/month</span>
            </p>
            <p className="text-sm">{forWho}</p>
          </div>
        </div>

        <hr className="h-px bg-black/70 border-0 w-full my-2 " />

        <div>
          <ul className="list-disc list-inside space-y-3">
            {features.map((item, idx) => (
              <li key={idx} className="text-base">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <button className="bg-black text-white p-2 rounded-lg text-base w-full">
          Coming Soon!
        </button>
      </div>
    </div>
  );
}

export default PriceCard;
