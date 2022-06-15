import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import ReadingAnswers from "./readingAnswers";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Timer from "./timer";



var section1;
var section2;
var section3;
var section4;
var questionObject;


export default function Reading() {

    const [currentSection,setCurrentSection] = useState('Section1')
    const [taskHeading, setTaskHeading] = useState('Reading: ');
    const [inputMark, setInputMark] = useState('0');

    useEffect(() => {
        section1 = document.getElementById('reading-section1');
        section2 = document.getElementById('reading-section2');
        section3 = document.getElementById('reading-section3');
        section4 = document.getElementById('reading-answers');

        section1.classList.add('section-active');
        setCurrentSection("Section1");
        questionObject = JSON.parse(localStorage.getItem('readingQues'));
        setTaskHeading('Reading: ' + questionObject?.title)
        setInputMark(questionObject?.marks)
        console.log(currentSection)
    },[])

    const navigate = useNavigate();
    function navigateHome() {
        navigate('/');
    }

    function addActiveClass1() {

        section1.classList.add('section-active');
        section2.classList.remove('section-active')
        section3.classList.remove('section-active')
        section4.classList.remove('section-active')

        setCurrentSection("Section1");
    }
    function addActiveClass2() {
        section2.classList.add('section-active');
        section1.classList.remove('section-active')
        section3.classList.remove('section-active')
        section4.classList.remove('section-active')

        setCurrentSection("Section2");
    }
    function addActiveClass3() {
        section3.classList.add('section-active');
        section2.classList.remove('section-active')
        section1.classList.remove('section-active')
        section4.classList.remove('section-active')
        setCurrentSection("Section3");
    }

    function addActiveClass4() {
        section4.classList.add('section-active');
        section3.classList.remove('section-active')
        section2.classList.remove('section-active')
        section1.classList.remove('section-active')
        setCurrentSection("Answers");
    }

    const handleSubmit = () => {
        var obj = JSON.parse(localStorage.getItem('readingQues'));
        const docRef = doc(db,'readingQuestions',obj.id);
        if(obj.solved){
            alert("This has already been solved 🤨");
            return;
        }
        updateDoc(docRef,{...obj,solved:true,marks:inputMark}).then(res => {
            console.log(res)
            alert("Submitted successfully!")
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
                    <div className="navbuttons" >
                        <svg style={{visibility:'hidden'}} className="next-button h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                        </svg>
                        <svg style={{visibility:'hidden'}} className="next-button h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                        <div style={{color:"white",margin:"auto"}}>Marks: &nbsp;</div>
                        <input type="text" value={inputMark} onChange={(e) => setInputMark(e.target.value)} className="input-mark"></input>

                        <button className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>

                </div>


                {
                   currentSection === 'Section1' && <Section1 />
                }
                {
                   currentSection === 'Section2' && <Section2 />
                }
                {
                   currentSection === 'Section3' && <Section3 />
                }
                {
                   currentSection === 'Answers' && <ReadingAnswers />
                }


                <div className="footer-reading">
                    <div className="white section" id="reading-section1" onClick={addActiveClass1}>Section 1</div>
                    <div className="white section" id="reading-section2" onClick={addActiveClass2}>Section 2</div>
                    <div className="white section" id="reading-section3" onClick={addActiveClass3}>Section 3</div>
                    <div className="white section" id="reading-answers" onClick={addActiveClass4}>Answers</div>
                </div>



            </div>
        </>
    )
}