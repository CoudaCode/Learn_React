import { useState, useEffect } from "react";
import QuestionCard from "./../Components/QuestionCard";
import Chrono from "./../Components/chrono";
import quiz from "./../../Api/data/quiz.json";
// let quiz = {};

function Quiz() {
  // State pour les question
  console.log("quiz", quiz);
  const [answers, setAnswers] = useState({});

  // State pour dire si le jeu est terminer ou non
  const [gameOver, setGameOver] = useState(false);

  // State pour les Resultats
  const [result, setResult] = useState({});

  //Commancer le quiz
  const [startQuiz, setStatesQuiz] = useState(false);

  // State
  const [Time, setTime] = useState(0);

  function fetchData() {
    fetch("http://localhost:4000/api/quiz")
      .then((resq) => resq.json())
      .then((result) => console.log(result));
  }

  useEffect(() => {
    // Sesion pour le temps
    let endTime = sessionStorage.getItem("endTime");
    // Session pour les questions
    let answers = sessionStorage.getItem("Answers");
    if (endTime) {
      setStatesQuiz(true);
      setTime(parseInt((endTime - new Date().getTime()) / 1000));
    }
    fetchData();
    // console.log('Answers SessionStorage', JSON.parse(answers))
    if (answers) {
      setAnswers(JSON.parse(answers));
    }
  }, []);

  function UpdateAnswers(Question, response) {
    answers[Question] = response;
    sessionStorage.setItem("Answers", JSON.stringify(answers));
    setAnswers({ ...answers });
  }

  function getResults() {
    // Compteur des questions
    let compteur = 0;
    console.log("answers", answers);

    for (const count in answers) {
      // Nos reponse de l'utilsateur ......
      let result = answers[count];
      console.log("Mes reponse justes", result);
      // L'objet questions auquel l'utilisateur à repondu ......
      let findQuestion = quiz[0].Questions.find((item) => item.question === count);
      console.log("les questions", findQuestion);
      // filter les reponses qui sont "true" dans les question (findQuestion).........
      let response = Object.entries(findQuestion.response)
        .filter((ele) => ele[1])
        .map((lem) => lem[0]);
      console.log("Les reponse justes", response);

      let pointByResponse = 1 / quiz[0].Questions.length;

      let countUserResponse = 0;

      // Verifier si les reponse vrai de l'utilisateur sont inclurent dans tableau de bonne reponse
      response.forEach((elem) => {
        if (result.includes(elem)) {
          countUserResponse += pointByResponse;
        } else {
          // verifie si countUserResponse n'es pas 0
          if (countUserResponse < 0) {
            countUserResponse -= pointByResponse;
          }
        }

        compteur += countUserResponse;
        console.log("compteur", countUserResponse);
      });
    }

    setResult({
      responseTotal: Math.ceil(compteur * quiz.Points),
      percent:
        (Math.ceil(compteur * quiz.Questions.length) * 100) /
        quiz.Questions.length,
      point: Math.ceil(compteur * quiz.Points) / quiz.Questions.length,
    });
  }

  function submitQuiz() {
    setGameOver(true);
    getResults();
  }

  return startQuiz ? (
    gameOver ? (
      <div className="resultat">
        <p>
          Nombre de question : <span>{quiz.Questions.length}</span>
        </p>
        <p>
          Nombre de question trouvées: <span>{result.responseTotal}</span>
        </p>
        <p>
          Pourcentage: <span>{result.percent}%</span>
        </p>
        <p>
          Nombre de point:<span>{result.point}</span>
        </p>

        <button
          type="submit"
          onClick={() => {
            sessionStorage.clear();
            setAnswers({}), setGameOver(false), setResult({});
            setStatesQuiz(false);
          }}
        >
          Retry
        </button>
      </div>
    ) : (
      <>
        <Chrono
          time={Time}
          submit={submitQuiz}
          questionLength={quiz[0].Questions.length}
          answerslength={
            Object.values(answers).filter((item) => item.length > 0).length
          }
        />
        <div className="question">
          {quiz.Questions.map((ele, i) => (
            <QuestionCard
              key={i}
              Question={ele.question}
              response={ele.response}
              update={UpdateAnswers}
              usersresponse={answers[ele.question]}
            />
          ))}
        </div>

        <button>Submit </button>
      </>
    )
  ) : (
    <button
      onClick={() => {
        sessionStorage.setItem(
          "endTime",
          new Date().getTime() + quiz.time * 1000
        );
        setStatesQuiz(true);
        setTime(quiz.time);
      }}
    >
      Commencer le Quiz
    </button>
  );
}
export default Quiz;
