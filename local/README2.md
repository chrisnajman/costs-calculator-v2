# Costs Calculator (V2)

Record and save your daily spend and see the average over a number of days.

**Note**: This is an upgrading and updating of an [earlier app](https://chrisnajman.github.io/costs-calculator/) which I now consider deprecated.

The main difference is that in the current version I have substituted a 'Reorder entries?' button for maintaining date order, instead of drag-and-drop (which I found to be buggy).

---

## Table of Contents

- [Description](#description)
  - [Form](#form)
  - [Tables](#tables)
    - [Average Spend](#average-spend)
    - [Daily Spend](#daily-spend)
      - [Date > Button: Reorder Entries?](#date--button-reorder-entries)
      - [Edit Item(s)](#edit-items)
      - [Delete Entry](#delete-entry)
  - [Button: Delete all entries...](#button-delete-all-entries)
- [The 'local' Folder](#the-local-folder)
- [Accessibility](#accessibility)
  - [WAVE Web Accessibility Evaluation Tools Report](#wave-web-accessibility-evaluation-tools-report)
- [Testing](#testing)

---

## Description

### Form

- **Currency**: Optional. The app supports a limited number of currencies, represented by symbols. However, the app is compatible with any decimal-based currency.
- **Date**: Required. An accurate average over a period requires an entry for every day of that period.
- **Item(s)**: Required. This field cannot be left blank, but the form can be submitted without changing the default value 'Shopping'.
- **Amount**: Required. If nothing is spent on a day, leave it as '0,0'.

### Tables

#### Average Spend

- The number of days, the total amount spent, and the average daily spend over the period are displayed here.

#### Daily Spend

- Form entries are displayed here.

##### Date > Button: Reorder Entries?

This button, located next to the 'Date' heading, is disabled until 2 or more entries have been made. Its function is to sort the entries in ascending order if the date sequence gets out of sync. This might occur if a day is missed and added later or if an earlier entry is deleted due to inaccuracy and needs re-insertion.

##### Edit Item(s)

- The item(s) description can be edited. Changes will be saved.

##### Delete Entry

- Single entries can be permanently deleted.

---

### Button: Delete all entries...

This button is disabled until 1 entry has been made. Clicking it will launch a 'confirm' dialog. If 'yes' is clicked, local storage for the following will be erased:

- Entries for all dates in the 'Daily Spend' table.
- The 'Reorder entries?' button state value.

**Note**: Local storage will be cleared for only this specific pair of keys in the Costs Calculator V2 app; local storage for other apps will not be affected.

---

## The 'local' Folder

The 'main' version structures the JavaScript with ES6 Modules. ES6 Modules will not work if you want to run the app from the local file system (In Windows, this is `file:///C:/Users/...`). Therefore, in the 'local' folder, all JavaScript is consolidated into 1 file (`script.js`). The app can then be run by clicking 'index.html'.

The functionality remains the same in both versions.

---

## Accessibility

### WAVE Web Accessibility Evaluation Tools Report

- [Automated accessibility analysis results (passed)](https://wave.webaim.org/report#/https://chrisnajman.github.io/costs-calculator-v2/)

---

## Testing

Tested on Windows 10 with:

- Chrome 121.0.6167.85 (Official Build) (64-bit)
- Firefox 122.0 (64-bit)
- Microsoft Edge 120.0.2210.144 (Official build) (64-bit)

Page tested in both browser and device views.
