
export function BookPreview({ book }) {

    return (
        <article className="car-preview">
            <h2>Title: {book.title}</h2>
            <img src={`${book.thumbnail}`} alt="car-image" />
            <h4>Categories: {book.categories}</h4>
            <h4>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h4>
        </article>
    )
}