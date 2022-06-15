import {  useRef, useState } from "react";



export default function Timer() {

    const [deadTime, setDeadTime] = useState(3599);
    const timeRef = useRef();


    function pauseTimer() {
        var startButton = document.getElementById('startbutton');
        var pauseButton = document.getElementById('pausebutton');
        pauseButton.style.display = 'none';
        startButton.style.display = 'block'
        clearInterval(timeRef.current);
    }

    function stopTimer() {
        var startButton = document.getElementById('startbutton');
        var pauseButton = document.getElementById('pausebutton');
        pauseButton.style.display = 'none';
        startButton.style.display = 'block'
        clearInterval(timeRef.current);
        setDeadTime(3599);
    }

    function startTimer() {
        var startButton = document.getElementById('startbutton');
        var pauseButton = document.getElementById('pausebutton');

        pauseButton.style.display = 'block';
        startButton.style.display = 'none';

        timeRef.current = setInterval(() => {
            setDeadTime(prev => prev - 1);
        }, 1000)
    }

    function getTimeString(data) {
        try {
            let minutes = Math.floor(data % 3600 / 60);
            let seconds = Math.floor(data % 3600 % 60);

            if (minutes === 0 && seconds === 0) {
                stopTimer();

                let i = 0;
                var k = setInterval(() => {
                    i++;
                    if (i === 2) {
                        clearInterval(k);
                    }
                }, 2000);

            }

            if (minutes < 10) { minutes = "0" + minutes }
            if (seconds < 10) { seconds = "0" + seconds }

            return '' + minutes + ":" + seconds
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="timer-outer">
                <div id="startbutton" className="start-pause">
                    <button className="button-19" role="button" onClick={startTimer}>Start</button>
                </div>
                <div id="pausebutton" className="pause">
                    <button className="button-19" role="button" onClick={pauseTimer}>Pause</button>
                </div>
                <div className="timer-text">{getTimeString(deadTime)}</div>
                <div className="reset">
                    <button className="button-20" role="button" onClick={stopTimer}>Reset</button>
                </div>

            </div>
        </>
    )
}