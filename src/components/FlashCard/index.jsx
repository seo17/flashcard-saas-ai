"use client";

import React from "react";
import { Button } from "../ui/button";

function FlashCard({
  position,
  content,
  otherClassName,
  onClick,
  questionNo,
  nextQuestionChange,
  previousQuestionChange,
  questionAmount,
}) {
  const key = position;

  return (
    <div
      className={`relative mx-auto flex flex-col justify-center items-center gap-5 w-[70vw] h-[75vh] rounded-3xl ${otherClassName}  shadow-xl shadow-black/40 p-3`}
    >
      <div className="flex flex-col justify-center items-center">
        <p className="font-semibold text-xl text-black text-center">
          {key === "front" ? `Question ${questionNo}` : "Answer"}
        </p>
        <p className="font-semibold text-3xl text-black text-center">
          {content}
        </p>
      </div>
      <Button onClick={onClick} className="bg-black">
        {key === "front" ? "View Answer" : "View Question"}
      </Button>

      {questionNo > 1 ? (
        <Button
          onClick={previousQuestionChange}
          className="absolute bottom-5 left-5"
        >
          Prev
        </Button>
      ) : null}
      {questionNo < questionAmount ? (
        <Button
          onClick={nextQuestionChange}
          className="absolute bottom-5 right-5"
        >
          Next
        </Button>
      ) : null}
    </div>
  );
}

export default FlashCard;
