import { JSDOM } from "jsdom";

describe("Written interview in new tab test", () => {
    let appReview;
    let header;

    beforeAll(() => {
        const dom = new JSDOM(
            `
            <!DOCTYPE html>
            <html>
            <head></head>
              <body>
                <div data-provides="app-review">
                  <header>
                    <div data-birch="Grid">
                      <a href="/people/xxxxxxxxx?application_id=yyyyyyyyy" target="_blank">First Last</a>
                    </div>
                  </header>
                  <div>
                    <!-- roughly GHs structure for the duplicate tag -->
                    <span class="chip" title="Potential duplicate">
                      <span class="chip">Potential duplicate</span>
                      <span></span>
                    </span>
                  </div>
                 </div>
                <script>
                ${require("fs").readFileSync("duplicate-check.user.js", "utf8")}
                </script>
              </body>
            </html>
            `,
            {
                runScripts: "dangerously",
                resources: "usable",
            }
        );

        appReview = dom.window.document.querySelector(
            'div[data-provides="app-review"]'
        );
        header = appReview.querySelector("header");
    });

    it("detects the tag and paints the header", () => {
        expect(header.style.backgroundColor).toBe("rgb(247, 200, 176)");
        // it seems like I cannot mock a tampermonkey internal function so I cannot test the
        // open in tab call
    });
});
