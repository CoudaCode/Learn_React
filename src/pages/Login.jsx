import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate()
    function submitLogin(e){
        let data = Object.fromEntries(new FormData(e.target));
        console.log(data.email)
        e.preventDefault()
        fetch("http://localhost:4000/api/auth/login", {
            method:"POST",
            body : JSON.stringify(data)
        }
        )
        .then(res=> res.text())
        .then(resp=>{
                if(resp === "error"){
                     alert("Error")
                }else{

                     localStorage.setItem('user', JSON.stringify(resp))
                     navigate('/Quiz')
                }
        })
    }
    return(
       <>
          <form className="form" onSubmit={submitLogin}>
              <h3>Connexion</h3>
              <input type="email" name="email" className="form-control" placeholder="Enter un mail" /><br />
              <input type="password" name="password" className="form-control" placeholder="Entrer le mot de passe" /> <br />
              <button type="submit" >Connexion</button>
          </form>
       </>
    )
}

export default Login