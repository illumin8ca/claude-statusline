import { PowerlineRenderer } from "../src/powerline";
import { SessionProvider } from "../src/segments";
import { loadConfigFromCLI } from "../src/config/loader";
import { writeFileSync, unlinkSync, mkdtempSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

describe("Core Functionality", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), "powerline-test-"));
  });

  afterEach(() => {
    try {
      unlinkSync(join(tempDir, "test.jsonl"));
    } catch {}
  });

  describe("Basic Powerline Generation", () => {
    it("should generate powerline with all segments", async () => {
      const config = loadConfigFromCLI([], tempDir);
      const renderer = new PowerlineRenderer(config);

      const hookData = {
        session_id: "test-session",
        transcript_path: "/fake/path.jsonl",
        workspace: {
          project_dir: tempDir,
          current_dir: tempDir,
        },
        model: {
          id: "claude-3-5-sonnet",
          display_name: "Claude",
        },
        cwd: tempDir,
        hook_event_name: "test",
      };

      const result = await renderer.generateStatusline(hookData);

      expect(result).toContain("Claude");
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain("\x1B[");
    });

    it("should handle missing transcript gracefully", async () => {
      const config = loadConfigFromCLI([], tempDir);
      const renderer = new PowerlineRenderer(config);

      const hookData = {
        session_id: "nonexistent-session",
        transcript_path: "/nonexistent/path.jsonl",
        workspace: {
          project_dir: tempDir,
          current_dir: tempDir,
        },
        model: { id: "claude-3-5-sonnet", display_name: "Claude" },
        cwd: tempDir,
        hook_event_name: "test",
      };

      const result = await renderer.generateStatusline(hookData);
      expect(result).toContain("0 tokens");
    });
  });

  describe("Session Tracking", () => {
    it("should calculate token breakdown from transcript", () => {
      const mockEntries = [
        {
          timestamp: "2024-01-01T10:00:00Z",
          message: {
            usage: {
              input_tokens: 1000,
              output_tokens: 500,
              cache_creation_input_tokens: 100,
            },
          },
          costUSD: 0.05,
        },
        {
          timestamp: "2024-01-01T10:01:00Z",
          message: {
            usage: {
              input_tokens: 1500,
              output_tokens: 750,
              cache_read_input_tokens: 200,
            },
          },
          costUSD: 0.08,
        },
      ];

      const sessionProvider = new SessionProvider();
      const breakdown = sessionProvider.calculateTokenBreakdown(mockEntries);

      expect(breakdown.input).toBe(2500);
      expect(breakdown.output).toBe(1250);
      expect(breakdown.cacheCreation).toBe(100);
      expect(breakdown.cacheRead).toBe(200);
    });
  });

  describe("Configuration", () => {
    it("should load default config", () => {
      const config = loadConfigFromCLI([], tempDir);

      expect(config.theme).toBeDefined();
      expect(config.display.style).toBeDefined();
      expect(config.display.lines.length).toBeGreaterThanOrEqual(1);
    });

    it("should override config with CLI args", () => {
      const config = loadConfigFromCLI(
        ["--theme=dark", "--style=powerline"],
        tempDir
      );

      expect(config.theme).toBe("dark");
      expect(config.display.style).toBe("powerline");
    });
  });

  describe("Context Calculation", () => {
    it("should calculate context usage", async () => {
      const transcript = [
        '{"timestamp":"2024-01-01T10:00:00Z","message":{"usage":{"input_tokens":10000,"cache_read_input_tokens":5000}},"isSidechain":false}',
      ].join("\n");

      const transcriptPath = join(tempDir, "test.jsonl");
      writeFileSync(transcriptPath, transcript);

      const { ContextProvider } = require("../src/segments/context");
      const contextProvider = new ContextProvider();
      const result = await contextProvider.calculateContextTokens(transcriptPath);

      expect(result).toBeDefined();
      expect(result.inputTokens).toBe(15000);
      expect(result.percentage).toBeGreaterThan(0);
    });
  });
});
