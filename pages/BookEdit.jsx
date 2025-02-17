
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
            .finally(() => setIsLoading(false))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(bookToSave => {
                console.log(`Book (${bookToSave.id}) Saved!`)
                showSuccessMsg(`Book (${bookToSave.id}) Saved!`)
            })
            .catch(err => {
                console.log('Cannot save book:', err)
                showErrorMsg('Cannot save book:', err)
            })
            .finally(() => navigate('/book'))
    }


    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }


    const { title, subtitle, description, pageCount, language, currencyCode, amount} = bookToEdit
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`car-edit ${loadingClass}`}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="subtitle">Subtitle</label>
                <input value={subtitle} onChange={handleChange} type="text" name="subtitle" id="subtitle" />

                {/* <label htmlFor="authors">Authors (comma-separated)</label>
                <input value={!authors ? [] : authors.join(", ")} onChange={handleChange} type="text" name="authors" id="authors" /> */}

                {/* <label htmlFor="publishedDate">Published Year</label>
                <input value={book.publishedDate} onChange={handleChange} type="number" name="publishedDate" id="publishedDate" /> */}

                <label htmlFor="description">Description</label>
                <textarea value={description} onChange={handleChange} name="description" id="description"></textarea>

                <label htmlFor="pageCount">Page Count</label>
                <input value={pageCount} onChange={handleChange} type="number" name="pageCount" id="pageCount" />

                {/* <label htmlFor="categories">Categories (comma-separated)</label>
                <input value={book.categories.join(", ")} onChange={handleChange} type="text" name="categories" id="categories" /> */}

                {/* <label htmlFor="thumbnail">Thumbnail URL</label>
                <input value={book.thumbnail} onChange={handleChange} type="text" name="thumbnail" id="thumbnail" /> */}

                <label htmlFor="language">Language</label>
                <input value={language} onChange={handleChange} type="text" name="language" id="language" />

                <label htmlFor="amount">Amount</label>
                <input value={amount} onChange={handleChange} type="number" name="amount" id="amount" />

                <label htmlFor="currencyCode">Currency</label>
                <input value={currencyCode} onChange={handleChange} type="text" name="currencyCode" id="currencyCode" />

                <section className="btns flex">
                    <button>Save</button>
                    <button type="button" className="back-btn" ><Link to="/book">Back</Link></button>
                </section>
            </form>
        </section>
    )

}