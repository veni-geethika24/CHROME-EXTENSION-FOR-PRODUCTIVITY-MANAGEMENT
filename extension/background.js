let activeTab = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  handleTabChange(tab.url);
});

function handleTabChange(url) {
  const endTime = Date.now();
  const timeSpent = (endTime - startTime) / 1000;
  if (activeTab) {
    sendToBackend(activeTab, timeSpent);
  }
  activeTab = new URL(url).hostname;
  startTime = Date.now();
}

function sendToBackend(site, time) {
  fetch("http://localhost:5000/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ site, time }),
  });
}
