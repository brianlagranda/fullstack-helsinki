import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"

const App = () => {
  return(
    <div id='root' className="bg-sky-100 font-roboto h-full px-4 py-4 mx-2 my-2 sm:w-3/4 sm:mx-auto sm:my-10 lg:w-2/4 rounded-lg">
      <h2 className="text-center text-sky-500">Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2 className="text-center text-sky-500">Create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App;
