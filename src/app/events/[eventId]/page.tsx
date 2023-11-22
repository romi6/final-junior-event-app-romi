import AtendeeList from "@/app/components/(atendees)/atendee-list";
import AtendeeSubmit from "@/app/components/(atendees)/atendee-submit";
import SingleEvent from "@/app/components/(events)/single-event";
import { db } from "@/index";
import { atendeeSchema, eventSchema } from "@/schema";
import { eq } from "drizzle-orm";

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const finalEventId = Number(params.eventId);
  const finalAtendees = await db
    .select()
    .from(atendeeSchema)
    .where(eq(atendeeSchema.eventId, finalEventId));
  const allEvents = await db.select().from(eventSchema);
  const finalEvent = allEvents.filter((event) => event.id === finalEventId)[0];
  return (
    <div className="h-screen grid gap-3 ">
      <div>
        <SingleEvent event={finalEvent} />
      </div>
      <div>
        <AtendeeList atendees={finalAtendees} />
      </div>

      <div className="fixed bottom-0 h-1/4 w-full">
        <AtendeeSubmit eventId={finalEventId} />
      </div>
    </div>
  );
}
