import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }

    return (
        <div className='my-4'>
            Filter <input className='h-7 my-auto px-2 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 rounded' name="filter" onChange={handleChange} />
        </div>
        
    )
}

export default Filter;