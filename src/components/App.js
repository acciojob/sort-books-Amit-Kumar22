
import React,{useState,useEffect} from "react";
import './../styles/App.css';
import axios from "axios";
import 'regenerator-runtime/runtime';

const App = () => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes`
      );
      console.log(response.data.items)
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortBooks = () => {
    switch (sortBy) {
      case 'title':
        return [...books].sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
      case 'author':
        return [...books].sort((a, b) => a.volumeInfo.authors[0].localeCompare(b.volumeInfo.authors[0]));
      case 'publisher':
        return [...books].sort((a, b) => a.volumeInfo.publisher.localeCompare(b.volumeInfo.publisher));
      default:
        return books;
    }
  };

  const sortedBooks = sortBooks();

  return (
    <div>
         <label>
        Sort by:
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="">Select</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
      </label>

      <ul>
        {sortedBooks.map((book) => (
          <li key={book.id}>
            <strong>Title:</strong> {book.volumeInfo.title}, <strong>Author:</strong> {book.volumeInfo.authors[0]}, <strong>Publisher:</strong>{' '}
            {book.volumeInfo.publisher}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
