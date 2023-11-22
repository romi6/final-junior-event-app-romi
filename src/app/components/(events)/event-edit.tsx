"use client";

import { SelectEvents } from "@/index";
import { useRouter } from "next/navigation";
import React from "react";

type EventEditProps = {
  event: SelectEvents;
  setEditing: (value: boolean) => void;
};
export default function EventEdit({ event, setEditing }: EventEditProps) {
  const [eventData, setEventData] = React.useState({
    title: event.title,
    date: event.date,
    description: event.description,
  });
  const router = useRouter();
  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    fetch("/api/events", {
      method: "PUT",
      body: JSON.stringify({ ...eventData, id: event.id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("error deleting");
        else {
          return res.json();
        }
      })
      .then(() => {
        setEditing(false);
        router.refresh();
      })
      .catch((error) => console.error(error));
  }
  return (
    <form className="flex flex-col justify-center items-center bg-white rounded-xl p-4 shadow-xl ">
      <div>
        <label htmlFor="1">title</label>
        <input
          type="text"
          name="title"
          id="1"
          value={eventData.title}
          onChange={(e) =>
            setEventData({ ...eventData, title: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="2">description</label>
        <input
          type="text"
          name="description"
          id="2"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="3">date</label>
        <input
          type="date"
          name="date"
          id="3"
          value={eventData.date}
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
        />
      </div>
      <button className="bg-green-100 hover:bg-red-100" onClick={handleEdit}>
        SAVE
      </button>
    </form>
  );
}
