"use client";
import db from "@/app/firebase";
import CollectionCard from "@/components/CollectionCard";
import { useAuth } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";

function CollectionComponent() {
  const { userId } = useAuth();
  const router = useRouter();
  const [flashCardCollections, setFlashCardCollections] = useState([]);

  useEffect(() => {
    async function getFlashcards() {
      if (!userId) return;
      const docRef = doc(collection(db, "users"), userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashCardCollection || [];
        console.log("Colle", collections);
        setFlashCardCollections(collections);
      } else {
        await setDoc(docRef, { flashCardCollection: [] });
      }
    }
    getFlashcards();
  }, []);

  return (
    <main>
      <section>
        <div className="w-full flex flex-col items-center justify-center py-8 px-5 md:px-12">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center">
            <p className="text-center font-bold text-lg md:text-2xl">
              Flashcards Collection
            </p>
            <Button
              onClick={() => router.push("/generate")}
              className="w-full sm:w-fit"
            >
              <Plus />{" "}
              <span className="ml-2 sm:font-semibold">Create Flashcards</span>
            </Button>
          </div>

          <hr className="h-px bg-black/70 border-0 w-full mt-2 mb-5" />

          <div className="w-full h-[100vh] flex flex-col items-center gap-3 pb-20 md:pb-10 ">
            {flashCardCollections.length > 0 ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 grid-flow-cols">
                {flashCardCollections.map((item, index) => (
                  <CollectionCard
                    key={index}
                    userId={userId}
                    name={item.name}
                  />
                ))}
              </div>
            ) : (
              <p className="text-4xl text-black/20 text-center">
                Create a new FlashCard Collection with AI
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CollectionComponent;
