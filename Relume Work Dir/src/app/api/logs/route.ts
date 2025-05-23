import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const { logs } = await request.json();

    if (!Array.isArray(logs) || logs.length === 0) {
      return NextResponse.json(
        { error: "Invalid logs format" },
        { status: 400 }
      );
    }

    // Log to console on server
    logs.forEach((log) => {
      const { level, message, context } = log;
      switch (level) {
        case "debug":
          console.debug(`[SERVER-DEBUG] ${message}`, context || "");
          break;
        case "info":
          console.info(`[SERVER-INFO] ${message}`, context || "");
          break;
        case "warn":
          console.warn(`[SERVER-WARN] ${message}`, context || "");
          break;
        case "error":
          console.error(`[SERVER-ERROR] ${message}`, context || "");
          break;
      }
    });

    // Store logs in Supabase if available
    if (supabaseUrl && supabaseKey) {
      try {
        const { error } = await supabase.from("logs").insert(
          logs.map((log: any) => ({
            level: log.level,
            message: log.message,
            details: log.context || {},
            source: log.component || "client",
            url:
              log.route ||
              (typeof window !== "undefined"
                ? window.location.pathname
                : "server"),
            created_at: new Date().toISOString(),
          }))
        );

        if (error) {
          console.error("Error storing logs in Supabase:", error);
        }
      } catch (err) {
        console.error("Failed to store logs in Supabase:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing logs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
