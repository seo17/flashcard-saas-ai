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
import { BeatLoader } from "react-spinners";

import { useAuth } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import db from "../firebase";

import { generate } from "@/actions";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

function GenerateFlashCard() {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcard] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [dialog, setDialog] = useState(false);

  const fetchFlashCards = async () => {
    setIsLoading(true);
    const result = await generate(prompt);

    setFlashcard(result);

    setPrompt("");
    setIsLoading(false);
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
      toast((t) => (
        <span>
          Go to{" "}
          <a
            className="underline text-blue-500 hover:text-blue-500/30 active:bg-red-500"
            href="/collection"
          >
            Collection
          </a>
        </span>
      ));
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
        <div className="flex flex-col items-center justify-center px-5 md:px-12 gap-3 pb-10">
          <div className="w-full flex flex-col gap-y-5 md:gap-3 justify-center items-center">
            <div className="max-h-[300px] max-w-[600px]">
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

              <Button
                onClick={fetchFlashCards}
                className="bg-black  p-3 w-full rounded-lg font-semibold"
              >
                {isLoading ? (
                  <BeatLoader color="#FFF" />
                ) : (
                  "Generate FlashCards"
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 grid-flow-row">
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
                <Button
                  onClick={() => setDialog(true)}
                  className="bg-black  p-3 w-fit rounded-lg font-semibold]"
                >
                  Create FlashCard Collection
                </Button>
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
                    {isLoading ? <BeatLoader color="#FFF" /> : "Save"}
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
            <p className="text-center md:text-2xl lg:text-3xl text-black/20">
              Create a new FlashCard Collection with AI
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default GenerateFlashCard;
