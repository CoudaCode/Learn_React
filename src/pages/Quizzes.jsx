import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";

function Quizzes() {
  const [quiz, setQuizz] = useState([]);
  
  const [load, setLoad] = useState(true);
  console.log(quiz)
  function fetchData() {
    fetch("http://localhost:4000/api/quiz")
      .then((resq) => resq.json())
      .then((result) => {
        console.log(result);
        setQuizz(result);
        setLoad(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <button>quiz 1</button>
    </>
  );
}
export default Quizzes;
