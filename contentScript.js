(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    // Listens for messages from background.js
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    // Get all bookmarks from chrome storage when a video is loaded.
    const fetchBookmarks = () => {
        // Promise allows us to resolve this asynchronously.
        return new Promise((resolve) => {
            // Find any bookmarks corresponding to the current video.
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            })
        })
    }

    const newVideoLoaded = async () => {
        // Grab the first instance of bookmark-btn if it exists.
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            // Add ytp-button (youtube button) class, and bookmark-btn 
            // (bookmark button) class.
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
            youtubeLeftControls.append(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };
        
        currentVideoBookmarks = await fetchBookmarks();

        // Sync with chrome storage.
        // Store all current video bookmarks into the chrome storage.
        chrome.storage.sync.set({
            // Need to store into chrome storage in JSON.
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
    }

    // Load the bookmarkBtn every time the content_scripts has a match.
    // This will correctly load bookmarkBtn when we reload the page, since when we reload, 
    // the chrome.tabs.onUpdated.addListener() doesn't go off. 
    newVideoLoaded();
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 0);
}
