import { db } from "@/index";
import { atendeeSchema, eventSchema } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const body = await req.json();

  try {
    await db.delete(atendeeSchema).where(eq(atendeeSchema.eventId, body));
    await db.delete(eventSchema).where(eq(eventSchema.id, body));
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
    await db.insert(eventSchema).values({
      title: body.title,
      date: body.date,
      description: body.description,
    });
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 403 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();

  try {
    await db
      .update(eventSchema)
      .set({
        title: body.title,
        date: body.date,
        description: body.description,
      })
      .where(eq(body.id, eventSchema.id));
    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 403 });
  }
}
