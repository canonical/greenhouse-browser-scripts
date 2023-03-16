// ==UserScript==
// @name         Greenhouse Application Review
// @namespace    https://canonical.com/
// @version      0.3.0
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

// reload the page if requested by previous operations
if (location.href.includes("canonical-reload=true"))
    window.location = window.location.href.replace(/&canonical-reload=.+/, "");

checkForNotification();

initActionsDropdown();
try {
    addRejectionButton({
        name: "Wrong timezone",
        reason: "Wrong timezone",
        sendEmail: true,
    });
    addRejectionButton({
        name: "Academics",
        reason: "Academic track record",
        sendEmail: true,
    });
    addRejectionButton({
        name: "Illegible",
        note: "Submission not in English",
        reason: "Other (add notes below)",
        sendEmail: true,
    });
} catch (error) {
    pushNotification(error.message, true);
    checkForNotification();
}

function initActionsDropdown() {
    const rejectBtnEl = document.querySelector("*[data-provides='reject']");
    const actionsBarEl = rejectBtnEl.parentNode;

    actionsBarEl.insertAdjacentHTML(
        "afterbegin",
        /* html */
        `
        <div class="rejection">
         <button id="lacking-skill-button" class="rejection-button">
            Lacking skills
        </button>
        <div class="contextual-menu--left">
            <button class="rejection-button contextual-menu__toggle has-icon" aria-controls="menu-1" aria-expanded="false" aria-haspopup="true">
                <i class="arrowhead">
                     <svg width="15" height="10" viewBox="-2.5 -5 45 30" preserveAspectRatio="none">
                         <path d="M0,0 l15,20 l15,-20" fill="none" stroke="white" stroke-linecap="round" stroke-width="5" />
                     </svg>
                </i>
                <span>Quick rejections</span>
            </button>
            <span class="contextual-menu__dropdown" id="menu-1" aria-hidden="true">
                <span class="contextual-menu__group" id="additional-actions">
                <!-- Actions will be added here -->
                </span>
            </span>
         </div>
        </div>
    <style>
        .rejection {
           display: flex;
        }
        .rejection-button {
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

       .rejection-button:hover {
           background-color: #af2b20;
       }

       .rejection-button[aria-expanded=true] {
           background-color: #af2b20;
       }

       .rejection-button:disabled, .rejection-button:disabled:hover {
           background-color: #767676;
           cursor: not-allowed;
       }

       .contextual-menu__group {
            display: flex;
            flex-direction: column;
            position: absolute;
            background: white;
            border: 1px solid rgb(217, 217, 217);
        }

        .arrowhead {
           margin-right: 0.3rem;
           margin-top: 0.2rem;
        }

        .contextual-menu__link {
            border: none;
            outline: none;
            text-align: left;
            height: 2rem;
            width: 7rem;
            padding: 0 1rem;
            background: white;
            cursor: pointer;
        }

        .contextual-menu__link:hover {
            background: rgb(225, 225, 225);
        }

        .contextual-menu__dropdown {
            display: none;
        }


        .contextual-menu__dropdown[aria-hidden=false] {
            display: block;
        }

        .spinner {
            margin-right: 0.5rem;
            background: #767676;
            width: 0.75rem;
            height: 0.75rem;
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

    // add a listener
    const rejectionButtonEl = document.getElementById("lacking-skill-button");
    if (!rejectionButtonEl)
        throw new Error(
            "[Canonical GH] Failed to add the rejection button lacking-skill-button"
        );
    rejectionButtonEl.addEventListener("click", async () => {
        try {
            setQuickRejectionLoading();
            await reject({
                name: "Lacking skills",
                reason: "Lacks domain experience",
                note: null,
                startNewProcessAfterRejection: false,
                sendEmail: true,
            });
        } catch (error) {
            pushNotification(error.message, true);
            setEnabled();
            checkForNotification();
        }
    });
}

/**
 * add a rejection button to the addition actions list
 * @param {{
 * name: string,
 * reason: string,
 * note: string|null,
 * startNewProcessAfterRejection: boolean,
 * sendEmail: boolean
 * }}
 */
function addRejectionButton({
    name,
    reason,
    note = null,
    startNewProcessAfterRejection = false,
    sendEmail,
}) {
    if (!name || !reason)
        throw new Error("[Canonical GH] Missing rejection reason");
    // insert the button to the DOM
    const actionsListEl = document.getElementById("additional-actions");
    if (!actionsListEl)
        throw new Error(
            "[Canonical GH] Failed to find the custom actions list"
        );
    const id = escapeId(name);
    actionsListEl.insertAdjacentHTML(
        "afterbegin",
        /* HTML */
        `<button class="contextual-menu__link" id="${id}">${name}</button>`
    );

    // add a listener
    const rejectionButtonEl = document.getElementById(id);
    if (!rejectionButtonEl)
        throw new Error(
            "[Canonical GH] Failed to add the rejection button " + name
        );
    rejectionButtonEl.addEventListener("click", async () => {
        try {
            setLoading();
            await reject({
                name,
                reason,
                note,
                startNewProcessAfterRejection,
                sendEmail,
            });
        } catch (error) {
            setEnabled();
            pushNotification(error.message, true);
            checkForNotification();
        }
    });
}

/**
 * fill the rejection form and submit
 * @private
 * @param {object} rejection
 * @param {string} rejection.reason the rejection reason
 * @param {boolean} rejection.sendEmail indicates whether we should try to send an email
 * @param {string|null} rejection.note the rejection node
 * @param {boolean} rejection.startNewProcessAfterRejection whether this option needs to be enable on rejection
 *
 */
async function reject({
    reason,
    sendEmail,
    note = null,
    startNewProcessAfterRejection = false,
}) {
    const mainEl = document.querySelector(
        "#app_review_wrapper [data-react-props]"
    );
    if (!mainEl)
        throw new Error("[Canonical GH] Failed to get the application context");
    const context = JSON.parse(mainEl.getAttribute("data-react-props"));
    const applicationId = context.current_application?.id;
    const personId = context.current_application?.person_id;
    const stageId = context.current_application?.current_stage?.app_stage_id;
    if (!(applicationId && stageId && personId))
        throw new Error(
            "[Canonical GH] Missing data in the application context"
        );
    const formData = await getRejectionFormData(applicationId);

    const rejectionReasonId = formData.rejection_options
        .find(({ label }) => label.match(/we rejected them/i))
        ?.options.find(
            ({ label }) =>
                label === reason || label.match(new RegExp(reason, "i"))
        )?.value;
    if (!rejectionReasonId)
        throw new Error("[Canonical GH] Rejection reason not found: " + reason);
    sendEmail = sendEmail && formData.can_email;
    let payload = {
        from_review_tool: true,
        from_stage_id: stageId,
        action_type: "reject",
        reject_from_all: false,
        create_prospect_from_rejection: startNewProcessAfterRejection,
        on_other_active_hiring_plans: false,
        rejection_reason: rejectionReasonId,
        send_rejection_email: sendEmail ? true : null,
        rejection_details: {},
    };
    if (sendEmail) {
        const defaultEmailTemplateId = formData.email_template_options.find(
            ({ label }) =>
                label.match(new RegExp("Default Candidate Rejection", "i"))
        )?.value;
        if (!defaultEmailTemplateId)
            throw new Error(
                "[Canonical GH] Default email template not found: " + reason
            );
        const emailTemplate = await getEmailTemplate(
            personId,
            applicationId,
            defaultEmailTemplateId
        );

        payload = {
            ...payload,
            rejection_from: emailTemplate.from,
            rejection_to: formData.to_options[0].value,
            rejection_cc: emailTemplate.cc.join(","),
            rejection_cc_recruiter: emailTemplate.cc_recruiter,
            rejection_cc_coordinator: emailTemplate.cc_coordinator,
            rejection_subject: emailTemplate.subject,
            rejection_html_body: emailTemplate.html_body,
            rejection_send_at: formData.when_email_options[0].value,
            custom_attachment_url: "",
            custom_attachment_filename: "",
            rejection_email_template: defaultEmailTemplateId,
        };
    }

    if (note) payload.rejection_note = note;

    const response = await fetch(
        `https://canonical.greenhouse.io/applications/review/app_review/${applicationId}/reject`,
        {
            headers: {
                accept: "application/json",
                "content-type": "application/json;charset=UTF-8",
                "x-csrf-token": getCSRFToken(),
            },
            body: JSON.stringify(payload),
            credentials: "include",
            method: "POST",
            mode: "cors",
            referrer: location.href,
            referrerPolicy: "strict-origin-when-cross-origin",
        }
    );
    if (!response.ok)
        throw new Error("[Canonical GH] Invalid rejection payload");
    await navigateToNextApplication(
        context.applications.filter(
            (application) => application.id !== applicationId
        )
    );
}

