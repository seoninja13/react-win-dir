import { NextResponse } from "next/server";
import { supabase } from "../../../../Supabase/client";
import { validateLeadForm } from "../../../../Supabase/utils/forms";
import { logError } from "../../../../Supabase/utils/logging";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate form data
    const { isValid, errors } = validateLeadForm(body);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid form data", errors },
        { status: 400 }
      );
    }

    // Add source and status if not provided
    const leadData = {
      ...body,
      source: body.source || "website",
      status: body.status || "new",
    };

    // Insert lead into database
    const { data, error } = await supabase
      .from("leads")
      .insert([leadData])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed:", error);

    // Log error to Supabase
    logError("Lead submission failed", { error });

    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
