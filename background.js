chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.action === "getCookies") {

        chrome.cookies.getAll(
            {
                url: message.url
            },
            (cookies) => {

                const result = cookies.map(cookie => ({
                    name: cookie.name,
                    value: cookie.value,
                    domain: cookie.domain,
                    path: cookie.path,
                    expirationDate: cookie.expirationDate,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    sameSite: cookie.sameSite,
                    session: cookie.session,
                    storeId: cookie.storeId
                }));

                sendResponse(result);
            }
        );

        return true;
    }

});