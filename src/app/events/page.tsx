import { db } from "@/index";
import EventList from "../components/(events)/event-list";
import { eventSchema } from "@/schema";
import EventSubmit from "../components/(events)/event-submit";

export default async function Page() {
  const allEvents = await db.select().from(eventSchema);
  return (
    <div className="h-screen grid   px-5 gap-3">
      <div className="h-1/4">
        <EventSubmit />
      </div>
      <div className="h-3/4">
        {" "}
        <EventList events={allEvents} />
      </div>
    </div>
  );
}
