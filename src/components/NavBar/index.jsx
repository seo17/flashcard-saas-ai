"use client";
import { navItems } from "@/lib";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

function Navbar() {
  // Get pathname to style nav item differently
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <header>
      <nav>
        <div className="w-full flex flex-row justify-between items-center py-3 px-5 md:px-12">
          <div>
            <Link
              href={"/"}
              className={`font-bold text-xl md:text-2xl text-black`}
            >
              FlashGenius
            </Link>
          </div>

          <div className="md:flex flex-row items-center md:gap-6 hidden ">
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

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Button className="text-2xl font-bold">
                  <AlignJustify strokeWidth={4} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="h-full flex flex-col justify-start items-start gap-6 py-5">
                  {navItems.map((item) =>
                    item.name !== "Get Started" ? (
                      <Link
                        key={item.name}
                        href={item.link}
                        className={`text-black text-lg ${
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
                          className="text-white text-lg font-semibold"
                        >
                          {item.name}
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
