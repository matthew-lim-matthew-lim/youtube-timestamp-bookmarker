import { getActiveTabUrl } from "./utils.js"

// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = (currentBookmarks = []) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement.innerHTML = "";

    if (currentBookmarks.length > 0) {
        for (let i = 0; i < currentBookmarks.length; i++) {
            const bookmark = currentBookmarks[i];
            addNewBookmark(bookmarksElement, bookmark);
        }
    } else {
        bookmarksElement.innerHTML = '<i class="row">No bookmarks to show</i>';
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

// This event is a native window event that fires when an HTML document has been 
// loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Call the async function and handle the returned Promise
    getActiveTabUrl().then(activeTab => {
        console.log("YOOOOOOOOOOOO");
        console.log(activeTab);
        
        if (!activeTab || !activeTab.url) {
            console.error("Could not get the active tab URL");
            return;
        }

        const queryParameters = activeTab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        const currentVideo = urlParameters.get("v");

        if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
            chrome.storage.sync.get([currentVideo], (data) => {
                const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

                viewBookmarks(currentVideoBookmarks);
            });
        } else {
            const container = document.getElementsByClassName("container")[0];

            container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
        }
    }).catch(error => {
        console.error("Error getting active tab URL:", error);
    });
});
