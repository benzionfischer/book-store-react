import { bookService } from "../services/book.service.js"
import { makeId } from "../services/util.service.js"
import { AddReview } from "../cmps/AddReview.jsx"
import {BookReviewList} from "../cmps/BookReviewList.jsx"


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
        review.id = makeId();
        console.log("On save review:", review);
    
        setBook((prevBook) => {
            const updatedBook = {
                ...prevBook,
                reviews: [...prevBook.reviews, review] // Use `review` instead of `newReview`
            };
    
            // Save the updated book to the backend
            bookService.save(updatedBook)
                .then(savedBook => {
                    console.log(`Book (${savedBook.id}) Saved!`);
                    showSuccessMsg(`Book (${savedBook.id}) Saved!`);
                })
                .catch(err => {
                    console.error("Cannot save book:", err);
                    showErrorMsg("Cannot save book:", err);
                })
                .finally(() => navigate(`/book/${book.id}`));
    
            return updatedBook; // Ensure React state is updated
        });
    }
    

    function onRemoveReview(review) {
        const reviewId = review.id
        console.log("Removing review with id:", reviewId);
    
        // Update the state by filtering out the review with the given id
        setBook((prevBook) => {
            const updatedReviews = prevBook.reviews.filter(review => review.id !== reviewId);
    
            // Return the updated book with the modified reviews array
            const updatedBook = {
                ...prevBook,
                reviews: updatedReviews
            };
    
            // Optionally, save the updated book to a database or service here
            bookService.save(updatedBook)
                .then(savedBook => {
                    console.log(`Book (${savedBook.id}) updated with removed review!`);
                    showSuccessMsg(`Review removed from book (${savedBook.id})!`);
                })
                .catch(err => {
                    console.error("Cannot update book:", err);
                    showErrorMsg("Cannot update book:", err);
                })
                .finally(() => navigate(`/book/${book.id}`));
    
            return updatedBook; // Ensure React state is updated
        });
    }
    

    if (!book) return <div className="loader">Loading...</div>
    var pageCountDisplay = pageCountToDisplay(book.pageCount)
    var vintageOrNew = publishedDateToVintageOrNew(book.publishedDate)

    if (!book) return (<div>Loading ...</div>)
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
            <BookReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />

            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}