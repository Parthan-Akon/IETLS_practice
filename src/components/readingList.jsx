import { collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db, currentQuestionID } from "../firebase-config"
import { useNavigate } from 'react-router-dom'


export default function ReadingList(){

    const [questions,setQuestions] = useState([])

    useEffect(() => {

        const q = query(collection(db,'readingQuestions'),orderBy("title","asc"));

        getDocs(q).then(res => {
            const arr = res.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setQuestions(arr);
        }).catch(err => console.log(err))
    },[])


    return (
        <>
            <div className="outer-container">
                <div className="writing-list-container">
                    <div className="writing-list-title">
                        Reading Task list
                    </div>
                    <div>
                        <ul>

                            {questions?.map((res, index) => {
                                return <li key={index}>
                                    <ListItem data={res} />
                                </li>
                            })}


                        </ul>
                    </div>

                </div>

            </div>
        </>
    )

}


function ListItem(props) {

    console.log(props);

    const navigate = useNavigate();

    function handleClick(data) {
        
        console.log(data)
        localStorage.setItem('readingQues',JSON.stringify(data));
        navigate('/reading')
    }

    return (
        <>
            {props?.data?.solved && <div className="w-list-li-success" onClick={() => handleClick(props.data)}>
                <div>
                    {props?.data?.title}  - Marks: {props?.data?.marks}
                </div>
                <div style={{ display: 'flex' }}>
                    Solved
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 w-l-list" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>}

            {!props?.data?.solved && <div className="w-list-li" onClick={() => handleClick(props.data)}>
                <div>
                    {props?.data?.title} - Marks: {props?.data?.marks}
                </div>
                <div style={{ display: 'flex' }}>
                    Unsolved
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 w-l-list" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>}

        </>
    )
}