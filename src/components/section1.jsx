
import { useEffect, useState } from "react";





export default function Section1() {

    const [questions, setQuestions] = useState({});

    useEffect(() => {

        setQuestions(JSON.parse(localStorage.getItem('readingQues')))

    },[])

    

    return (<>
        <div className="container" id="section1" style={{ backgroundColor: "darkseagreen" }}>
            <div className="side-container">
                <div className="side-a">
                    <div className="read-content" contentEditable="true" dangerouslySetInnerHTML={{__html: questions?.section1q}}>
                     
                    </div>
                </div>
                <div className="side-b">
                    <div className="read-content" contentEditable="true" dangerouslySetInnerHTML={{__html: questions?.section1a}}>

                    </div>

                </div>
            </div>
        </div>
    </>)
}