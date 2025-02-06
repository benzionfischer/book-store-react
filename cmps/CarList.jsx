import { CarPreview } from "./CarPreview.jsx";
const { Link } = ReactRouterDOM

export function CarList({ cars, onRemoveCar }) {

    const ulAttributes = {
        title: 'Some Pop Up',
        className: 'car-list'
    }
    
    return (
        <ul {...ulAttributes}>
            {cars.map(car =>
                <li key={car.id}>
                    <CarPreview car={car} />
                    <section>
                        <button onClick={() => onRemoveCar(car.id)}> Remove</button>
                        <button><Link to={`/car/${car.id}`}>Details</Link></button>
                        <button><Link to={`/car/edit/${car.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}