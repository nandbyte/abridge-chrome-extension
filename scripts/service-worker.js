const summarizeText = (info, tab) => {
    chrome.storage.local.set({ original: info.selectionText }, () => {
        console.log("Original data saved.");
    });

    chrome.windows.create({ url: "pages/result.html", type: "popup" });
};

chrome.contextMenus.create({
    id: "abridge-context",
    title: "Abridge: Summarize selected text",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(summarizeText);
