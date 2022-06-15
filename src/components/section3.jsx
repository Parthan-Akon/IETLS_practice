
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";





export default function Section3() {

    const [questions, setQuestions] = useState({});

    useEffect(() => {

        // const q = query(collection(db,'readingQuestions'),orderBy("title","asc"))

        // getDocs(q).then(res => {
        //     const arr = res.docs.map((doc) => ({...doc.data(), id: doc.id}));
        //     setQuestions(arr);
        //     console.log(arr);
        // }).catch(err => console.log(err));
        setQuestions(JSON.parse(localStorage.getItem('readingQues')))

    },[])

    

    return (<>
        <div className="container" id="section3" style={{ backgroundColor: "darkseagreen" }}>
            <div className="side-container">
                <div className="side-a">
                    <div className="read-content" contentEditable="true" dangerouslySetInnerHTML={{__html: questions?.section3q}}>
                     
                    </div>
                </div>
                <div className="side-b">
                    <div className="read-content" contentEditable="true" dangerouslySetInnerHTML={{__html: questions?.section3a}}>

                    </div>

                </div>
            </div>
        </div>
    </>)
}