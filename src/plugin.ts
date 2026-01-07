export function appHasDailyNotesPluginLoaded(): boolean {
  const { app } = window;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyNotesPlugin = (<any> app).internalPlugins.plugins["daily-notes"];
  if (dailyNotesPlugin && dailyNotesPlugin.enabled) {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodicNotes = (<any> app).plugins.getPlugin("periodic-notes");
  return periodicNotes && periodicNotes.settings?.daily?.enabled;
}

/**
 * XXX: "Weekly Notes" live in either the Calendar plugin or the periodic-notes plugin.
 * Check both until the weekly notes feature is removed from the Calendar plugin.
 */
export function appHasWeeklyNotesPluginLoaded(): boolean {
  const { app } = window;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((<any> app).plugins.getPlugin("calendar")) {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodicNotes = (<any> app).plugins.getPlugin("periodic-notes");
  return periodicNotes && periodicNotes.settings?.weekly?.enabled;
}

export function appHasMonthlyNotesPluginLoaded(): boolean {
  const { app } = window;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodicNotes = (<any> app).plugins.getPlugin("periodic-notes");
  return periodicNotes && periodicNotes.settings?.monthly?.enabled;
}

export function appHasQuarterlyNotesPluginLoaded(): boolean {
  const { app } = window;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodicNotes = (<any> app).plugins.getPlugin("periodic-notes");
  return periodicNotes && periodicNotes.settings?.quarterly?.enabled;
}

export function appHasYearlyNotesPluginLoaded(): boolean {
  const { app } = window;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodicNotes = (<any> app).plugins.getPlugin("periodic-notes");
  return periodicNotes && periodicNotes.settings?.yearly?.enabled;
}
