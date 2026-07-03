const extractBtn = document.getElementById("extractBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");

extractBtn.addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.runtime.sendMessage(
        {
            action: "getCookies",
            url: tab.url
        },
        (cookies) => {
            output.value = JSON.stringify(cookies, null, 2);
        }
    );

});

copyBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(output.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy JSON";
    }, 1500);

});