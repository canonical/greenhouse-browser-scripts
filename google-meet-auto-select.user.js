// ==UserScript==
// @name         Greenhouse Google Meet Auto-select
// @namespace    https://canonical.com/
// @version      0.1.0
// @author       Nathan Clairmonte <nathan.clairmonte@canonical.com>
// @description  Automatically selects "Google Meet" option for video conferencing on Greenhouse manual scheduling page.
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @homepageURL  https://github.com/canonical/greenhouse-browser-scripts
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @updateURL    https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/google-meet-auto-select.user.js
// @downloadURL  https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/google-meet-auto-select.user.js
// @supportURL   https://github.com/canonical/greenhouse-browser-scripts/issues
// @connect      https://canonical.greenhouse.io
// @match        https://*.greenhouse.io/interviews/scheduler?*landing_page=manualScheduling*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    // set this to true for more verbose logging
    const DEBUG = false;

    /**
     * helper to log with debug flag
     */
    function log(message) {
        if (DEBUG) {
            console.log("[GH GMeet Auto-select DEBUG] " + message);
        }
    }

    console.log("[GH GMeet Auto-select] Script execution started.", true);

    const MAX_RETRIES = 100;
    const RETRY_DELAY = 50;
    let hasSuccessfullySelectedMeet = false;
    let workflowActionInProgress = false;

    /**
     * function to check if an element is currently visible in the DOM
     */
    function isElementVisible(el) {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
    }

    /**
     * function to dispatch a mouse event to a specified element
     */
    function dispatchMouseEvent(element, type) {
        if (!element) {
            log(
                `dispatchMouseEvent: Cannot dispatch ${type}, element is null.`
            );
            return false;
        }
        log(
            `dispatchMouseEvent: Dispatching ${type} on ${
                element.id || element.className
            }`
        );
        const event = new MouseEvent(type, {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(event);
        return true;
    }

    /**
     * function to dispatch a keyboard event to a specified element
     */
    function dispatchKeyboardEvent(element, eventType, keyName) {
        if (!element) {
            log(
                `Cannot dispatch ${eventType} (key: ${keyName}), element is null.`
            );
            return false;
        }
        log(
            `dispatchKeyboardEvent: Dispatching ${eventType} (key: ${keyName}) on ${
                element.id || element.className
            }`
        );
        const event = new KeyboardEvent(eventType, {
            key: keyName,
            code: keyName,
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        element.dispatchEvent(event);
        return true;
    }

    /**
     * main workflow: checks if we are on the "Schedule Summary" page,
     * then either clicks "Add Video Conferencing" link or calls selectGoogleMeet.
     */
    function runWorkflow() {
        // don't start a new workflow if one is active or already succeeded
        if (workflowActionInProgress || hasSuccessfullySelectedMeet) {
            return;
        }
        log("runWorkflow: Searching for 'Add Video Conferencing' link...");

        // get the "Add Video Conferencing" link
        let addVideoLink = Array.from(
            document.querySelectorAll(
                'a[data-provides="add-video-conferencing-link"]'
            )
        ).find(
            (a) =>
                isElementVisible(a) &&
                a.textContent?.trim() === "Add Video Conferencing"
        );

        if (!isElementVisible(addVideoLink)) {
            log(
                "runWorkflow: Cannot find 'Add Video Conferencing' link. Likely still on calendar page. Waiting for retry..."
            );
            return;
        }

        workflowActionInProgress = true;
        log("runWorkflow: 'Add Video Conferencing' link found. Clicking it.");
        dispatchMouseEvent(addVideoLink, "click");

        let retries = 0;
        const workflowIntervalId = setInterval(() => {
            // exit if already succeeded
            if (hasSuccessfullySelectedMeet) {
                clearInterval(workflowIntervalId);
                log("runWorkflow: Google Meet already selected, stopping.");
                workflowActionInProgress = false;
                return;
            }

            // abort if exceeded max retries
            retries++;
            if (retries > MAX_RETRIES) {
                clearInterval(workflowIntervalId);
                log("runWorkflow: Max retries for actions. Aborting.");
                workflowActionInProgress = false;
                return;
            }

            const videoDropdown = document.getElementById(
                "select-video-provider"
            );
            addVideoLink = Array.from(
                document.querySelectorAll(
                    'a[data-provides="add-video-conferencing-link"]'
                )
            ).find(
                (a) =>
                    isElementVisible(a) &&
                    a.textContent?.trim() === "Add Video Conferencing"
            );

            if (isElementVisible(videoDropdown)) {
                log(
                    "runWorkflow: Video conferencing selection area is visible. Proceeding to select Google Meet."
                );
                clearInterval(workflowIntervalId);
                selectGoogleMeet();
            } else if (addVideoLink) {
                log(
                    "runWorkflow: 'Add Video Conferencing' link exists but click failed. Clicking again."
                );
                dispatchMouseEvent(addVideoLink, "click");
            } else {
                log(
                    "runWorkflow: 'Add Video Conferencing' link disappeared or video area not yet visible. Waiting for retry..."
                );
            }
        }, RETRY_DELAY);
    }

    /**
     * attempts to select "Google Meet" from the video conferencing dropdown.
     */
    async function selectGoogleMeet() {
        // exit if we have already succeeded
        if (hasSuccessfullySelectedMeet) {
            workflowActionInProgress = false;
            return;
        }
        log("selectGoogleMeet: Attempting to select Google Meet...");

        let retries = 0;
        const selectIntervalId = setInterval(() => {
            // exit if we have already succeeded
            if (hasSuccessfullySelectedMeet) {
                clearInterval(selectIntervalId);
                workflowActionInProgress = false;
                return;
            }

            // abort if we have exceeded max retries
            retries++;
            if (retries > MAX_RETRIES) {
                clearInterval(selectIntervalId);
                log(
                    "selectGoogleMeet interval: Max retries reached for selecting Google Meet. Aborting."
                );
                workflowActionInProgress = false;
                return;
            }

            // select the dropdown container. exit and wait for retry if it's not there yet
            const dropdownContainer = document.getElementById(
                "select-video-provider"
            );
            if (!isElementVisible(dropdownContainer)) {
                log(
                    "selectGoogleMeet interval: Video dropdown container not visible yet. Waiting for retry..."
                );
                return;
            }

            // select relevant dropdown elements
            const dropdownInput = dropdownContainer.querySelector(
                "input#add_video_conferencing_input"
            );
            const dropdownControl = dropdownContainer.querySelector(
                ".sl-dropdown__control"
            );
            const selectedValueDisplay = dropdownContainer.querySelector(
                ".sl-dropdown__single-value"
            );

            // if success, update hasSuccessfullySelectedMeet flag and exit
            if (
                selectedValueDisplay &&
                selectedValueDisplay.textContent?.trim() === "Google Meet"
            ) {
                console.log(
                    "[GH GMeet Auto-select] Google Meet option selected. Success!"
                );
                hasSuccessfullySelectedMeet = true;
                clearInterval(selectIntervalId);
                workflowActionInProgress = false;
                return;
            }

            // first check if dropdown menu is open already
            // if not, focus and dispatch arrowdown to open it
            if (dropdownInput && dropdownControl) {
                const menu =
                    dropdownContainer.querySelector(".sl-dropdown__menu");
                const isMenuOpen =
                    dropdownControl.classList.contains(
                        "sl-dropdown__control--menu-is-open"
                    ) || isElementVisible(menu);
                if (!isMenuOpen) {
                    log(
                        "selectGoogleMeet: Dropdown menu not open. Focusing input and dispatching ArrowDown."
                    );
                    dropdownInput.focus();
                    // N.B. click event does not open dropdown, we must dispatch arrowdown instead
                    dispatchKeyboardEvent(
                        dropdownInput,
                        "keydown",
                        "ArrowDown"
                    );
                } else {
                    log(
                        "selectGoogleMeet: Dropdown menu is open. Attempting to find and select Google Meet option."
                    );
                    const googleMeetOption = Array.from(
                        document.querySelectorAll(".sl-dropdown__option")
                    ).find(
                        (option) =>
                            option.textContent?.trim() === "Google Meet" &&
                            isElementVisible(option)
                    );

                    if (googleMeetOption) {
                        log(
                            "selectGoogleMeet: Google Meet option found. Clicking it."
                        );
                        dispatchMouseEvent(googleMeetOption, "click");
                    } else {
                        log(
                            "selectGoogleMeet: Google Meet option not found in visible menu. Waiting for retry..."
                        );
                    }
                }
            } else {
                log(
                    "selectGoogleMeet: Dropdown input or control not found. Waiting for retry..."
                );
            }
        }, RETRY_DELAY);
    }

    // set up mutation observer to watch for changes on page
    const observer = new MutationObserver(() => {
        if (hasSuccessfullySelectedMeet) {
            observer.disconnect();
            return;
        }
        if (!workflowActionInProgress) {
            runWorkflow();
        }
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
})();
