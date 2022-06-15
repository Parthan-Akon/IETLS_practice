import { useEffect, useState } from "react";

export default function Task1() {

    const [count, setCount] = useState(0);
    const [question,setQuestion] = useState({});


    const handleKeyUp = (event) => {
        console.log(event.target.value);
        if (event.target.value === '') return;

        var words = event.target.value.split(' ');
        console.log(words.length);
        setCount(words.length);
    }

    useEffect(() => {

        if(localStorage.getItem('currentQuestion')){
            var obj = JSON.parse(localStorage.getItem('currentQuestion'));
            console.log(obj);
            setQuestion(obj)

        }
    },[])

    return (
        <>
            <div className="container" id="task1">
                <div className="side-container">
                    <div className="side-a">
                        <p className="side-a-p">{question.task1}</p>
                        <div className="image-container">
                            <img src={question.imageurl} alt="task-image" />

                        </div>
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