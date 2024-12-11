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
// @connect      https://canonical.greenhouse.io
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// ==/UserScript==

/**
 * This script checks the page on page load and on candidate change for the duplicate tag.
 * If found it paints the entire header in duplicate tag color and
 * opens both candidate profiles in new tabs for more convenient duplicate checking.
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

                /*
                grab merge page url.
                format: https://canonical.greenhouse.io/people/{candidateId}/merge?application_id={applicationId}
                the new candidate page redesign alters how the url works, from "?application_id=" to "applications/"
                */
                let mergeUrl = (updatedLink.href.includes("?application_id="))?
                                updatedLink.href.replace("?application_id=", "/merge?application_id=") :
                                updatedLink.href.replace("applications/", "/merge?application_id=")

                // fetch merge page and open the duplicate profile in a new tab
                GM_xmlhttpRequest({
                    method: "GET",
                    url: mergeUrl,
                    onload: function(response) {
                        let duplicateUrl = response.responseXML.getElementById("primary_merge_candidate").querySelector(
                            'a[target="_blank"][href*="people"]'
                        );
                        GM_openInTab(duplicateUrl.href);
                    }
                });
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
