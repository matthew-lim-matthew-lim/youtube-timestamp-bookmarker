// Listen to any updates in our tab system and find the most recent tab (the tab
// we are on currently) and determine if it is a YouTube page.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only proceed if the tab URL has changed
  if (changeInfo.url && changeInfo.url.includes("youtube.com/watch")) {
    const queryParameters = changeInfo.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    console.log(urlParameters);

    // Sends a message to our content script.
    // Sends the message type as "NEW" and the video id.
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});