
const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"
import { carService } from "../services/car.service.js"


export function CarIndex() {

    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function loadCars() {
        carService.query(filterBy)
            .then(setCars)
            .catch(err => {
                console.log('Cannot get cars:', err)
            })
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars(cars => cars.filter(car => car.id !== carId))
            })
            .catch(err => {
                console.log('Cannot remove car:', err)
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!cars) return <div className="loader">Loading...</div>
    return (
        <section className="car-index">
            <CarFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/car/edit">Add Car</Link>
            <CarList
                cars={cars}
                onRemoveCar={onRemoveCar}
            />
        </section>
    )

}