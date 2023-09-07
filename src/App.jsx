import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Quiz from "./pages/QUiz"
import { useEffect } from "react"
import Quizzes from "./pages/Quizzes"



function App() {
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const path= location.pathname
    useEffect(()=>{
        console.log(location.href, "test")
        if ((path == "/login" || path == "/Register") && user) {
          navigate('/Quiz')
        }else if(path == "/Quiz" && !user){
          navigate('/login')
        }
    }, [])
    return (
      <>
        <Routes>
              <Route path="/" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/Quiz" element={<Quiz/>}/>
              <Route path="/Quizzes" element={<Quizzes/>}/>
        </Routes>

      </>
    )
}

export default App