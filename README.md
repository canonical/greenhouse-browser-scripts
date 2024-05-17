# Welcome to Canonical's Greenhouse Userscripts

## What's this project for

This project contains a set of handful [Userscripts](https://en.wikipedia.org/wiki/Userscript) (file that ends with `.user.js`), that helps to do some actions on Greenhouse more quickly (like shortcuts).

Here is the list of the available Userscripts:

-   [Greenhouse Application Review](https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/application-review.user.js): Add quick rejection buttons to the application review page, to perform rejection with one button click
-   [Greenhouse written interviews in a new tab](https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/written-interview-in-new-tab.user.js): Open written interviews in a new tab instead of downloading "File1.pdf" files
-   [Greenhouse Application Review Helper](https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/application-review-helper.user.js): Adds additional icons to suggest the quality of the answer for custom application questions
-   [Talent Interview Field Reminder](https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/talent-interview-field-reminder.user.js): Create a reminder to update application custom fields after moving candidates to the Talent Interview stage
-   [To-do expander](https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/todo-expander.user.js): Provides a "Reveal all" button to the bulk action set to expand the todo per candidate row

## Getting started

### Installing the browser extension

There a several browser extensions that work, but the most popular one (recommended) is [TamperMonkey](https://www.tampermonkey.net/), this extension is available on Chrome, Firefox and Safari.

Installation page:

-   Google chrome, Microsoft Edge (new version), Brave: [Extension installation page](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
-   Firefox: [Firefox addons page](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
-   Safari: [Mac app store](https://apps.apple.com/app/apple-store/id1482490089?pt=117945903&ct=tm.net&mt=8)

### Installing the Userscripts

Once the browser extension is installed, for each script the you wish to install:

1. Copy the link of the Userscript that you wish to install, the list of link can be found [here](#Userscript-installation-links)
2. Go to the dashboard of TamperMonkey, by clicking on the extension icon in the top bar of the browser then "Dashboard":
   ![TamperMonkey dashboard button](/resources/tampermonkey-settings.png)
3. Click on the utilities tab:
   ![TamperMonkey utilities tab](/resources/tampermonkey-dashboard.png)
4. Paste your Userscript link (that you copied previously) in the section "Install from URL":
   ![TamperMonkey install from URL](/resources/tampermonkey-utilities-install.png)
5. Click "Install", and that's it 🎉

### Userscript installation links

-   Greenhouse application review: https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/application-review.user.js
-   Greenhouse written interviews in a new tab: https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/written-interview-in-new-tab.user.js
-   Greenhouse Application Review Helper: https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/application-review-helper.user.js
-   Talent Interview Field Reminder: https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/talent-interview-field-reminder.user.js

## Receiving updates

By default TamperMonkey will auto check for update daily, if you want to check for updates manually, you can do so by:

1. Go to the dashboard of TamperMonkey, by clicking on the extension icon in the top bar of the browser then "Utilities":
   ![TamperMonkey check for updates button](/resources/tampermonkey-check-for-updates.png)
2. Click the button "Check for Userscript updates"

## Greenhouse application review

This Userscript add additional rejection buttons to review application page.

Here is the list of rejection actions:

-   Illegible:
    -   Rejection reason: Other (add notes below)
    -   Rejection note: Submission not in English
    -   [x] Send email rejection
-   Wrong job
    -   Rejection reason: Other (add notes below)
    -   Rejection note: Cover letter is for a different job/company
    -   [x] Send email rejection
-   No cover letter
    -   Rejection reason: Other (add notes below)
    -   Rejection note: No cover letter
    -   [x] Send email rejection
-   Wrong timezone
    -   Rejection reason: Wrong timezone
    -   [x] Send email rejection
-   Lacking skills
    -   Rejection reason: Lacking skill(s)/qualification(s)
    -   [x] Send email rejection

When this is enabled you will see this addition element in the toolbar:
![Greenhouse application rejection buttons](/resources/greenhouse-application-rejection.png)

## Greenhouse written interviews in new tab

Open written interviews in a new tab instead of downloading "File1.pdf" files.

Once the Userscript is installed, you may need to authorize popups for the first time.

## Greenhouse talent interview field reminder

Creates an alert when a candidate is moved into the Talent Interview stage.

The alert will remind HLs to update the 'HL - Proposed level' and 'HL - Years of relevant experience' fields.

## Greenhouse to-do expander

Adds a button to the bulk actions section of that Greenhouse candidate list. This button reveals all todo sections on each candidate displayed on the list.
![Greenhouse todo reveal all button](/resources/todo-expander.png)
