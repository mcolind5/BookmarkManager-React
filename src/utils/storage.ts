import { Bookmark } from "../types";

const STORAGE_KEY = 'bookmarks';

export const getBookmarks = (): Bookmark[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : []; // Converting objects to strings
};

export const saveBookmarks = (bookmarks: Bookmark[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks)); // Converting objects to strings pt2
};