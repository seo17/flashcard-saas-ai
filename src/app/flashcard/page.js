"use client";
import { useAuth } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import db from "../firebase";

import ReactCardFlip from "react-card-flip";
import FlashCard from "@/components/FlashCard";

function FlashCardPage() {
  const { userId } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const handleFlip = () => {
    setIsFlipped((prevState) => !prevState);
  };

  const handleNextQuestionChange = () => {
    setIndex((prevState) => (prevState += 1));
  };

  const handlePreviousQuestionChange = () => {
    setIndex((prevState) => (prevState -= 1));
  };

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !userId) return;

      try {
        // Reference to the specific flashcard set document under the user
        const docRef = doc(
          collection(db, "users", userId, "flashCardCollection"),
          search
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setFlashcards(data.flashcards); // Assuming flashcards is stored in "flashcards" field
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error retrieving flashcards:", error);
      }
    }

    getFlashcard();
  }, [search, userId]);

  console.log("Flashcard state obj", flashcards[index]);

  return (
    <div className="px-12 py-8 w-full flex flex-row justify-center items-center ">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <FlashCard
          position={"front"}
          content={flashcards[index]?.front}
          otherClassName={"bg-[#FFE0D3]"}
          onClick={handleFlip}
          questionNo={index + 1}
          nextQuestionChange={handleNextQuestionChange}
          previousQuestionChange={handlePreviousQuestionChange}
          questionAmount={flashcards.length}
        />

        <FlashCard
          position={"back"}
          content={flashcards[index]?.back}
          otherClassName={"bg-green-100/60"}
          onClick={handleFlip}
          questionNo={index + 1}
          nextQuestionChange={handleNextQuestionChange}
          previousQuestionChange={handlePreviousQuestionChange}
          questionAmount={flashcards.length}
        />
      </ReactCardFlip>
    </div>
  );
}

export default FlashCardPage;
