# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **ISO weekday calculation in weekly notes**: Fixed incorrect date calculation for weekday template placeholders (e.g., `{{sunday:YYYY-MM-DD}}`) when using ISO week formats.
  - **Problem**: For ISO Week 01 of 2026 (Mon Dec 29 2025 – Sun Jan 4 2026), `{{sunday:YYYY-MM-DD}}` incorrectly rendered as 2025-12-28 (the day before Monday) instead of 2026-01-04 (the actual Sunday within the ISO week).
  - **Solution**: Added automatic detection of ISO week formats (formats containing `GG`, `GGGG`, `W`, `WW`, or `E` tokens, ignoring escaped characters) and switched to `moment.isoWeekday()` for these formats, while maintaining backward compatibility with locale-based formats.
