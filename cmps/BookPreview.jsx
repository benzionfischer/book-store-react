
export function BookPreview({ book }) {

    return (
        <article className="car-preview">
            <h2>Vendor: {book.vendor}</h2>
            <h4>Book Speed: {book.speed}</h4>
            <img src={`../assets/img/${book.vendor}.png`} alt="car-image" />
        </article>
    )
}