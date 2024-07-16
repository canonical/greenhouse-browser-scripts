import userEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";

describe("Application review test", () => {
    let testContainer;
    let document;

    beforeAll(() => {
        const dom = new JSDOM(
            `
            <!DOCTYPE html>
            <html>
            <head></head>
              <body>
                <div id="test-container">
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

        document = dom.window.document;
        testContainer = document.getElementById("test-container");
    });

    it("adds action bar elements to the UI", () => {
        const rejectionContainer = testContainer.querySelector(".rejection");
        const children =
            rejectionContainer.querySelectorAll(".rejection__button");

        expect(children).toHaveLength(4);
    });

    it("handles reject", async () => {
        const rejectionContainer = testContainer.querySelector(".rejection");
        const rejectButton = rejectionContainer.firstElementChild;
        userEvent.click(rejectButton);

        // simulate addition of reject modal to the DOM
        const rejectModal = document.createElement("div");
        rejectModal.id = "reject-modal";
        testContainer.append(rejectModal);

        // wait for the reject modal to be detected and processed
        await new Promise(resolve => setTimeout(resolve, 200));

        const spinner = rejectionContainer.querySelector(".spinner");

        expect(rejectModal).toHaveClass("hide-modal");
        expect(spinner).toBeInTheDocument();
        expect(rejectButton).toBeDisabled();
    });
});
