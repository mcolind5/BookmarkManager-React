import AddBookmark from "./components/AddBookmark";
import BookmarkList from "./components/BookmarkList";
import './App.css';

export default function App() {
    const components = {
        AddBookmark,
        BookmarkList
    };
    
    return (
        <div>
            <h1>Bookmark Manager</h1>
            <components.AddBookmark />
            <components.BookmarkList />
        </div>
    );
}