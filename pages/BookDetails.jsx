import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx"


const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {

        setBook(null)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }


    function pageCountToDisplay(pageCount) {
        switch (pageCount) {
            case pageCount > 500:
              return "Serious Reading";
            case pageCount > 200:
              return "Decent Reading";
            case pageCount < 100:
              return "Light Reading";
            default:
              return "Standard Reading";
          }
    }

    function publishedDateToVintageOrNew(year) {
        const currentYear = new Date().getFullYear();
        const yearsPassed = currentYear - year;
        return yearsPassed > 10 ? "Vintage" : "New";
    }
      
    function onSaveReview(review) {
        const bookToSave = {
            ...prevBook,
            reviews: [...prevBook.reviews, newReview] // Add new review to the array
        }
        setBook((prevBook) => ({
            ...prevBook,
            reviews: [...prevBook.reviews, newReview] // Add new review to the array
        }));

        bookService.save(bookToSave)
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

    if (!book) return <div className="loader">Loading...</div>
    var pageCountDisplay = pageCountToDisplay(book.pageCount)
    var vintageOrNew = publishedDateToVintageOrNew(book.publishedDate)

    // console.log('car:', car)
    return (
        <section className="car-details">
            <h1>Book title: {book.title}</h1>
            <h1>Book subtitle: {book.subtitle}</h1>
            <h1>Authors: {book.authors}</h1>
            <h1>Published date: {vintageOrNew}</h1>
            <h1>Description: {book.description}</h1>
            <h1>Page count: {pageCountDisplay}</h1>
            <h1>Categories: {book.categories}</h1>
            <h1>Language: {book.language}</h1>
            <h1>
                Amount: <span style={{ color: book.listPrice.amount > 150 ? "red" : "green" }}>{book.listPrice.amount}</span>
            </h1>
            <h1>Currency: {book.listPrice.currencyCode}</h1>
            {book.listPrice.isOnSale && <h1 style={{ color: "red" }}>On sale!</h1>}


            <img src={`${book.thumbnail}`} alt="car-image" />

            <AddReview onSaveReview={onSaveReview} />

            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}