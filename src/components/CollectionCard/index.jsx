"use client";
import Link from "next/link";
import React, { useState } from "react";

import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteFlashcardSet } from "@/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CollectionCard({ userId, name }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const result = await deleteFlashcardSet(userId, name);

    if (result?.message) toast.success("Deleted Successfully");
    else if (result?.error) toast.error("Error occured");

    window.location.reload();
  };

  return (
    <div className=" flex flex-col justify-between items-start w-full h-[150px] p-5 border border-black rounded-lg  bg-[#FFF]">
      <div className=" flex flex-col gap-3 ">
        <div>
          <Link
            href={`/flashcard?id=${name}`}
            className="font-semibold underline"
          >
            {name}
          </Link>
        </div>

        <div>
          <p className="text-base">Flashcard collection</p>
        </div>
      </div>

      <div className="flex flex-row justify-end items-center gap-2 w-full">
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          className="text-black bg-white"
        >
          <AlertDialogTrigger>
            {" "}
            <button
              onClick={() => setOpen(true)}
              className="hover:bg-gray-200/40"
            >
              <Trash size={20} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default CollectionCard;
