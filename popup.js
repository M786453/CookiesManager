const extractBtn = document.getElementById("extractBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");

let currentCookies = [];

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

            currentCookies = cookies;

            output.value = JSON.stringify(cookies, null, 2);
        }
    );

});

document.getElementById("copyJsonBtn").addEventListener("click", async () => {
    await navigator.clipboard.writeText(
        JSON.stringify(currentCookies, null, 2)
    );
});

document.getElementById("copyHeaderBtn").addEventListener("click", async () => {

    const cookieHeader = currentCookies
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join("; ");

    await navigator.clipboard.writeText(cookieHeader);

});