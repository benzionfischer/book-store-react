const { useState, useEffect, useRef } = React
import { debounce } from "../services/util.service.js"
import { bookService } from "../services/book.service.js"


export function BookAdd() {
    const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
    const [books, setBooks] = useState([]); // State to store the list of books
    const [loading, setLoading] = useState(false); // State to track loading status
    const debounceGoogleSearch = useRef(debounce((txt) => search(txt)))


    useEffect(() => {
        debounceGoogleSearch.current(searchQuery)
    }, [searchQuery])

    // Function to handle the search query input change
    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
    }

    async function search(txt) {
        if (!txt) return;
        console.log(`Search in google activated: ${txt}`)

        const API_KEY = "AIzaSyAqvLZRvyozz0_sABjmma6AAC_2B9jHLUc"; // Replace with your API key
        const url = `https://www.googleapis.com/books/v1/volumes?q=${txt}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setBooks(data.items || []);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    // Simulate a search request (you can replace this with actual API calls)
    function handleSearchSubmit(event) {
        event.preventDefault();
        // if (!searchQuery.trim()) return; // Don't search if input is empty

        // setLoading(true);

        // // Simulate an API request to search for books by title
        // setTimeout(() => {
        //     const foundBooks = [
        //         { id: 1, title: "The Great Gatsby" },
        //         { id: 2, title: "1984" },
        //         { id: 3, title: "To Kill a Mockingbird" }
        //     ]; // Simulated book results

        //     setBooks(foundBooks); // Update the books list
        //     setLoading(false); // Stop loading
        // }, 1000); // Simulate a network delay
    }

    // Function to add a book to the list (you can extend this with more fields)
    function addBook(googleBook) {
        bookService.addGoogleBook(googleBook);
    }

    return (
        <section className="book-add">
            <h1>Add a Book</h1>

            <form >
                <label htmlFor="searchQuery">Search for a Book</label>
                <input
                    type="text"
                    id="searchQuery"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter book title"
                />
            </form>

            {loading && <p>Loading...</p>}

            {books.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {books.map((book) => (
                            <li key={book.id}>
                                {book.volumeInfo.title}{" "}
                                <button onClick={() => addBook(book)}>Add to List</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
