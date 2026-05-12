import { useState, useEffect } from 'react'
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react"
import { api } from './apiaxios'


export default function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  useEffect(() => {
  api.get('/tarefas')
    .then((response) => {
      setTasks(response.data)
    })
    .catch((error) => {
      console.error("Erro ao procurar tarefas:", error)
    })
}, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    try {
      const response = await api.post('/tarefas', {
        title: newTaskTitle,
        description: ""
      })

      setTasks((prevTasks) => [...prevTasks, response.data])
      setNewTaskTitle('')
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error)
    }
  }

  const toggleTask = async (task) => {
    try {
      const response = await api.put(`/tarefas/${task.id}`, {
        ...task,
        completed: !task.completed
      })

      setTasks((prevTasks) =>
        prevTasks.map((t) => t.id === task.id ? response.data : t)
      )
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tarefas/${id}`)

      setTasks((prevTasks) =>
        prevTasks.filter((t) => t.id !== id)
      )
    } catch (error) {
      console.error("Erro ao apagar tarefa:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Minhas Tarefas</h1>
          
          {/* Formulário de Adição */}
          <form onSubmit={addTask} className="flex gap-2 mb-8">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="O que precisas de fazer?"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={24} />
            </button>
          </form>

          {/* Lista de Tarefas */}
          <div className="space-y-3">
            {tasks.length === 0 && (
              <p className="text-center text-gray-500 py-4">Nenhuma tarefa para hoje! 🎉</p>
            )}
            {tasks.map(task => (
              <div 
                key={task.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 group"
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleTask(task)} className="text-blue-500">
                    {task.completed ? <CheckCircle2 size={22} /> : <Circle size={22} className="text-gray-300" />}
                  </button>
                  <span className={`text-gray-700 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}