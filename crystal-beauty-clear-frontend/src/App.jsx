import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'

function App() {
  return(
    <div className="w-full h-screen bg-orange-200">
    <div className="w-[500px] h-[500px] bg-gray-300 flex flex-col items-center relative">

      <div className="w-[90px] h-[90px] bg-red-500">
      </div>
      <div className="w-[90px] h-[90px] bg-yellow-500 absolute right-[50px] bottom -[50px]">
      </div>
      <div className="w-[90px] h-[90px] bg-blue-500 fixed right-[50px] bottom-[50px]">
      </div>
      <div className="w-[90px] h-[90px] bg-green-500">
      </div>

    </div>
    </div>
  )
}

export default App
