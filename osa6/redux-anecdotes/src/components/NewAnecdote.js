import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        const anecdoteContent = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(anecdoteContent))
    }

    return (       
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <input name="anecdote" />
            </div>
            <button type="submit">create</button>
            </form>
        </>
    )
}

export default NewAnecdote