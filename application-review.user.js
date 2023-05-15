// ==UserScript==
// @name         Greenhouse Application Review
// @namespace    https://canonical.com/
// @version      1.1.0
// @author       Canonical's workplace engineering team
// @description  Add shortcut buttons to application review page
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @homepageURL  https://github.com/canonical/greenhouse-browser-scripts
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @updateURL    https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/application-review.user.js
// @downloadURL  https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/application-review.user.js
// @supportURL   https://github.com/canonical/greenhouse-browser-scripts/issues

// @match        https://canonical.greenhouse.io/applications/review/app_review*
// ==/UserScript==

(function () {
    "use strict";

    const rejectBtnEl = document.querySelector("*[data-provides='reject']");
    const actionsBarEl = rejectBtnEl.parentNode;

    const keyDown = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        keyCode: 13,
    });
    const mouseDown = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
    });

    addUI(actionsBarEl);

    document
        .querySelectorAll(".rejection__button[data-reason]")
        .forEach((rejectionButton) => {
            rejectionButton.addEventListener("click", handleRejectClick);
        });

    function handleRejectClick(e) {
        const element = e.target;
        const reason = element.dataset.reason;
        addSpinner(element);
        setLoading();
        rejectBtnEl.click();
        const rejectModal = document.querySelector("#reject-modal");
        rejectModal.classList.add("hide-modal");
        const sendEmailInput = rejectModal.querySelector("#send-email");
        if (!sendEmailInput.checked) {
            sendEmailInput.click();
        }
        const rejectButton = rejectModal.querySelector(
            'a[title="Reject this candidate"]'
        );
        let reasonSelector = rejectModal.querySelector(
            "[data-provides='reject-reason-dropdown'] .Select-value-label"
        );
        if (!reasonSelector) {
            reasonSelector = rejectModal.querySelector(
                "[data-provides='reject-reason-dropdown'] .Select-placeholder"
            );
        }
        reasonSelector.dispatchEvent(keyDown);
        const reasonOption = rejectModal.querySelectorAll(
            ".Select-menu-outer .Select-option"
        );
        reasonOption.forEach(function (option) {
            if (option.getAttribute("aria-label") === reason) {
                option.dispatchEvent(mouseDown);
            }
        });
        let subjectInput;
        const inputs = rejectModal.querySelectorAll(
            '#reject-modal input[type="text"]'
        );
        inputs.forEach((input) => {
            if (input.previousElementSibling?.innerText === "Subject") {
                subjectInput = input;
            }
        });
        const rejectChecker = setInterval(() => {
            if (subjectInput.value !== "") {
                clearInterval(rejectChecker);
                rejectButton.click();
                setEnabled();
                setTimeout(
                    () => rejectModal.classList.remove("hide-modal"),
                    500
                );
            }
        }, 500);
    }

    // State utilities

    function addSpinner(el) {
        el.insertAdjacentHTML(
            "afterbegin",
            `
    <div class="spinner"></div>
    `
        );
        el.setAttribute("disabled", "true");
    }

    function setLoading() {
        const quickRejectionButtons = document.querySelectorAll(
            ".rejection__button[data-reason]"
        );
        quickRejectionButtons.forEach((quickRejectionButton) => {
            quickRejectionButton.setAttribute("disabled", "true");
        });
    }

    function setEnabled() {
        const quickRejectionButtons = document.querySelectorAll(
            ".rejection__button[data-reason]"
        );
        quickRejectionButtons.forEach((quickRejectionButton) => {
            quickRejectionButton.getElementsByClassName("spinner")[0]?.remove();
            quickRejectionButton.disabled = false;
        });
    }

    // Common functions

    function addUI(container) {
        container.insertAdjacentHTML(
            "afterbegin",
            /* html */
            `
    <div class="rejection">
      <button data-name="Lacking skills" data-reason="Lacks domain experience" class="rejection__button">
        Lacking skills
      </button>
      <button data-name="Academics" data-reason="Academic track record" class="rejection__button">
        Lacking academics
      </button>
      <button data-name="Illegible language" data-reason="Illegible language" class="rejection__button">
        Illegible language
      </button>
      <button data-name="Jumpy career" data-reason="Jumpy career" class="rejection__button">
        Jumpy career
      </button>
    </div>
    <style>
    .rejection {
       display: flex;
    }

    .rejection__button {
        height: 36px;
        background-color: #d8372a;
        color: white;
        font-weight: 600;
        border: none;
        padding: 0 1rem;
        border-radius: 3px;
        font-size: 0.75rem;
        margin: 0;
        margin-right: 0.5rem;
        cursor: pointer;
        align-content: center;
        display: flex;
        align-items: center;
   }

   .rejection__button:hover {
       background-color: #af2b20;
   }

   .rejection__button[aria-expanded=true] {
       background-color: #af2b20;
   }

   .rejection__button:disabled, .rejection__button:disabled:hover {
       background-color: #767676;
       cursor: not-allowed;
   }

   .hide-modal {
        left: -150000px;
        opacity: 0;
   }

   .spinner {
       margin-right: 0.5rem;
       background: #767676;
       width: 0.75rem;
       height: 0.75rem;
       min-width: 0.75rem;
       border: 3px solid white;
       border-top: 3px solid #767676;
       border-radius: 50%;
       transition-property: transform;
       animation-name: rotate;
       animation-duration: 1.2s;
       animation-iteration-count: infinite;
       animation-timing-function: linear;
    }

    @-webkit-keyframes rotate {
        from {ransform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }
    </style>
`
        );
    }
})();
