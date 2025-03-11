import './App.css'
import './index.css'
import Quiz from './components/Quiz'

function App() {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">

      <main className="flex-1 flex items-stretch p-2 overflow-hidden">
        <Quiz />
      </main>
      
      <footer className="py-2 text-center text-4xl text-gray-500 bg-gray-100">
        <p>© 2024 Викторина. Все права защищены.</p>
      </footer>
    </div>
  )
}

export default App
