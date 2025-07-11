import tickets from "@/app/database";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ticket = tickets.find((ticket) => ticket.id === parseInt(id));
  return NextResponse.json(ticket);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name, status, type } = await request.json();
  const ticket = tickets.find((ticket) => ticket.id === parseInt(id));
  if (!ticket)
    return NextResponse.json(new Error("ticke is not found"), { status: 404 });
  if (name) ticket.name = name;
  if (status) ticket.status = status;
  if (type) ticket.type = type;

  return NextResponse.json(ticket);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const newTicket = tickets.filter((ticket) => ticket.id != parseInt(id));
  return NextResponse.json(newTicket);
}
