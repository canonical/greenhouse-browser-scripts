// ==UserScript==
// @name         Talent Interview Field Reminder
// @namespace    https://canonical.com/
// @version      1.0
// @author       Ulas Coskun
// @description  Create a reminder to update application custom fields after moving candidates to the Talent Interview stage
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @homepageURL  https://github.com/canonical/greenhouse-browser-scripts
// @supportURL   https://github.com/canonical/greenhouse-browser-scripts/issues
// @updateURL    https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/talent-interview-field-reminder.user.js
// @downloadURL  https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/talent-interview-field-reminder.user.js
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @grant        none

// @match        https://canonical.greenhouse.io/people/**?application_id=**
// ==/UserScript==

(function() {
    'use strict';

    /* Get the 'Talent Interview' button under the 'Move stage' popup field.
    The class for the button of the stage where the candidate is currently in is different from the class of the other buttons.
    Therefore this const will be undefined if the candidate is already in the Talent Interview stage when the page loads.*/
    const talentInterviewButton = Array.from(document
                               .querySelectorAll("div[class='small-button stage-option ']"))
                               .filter(element => element.textContent.includes("Talent Interview"))[0];

    // Add eventListener to create an alert when the 'Talent Interview' button is clicked and the candidate isn't already in the Talent Interview stage.
    talentInterviewButton.addEventListener('click', () => {
            alert("Please enter the 'HL - Proposed level' and 'HL - Years of relevant experience' information into the Application Custom Fields under the Application tab.")
        })
})();
