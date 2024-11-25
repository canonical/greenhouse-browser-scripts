// ==UserScript==
// @name         Open Candidate Profile in new Tab if Duplicate Batch is detected
// @namespace    https://canonical.com/
// @version      2024-11-25
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

(function () {
    "use strict";

    // do all operations in this container
    const reviewContainer = document.querySelector(
        'div[data-provides="app-review"]'
    );
    const header = reviewContainer.querySelector(
        'header'
    );
    const candidateLink = header.querySelector(
        'a[target="_blank"][href*="people"]'
    );

    function logMutations(mutationList) {
        /* convenience helper to log all possible mutations for a mutation list.
         * Takes a MutationObserver.mutationList and tries to log what changed
         * on the observed item
         */
        mutationList.forEach(mutation => {
            if (mutation.type === "childList") {
                console.log("A child node has been added or removed.");
                console.log(mutation)
            } else if (mutation.type === "characterData") {
                console.log("Character data change detected.");
                console.log(mutation)
            } else if (mutation.type === "subtree") {
                console.log("Subtree change detected.");
                console.log(mutation)
            } else if (mutation.type === "attributes") {
                console.log(`The ${mutation.attributeName} attribute was modified.`);
            }
        });
    }

    function checkDuplicateAndOpenInTab() {
        /* do the actual checking and logging */
        if (reviewContainer && candidateLink) {

            let duplicateTag = reviewContainer.querySelector('span[title="Potential duplicate"]');

            if (duplicateTag) {
                // match greenhouse tag color
                header.style.backgroundColor = '#f7c8b0';

                setTimeout(() => {
                    GM_openInTab(candidateLink.href);
                    //alert('in timeout and if duplicate tag: ' + candidateLink.href);
                }, 250);
            } else {
                header.style.backgroundColor = null;
            }
        }
    }

    // make sure to run before observer is registered to prevent double trigger
    checkDuplicateAndOpenInTab();

    // for page load (Do not use DOMSubtreeModified event as its obsolete and about to be deprecated)
    const observer = new MutationObserver(mutationList => {
        console.log('mutation observer triggered')
        // logMutations(mutationList);
        mutationList.forEach(mutation => {
            console.log(mutation)
            if (mutation.type === "childList" &&
                mutation.addedNodes.length > 0 &&
                mutation.removedNodes.length === 0)
            {
                console.log('found the mutation that adds the nodes')
                // trigger the check only if a node was added (avoids duplicate tab opening)
                checkDuplicateAndOpenInTab();
            }
        });
    });

    // watch the state of a particular element for updating instead of the whole container
    observer.observe(header, { attributes: false, characterData: false, childList: true, subtree: true }); // availale props: attributes, characterData, childList, subtree

})();