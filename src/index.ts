import type moment from "moment";
import type { Moment } from "moment";
import { App, TFile } from "obsidian";

declare global {
  interface Window {
    app: App;
    moment: typeof moment;
  }
}

export {
  appHasDailyNotesPluginLoaded,
  appHasMonthlyNotesPluginLoaded,
  appHasQuarterlyNotesPluginLoaded,
  appHasWeeklyNotesPluginLoaded,
  appHasYearlyNotesPluginLoaded,
} from "./plugin";

export {
  DEFAULT_DAILY_NOTE_FORMAT,
  DEFAULT_MONTHLY_NOTE_FORMAT,
  DEFAULT_QUARTERLY_NOTE_FORMAT,
  DEFAULT_WEEKLY_NOTE_FORMAT,
  DEFAULT_YEARLY_NOTE_FORMAT,
} from "./constants";

import type { IGranularity, IPeriodicNoteSettings } from "./types";
import {
  getDailyNoteSettings,
  getMonthlyNoteSettings,
  getQuarterlyNoteSettings,
  getWeeklyNoteSettings,
  getYearlyNoteSettings,
} from "./settings";
import { createDailyNote, getAllDailyNotes, getDailyNote } from "./daily";
import { createWeeklyNote, getAllWeeklyNotes, getWeeklyNote } from "./weekly";
import {
  createMonthlyNote,
  getAllMonthlyNotes,
  getMonthlyNote,
} from "./monthly";
import {
  createQuarterlyNote,
  getAllQuarterlyNotes,
  getQuarterlyNote,
} from "./quarterly";
import { createYearlyNote, getAllYearlyNotes, getYearlyNote } from "./yearly";

export { getDateFromFile, getDateFromPath, getDateUID } from "./parse";
export { getTemplateInfo } from "./vault";

function getPeriodicNoteSettings(
  granularity: IGranularity,
): IPeriodicNoteSettings {
  const getSettings = {
    day: getDailyNoteSettings,
    week: getWeeklyNoteSettings,
    month: getMonthlyNoteSettings,
    quarter: getQuarterlyNoteSettings,
    year: getYearlyNoteSettings,
  }[granularity];

  return getSettings();
}

function createPeriodicNote(
  granularity: IGranularity,
  date: Moment,
): Promise<TFile> {
  const createFn = {
    day: createDailyNote,
    month: createMonthlyNote,
    week: createWeeklyNote,
  };
  return createFn[granularity](date);
}

export type { IGranularity, IPeriodicNoteSettings };
export {
  createDailyNote,
  createMonthlyNote,
  createPeriodicNote,
  createQuarterlyNote,
  createWeeklyNote,
  createYearlyNote,
  getAllDailyNotes,
  getAllMonthlyNotes,
  getAllQuarterlyNotes,
  getAllWeeklyNotes,
  getAllYearlyNotes,
  getDailyNote,
  getDailyNoteSettings,
  getMonthlyNote,
  getMonthlyNoteSettings,
  getPeriodicNoteSettings,
  getQuarterlyNote,
  getQuarterlyNoteSettings,
  getWeeklyNote,
  getWeeklyNoteSettings,
  getYearlyNote,
  getYearlyNoteSettings,
};
