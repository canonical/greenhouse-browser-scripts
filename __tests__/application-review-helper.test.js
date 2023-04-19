const {
    describe,
    it,
    expect,
    beforeEach,
    // beforeAll,
    // spyOn,
} = require("@jest/globals");

const fs = require("fs");
const Path = require("path");
const scriptPath = Path.join(
    __dirname,
    "..",
    "application-review-helper.user.js"
);

const { JSDOM } = require("jsdom");

const { textReview } = require("../application-review-helper.user");

// describe("Application review helper", () => {
//     describe("text-review length", () => {
//         // it("test test ", () => {
//         //     console.log(__dirname);
//         // });

//         it("text length under 50", () => {
//             let res = textReview(
//                 "1234567890123456789012345678901234567890123456"
//             );

//             console.log("RESRRS :: ", res);
//             expect(res).toBe("q-no");
//         });
//     });
// });

describe("User script test", () => {
    let dom;
    const { jest } = require("@jest/globals");

    beforeEach(() => {
        // Load the user script into a mock DOM.
        dom = new JSDOM(
            `
            <!DOCTYPE html>
            <html>
                <head></head>
                <body>
                <div data-provides="test" id="hello"></div>
                <script>
                    ${fs.readFileSync(
                        scriptPath,
                        // "../application-review-helper.user.js",
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

        console.log(
            "ADDED DOM :: \n",
            dom.window.document.getElementById("hello")
        );
    });

    describe("applies style rules", () => {
        let element;

        beforeEach(() => {
            element = dom.window.document.createElement("div");
            element.setAttribute("id", "test-div");
            element.setAttribute("data-provides", "test");
            dom.window.document.body.appendChild(element);
            console.log(dom.window.document.getElementById("test-div"));
        });

        it("background repeat ", () => {
            expect(
                dom.window
                    .getComputedStyle(element)
                    .getPropertyValue("background-repeat")
            ).toBe("no-repeat");
        });

        it("no padding top ", () => {
            expect(
                dom.window
                    .getComputedStyle(element.nextElementSibling)
                    .getPropertyValue("padding-top")
            ).toBe("0px");
        });

        it("strong yes no animation", () => {
            let el = dom.window.document.querySelector(".q-strong-yes");
            console.log("ELL :: ", el);
            expect(
                dom.window.getComputedStyle(el).getPropertyValue("animation")
            ).toBe("none");
        });

        // it("background repeat ", () => {});

        // expect(
        //     dom.window
        //         .getComputedStyle(dom.window.document.querySelector(".q-yes"))
        //         .getPropertyValue("animation")
        // ).toBe("none");
        // expect(
        //     dom.window
        //         .getComputedStyle(dom.window.document.querySelector(".q-no"))
        //         .getPropertyValue("animation")
        // ).toBe("none");
        // expect(
        //     dom.window
        //         .getComputedStyle(
        //             dom.window.document.querySelector(".q-strong-no")
        //         )
        //         .getPropertyValue("animation")
        // ).toBe("none");
        // expect(
        //     dom.window
        //         .getComputedStyle(
        //             dom.window.document.querySelector(".q-no-decision")
        //         )
        //         .getPropertyValue("animation")
        // ).toBe("none");
    });

    describe("text-review length", () => {
        let textReviewMock = jest.fn(textReview);

        it("text length under 50", () => {
            let res = textReview(
                "1234567890123456789012345678901234567890123456"
            );

            console.log("TEXT REVIEW RES :: ", textReviewMock, res);
            expect(res).toBe("q-no");
        });
    });

    // it("calls runTest", () => {
    //     const spy = spyOn(dom.window, "runTest");
    //     dom.window.runTest();
    //     expect(spy).toHaveBeenCalled();
    //     spy.mockRestore();
    // });
});