/**
 * @typedef {Object} RejectionFormData
 * @property {boolean} can_email
 * @property {boolean} source_display
 * @property {boolean} referred_by_agency
 * @property {number} num_other_hiring_plans
 * @property {boolean} can_reject_from_all
 * @property {boolean} new_coordinator_required
 * @property {boolean} new_coordinator_options
 * @property {boolean} new_recruiter_required
 * @property {boolean} new_recruiter_options
 * @property {boolean} can_create_prospect
 * @property {boolean} can_create_new_reason
 * @property {boolean} rejection_reason_required
 * @property {string} cc_options_path
 *
 * @property {{
 * label: string,
 * value: string,
 * disabled: boolean,
 * options: { label: string, value: number, type: string }[]
 * }[]} rejection_options
 *
 * @property {{
 * label: string,
 * value: number,
 * type: string
 * }[]} custom_rejection_type_options
 *
 * @property {{
 * label: string,
 * value: number,
 * office_ids: number[],
 * default: boolean,
 * url: string,
 * anywhere: boolean
 * }[]} email_template_options
 *
 * @property {{
 * label: string,
 * value: string
 * }[]} from_options
 *
 * @property {{
 * label: string,
 * value: string
 * }[]} to_options
 *
 *
 * @property {{
 * label: string,
 * value: string
 * }[]} when_email_options
 *
 * @property {{
 * label: string
 * value: number
 * }[]} time_options
 *
 * @property {Object[]} custom_fields
 *
 * @property {string[]} currencies
 */
