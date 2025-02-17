const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function AddReview({ onSaveReview }) { // Receive the function as a prop
    const [review, setReview] = useState({ fullname: "", rating: 1, readAt: "" });

    function handleChange({ target }) {
        let { value, name: field } = target;
        switch (target.type) {
            case "range":
            case "number":
                value = +target.value;
                break;
            case "checkbox":
                value = target.checked;
                break;
        }
        setReview((prevReview) => ({ ...prevReview, [field]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent page refresh
        onSaveReview(review); // Call the function passed via props
    }

    return (
        <section className="car-edit">
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Title</label>
                <input
                    value={review.fullname}
                    onChange={handleChange}
                    type="text"
                    name="fullname"
                    id="fullname"
                />

                <label htmlFor="rating">Rating</label>
                <select value={review.rating} onChange={handleChange} name="rating" id="rating">
                    <option value="1">1 ⭐</option>
                    <option value="2">2 ⭐⭐</option>
                    <option value="3">3 ⭐⭐⭐</option>
                    <option value="4">4 ⭐⭐⭐⭐</option>
                    <option value="5">5 ⭐⭐⭐⭐⭐</option>
                </select>

                <label htmlFor="readAt">Read At</label>
                <input
                    type="date"
                    value={review.readAt}
                    onChange={handleChange}
                    name="readAt"
                    id="readAt"
                />

                <section className="btns flex">
                    <button type="submit">Save</button>
                    <button type="button" className="back-btn">
                        <Link to="/book">Back</Link>
                    </button>
                </section>
            </form>
        </section>
    );
}
