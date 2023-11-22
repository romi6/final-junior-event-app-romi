"use client";

import { SelectAtendees, SelectEvents } from "@/index";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AtendeeListProps = {
  atendees: SelectAtendees[];
};
export default function AtendeeList({ atendees }: AtendeeListProps) {
  const router = useRouter();

  async function handleDelete(atendeeId: number) {
    fetch("/api/atendees", {
      method: "DELETE",
      body: JSON.stringify(atendeeId),
    })
      .then((res) => {
        if (!res.ok) throw new Error("error deleting");
        else {
          return res.json();
        }
      })
      .then(() => router.refresh())
      .catch((error) => console.error(error));
  }
  return (
    <div>
      <ul className="grid grid-cols-4 gap-2">
        {atendees.map((atendee) => (
          <li
            key={atendee.id}
            className="bg-white shadow-xl rounded-xl p-2 flex justify-center items-center flex-col gap-1"
          >
            <h1 className="font-bold hover:underline text-xl">
              {atendee.name}
            </h1>

            <p>{atendee.contactDetails}</p>
            <button
              className="bg-green-100 rounded-l p-1 hover:bg-red-100"
              onClick={() => handleDelete(atendee.id)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
