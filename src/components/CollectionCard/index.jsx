import Link from "next/link";
import React from "react";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";

function CollectionCard({ name, amount }) {
  return (
    <div className=" flex flex-col justify-between items-start w-full h-[150px] p-5 border border-black rounded-lg  bg-[#FFF]">
      <div className=" flex flex-col gap-3 ">
        <div>
          <Link
            href={`/flashcard?id=${name}`}
            className="font-semibold underline"
          >
            {name}
          </Link>
        </div>

        <div>
          <p className="text-base">{amount} flashcards</p>
        </div>
      </div>

      <div className="flex flex-row justify-end items-center gap-2 w-full">
        <button className="">
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
}

export default CollectionCard;
