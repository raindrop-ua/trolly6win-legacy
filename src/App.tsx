import './App.css'

function App() {
    return (
        <>
            <h1>TrollySix</h1>
            <p>Timetable for trolleybus route number 6 in the city of Dnipro.</p>
            <div className="card">
                <div>
                    <div>
                        <button type="button">Weekday</button>
                        <button type="button">Weekend</button>
                    </div>
                </div>
                <div>
                    <h3>Start point</h3>
                    <div>
                        <button type="button">Pridniprovsk City</button>
                        <button type="button">Cathedral Square</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
