"use client";
import React, { useState } from "react";
import FlashCardPreview from "@/components/FlashCardPreview";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useAuth } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import db from "../firebase";

import { generate } from "@/actions";
import toast from "react-hot-toast";

function GenerateFlashCard() {
  const { userId } = useAuth();
  const [flashcards, setFlashcard] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [dialog, setDialog] = useState(false);

  const fetchFlashCards = async () => {
    const result = await generate(prompt);

    setFlashcard(result);

    setPrompt("");
  };

  const handleSaveCollection = async () => {
    if (!name.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), userId);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedCollection = [
          ...(userData.flashCardCollection || []),
          { name },
        ];
        batch.update(userDocRef, { flashCardCollection: updatedCollection });
      } else {
        batch.set(userDocRef, { flashCardCollection: [{ name }] });
      }

      const setDocRef = doc(
        collection(userDocRef, "flashCardCollection"),
        name
      );
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      setDialog(false);
      setName("");
      toast.success("Flashcards saved successfully!");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      toast.error(
        "An error occurred while saving flashcards. Please try again."
      );
    }
  };

  return (
    <main>
      <section>
        <div className="flex flex-col items-center justify-center px-12 gap-3 pb-10">
          <div className="w-full flex flex-col gap-3 justify-center items-center">
            <div className="h-[300px] w-[600px]">
              <textarea
                style={{ resize: "none" }}
                cols={30}
                rows={5}
                className="text-black w-full p-3 rounded-lg "
                type={"text"}
                placeholder={"Enter prompt on any subject"}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <button
                onClick={fetchFlashCards}
                className="bg-black text-white p-3 w-full rounded-lg font-semibold active:bg-[#1b1f24]"
              >
                Generate FlashCards
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 grid-flow-row">
            {flashcards.length > 0 &&
              flashcards.map((item, index) => (
                <FlashCardPreview
                  key={index}
                  front={item.front}
                  back={item.back}
                />
              ))}
          </div>

          {flashcards.length > 0 ? (
            <Dialog open={dialog} onOpenChange={setDialog}>
              <DialogTrigger>
                <button
                  onClick={() => setDialog(true)}
                  className="bg-black text-white p-3 w-fit rounded-lg font-semibold active:bg-[#1b1f24]"
                >
                  Create FlashCard Collection
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create FlashCard Collection</DialogTitle>
                  <DialogDescription>
                    Provide name for your flashcard collection
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input
                      id="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleSaveCollection}
                    className="p-2 bg-black text-white w-fit rounded-lg"
                  >
                    Save
                  </button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <button
                      type="button"
                      className="underline w-fit rounded-lg"
                    >
                      Close
                    </button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <p className="text-4xl text-black/20">
              Create a new FlashCard Collection with AI
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default GenerateFlashCard;
