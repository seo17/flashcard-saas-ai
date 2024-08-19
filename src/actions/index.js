"use server";

import db from "@/app/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
Your reply should only contain json structure to make it easier for developer to work with
You should return JSON structure, nothing else. Do not return text,string , alway return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function generate(prompt) {
  // We'll implement the OpenAI API call here
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    }
  );

  const jsonResponse = await response.json();

  // Parse the JSON response from the OpenAI API
  const flashcards = JSON.parse(jsonResponse.choices[0].message.content);

  // Return the flashcards as a JSON response
  return flashcards.flashcards;
}

export async function deleteFlashcardSet(userId, name) {
  try {
    // Reference to the specific flashcard set subcollection under the user
    const flashcardsColRef = collection(
      db,
      "users",
      userId,
      "flashCardCollection",
      name,
      "flashcards"
    );

    // Get all documents in the flashcards subcollection
    const flashcardDocs = await getDocs(flashcardsColRef);

    // Loop over each document and delete it
    const deletePromises = flashcardDocs.docs.map((flashcardDoc) => {
      return deleteDoc(flashcardDoc.ref); // Deleting the individual flashcard document
    });

    // Wait for all deletion operations to complete
    await Promise.all(deletePromises);

    // Optionally, delete the set document itself (if it's empty after deleting flashcards)
    const setDocRef = doc(db, "users", userId, "flashCardCollection", name);
    await deleteDoc(setDocRef);

    // Remove from user flashcardCollection obj
    const flashDocRef = doc(collection(db, "users"), userId);

    const flashDocSnap = await getDoc(flashDocRef);

    const theData = flashDocSnap.data().flashCardCollection;

    const updatedData = theData.filter((element) => element.name !== name);

    await updateDoc(flashDocRef, { flashCardCollection: updatedData });

    return { status: 202, message: "success" };
  } catch (error) {
    console.error("Error deleting flashcard set:", error);
    return { status: 500, error: "Error deleting flashcard set" };
  }
}
