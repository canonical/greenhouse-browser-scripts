/**
 * @jest-environment jsdom
 */

const {
    describe,
    it,
    expect,
    beforeEach,
    // beforeAll,
} = require("@jest/globals");

// const { addUI } = require("../application-review.user");

// import * as addQuickReviewBtns from "../application-review.user";

describe("application review test suite", () => {
    // const { jest } = require("@jest/globals");

    beforeEach(() => {
        document.body.innerHTML = `
                    <header class="sc-hNKHps jqhntN"><div class="sc-dsQDmV frZlCf"><div class="sc-cZwWEu bXMEXv"><a role="button" disabled="" aria-disabled="true" data-provides="previous" class="button__ButtonLink-jEuIop button__HideBgLinkNoPadding-brKOAC button__a-bfKnTb bUcEoy XYWo jiipbx"><span aria-label="Previous" data-tooltipped="" aria-describedby="tippy-tooltip-1" data-original-title="Previous" style="display: inline-block;"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path stroke-width="1" fill="#222222" stroke="#222222" d="M7.697 10l6.13-6.485c.285-.3.27-.775-.03-1.06-.3-.285-.775-.27-1.06.03L5.633 10l7.104 7.515c.285.3.76.315 1.06.03.3-.285.315-.76.03-1.06L7.697 10z"></path></svg></span></a><div style="margin-left: 24px;"><span class="sc-jQHtVU lknpfU">2 applications in queue</span><a href="/people/268102496?application_id=292706942" target="_blank" class="sc-jTYCaT hgLlQX">Test firstname Test lastname</a></div></div><div class="sc-HzFiz dVIqiK">
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
              <button data-name="Wrong timezone" data-reason="Wrong timezone" class="rejection__button">
                Wrong timezone
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
        <span id="leave-feedback"><a role="button" aria-disabled="false" data-provides="leave-feedback-button" class="button__ButtonLink-jEuIop button__a-kYFLeq iUZEtf ehntNK sc-fctJkW sc-bWXABl fpiWCF lcGlIa">Leave feedback</a></span><a role="button" aria-disabled="false" data-provides="reject" class="button__ButtonLink-jEuIop button__DangerLink-khDwaQ button__a-QIGDq iUZEtf iXEVcE kDjQNA sc-fctJkW fpiWCF">Reject</a><a role="button" aria-disabled="false" data-provides="advance" class="button__ButtonLink-jEuIop button__FancyLink-empczU button__a-gSJJrp iUZEtf kZobsY gQlDvM sc-fctJkW fpiWCF">Advance</a><a role="button" aria-disabled="false" data-provides="skip" class="button__ButtonLink-jEuIop button__HideBgLinkNoPadding-brKOAC button__a-bfKnTb iUZEtf XYWo jiipbx" style="display: inline-block; vertical-align: middle;"><span aria-label="Next" data-tooltipped="" aria-describedby="tippy-tooltip-2" data-original-title="Next" style="display: inline-block;"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path stroke-width="1" fill="#222222" stroke="#222222" d="M12.304 10l-6.13 6.485c-.285.3-.27.775.03 1.06.3.285.775.27 1.06-.03L14.368 10 7.264 2.485c-.285-.3-.76-.315-1.06-.03-.3.285-.315.76-.03 1.06L12.304 10z"></path></svg></span></a></div><a href="#" color="#078361" class="sc-eFWqGp jHHshi">Review roundup</a></div></header>
                `;
    });

    it("Rejection buttons are rendered", () => {
        const quickRejectionButtons = document.querySelectorAll(
            ".rejection__button[data-reason]"
        );

        expect(quickRejectionButtons).not.toBeNull();
        expect(quickRejectionButtons).toHaveLength(4);
    });

    it("Rejection buttons are rendered 2 ", () => {
        const rejectBtnEl = document.querySelector("*[data-provides='reject']");

        expect(rejectBtnEl).not.toBeNull();
        // expect(quickRejectionButtons).toHaveLength(4);
    });
});