/**
 * get the rejection details for the current application
 * @param {number} applicationId current application's id
 * @returns {Promise<RejectionFormData>}
 */
function getRejectionFormData(applicationId) {
    return httpGetJson(
        `https://canonical.greenhouse.io/applications/review/app_review/${applicationId}/reject_modal`,
        "[Canonical GH] Failed to get application rejection form data"
    );
}

/**
 *
 * @returns @typedef {Object} EmailTemplate
 * @property {string} status
 * @property {string} subject
 * @property {string} body
 * @property {string} html_body
 * @property {string} from
 * @property {string[]} cc
 * @property {boolean} cc_recruiter
 * @property {boolean} cc_coordinator
 * @property {Object[]} attachment
 */

/**
 * get the rejection pre filled email details
 * @param {number} personId applicant
 * @param {number} applicationId application to reject
 * @param {number} emailTemplateId the email template
 * @returns {Promise<EmailTemplate>}
 */
async function getEmailTemplate(personId, applicationId, emailTemplateId) {
    const emailTemplate = await httpGetJson(
        `https://canonical.greenhouse.io/person/${personId}/email_templates/${emailTemplateId}?application_id=${applicationId}`,
        "[Canonical GH] Failed to get application rejection email template"
    );
    if (!emailTemplate)
        throw new Error(
            "[Canonical GH] Failed to retrieve email template with id " +
                emailTemplateId
        );
    return emailTemplate;
}

async function httpGetJson(url, errorMsg) {
    try {
        const response = await fetch(url, {
            headers: {
                accept: "application/json",
                "x-csrf-token": getCSRFToken(),
            },
            referrer: location.href,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
        });
        if (!response.ok) throw new Error();
        return await response.json();
    } catch {
        throw new Error(errorMsg);
    }
}

async function navigateToNextApplication(applications) {
    await sleep(1000);

    const nextApplicationEl = document.querySelector("[data-provides*=skip]");
    if (nextApplicationEl && applications.length) {
        nextApplicationEl.click();
        removeNotification();
        pushNotification("Application rejected successfully");
        // the restart option indicates that once the reload page is done
        // and the script is loaded, do another reload to update the cached data
        window.location =
            window.location.href.replace(/&canonical-reload=.+/, "") +
            "&canonical-reload=true";
    } else {
        pushNotification("No more applications to review 🎉");
        window.location = window.location.href;
    }
}

/*--------------------------------------------------*/
/*                    Utilities                     */
/*--------------------------------------------------*/
function escapeId(name) {
    return "canonical-" + name.replace(/(-|\/|,|\s)/gi, "-");
}
function getCSRFToken() {
    return document
        .querySelector("meta[name=csrf-token]")
        .getAttribute("content");
}

function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

/*--------------------------------------------------*/
/*         Vanilla framework CSS utilities          */
/*--------------------------------------------------*/

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
    const rejectionDropdownEl = document.querySelector(
        "[aria-controls=menu-1]"
    );

    addSpinner(rejectionDropdownEl);

    // close the dropdown menu
    document.body.click();

    const quickRejectionButton = document.getElementById(
        "lacking-skill-button"
    );
    quickRejectionButton.setAttribute("disabled", "true");
}

function setQuickRejectionLoading() {
    const quickRejectionButton = document.getElementById(
        "lacking-skill-button"
    );
    addSpinner(quickRejectionButton);

    const rejectionDropdownEl = document.querySelector(
        "[aria-controls=menu-1]"
    );
    rejectionDropdownEl.setAttribute("disabled", "true");
}

function setEnabled() {
    const rejectionDropdownEl = document.querySelector(
        "[aria-controls=menu-1]"
    );
    rejectionDropdownEl.getElementsByClassName("spinner")[0]?.remove();
    rejectionDropdownEl.disabled = false;

    const quickRejectionButton = document.getElementById(
        "lacking-skill-button"
    );
    quickRejectionButton.getElementsByClassName("spinner")[0]?.remove();
    quickRejectionButton.disabled = false;
}

