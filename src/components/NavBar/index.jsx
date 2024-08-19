"use client";
import { vollkorn } from "@/app/layout";
import { navItems } from "@/lib";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  // Get pathname to style nav item differently
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <header>
      <nav>
        <div className="w-full flex flex-row justify-between items-center py-3 px-12">
          <div>
            <Link href={"/"} className={`font-bold md:text-2xl text-black`}>
              FlashGenius
            </Link>
          </div>

          <div className="flex flex-row items-center gap-6">
            {navItems.map((item) =>
              item.name !== "Get Started" ? (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`text-black text-base ${
                    item.link === pathname ? "font-bold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ) : userId ? (
                <UserButton />
              ) : (
                <div
                  key={item.name}
                  className="bg-black flex flex-row justify-center items-center p-3 rounded-lg"
                >
                  <Link
                    href={item.link}
                    className="text-white text-base font-semibold"
                  >
                    {item.name}
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
