export default function Quiz(props) {
    var answers = props.quiz.option.map((v, i) => {
        var answer = v === props.quiz.choose && 'active'
        if(props.isCheckAnswers){
            answer = v === props.quiz.choose && i === parseInt(props.quiz.correct) - 1 ? "correct" : v === props.quiz.choose ? "incorrect" : ''
            if(answer == ''){
                answer = i == parseInt(props.quiz.correct) - 1 ? "correct" : ''
            }
        }
        return (
            <>
                <input
                    key={`${(i + 1) * 10}`}
                    type="radio"
                    name={props.idQuestion}
                    checked={v === props.quiz.choose}
                    onChange={(event) => props.handleChange(event, props.idQuestion)}
                    value={v}
                    id={`id${props.idQuestion}i${i}i`}
                />
                <label key={(i + 1) * 11} className={`answer ${answer}`} htmlFor={`id${props.idQuestion}i${i}i`}>
                    {v}
                </label>
            </>
        )
    })
    return (
        <div className={`quiz`}>
            <h3 className="question">Group of related word "{props?.quiz?.quiz.join("\" \"")}"</h3>
            {answers}
        </div>
    )
}