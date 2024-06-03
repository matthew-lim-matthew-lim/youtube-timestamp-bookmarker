# youtube-timestamp-bookmarker

In the video player, you press a button to add a bookmark for that timestamp, for that video.
When you press the extension button (on the top right), a window pops up displaying a list of your bookmarked timestamps for the video.

# The files

## `background.js`

- Listens for updates to YouTube tabs and extracts the video ID from the URL.
- Sends a message to the content script when a new YouTube video is loaded.

## `contentScript.js`

- Injects a bookmark button into the YouTube player controls.
- Handles bookmark creation and stores them in Chrome's storage.

## `popup.js`, `popup.html`, `popup.css`

- `popup.js` Handles the functionality of the popup window.
- `popup.html` Defines the structure of the popup window.
- `popup.css` Defines the styl eof the popup window.

## `manifest.json`

- Defines the extension's metadata, permissions, background scripts, content scripts, and other configurations.
- Any chromium-based extension (chrome, firefox, safari, etc) will need a `manifest.json`
- `permissions` defines the permissions that the extension is allowed.
    - We use `storage` and `tabs` permissions, which use `chrome.storage` api and `chrome.tabs` api.
    - `storage` allows us to store stuff in the user's browser.
    - `tabs` lets us access the browser's tab system, so we can read the current tab.
- `host_permissions` specify which domains the extension is allowed to interact with.
- `background` specify the background script or service worker that runs in the background.
    - `service_worker` `.js` file that runs seperately from the main browser thread. The service worker has access to content from a webpage since it is seperate from main processes. 
        - Has capabilites to speak with extensions with extensions messaging system.
- `content_scripts` specifies scripts that are injected into web pages matching certain URLs.
    - Files that run in context of the webpage we are on.
- `web_accessible_resources` defines resources that can be accessed by web pages.
- `action` defines the default popup and icons for the extension action.

