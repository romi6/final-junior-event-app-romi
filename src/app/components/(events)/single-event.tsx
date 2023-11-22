"use client";

import { SelectEvents } from "@/index";
import React from "react";
import EventEdit from "./event-edit";

type SingleEventProps = {
  event: SelectEvents;
};
export default function SingleEvent({ event }: SingleEventProps) {
  const [editing, setEditing] = React.useState(false);
  return (
    <div>
      {editing ? (
        <EventEdit event={event} setEditing={setEditing} />
      ) : (
        <div className="bg-white p-3 rounded-xl shadow-xl flex flex-col gap-1 justify-center items-center">
          <h1 className="text-2x font-bold"> EDIT EVENT</h1>
          <h1 className="font-bold text-xl">{event.title}</h1>
          <p>{event.date}</p>
          <p>{event.description}</p>
          <button
            onClick={() => setEditing(true)}
            className="bg-green-100 hover:bg-red-100 rounded-xl p-1"
          >
            EDIT
          </button>
        </div>
      )}
    </div>
  );
}
