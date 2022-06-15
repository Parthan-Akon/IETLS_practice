import { useEffect, useState } from "react";



export default function ReadingAnswers(){
    const [questions, setQuestions] = useState({});

    useEffect(() => {

        setQuestions(JSON.parse(localStorage.getItem('readingQues')))

    },[])

    return(
        <>
        <div className="container" id="answersReading" style={{ backgroundColor: "darkseagreen" }}>
            <div className="side-container">
                <div className="answers-section">
                    <div className="read-content" dangerouslySetInnerHTML={{__html: questions?.sol1}}>
                     
                    </div>
                </div>
                <div className="answers-section">
                    <div className="read-content" dangerouslySetInnerHTML={{__html: questions?.sol2}} >

                    </div>

                </div>
                <div className="answers-section">
                    <div className="read-content" dangerouslySetInnerHTML={{__html: questions?.sol3}}>

                    </div>

                </div>
            </div>
        </div>

        </>
    )
}