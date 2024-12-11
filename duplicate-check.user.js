// ==UserScript==
// @name         Open Candidate Profile in new Tab if Duplicate Badge is detected
// @namespace    https://canonical.com/
// @version      0.1.0
// @author       Thorsten Merten <thorsten.merten@canonical.com>
// @description  This script will color the entire header and open a new tab automatically if the candiate duplicate tag is detected. Saves time and reminds you to get merging.
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @homepageURL  https://github.com/canonical/greenhouse-browser-scripts
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @match        https://canonical.greenhouse.io/applications/review/app_review*
// @updateURL    https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/duplicate-check.user.js
// @downloadURL  https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/duplicate-check.user.js
// @supportURL   https://github.com/canonical/greenhouse-browser-scripts/issues
// @grant        GM_openInTab
// ==/UserScript==

/**
 * This script checks the page on page load and on candidate change for the duplicate tag.
 * If found it paints the entire header in duplicate tag color and opens the candidate profile
 * in a new tab for more convenient duplicate checking.
 */

(function () {
    "use strict";

    // all further operations are done in this element
    const reviewContainer = document.querySelector(
        'div[data-provides="app-review"]'
    );
    const header = reviewContainer.querySelector("header");

    function checkDuplicateAndOpenInTab() {
        /* do the actual checking and logging */
        if (reviewContainer) {
            let duplicateTag = reviewContainer.querySelector(
                'span[title="Potential duplicate"]'
            );

            if (duplicateTag) {
                // we could get the link from the mutation but this also works for first load
                let updatedLink = header.querySelector(
                    'a[target="_blank"][href*="people"]'
                );
                // match greenhouse tag color
                header.style.backgroundColor = "#f7c8b0";
                GM_openInTab(updatedLink.href);
            } else {
                header.style.backgroundColor = null;
            }
        }
    }

    // make sure to run before observer is registered to prevent double trigger
    checkDuplicateAndOpenInTab();

    // for page load (Do not use DOMSubtreeModified event as its obsolete and about to be deprecated)
    const observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
            if (mutation.type === "childList") {
                let foundLink = false;
                mutation.addedNodes.forEach((node) => {
                    if (node.innerHTML?.includes('href="/people/')) {
                        foundLink = true;
                    }
                });
                if (foundLink) {
                    setTimeout(function () {
                        // need to wait a bit until the new profile has been rendered
                        checkDuplicateAndOpenInTab();
                    }, 250);
                }
            }
        });
    });

    // watch the state of a particular element for updating instead of the whole container
    //   for some reason the observer is not triggered correctly every time if we watch for childList changes only
    //   watching for everything is less flaky but requires checking more mutations
    observer.observe(header, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
    }); // available props: attributes, characterData, childList, subtree
})();
