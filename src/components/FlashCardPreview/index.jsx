import React from "react";

function FlashCardPreview({ front, back }) {
  return (
    <div className="flex flex-col gap-3 border border-black rounded-lg p-5 bg-[#FFF]">
      <div>
        <p className="font-semibold">Front: {front}</p>
      </div>

      <div>
        <p className="text-base">Back: {back}</p>
      </div>
    </div>
  );
}

export default FlashCardPreview;
