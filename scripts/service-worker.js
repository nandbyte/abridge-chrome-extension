const summarizeText = (info, tab) => {
    console.log("Word " + info.selectionText + " was clicked.");

    chrome.storage.local.set({ original: info.selectionText }, () => {
        console.log("Original data saved.");
    });

    chrome.windows.create({ url: "pages/result.html", type: "popup" });
};

chrome.contextMenus.create({
    id: "abridge-context",
    title: "Abridge: summarize selected text",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(summarizeText);
