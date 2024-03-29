chrome.storage.local.get(["original"], (result) => {
    // Get the string from local storage
    const originalText = result.original;

    // Update original data on the website
    const originalElement = document.getElementById("original-text");
    originalElement.innerText = originalText;

    // Divide text into lines with respective word count
    const lines = originalText.split(". ");

    const linesWithWordCount = lines.map((line) => {
        const wordCount = line.split(" ").length;
        return { wordCount, line };
    });

    // Attach lines together to create 100-word chunks

    let textChunks = [];
    let currentChunk = "";
    let currentWordCount = 0;

    linesWithWordCount.forEach((lineWithCount, index) => {
        if (currentWordCount + lineWithCount.wordCount <= 70) {
            currentChunk += lineWithCount.line + ". ";
            currentWordCount += lineWithCount.wordCount;
        } else {
            textChunks.push(currentChunk);
            currentChunk = lineWithCount.line + ". ";
            currentWordCount = lineWithCount.wordCount;
        }

        if (index === linesWithWordCount.length - 1) {
            textChunks.push(lineWithCount.line + ".");
        }
    });

    textChunks.forEach((textChunk) => {
        console.log(
            `Word Count - ${textChunk.split(" ").length} : ${textChunk}`
        );
    });

    // Select the abridge element and set to loading
    const abridgeElement = document.getElementById("abridge-text");
    abridgeElement.classList.add("loading");

    fetch("http://localhost:5000/predict", {
        method: "POST",
        body: JSON.stringify({ txt: textChunks }),
    })
        .then((res) => res.json())
        .then((data) => {
            // Save the data you need
            const abridgeText = data.summary;

            // Update abridge data on the website
            abridgeElement.classList.remove("loading");
            abridgeElement.classList.add("answer");
            abridgeElement.innerText = abridgeText;
        })
        .catch((error) => {
            console.log(error);
            const abridgeText =
                "There were some errors while handling your request.";

            // Update abridge data on the website
            abridgeElement.classList.remove("loading");
            abridgeElement.classList.add("error");
            abridgeElement.innerText = abridgeText;
        });
});
