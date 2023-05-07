import userEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";

describe("Application review test", () => {
    let testContainer;

    beforeAll(() => {
        const dom = new JSDOM(
            `
            <!DOCTYPE html>
            <html>
            <head></head>
              <body>
                <div id="test-container">
                  <div id="reject-modal"/>
                  <button data-provides="reject">
                </div>
                <script>
                ${require("fs").readFileSync(
                    "application-review.user.js",
                    "utf8"
                )}
                </script>
              </body>
            </html>
            `,
            {
                runScripts: "dangerously",
                resources: "usable",
            }
        );

        testContainer = dom.window.document.getElementById("test-container");
    });

    it("adds action bar elements to the UI", () => {
        const rejectionContainer = testContainer.querySelector(".rejection");
        const children =
            rejectionContainer.querySelectorAll(".rejection__button");

        expect(children).toHaveLength(4);
    });

    it("handles reject", () => {
        const rejectionContainer = testContainer.querySelector(".rejection");
        const rejectButton = rejectionContainer.firstElementChild;
        userEvent.click(rejectButton);
        const spinner = rejectionContainer.querySelector(".spinner");
        const rejectModal = testContainer.querySelector("#reject-modal");

        expect(rejectModal).toHaveClass("hide-modal");
        expect(spinner).toBeInTheDocument();
        expect(rejectButton).toBeDisabled();
    });
});
