import { db } from "@/index";
import { atendeeSchema } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const body = await req.json();

  try {
    await db.delete(atendeeSchema).where(eq(atendeeSchema.id, body));
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 403 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await db.insert(atendeeSchema).values({
      eventId: body.eventId,
      name: body.name,
      contactDetails: body.contactDetails,
    });
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 403 });
  }
}
