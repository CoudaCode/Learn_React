import { useState, useEffect } from "react";

let inter = null;
// pour renommer notre time on utilise un 2points " : "
function Chrono({ time: Time, submit, questionLength, answerslength }) {
  const [time, setTime] = useState(Time);
  useEffect(() => {
    if (time > 0) {
      inter = setInterval(function () {
        setTime(() => time - 1);
      }, 1000);
    } else{
      submit();
    }

    return ()=> clearInterval(inter);
  }, [time]);

  return (
    <div className="chrono">
      <div>
        <span>Time</span>
        <span> :{time}</span>
      </div>
      <p>{answerslength}/{questionLength}</p>
    </div>
  );
}
// const Obj ={
//   key : "bonjour",
//   kea : "bonsoir"
// }
export default Chrono;
