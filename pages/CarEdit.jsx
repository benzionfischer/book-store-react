
import { carService } from "../services/car.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function CarEdit() {

    const [carToEdit, setCarToEdit] = useState(carService.getEmptyCar())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { carId } = useParams()

    useEffect(() => {
        if (carId) loadCar()
    }, [carId])

    function loadCar() {
        setIsLoading(true)
        carService.get(carId)
            .then(setCarToEdit)
            .catch(err => {
                console.log('Cannot load car:', err)
            })
            .finally(() => setIsLoading(false))
    }

    function onSaveCar(ev) {
        ev.preventDefault()
        carService.save(carToEdit)
            .then(carToSave => {
                console.log(`Car (${carToSave.id}) Saved!`)
            })
            .catch(err => {
                console.log('Cannot save car:', err)
            })
            .finally(() => navigate('/car'))
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
        setCarToEdit((prevCar) => ({ ...prevCar, [field]: value }))
    }


    const { vendor, speed } = carToEdit
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`car-edit ${loadingClass}`}>
            <h1>{carId ? 'Edit' : 'Add'} Car</h1>
            <form onSubmit={onSaveCar}>
                <label htmlFor="vendor">Vendor</label>
                <input value={vendor} onChange={handleChange} type="text" name="vendor" id="vendor" />

                <label htmlFor="speed">Speed</label>
                <input value={speed} onChange={handleChange} type="number" name="speed" id="speed" />
                <section className="btns flex">
                    <button>Save</button>
                    <button type="button" className="back-btn" ><Link to="/car">Back</Link></button>
                </section>
            </form>
        </section>
    )

}