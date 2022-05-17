chrome.storage.local.get(["original"], (result) => {
    console.log(result);

    // Get the string from local storage
    const originalText = result.original;

    // Update original data on the website
    const originalElement = document.getElementById("original-text");
    originalElement.innerText = originalText;

    // Select the abridge element and set to loading
    const abridgeElement = document.getElementById("abridge-text");
    abridgeElement.classList.add("loading");

    fetch("https://api.chucknorris.io/jokes/random")
        .then((data) => data.json())
        .then((jsonData) => {
            // Save the data you need
            const abridgeText = jsonData.value;

            // Update abridge data on the website
            abridgeElement.classList.remove("loading");
            abridgeElement.innerText = abridgeText;
        });
});
