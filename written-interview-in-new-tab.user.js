// ==UserScript==
// @name         Greenhouse written interviews in a new tab
// @namespace    https://canonical.com/
// @version      1.0.0
// @author       Canonical's workplace engineering team
// @description  Open written interviews in a new tab instead of downloading "File1.pdf" files.
// @homepage     https://github.com/canonical/greenhouse-browser-scripts
// @homepageURL  https://github.com/canonical/greenhouse-browser-scripts
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @updateURL    https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/written-interview-in-new-tab.user.js
// @downloadURL  https://raw.githubusercontent.com/canonical/greenhouse-browser-scripts/main/written-interview-in-new-tab.user.js
// @supportURL   https://github.com/canonical/greenhouse-browser-scripts/issues

// @match        https://canonical.greenhouse.io/guides/**/people/**
// @match        https://canonical.greenhouse.io/scorecards/**
// ==/UserScript==

const downloadLinks = [
    ...document.querySelectorAll(
        "a[data-download-url*='person_attachments/downloads']"
    ),
];
downloadLinks.forEach((linkEl) => {
    // remove existing React listeners
    const newLinkEl = linkEl.cloneNode(true);
    linkEl.replaceWith(newLinkEl);
    newLinkEl.href = newLinkEl.getAttribute("data-download-url");
    // download and open the PDF in a new tab
    newLinkEl.onclick = onClick;
});

function openPdf(pdf) {
    const blobStore = new Blob([pdf], { type: "application/pdf" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobStore);
        return;
    }
    const data = window.URL.createObjectURL(blobStore);
    const link = document.createElement("a");
    link.download = "Written interview.pdf";
    document.body.appendChild(link);
    window.open(data, "_blank");
    window.URL.revokeObjectURL(data);
    link.remove();
}

async function onClick(evt) {
    evt.preventDefault();
    const url = evt.target.href;
    const redirectionResponse = await fetch(url);
    const pdfUrl = redirectionResponse.url;
    const response = await fetch(pdfUrl);
    const pdfBlob = await response.blob();
    openPdf(pdfBlob);
    return false;
}
