/**
 * Logger Utility
 *
 * This utility provides enhanced logging capabilities for the application.
 * It includes different log levels and can be configured to log to the console
 * and/or to a server endpoint for persistent logging.
 *
 * Enhanced for App Router migration to track routing and migration-related events.
 */

type LogLevel = "debug" | "info" | "warn" | "error" | "migration";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  route?: string;
  component?: string;
}

class Logger {
  private static instance: Logger;
  private logToServer: boolean = false;
  private serverEndpoint: string = "/api/logs";
  private logBuffer: LogEntry[] = [];
  private bufferSize: number = 10;
  private flushInterval: number = 5000; // 5 seconds
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {
    // Initialize the logger
    if (typeof window !== "undefined") {
      this.startBufferFlush();
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private startBufferFlush(): void {
    this.intervalId = setInterval(() => {
      this.flushBuffer();
    }, this.flushInterval);
  }

  private stopBufferFlush(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private flushBuffer(): void {
    if (this.logToServer && this.logBuffer.length > 0) {
      // Send logs to server
      fetch(this.serverEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logs: this.logBuffer }),
      }).catch((err) => {
        console.error("Failed to send logs to server:", err);
      });

      // Clear the buffer
      this.logBuffer = [];
    }
  }

  private formatLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, any>
  ): LogEntry {
    const route =
      typeof window !== "undefined" ? window.location.pathname : "server";

    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      route,
    };
  }

  private addToBuffer(entry: LogEntry): void {
    this.logBuffer.push(entry);

    if (this.logBuffer.length >= this.bufferSize) {
      this.flushBuffer();
    }
  }

  public enableServerLogging(endpoint?: string): void {
    this.logToServer = true;
    if (endpoint) {
      this.serverEndpoint = endpoint;
    }
  }

  public disableServerLogging(): void {
    this.logToServer = false;
  }

  public debug(message: string, context?: Record<string, any>): void {
    const entry = this.formatLogEntry("debug", message, context);
    console.debug(
      `[DEBUG] ${entry.timestamp} - ${entry.message}`,
      context || ""
    );
    this.addToBuffer(entry);
  }

  public info(message: string, context?: Record<string, any>): void {
    const entry = this.formatLogEntry("info", message, context);
    console.info(`[INFO] ${entry.timestamp} - ${entry.message}`, context || "");
    this.addToBuffer(entry);
  }

  public warn(message: string, context?: Record<string, any>): void {
    const entry = this.formatLogEntry("warn", message, context);
    console.warn(`[WARN] ${entry.timestamp} - ${entry.message}`, context || "");
    this.addToBuffer(entry);
  }

  public error(message: string, context?: Record<string, any>): void {
    const entry = this.formatLogEntry("error", message, context);
    console.error(
      `[ERROR] ${entry.timestamp} - ${entry.message}`,
      context || ""
    );
    this.addToBuffer(entry);
  }

  public logRouteChange(from: string, to: string): void {
    this.info(`Route change: ${from} -> ${to}`, { from, to });
  }

  public logComponentRender(
    componentName: string,
    props?: Record<string, any>
  ): void {
    this.debug(`Component rendered: ${componentName}`, {
      component: componentName,
      props,
    });
  }

  public logApiRequest(endpoint: string, method: string, data?: any): void {
    this.info(`API Request: ${method} ${endpoint}`, { endpoint, method, data });
  }

  public logApiResponse(endpoint: string, status: number, data?: any): void {
    this.info(`API Response: ${endpoint} - Status: ${status}`, {
      endpoint,
      status,
      data,
    });
  }

  public logError(error: Error, context?: Record<string, any>): void {
    this.error(`Error: ${error.message}`, {
      ...context,
      errorName: error.name,
      stack: error.stack,
    });
  }

  // Migration-specific logging methods
  public migration(message: string, context?: Record<string, any>): void {
    const entry = this.formatLogEntry("migration", message, context);
    console.info(
      `[MIGRATION] ${entry.timestamp} - ${entry.message}`,
      context || ""
    );
    this.addToBuffer(entry);
  }

  public logPageMigration(
    pageName: string,
    status: "started" | "completed" | "failed",
    details?: Record<string, any>
  ): void {
    this.migration(`Page migration ${status}: ${pageName}`, {
      pageName,
      status,
      ...details,
    });
  }

  public logComponentMigration(
    componentName: string,
    status: "started" | "completed" | "failed",
    details?: Record<string, any>
  ): void {
    this.migration(`Component migration ${status}: ${componentName}`, {
      componentName,
      status,
      ...details,
    });
  }

  public logMigrationIssue(
    issue: string,
    severity: "low" | "medium" | "high",
    details?: Record<string, any>
  ): void {
    this.migration(`Migration issue (${severity}): ${issue}`, {
      issue,
      severity,
      ...details,
    });
  }

  public logMigrationTest(
    testName: string,
    status: "passed" | "failed",
    details?: Record<string, any>
  ): void {
    this.migration(`Migration test ${status}: ${testName}`, {
      testName,
      status,
      ...details,
    });
  }
}

// Export a singleton instance
export const logger = Logger.getInstance();

// Export a hook for use in components
export function useLogger(component: string) {
  return {
    debug: (message: string, context?: Record<string, any>) =>
      logger.debug(message, { ...context, component }),
    info: (message: string, context?: Record<string, any>) =>
      logger.info(message, { ...context, component }),
    warn: (message: string, context?: Record<string, any>) =>
      logger.warn(message, { ...context, component }),
    error: (message: string, context?: Record<string, any>) =>
      logger.error(message, { ...context, component }),
    logError: (error: Error, context?: Record<string, any>) =>
      logger.logError(error, { ...context, component }),
    logRender: (props?: Record<string, any>) =>
      logger.logComponentRender(component, props),

    // Migration-specific methods
    migration: (message: string, context?: Record<string, any>) =>
      logger.migration(message, { ...context, component }),
    logPageMigration: (
      pageName: string,
      status: "started" | "completed" | "failed",
      details?: Record<string, any>
    ) => logger.logPageMigration(pageName, status, { ...details, component }),
    logComponentMigration: (
      componentName: string,
      status: "started" | "completed" | "failed",
      details?: Record<string, any>
    ) =>
      logger.logComponentMigration(componentName, status, {
        ...details,
        component,
      }),
    logMigrationIssue: (
      issue: string,
      severity: "low" | "medium" | "high",
      details?: Record<string, any>
    ) => logger.logMigrationIssue(issue, severity, { ...details, component }),
    logMigrationTest: (
      testName: string,
      status: "passed" | "failed",
      details?: Record<string, any>
    ) => logger.logMigrationTest(testName, status, { ...details, component }),
  };
}
