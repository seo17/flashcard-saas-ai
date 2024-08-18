"use server";
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
