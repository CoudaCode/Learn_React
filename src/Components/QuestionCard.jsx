function QuestionCard({Question, response, update, usersresponse}) {
  return (
    <div className="QuestionCard">
      <p>{Question}</p>
      <ul>

        {Object.keys(response).map((resp, i) => (
          <li key={i}>
            <input type="checkbox" checked={usersresponse?.includes(resp)} onChange={(e)=>{
                if (e.target.checked){
                  usersresponse = usersresponse ? [...usersresponse, resp] : [resp]
                }else{
                  if (usersresponse.includes(resp)){
                      usersresponse = usersresponse?.filter((item)=> item != resp)
                  }
                }
                update(Question,usersresponse)
              }}/>
            {resp}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionCard;