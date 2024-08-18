"use client";
import CollectionCard from "@/components/CollectionCard";
import { useAuth } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";

function CollectionPage() {
  const { userId } = useAuth();
  const [flashCardCollections, setFlashCardCollections] = useState([]);

  useEffect(() => {
    async function getFlashcards() {
      if (!userId) return;
      const docRef = doc(collection(db, "users"), userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashCardCollection || [];
        setFlashCardCollections(collections);
      } else {
        await setDoc(docRef, { flashCardCollection: [] });
      }
    }
    getFlashcards();
  }, [userId]);

  return (
    <main>
      <section>
        <div className="flex flex-col items-center justify-center py-8 px-12 gap-3 pb-10">
          <div className="w-full grid grid-cols-4 gap-4 grid-flow-row">
            {flashCardCollections.length > 0 &&
              flashCardCollections.map((item, index) => (
                <CollectionCard
                  key={index}
                  name={item.name}
                  amount={item.amount}
                />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CollectionPage;
