import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookReviewList({ reviews, onRemoveReview }) {

    const ulAttributes = {
        title: 'Some Pop Up',
        className: 'car-list'
    }

    console.log("Reviews: " + reviews)
    
    return (
        <ul {...ulAttributes}>
            {reviews.map(review =>
                <li key={review.fullname + "_" +  review.readAt}>
                    Read at: {review.readAt}, Fullname: {review.fullname}, rating: {review.rating}
                    <section>
                        <button onClick={() => onRemoveReview(review)}> Remove</button>
                        {/* <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button> */}
                    </section>
                </li>
            )}
        </ul>
    )
}