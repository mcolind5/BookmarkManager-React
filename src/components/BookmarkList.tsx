import { useState } from "react";
import { Bookmark } from "../types";
import { getBookmarks, saveBookmarks } from "../utils/storage";

export default function BookmarkList() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(getBookmarks());
    const [searchTerm, setSearchTerm] = useState('');

    const deleteBookmark = (id: string) => {
        const updated = bookmarks.filter((bookmark) => bookmark.id !== id);
        setBookmarks(updated);
        saveBookmarks(updated);
    };

    const filteredBookmarks = bookmarks.filter((bookmark) =>
        bookmark.tags.some((tag) => tag.includes(searchTerm)) ||
        bookmark.title.includes(searchTerm) ||
        bookmark.url.includes(searchTerm)
    );

    const exportToJson = () => {
        const data = JSON.stringify(bookmarks, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bookmarks.json';
        a.click();
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by tag/title/URL"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={exportToJson}>Export to JSON</button>
            <ul>
                {filteredBookmarks.map((bookmark) => ( // Renders a list of components
                    <li key={bookmark.id}>
                        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                            {bookmark.title}
                        </a>
                        <span>{bookmark.tags.join(', ')}</span>
                        <button onClick={() => deleteBookmark(bookmark.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}