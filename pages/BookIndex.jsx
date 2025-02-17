
const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Cannot get books:', err)
                showSuccessMsg(`Car (${carId}) removed!`)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg(`Book (${bookId}) removed!`)
            })
            .catch(err => {
                console.log('Cannot remove book:', err)
                showErrorMsg('Problems removing car')
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div className="loader">Loading...</div>
    return (
        <section className="car-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/book/edit">Add Book</Link>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )

}