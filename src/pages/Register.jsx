import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate()
  function submitForm(e) {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(res=> res.text())
    .then(response=> console.log(response))
   .then(()=> navigate("/login"))
  }

  return (
    <>
      <form
        onSubmit={submitForm}
        className="form"
        style={{ width: "18rem" }}
        method=""
      >
        <h3>Inscription</h3>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Nom"
        />
        <br />
        <input
          type="prenom"
          name="prenom"
          className="form-control"
          placeholder="Prenom"
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter un mail"
        />
        <br />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Entrer le mot de passe"
        />{" "}
        <br />
        <button type="submit">Inscription</button>
      </form>
    </>
  );
}

export default Register;
