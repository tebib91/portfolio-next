import { NextResponse } from "next/server";
import { cvData } from "@/data/cv";

export async function GET() {
  return NextResponse.json(cvData);
}