function pushNotification(message, error = false) {
    localStorage.setItem(
        "canonical.notification",
        JSON.stringify({
            message: message.replace("[Canonical GH] ", ""),
            error,
        })
    );
}

function checkForNotification() {
    const notification = localStorage.getItem("canonical.notification");
    if (!notification) return;

    const { message, error } = JSON.parse(notification);
    document.body.insertAdjacentHTML(
        "afterbegin",
        /* HTML */
        `
            <div
                class="notification--${error ? "negative" : "positive"}"
                id="notification"
            >
                <div class="notification__content">
                    <h5 class="notification__title">${message}</h5>
                    <p class="notification__message">Canonical automation</p>
                    <button
                        class="notification__close"
                        aria-controls="notification"
                    >
                        X
                    </button>
                </div>
            </div>
            <style>
                #notification {
                    z-index: 9999;
                    max-width: 20rem;
                    padding: 0.5rem 3rem;
                    margin: 1rem;
                    position: fixed;
                    right: 0;
                    top: 0;
                    background: white;
                    border-left: 0.5rem solid #008561;
                    border-radius: 2px;
                }

                .notification__close {
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    position: absolute;
                    right: 0.5rem;
                    top: 0.5rem;
                    font-size: 1rem;
                }

                .u-hide {
                    display: none;
                }
            </style>
        `
    );
    // Set up all notification close buttons.
    var closeButtons = document.querySelectorAll(".notification__close");

    for (var i = 0, l = closeButtons.length; i < l; i++) {
        setupCloseButton(closeButtons[i]);
    }
    // Auto close after 5 seconds
    setTimeout(() => {
        closeButtons.forEach((button) => button.click());
    }, 5 * 1000);
}

/* Dismissible notification js part */
/**
 * Attaches event listener for hide notification on close button click.
 * @param {HTMLElement} closeButton The notification close button element.
 */
function setupCloseButton(closeButton) {
    closeButton.addEventListener("click", function (event) {
        var target = event.target.getAttribute("aria-controls");
        var notification = document.getElementById(target);

        if (notification) {
            notification.classList.add("u-hide");
        }

        removeNotification();
    });
}

function removeNotification() {
    localStorage.removeItem("canonical.notification");
}
/* Context menu js part */
/**
  Toggles the necessary aria- attributes' values on the menus
  and handles to show or hide them.
  @param {HTMLElement} element The menu link or button.
  @param {Boolean} show Whether to show or hide the menu.
  @param {Number} top Top offset in pixels where to show the menu.
*/
function toggleMenu(element, show, top) {
    var target = document.getElementById(element.getAttribute("aria-controls"));

    if (target) {
        element.setAttribute("aria-expanded", show);
        target.setAttribute("aria-hidden", !show);

        if (typeof top !== "undefined") {
            target.style.top = top + "px";
        }

        if (show) {
            target.focus();
        }
    }
}

/**
  Attaches event listeners for the menu toggle open and close click events.
  @param {HTMLElement} menuToggle The menu container element.
*/
function setupContextualMenu(menuToggle) {
    menuToggle.addEventListener("click", function (event) {
        event.preventDefault();
        var menuAlreadyOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        var top = menuToggle.offsetHeight;
        // for inline elements leave some space between text and menu
        if (window.getComputedStyle(menuToggle).display === "inline") {
            top += 5;
        }

        toggleMenu(menuToggle, !menuAlreadyOpen, top);
    });
}

/**
  Attaches event listeners for all the menu toggles in the document and
  listeners to handle close when clicking outside the menu or using ESC key.
  @param {String} contextualMenuToggleSelector The CSS selector matching menu toggle elements.
*/
function setupAllContextualMenus(contextualMenuToggleSelector) {
    // Setup all menu toggles on the page.
    var toggles = document.querySelectorAll(contextualMenuToggleSelector);

    for (var i = 0, l = toggles.length; i < l; i++) {
        setupContextualMenu(toggles[i]);
    }

    // Add handler for clicking outside the menu.
    document.addEventListener("click", function (event) {
        for (var i = 0, l = toggles.length; i < l; i++) {
            var toggle = toggles[i];
            var contextualMenu = document.getElementById(
                toggle.getAttribute("aria-controls")
            );
            var clickOutside = !(
                toggle.contains(event.target) ||
                contextualMenu.contains(event.target)
            );

            if (clickOutside) {
                toggleMenu(toggle, false);
            }
        }
    });

    // Add handler for closing menus using ESC key.
    document.addEventListener("keydown", function (e) {
        e = e || window.event;

        if (e.keyCode === 27) {
            for (var i = 0, l = toggles.length; i < l; i++) {
                toggleMenu(toggles[i], false);
            }
        }
    });
}

setupAllContextualMenus(".contextual-menu__toggle");
