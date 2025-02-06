
export function BookPreview({ book }) {

    return (
        <article className="car-preview">
            <h2>{book.title}</h2>
            <h4>Amount: {book.listPrice.amount}</h4>
            <h4>Currency code: {book.listPrice.currencyCode}</h4>
            <h4>Is on sale: {book.listPrice.isOnSale ? "Yes" : "No"}</h4>


            {/* <h4>Book Speed: {book.speed}</h4> */}
            {/* <img src={`../assets/img/${book.vendor}.png`} alt="car-image" /> */}
        </article>
    )
}