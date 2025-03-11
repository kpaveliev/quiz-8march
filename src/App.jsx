import './App.css'
import './index.css'
import Quiz from './components/Quiz'

function App() {
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Викторина "Кто хочет стать миллионером?"</h1>
        <p className="text-gray-600">Проверьте свои знания и выиграйте виртуальный миллион!</p>
      </header>
      
      <main>
        <Quiz />
      </main>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© 2024 Викторина. Все права защищены.</p>
      </footer>
    </div>
  )
}

export default App
