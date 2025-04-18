import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Bookmark } from '../types';
import { getBookmarks, saveBookmarks } from '../utils/storage';

export default function AddBookmark() {
    // Tracks form input state
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page from reloading on form submit
        const newBookmark: Bookmark = {
            id: uuidv4(), // Generates unique IDs
            url,
            title: title || url, // Use URL as title if empty
            tags: tags.split(',').map(tag => tag.trim()),
        };
        const updatedBookmarks = [...getBookmarks(), newBookmark];
        saveBookmarks(updatedBookmarks);
        setUrl(''); setTitle(''); setTags(''); // Reset form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
            />
            <input
                type="text"
                value={title}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Title (optional"
            />
            <input 
                type="text"
                value={tags}
                onChange={(e)=> setTags(e.target.value)}
                placeholder= "Tags (comma-seperated, e.g., web, docs )"
            />
            <button type="submit">Add Bookmark</button>
        </form>
    );
}