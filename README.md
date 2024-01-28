# Costs Calculator V2

Record your daily spend and see the average over a number of days.

---

## Usage

### Form

- **Currency**: Optional. The app supports a limited number of currencies, represented by
  symbols. However, any
  decimal-based currency is compatible.
- **Date**: Required. An accurate average over a period requires an entry for every day of
  that period.
- **Item(s)**: Required. This field cannot be left blank, but the form can be submitted
  without changing the
  default value 'Shopping'.
- **Amount**: Required. If nothing is spent on a day, leave it as '0 - 0'.

### Daily Spend, Button: Reorder Entries?

This button, located next to the 'Date' heading, is disabled until 2 or more entries have
been made. Its
function is to sort the entries in ascending order if the date sequence gets out of sync. This
might occur if a day
is missed and added later or if an earlier entry is deleted due to inaccuracy and needs
re-insertion.

### Button: Delete all entries...

This button is disabled until 1 entry has been made. Clicking it will launch a 'confirm' dialog.
If 'yes' is clicked,
_all_ entries in local storage will be erased.

---

## Testing

All snippets tested on Windows 10 with:

- Chrome 121.0.6167.85 (Official Build) (64-bit)
- Firefox 122.0 (64-bit)
- Microsoft Edge 120.0.2210.144 (Official build) (64-bit)

Each snippet tested in both browser and device views.
