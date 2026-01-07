import * as moment from "moment-timezone";
import getMockApp, { createFile } from "src/testUtils/mockApp";
import * as dailyNotesInterface from "../index";
import { setWeeklyConfig } from "../testUtils/utils";

jest.mock("path");

describe("createWeeklyNote ISO support", () => {
  beforeEach(() => {
    window.app = getMockApp();
    window.moment = moment;
    moment.tz.setDefault("America/New_York");
    window.existingFiles = {};
    // Default US Locale (Sunday start)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any> moment.localeData())._week.dow = 0;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("REGRESSION: uses locale weekday for default format gggg-[W]ww", async () => {
    setWeeklyConfig({
      enabled: true,
      folder: "/weekly-notes",
      format: "gggg-[W]ww",
      template: "template",
    });

    createFile(
      "template",
      "{{sunday:YYYY-MM-DD}}",
    );

    // 2026-01-01 is Thursday.
    // US Week 1 2026 starts Dec 28 2025.
    // Locale Sunday is Dec 28 2025.
    const date = moment("2026-01-01");

    await dailyNotesInterface.createWeeklyNote(date);

    expect(window.app.vault.create).toHaveBeenCalledWith(
      expect.stringContaining("2026-W01"), // Filename format is gggg-[W]ww
      "2025-12-28", // Locale Sunday
    );
  });

  test("uses ISO weekday for ISO format GGGG-[W]WW", async () => {
    setWeeklyConfig({
      enabled: true,
      folder: "/weekly-notes",
      format: "GGGG-[W]WW",
      template: "template",
    });

    createFile(
      "template",
      "{{sunday:YYYY-MM-DD}}",
    );

    // 2026-01-01 is Thursday.
    // ISO Week 1 2026 starts Dec 29 2025 (Mon). Ends Jan 4 2026 (Sun).
    // ISO Sunday is Jan 4 2026.
    const date = moment("2026-01-01");

    await dailyNotesInterface.createWeeklyNote(date);

    expect(window.app.vault.create).toHaveBeenCalledWith(
      expect.stringContaining("2026-W01"),
      "2026-01-04", // ISO Sunday
    );
  });

  test("works for escaped ISO characters in non-ISO format", async () => {
    // If I have a format like "YYYY-[Week]-ww", it should be locale.
    // 'W' and 'e' in 'Week' should be ignored because of brackets.
    // 'e' is not in regex anyway (only E), but W is.
    setWeeklyConfig({
      enabled: true,
      folder: "/weekly-notes",
      format: "YYYY-[Week]-ww",
      template: "template",
    });

    createFile("template", "{{sunday:YYYY-MM-DD}}");

    // Locale Sunday of Jan 1 2026 week is Dec 28 2025.
    const date = moment("2026-01-01");
    await dailyNotesInterface.createWeeklyNote(date);

    expect(window.app.vault.create).toHaveBeenCalledWith(
      expect.anything(),
      "2025-12-28",
    );
  });

  test("works for ISO format with escaped characters", async () => {
    // "GGGG-[Week]-WW" -> ISO
    setWeeklyConfig({
      enabled: true,
      folder: "/weekly-notes",
      format: "GGGG-[Week]-WW",
      template: "template",
    });

    createFile("template", "{{sunday:YYYY-MM-DD}}");

    const date = moment("2026-01-01");
    await dailyNotesInterface.createWeeklyNote(date);

    expect(window.app.vault.create).toHaveBeenCalledWith(
      expect.anything(),
      "2026-01-04",
    );
  });
});
