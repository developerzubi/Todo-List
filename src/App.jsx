import { useState,useEffect} from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowFinished] = useState(true )
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const savetostorage = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const handleEdit = (e,id) => {
    let edittodo = todos.filter(item=>item.id===id)
    setTodo(edittodo[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newTodos)
    savetostorage()
  }
  const togglefinished = (e) => { 
    setshowFinished(!showfinished)
}
  const handleDelete = (e,id) => {
  let sure = confirm(`Are you sure to delete this!`)
  console.log(sure)
  if(sure==true){
    let newTodos = todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newTodos)
    savetostorage()
    }
  }
  const handleAdd = (e) => {
    setTodos([...todos,{id:uuidv4(), todo,isCompleted:false}])
    setTodo("")
    savetostorage()
  }
  const handleChange = (e) => { 
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => { 
  let id = e.target.name;
  let index = todos.findIndex(item=>{
    return item.id===id;
  })
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted
  setTodos(newTodos)
  savetostorage()
  }
  return (
    <>
    <Navbar/>
    <div className="mx-3 md:container bg-violet-300 rounded-xl md:mx-auto my-4 p-5 min-h-[80vh] sm:w-full lg:w-[90%] xl:w-1/2">
      <div className="addtodo flex flex-col gap-4">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <h2 className='text-2xl font-bold mx-8 mt-5 mb-2'>Add Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-md'/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-600 hover:bg-violet-950 text-white font-bold px-2 rounded-md text-lg'>Save</button>
      </div>
      <input type="checkbox" onChange={togglefinished} checked={showfinished}/>Show Finished
        <h2 className='text-2xl mx-8 font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='text-lg mx-5 font-bold text-violet-800'>No todos to display!</div>}
          {todos.map(item=>{
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 justify-between my-2">
              <div className='flex gap-5'>
              <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted}  />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white font-bold px-2 mx-1 rounded-md text-lg'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white font-bold px-2 py-1 mx-1 rounded-md text-lg'><MdDelete /></button>
            </div>
          </div>
           })}
        </div>
    </div>
    </>
  )
}

export default App
