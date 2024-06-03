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
