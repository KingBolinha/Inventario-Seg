import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
export default function App(){ 
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white/5 p-10 rounded-2xl w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-green-300 mb-4">Inventário - Protótipo</h1>
          <p className="text-sm text-gray-300">Frontend pronto. Conecte ao backend pela variável REACT_APP_API_URL.</p>
          <div className="mt-6 space-x-2">
            <Link to="/" className="text-green-300">Login</Link>
            <Link to="/register" className="text-green-300">Cadastrar</Link>
          </div>
        </div>
      </div>
    </Router>
  )
}
