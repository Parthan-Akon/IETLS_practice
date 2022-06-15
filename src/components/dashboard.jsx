import { useNavigate } from 'react-router-dom'


export default function Dashboard() {
    const navigate = useNavigate();
    

    function handleClick(){
        
        navigate('/writinglist')
    }

    function goToWriting() {
        navigate('/readinglist')
    }

    return (
        <>
            <div className="outer-container">
                <div className="dashboard-outer">
                    <div className="w-box" onClick={handleClick}>
                        <div >
                            Writing
                        </div>

                    </div>
                    <div className="w-box" onClick={goToWriting}>
                        <div >
                            Reading
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}