import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentQuestionID, db } from "../firebase-config";
import Task1 from "./task1";
import Task2 from "./task2";
import Timer from "./timer";



export default function Home() {


    const [showNextPage, setShowNextPage] = useState(false)
    const [taskHeading, setTaskHeading] = useState('Report: ');



    const navigate = useNavigate();


    const handleNext = () => {
        if (localStorage.getItem('page') === '1') {
            setShowNextPage(true)
        }
        localStorage.setItem('page', '2');
        setTaskHeading('Writing: ' + JSON.parse(localStorage.getItem('currentQuestion')).title)
    }

    const handleBack = () => {
        if (localStorage.getItem('page') === '2') {
            setShowNextPage(false)
        }
        localStorage.setItem('page', '1');
        setTaskHeading('Report: ' + JSON.parse(localStorage.getItem('currentQuestion')).title)
    }

    function navigateHome() {
        navigate('/');
    }

    useEffect(() => {
        localStorage.setItem('page', "1");

        const docRef = doc(db, 'currentQuestion', currentQuestionID)

        getDoc(docRef).then(res => {
            console.log(res.data())
            localStorage.setItem('currentQuestion', JSON.stringify(res.data()))
            setTaskHeading('Report: ' + res.data().title)
        }).catch(err => console.log(err))

    }, [])

    


    function handleSubmit(){
       var id = localStorage.getItem('questionid');
       var obj = JSON.parse(localStorage.getItem('currentQuestion'));
       console.log(obj)
       console.log(id);
       const docRef = doc(db,'questions',id);
       updateDoc(docRef,{...obj,solved:true}).then(res => {
           console.log(res);
           alert("Submitted Successfully..")
        }).catch(err => console.log(err));
    }

    return (
        <>
            <div className="outer-container">
                <div className="toolbar">
                    <div className="taskName" onClick={navigateHome}>
                        {taskHeading}
                    </div>

                    <Timer />
                    <div className="navbuttons">
                        <svg className="next-button h-5 w-5" xmlns="http://www.w3.org/2000/svg" onClick={handleBack} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                        </svg>
                        <svg className="next-button h-5 w-5" xmlns="http://www.w3.org/2000/svg" onClick={handleNext} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>

                        <button className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>


                    </div>

                </div>


                {/* TASK 1 */}
                {!showNextPage && <Task1 />}
                {showNextPage && <Task2 />}




                {/* TASK 2 */}




            </div>
        </>
    )
}