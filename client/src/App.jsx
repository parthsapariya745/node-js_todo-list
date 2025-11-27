import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [todos, setTodo] = useState([])
  const [input, setInput] = useState("")
  const [index, setIndex] = useState(null)
  const [btn, setBtn] = useState(true)
  const [edit, setEdit] = useState("")

  let handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:5000/app/todos/postData", {
        task: input
      });
      setTodo([...todos, res.data.todoData]);
    } catch (error) {
      console.log("Don't Add Todo Data", error);
    }
    setInput("");
  };

  useEffect(() => {
    let handleGetData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/app/todos/getAllData"
        );
        setTodo(res.data.allTodoData);
      } catch (error) {
        console.log("Don't Read Todo Data", error);
      }
    };
    handleGetData();
  }, []);
  
  let handleEdit = async (id, task) => {
    try {
      setIndex(id)
      setBtn(false)
      setEdit(task)
    } catch (error) {
      console.log("Don't Edit Todo Data", error);
    }
  };
  
  let handleSave = (id) => {
    try {
      axios.put(`http://localhost:5000/app/todos/updateData/${id}`)
      setBtn(true)
      setEdit("")
    } catch (error) {
      console.log("Don't Save Todo Data", error);
    }
  };
  
  let handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/app/todos/deleteData/${id}`);
      setTodo(todos.filter((j) => j._id !== id));
    } catch (error) {
      console.log("Don't Delete Todo Data", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex items-center justify-center p-6">
      <div className="w-full max-w-[480px] bg-zinc-800 shadow-lg rounded-2xl p-6 border border-zinc-700">
        <h1 className="text-2xl font-semibold text-white mb-4 text-center">
          Todo List
        </h1>
        <div className="btn flex sm:flex-row flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter your task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-zinc-600 rounded-xl bg-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          />
          <div className="btn flex gap-2">
            <button
              className="px-4 py-2 sm:w-auto w-full cursor-pointer bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
              onClick={handleAdd}
            >
              Add
            </button>
            <button className="px-4 py-2 sm:w-auto w-full cursor-pointer bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition">
              Clear All
            </button>
          </div>
        </div>
        <ul className="space-y-2">
          {todos.map((e, i) => {
            return (
              <li
                key={i}
                className='flex items-center gap-2 justify-between rounded-xl px-4 py-2.5'
              >
                {e._id === index && !btn ? (
                  <input
                  type="text"
                  onChange={(e) => setEdit(e.target.value)}
                  value={edit}
                  className="flex-1 px-4 py-1.5 border border-zinc-600 rounded-[7px] text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  />
                ) : (
                  <span className="text-white">{e.task}</span>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => !btn ? handleSave(e._id) : handleEdit(e._id, e.task)}
                    className={`${
                      e._id === index && !btn
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } px-3 py-1.5 cursor-pointer text-white text-sm rounded-lg transition`}
                  >
                    {e._id === index && !btn ? "Save" : "Edit"}
                  </button>
                  <button
                    className="px-3 py-1.5 cursor-pointer text-white text-sm rounded-lg transition bg-red-600 hover:bg-red-700"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default App;