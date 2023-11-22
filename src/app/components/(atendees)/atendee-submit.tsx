"use client";

import { useRouter } from "next/navigation";
import React from "react";

type AtendeeSubmitProps = {
  eventId: number;
};
export default function AtendeeSubmit({ eventId }: AtendeeSubmitProps) {
  const [atendeeData, setAtendeeData] = React.useState({
    name: "",
    contactDetails: "",
  });
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch("/api/atendees", {
      method: "POST",
      body: JSON.stringify({ ...atendeeData, eventId: eventId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("error deleting");
        else {
          return res.json();
        }
      })
      .then(() => {
        setAtendeeData({ name: "", contactDetails: "" });
        router.refresh();
      })
      .catch((error) => console.error(error));
  }
  return (
    <form className="flex flex-col justify-center items-center bg-white  w-full h-full shadow-xl ">
      <h1 className="text-2x font-bold">SUBMIT ATENDEE</h1>
      <div>
        <label htmlFor="1">name</label>
        <input
          type="text"
          name="name"
          id="1"
          value={atendeeData.name}
          onChange={(e) =>
            setAtendeeData({ ...atendeeData, name: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="2">contactDetails</label>
        <input
          type="text"
          name="contactDetails"
          id="2"
          value={atendeeData.contactDetails}
          onChange={(e) =>
            setAtendeeData({ ...atendeeData, contactDetails: e.target.value })
          }
        />
      </div>

      <button className="bg-green-100 hover:bg-red-100" onClick={handleSubmit}>
        SUBMIT
      </button>
    </form>
  );
}
