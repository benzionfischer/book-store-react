import { carService } from "../services/car.service.js"

const { useState, useEffect } = React


export function CarFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // function handleChangePrimitive({ target }) {
    //     const value = target.value
    //     const field = target.name
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

    // function handleTxtChange(ev) {
    //     const value = ev.target.value
    // setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    // }

    // function handleMinSpeedChange(ev) {
    //     const value = ev.target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    // }

    const { txt, minSpeed } = filterByToEdit
    return (
        <section className="car-filter">
            <h2>Filter Our Cars</h2>
            <form>
                <label htmlFor="txt">Vendor</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input onChange={handleChange} value={minSpeed || ''} type="number" name="minSpeed" id="minSpeed" />

                <button>Submit</button>
            </form>
        </section>
    )
}