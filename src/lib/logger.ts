import { supabase } from "./supabase";

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export interface LogEntry {
  level: LogLevel;
  message: string;
  details?: any;
  source?: string;
  userId?: string;
  sessionId?: string | null;
  requestId?: string;
  url?: string;
  method?: string;
  statusCode?: number;
  userAgent?: string;
  ipAddress?: string;
  duration?: number;
  tags?: string[];
}

class Logger {
  private source: string;
  private enabled: boolean;
  private consoleEnabled: boolean;

  constructor(
    source: string = "app",
    options = { enabled: true, consoleEnabled: true }
  ) {
    this.source = source;
    this.enabled = options.enabled;
    this.consoleEnabled = options.consoleEnabled;
  }

  /**
   * Log a message with debug level
   */
  async debug(message: string, details?: any, tags?: string[]) {
    return this.log("debug", message, details, tags);
  }

  /**
   * Log a message with info level
   */
  async info(message: string, details?: any, tags?: string[]) {
    return this.log("info", message, details, tags);
  }

  /**
   * Log a message with warn level
   */
  async warn(message: string, details?: any, tags?: string[]) {
    return this.log("warn", message, details, tags);
  }

  /**
   * Log a message with error level
   */
  async error(message: string, details?: any, tags?: string[]) {
    return this.log("error", message, details, tags);
  }

  /**
   * Log a message with fatal level
   */
  async fatal(message: string, details?: any, tags?: string[]) {
    return this.log("fatal", message, details, tags);
  }

  /**
   * Log a message with the specified level
   */
  async log(level: LogLevel, message: string, details?: any, tags?: string[]) {
    if (!this.enabled) return { success: true, consoleOnly: true };

    // Always log to console for development
    if (this.consoleEnabled) {
      this.logToConsole(level, message, details);
    }

    try {
      // Check if Supabase is properly configured
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        console.warn(
          "Supabase credentials not configured. Logging to console only."
        );
        return {
          success: true,
          consoleOnly: true,
          message: "Supabase credentials not configured",
        };
      }

      // Get browser-specific information if available
      const browserInfo = this.getBrowserInfo();

      const logEntry: LogEntry = {
        level,
        message,
        details: details ? JSON.stringify(details) : null,
        source: this.source,
        ...browserInfo,
        tags,
      };

      // Store in Supabase with a timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Supabase request timed out")), 5000)
      );

      const supabasePromise = supabase.from("logs").insert(logEntry);

      // Race the Supabase request against the timeout
      const { data, error } = (await Promise.race([
        supabasePromise,
        timeoutPromise,
      ])) as any;

      if (error) {
        console.warn(
          `Failed to store log in Supabase: ${JSON.stringify(error)}`
        );
        // Still return success if we logged to console
        return {
          success: this.consoleEnabled,
          consoleOnly: true,
          error: error,
          message: "Logged to console only due to Supabase error",
        };
      }

      return { success: true, error: null };
    } catch (err) {
      console.warn(
        `Error in logger: ${err instanceof Error ? err.message : String(err)}`
      );
      // Still return success if we logged to console
      return {
        success: this.consoleEnabled,
        consoleOnly: true,
        error: err,
        message: "Logged to console only due to error",
      };
    }
  }

  /**
   * Log to console with appropriate styling
   */
  private logToConsole(level: LogLevel, message: string, details?: any) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}] [${this.source}]:`;

    switch (level) {
      case "debug":
        console.debug(prefix, message, details || "");
        break;
      case "info":
        console.info(prefix, message, details || "");
        break;
      case "warn":
        console.warn(prefix, message, details || "");
        break;
      case "error":
      case "fatal":
        console.error(prefix, message, details || "");
        break;
    }
  }

  /**
   * Get browser-specific information if available
   */
  private getBrowserInfo() {
    if (typeof window === "undefined") {
      return {};
    }

    // Generate a session ID if not exists
    if (!sessionStorage.getItem("sessionId")) {
      sessionStorage.setItem(
        "sessionId",
        `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      );
    }

    return {
      sessionId: sessionStorage.getItem("sessionId"),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };
  }
}

// Create default logger instance
export const logger = new Logger();

// Export factory function to create loggers for specific components
export function createLogger(
  source: string,
  options = { enabled: true, consoleEnabled: true }
) {
  return new Logger(source, options);
}

export default logger;
