"use client";

import { SelectEvents } from "@/index";
import Link from "next/link";
import { useRouter } from "next/navigation";

type EventListProps = {
  events: SelectEvents[];
};
export default function EventList({ events }: EventListProps) {
  const router = useRouter();

  async function handleDelete(eventId: number) {
    fetch("/api/events", { method: "DELETE", body: JSON.stringify(eventId) })
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
        {events.map((event) => (
          <li
            key={event.id}
            className="bg-white shadow-xl rounded-xl p-2 flex justify-center items-center flex-col gap-1"
          >
            <Link href={`/events/${event.id}`}>
              <h1 className="font-bold hover:underline text-xl">
                {event.title}
              </h1>
            </Link>

            <p>{event.date}</p>
            <button
              className="bg-green-100 rounded-l p-1 hover:bg-red-100"
              onClick={() => handleDelete(event.id)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
