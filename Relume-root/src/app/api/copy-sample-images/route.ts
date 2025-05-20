import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execPromise = promisify(exec);

export async function GET() {
  try {
    // Get the path to the script
    const scriptPath = path.join(
      process.cwd(),
      "scripts",
      "copy-sample-images.js"
    );

    console.log("Running script:", scriptPath);

    // Execute the script
    const { stdout, stderr } = await execPromise(`node ${scriptPath}`);

    if (stderr && !stderr.includes("ExperimentalWarning")) {
      console.error("Error executing copy-sample-images.js:", stderr);
      return NextResponse.json(
        { success: false, error: stderr },
        { status: 500 }
      );
    }

    console.log("Script output:", stdout);

    return NextResponse.json({
      success: true,
      message: "Sample images uploaded to Supabase storage successfully",
    });
  } catch (error) {
    console.error("Error in copy-sample-images API route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
