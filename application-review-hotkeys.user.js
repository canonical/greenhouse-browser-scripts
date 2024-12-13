// ==UserScript==
// @name         Greenhouse Application Review Hotkeys
// @namespace    https://canonical.com/
// @version      0.1.0
// @author       Anton Troyanov <anton.troyanov@canonical.com>
// @description  This script will add badges and hotkeys support to action buttons on the Application Review page
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @homepageURL  https://github.com/canonical/greenhouse-browser-scripts
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @match        https://canonical.greenhouse.io/applications/review/app_review*
// @updateURL    https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/application-review-hotkeys.user.js
// @downloadURL  https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/application-review-hotkeys.user.js
// @supportURL   https://github.com/canonical/greenhouse-browser-scripts/issues
// @connect      https://canonical.greenhouse.io
// ==/UserScript==

(function() {
    'use strict';

    const advanceButton = document.querySelector("*[data-provides='advance']");
    const rejectButton = document.querySelector("*[data-provides='reject']");

    const actionButtons = document.querySelectorAll(".rejection__button");

    function addBadgeToButton(element, text) {
        const badge = document.createElement('span');
        badge.textContent = text;
        badge.style.position = 'absolute';
        badge.style.top = '1px';
        badge.style.right = '1px';
        badge.style.backgroundColor = 'gray';
        badge.style.color = 'white';
        badge.style.fontSize = '12px';
        badge.style.width = '16px';
        badge.style.height = '16px';
        badge.style.display = 'flex';
        badge.style.justifyContent = 'center';
        badge.style.alignItems = 'center';
        badge.style.borderRadius = '50%';

        element.style.position = 'relative';

        element.appendChild(badge);
    }

    addBadgeToButton(advanceButton, 'A');
    addBadgeToButton(rejectButton, 'R');

    for (let i = 0; i < actionButtons.length; i++) {
        const button = actionButtons[i];
        addBadgeToButton(button, i+1);
    }

    document.addEventListener('keydown', function (event) {
        const isEditable = event.target.tagName === 'INPUT' ||
              event.target.tagName === 'TEXTAREA' ||
              event.target.isContentEditable;

        if (isEditable) {
            return
        }

        if (event.key === 'a') {
            advanceButton.click()
        }
        else if (event.key === 'r') {
            rejectButton.click()
        }
        else {
            const n = Number(event.key)
            if (!isNaN(n)) {
                actionButtons[n-1].click()
            }
        }
    });
})();
