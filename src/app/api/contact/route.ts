import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.json();
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbw0L52je9JyknVAMz3Xa9ikzV4CsauXp_ZaAf0W8NMES-h-MlWFsFB4X0cwuKcJXxtb4w/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
  const payload = await res.json();
  return NextResponse.json(payload);
}
