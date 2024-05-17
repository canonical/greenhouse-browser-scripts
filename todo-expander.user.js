// ==UserScript==
// @name         Greenhouse Expander
// @namespace    https://canonical.com/
// @version      1.0.0
// @author       Canonical's workplace engineering team
// @description  Toggle that reveals and hides the latest updates
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @homepageURL  https://github.com/canonical/greenhouse-browser-scripts
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @supportURL   https://github.com/canonical/greenhouse-browser-scripts/issues

// @match        https://canonical.greenhouse.io/people*
// @match        https://canonical.greenhouse.io/plans*
// ==/UserScript==

(function () {
    "use strict";
    const buttonsContainer = document.querySelector("#buttons");
    const bulkButton = document.querySelector("#enable_bulk_actions");

    if (buttonsContainer) {
        addUI(buttonsContainer);
        var toogleButton = document.querySelector("#toogle-reveal");
        toogleButton.addEventListener("click", toggleListener);
    }

    if (bulkButton) {
        bulkButton.addEventListener("click", addUI);
    }

    function toggleListener(e) {
        e.preventDefault();
        var toogles = document.querySelectorAll(".toggle-interviews");
        toogles.forEach((toogle) => {
            toogle.click();
        });
    }

    function addUI(container) {
        container.insertAdjacentHTML(
            "afterbegin",
            /* html */
            `<a class="large-button" id="toogle-reveal" href="#" style="margin-right: 8px;float: left;font-size: 14px;">Reveal all</a>`
        );
    }
})();
