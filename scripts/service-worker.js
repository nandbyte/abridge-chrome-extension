const summarizeText = (info, tab) => {
    console.log("Word " + info.selectionText + " was clicked.");
    chrome.windows.create({ url: "pages/result.html", type: "popup" });
};

chrome.contextMenus.create({
    id: "abridge-context",
    title: "Abridge: summarize selected text",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(summarizeText);
