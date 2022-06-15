import { useEffect, useRef, useState } from "react";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import * as firebase from "firebase/app";
import { storage,db } from "../firebase-config";
import { addDoc, collection, Firestore, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";




export default function Admin() {


    const [selectedFile, setSelectedFile] = useState(null);
    const [task1Value, setTask1Value] = useState('')
    const [task2Value, setTask2Value] = useState('')
    const taskcount = useRef();
    
    const imageListRef = ref(storage,'images/');


    useEffect(() => {

        const q = query(collection(db,'questions'),orderBy("title","asc"))

        getDocs(q).then(res => {
            console.log(res.docs)

            const arr = res.docs.map((doc) => ({...doc.data(),id: doc.id}));
            console.log(arr);

            taskcount.current = res.docs.length;
        }).catch(err => console.log(err))


        


    },[])

    const handleSubmit = () => {
        console.log(selectedFile);

        if(selectedFile == null) return;
        const imageRef = ref(storage, `images/${selectedFile.name}`);
        uploadBytes(imageRef,selectedFile).then(res => {
            getDownloadURL(res.ref).then(url => {
                let saveObject = {
                    imageurl: url,
                    task1: task1Value,
                    task2: task2Value,
                    title: `Task ${taskcount.current + 1}`
                }

                console.log(saveObject);

                addDoc(collection(db,"questions"),saveObject).then(res => {
                    console.log(res)
                }).catch(err => console.log(err))

                
            })
        })
    }

    return (
        <>
            <div className="outer-container">

                <div className="inner-container">
                    <div className="ques-container">
                        <div className="ques-div">
                            <div>
                                Enter Task 1 Question
                            </div>
                            <div>
                                <textarea rows="8" value={task1Value} onChange={(event) => setTask1Value(event.target.value)} className="text-area-admin" />
                            </div>
                        </div>
                        <div className="ques-div">
                            <div>
                                Enter Task 2 Question
                            </div>
                            <div>
                                <textarea rows="8" value={task2Value} onChange={(event) => setTask2Value(event.target.value)} className="text-area-admin" />
                            </div>
                        </div>
                        <div className="ques-div">
                            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                        </div>

                        <button class="button-30" role="button" onClick={handleSubmit}>Submit</button>

                    </div>


                </div>


            </div>
        </>
    )
}