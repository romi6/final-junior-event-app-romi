"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function EventSubmit() {
  const [eventData, setEventData] = React.useState({
    title: "",
    date: "10-10-2023",
    description: "",
  });
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({ ...eventData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("error deleting");
        else {
          return res.json();
        }
      })
      .then(() => {
        setEventData({ title: "", date: "10-10-2023", description: "" });
        router.refresh();
      })
      .catch((error) => console.error(error));
  }
  return (
    <form className="flex flex-col justify-center items-center bg-white  p-4 shadow-xl ">
      <h1 className="font-bold text-2xl">EVENT SUBMISSION</h1>
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
      <button className="bg-green-100 hover:bg-red-100" onClick={handleSubmit}>
        SUBMIT
      </button>
    </form>
  );
}
