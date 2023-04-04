// const { jsdom } = require("jsdom");

const {
    describe,
    it,
    expect,
    beforeEach,
    // beforeAll,
} = require("@jest/globals");
const { onClick } = require("../written-interview-in-new-tab.user");

describe("Pdf in a new tab suite", () => {
    const { jest } = require("@jest/globals");

    let mockHtml;

    let clickHandler;

    let evt;
    let onClickMock;

    beforeEach(() => {
        mockHtml = `<a class="person-attachment" data-download-url="https://canonical.greenhouse.io/person_attachments/downloads/367143887"
            data-id="367143887" data-application-id="292706942" data-virus-status="no_virus_detected"
            href="https://canonical.greenhouse.io/person_attachments/downloads/367143887">mullvad-vpn-receipt.pdf</a?`;

        // dom = new jsdom.JSDOM(mockHtml);
        window.document.body.innerHTML = mockHtml;

        onClickMock = jest.fn(onClick);

        clickHandler = jest.fn();
        document.querySelectorAll("a").forEach((a) => {
            a.addEventListener("click", clickHandler);
            a.addEventListener("click", onClickMock);
        });

        require("./written-interview-in-new-tab.test");

        evt = new Event("click");
    });

    it("Download link found", () => {
        expect(document.querySelector("a")).not.toBeNull();
        expect(
            document.querySelectorAll(
                "a[data-download-url*='person_attachments/downloads']"
            )
        ).not.toBeNull();
        expect(
            document.querySelectorAll(
                "a[data-download-url*='person_attachments/downloads']"
            )
        ).toHaveLength(1);
    });

    it("onClick triggered", () => {
        document.querySelector("a").click();

        expect(onClickMock).toHaveBeenCalled();
        expect(onClickMock).toHaveBeenCalledWith(
            expect.objectContaining({
                ...evt,
            })
        );
    });

    it("blob?", () => {
        let uu = window.navigator.pdfViewerEnabled;
        let uu2 = window.navigator.storage;
        console.log("UUUU ::  ", uu, uu2);
    });
});
