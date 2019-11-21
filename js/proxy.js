var configContent = document.getElementById('configContent');
configContent.addEventListener('input', changeValue,false)
//变更配置时存值
function changeValue() {
    chrome.runtime.sendMessage({
        type:'changeValue',
        proxyConfigValue: configContent.value
    });    
}
//获取配置内容
function getConfig() {
    chrome.storage.sync.get('proxyConfigValue', function (val) {
        if (val.proxyConfigValue) {
            configContent.value = val.proxyConfigValue
        }
    });
}
function setProxy() {
    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            if (details.url.indexOf('http://billing-dev.netease.com/api') === 0) {
                console.log(details)
                var url = 'http://localhost:8002' + details.url.split('http://billing-dev.netease.com')[1]
                httpRequest(url)
                // return { redirectUrl: details.url.replace("http://billing-dev.netease.com", "http://localhost:8002") };
                return { cancel: true };
            }
        },
        {
            urls: [
                "http://billing-dev.netease.com/api/*"
            ]
        },
        [
            "blocking"
        ]
    );
}
function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // callback(xhr.responseText);
        }
    }
    xhr.send();
}
getConfig()
setProxy()
hljs.initHighlightingOnLoad();

