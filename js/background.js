chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
    if (data.type === 'changeValue') {
        chrome.storage.sync.set({ 'proxyConfigValue': data.proxyConfigValue });
    }
});
// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         console.log(details)
//         return { redirectUrl: details.url.replace("http://billing-dev.netease.com", "http://www.baidu.com") };
//     },
//     {
//         urls: [
//             "http://billing-dev.netease.com/*"
//         ]
//     },
//     [
//         "blocking"
//     ]
// );