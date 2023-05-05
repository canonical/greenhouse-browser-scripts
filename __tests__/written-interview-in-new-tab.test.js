import userEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";

describe("Written interview in new tab test", () => {
    let domWindow;
    let testContainer;

    beforeAll(() => {
        const dom = new JSDOM(
            `
            <!DOCTYPE html>
            <html>
            <head></head>
              <body>
                <div id="test-container">
                  <a class='test-doc' data-download-url="person_attachments/downloads" href="http://test.test"/>
                </div>
                <script>
                ${require("fs").readFileSync(
                    "written-interview-in-new-tab.user.js",
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
        domWindow = dom.window;
    });

    it("downloads attachment and opens pdf in new tab", () => {
        const testURL = "http://test.test";
        domWindow.fetch = jest.fn(() =>
            Promise.resolve({
                url: testURL,
                blob: () => jest.fn(),
            })
        );
        domWindow.URL.createObjectURL = jest.fn().mockReturnValue(testURL);
        domWindow.URL.revokeObjectURL = jest.fn();
        domWindow.open = jest.fn();
        const testDoc = testContainer.querySelector(".test-doc");
        userEvent.click(testDoc);

        expect(domWindow.fetch).toHaveBeenCalled();
    });
});
