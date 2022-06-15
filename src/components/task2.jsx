import { useState,useEffect } from "react";

export default function Task2() {

    const [count, setCount] = useState(0);
    const [question,setQuestion] = useState({});



    useEffect(() => {

        if(localStorage.getItem('currentQuestion')){
            var obj = JSON.parse(localStorage.getItem('currentQuestion'));
            console.log(obj);
            setQuestion(obj)

        }
    },[])


    const handleKeyUp = (event) => {
        console.log(event.target.value);
        if (event.target.value === '') return;

        var words = event.target.value.split(' ');
        console.log(words.length);
        setCount(words.length);
    }

    return (
        <>
            <div className="container" id="task2">
                <div className="side-container">
                    <div className="side-a">
                        <p className="side-a-p">{question.task2}</p>

                    </div>
                    <div className="side-b">
                        <textarea className="side-b-content" onKeyUp={handleKeyUp}></textarea>
                        <div className="word-count">
                            word count: {count}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}