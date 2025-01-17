// ==UserScript==
// @name         Greenhouse Application Review
// @namespace    https://canonical.com/
// @version      1.1.3
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

        // check for reject modal before continuing
        const rejectModalChecker = setInterval(() => {
            const rejectModal = document.querySelector("#reject-modal");
            if (rejectModal) {
                clearInterval(rejectModalChecker);
                rejectModal.classList.add("hide-modal");
                
                // wait for reject modal to be hidden before continuing
                setTimeout(() => {
                    // open reason selector dropdown
                    let reasonSelector = rejectModal.querySelector(
                        "[data-provides='reject-reason-dropdown'] .Select-value-label"
                    );
                    if (!reasonSelector) {
                        reasonSelector = rejectModal.querySelector(
                            "[data-provides='reject-reason-dropdown'] .Select-placeholder"
                        );
                    }
                    reasonSelector.dispatchEvent(keyDown);

                    // interval to check for dropdown menu
                    const dropdownMenuChecker = setInterval(() => {
                        const dropdownMenu =
                            rejectModal.querySelector(".Select-menu-outer");
                        if (dropdownMenu) {
                            clearInterval(dropdownMenuChecker);
                            const reasonOptions = rejectModal.querySelectorAll(
                                ".Select-menu-outer .Select-option"
                            );
                            reasonOptions.forEach(function (option) {
                                if (option.getAttribute("aria-label") === reason) {
                                    option.dispatchEvent(mouseDown);
                                }
                            });

                            // check for email input and reject button, strictly after reason is selected
                            const sendEmailInput = rejectModal.querySelector("#send-email");
                            const rejectButton = rejectModal.querySelector('a[title="Reject this candidate"]');
                            
                            if (!sendEmailInput) {
                                // no email input found. candidate is not emailable for whatever reason,
                                // so we ask HL what they would like to do and handle the case of
                                // non-emailable candidate separately
                                const warning = (
                                    "Unable to send rejection email. " +
                                    "Candidate may be marked as \"Do Not Email\"."
                                );
                                console.warn(warning);
                                const shouldStillReject = confirm(
                                    warning + 
                                    "\n\nIf you would like to reject anyways, click OK. " +
                                    "Otherwise, click Cancel."
                                );
                                if (!shouldStillReject) {
                                    setEnabled();
                                    return;
                                }
                                
                                // handle non-emailable candidate rejection
                                rejectButton.click();
                                setEnabled();
                                setTimeout(() => rejectModal.classList.remove("hide-modal"), 500);
                                return;
                            }

                            // handle emailable candidate rejection
                            if (!sendEmailInput.checked) {
                                sendEmailInput.click();
                            }
                            let fromInput;
                            let subjectInput;
                            const dropdownContainers = rejectModal.querySelectorAll(
                                "#reject-modal .sl-dropdown-container"
                            );
                            dropdownContainers.forEach((input) => {
                                if (
                                    input.parentElement.parentElement.querySelector("label")
                                        ?.innerText === "From"
                                ) {
                                    fromInput = input;
                                }
                            });
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
                                    setFromToNoReply(fromInput);
                                    rejectButton.click();
                                    setEnabled();
                                    setTimeout(() => rejectModal.classList.remove("hide-modal"), 500);
                                }
                            }, 500); // interval to wait for subject input to populate before rejection
                        }
                    }, 100); // interval to check for reason selector dropdown
                }, 100); // interval to wait for reject modal to be hidden
            }
        }, 100); // interval to wait for reject modal to be visible
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
    function setFromToNoReply(fromInput) {
        if (!fromInput.innerText.startsWith("no-reply")) {
            fromInput
                .querySelector(".sl-dropdown__control")
                .dispatchEvent(mouseDown);
            const replyOption = fromInput.querySelectorAll(
                ".sl-dropdown__option"
            );

            replyOption.forEach(function (option) {
                if (option.innerText.startsWith("no-reply")) {
                    option.click();
                    option.dispatchEvent(mouseDown);
                }
            });
        }
    }

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
