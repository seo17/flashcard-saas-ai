import Link from "next/link";
import React from "react";

function HeroSection() {
  return (
    <section>
      <div className="h-[70vh] bg-black flex flex-col py-8 px-12 items-center gap-6 justify-center text-white ">
        {/* Heading and Subheading */}
        <div className="flex flex-col gap-3 items-center justify-center">
          {" "}
          <div className="max-w-[900px]">
            <h1 className=" font-bold text-5xl text-center">
              FlashGenius: AI-Powered Flashcards for Effortless Learning
            </h1>
          </div>
          <div className="max-w-[700px]">
            <p className="text-center ">
              Unlock your learning potential with FlashGenius - the
              revolutionary AI-powered flashcard generator that adapts to your
              unique learning style.
            </p>
          </div>
        </div>

        {/* CTA Buttons  */}
        <div className="flex flex-row gap-5 items-center justify-center">
          <div className="bg-white flex flex-row justify-center items-center p-3 rounded-lg">
            <Link href={"#"} className="text-black text-base font-semibold">
              Create your First Flashcard Set
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
