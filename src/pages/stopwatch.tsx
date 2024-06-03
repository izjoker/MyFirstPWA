import { useState, useEffect, useRef } from 'react';
import WatchDisplay from '../components/stopwatch/display'


function Stopwatch(props: any) {
    const WATCH_INTERVAL = 50;
    const [now, setNow] = useState(0);
    const [time, setTime] = useState(0);
    const [prevTime, setprevTime] = useState(0);
    const [activeInterval, setActiveInterval] = useState<null | NodeJS.Timer>(null);
    const [startAt, setStartAt] = useState<null | number>(null);
    
    const onStopWatchToggle = () => {
        if (activeInterval) {
            setActiveInterval(null);
            setprevTime(time);
            clearInterval(activeInterval);
        } else {;
            setStartAt(Date.now());
            setActiveInterval(setInterval(() => {
                setNow(Date.now());
            }, WATCH_INTERVAL));
        }
    }
    useEffect(() => {
        if (startAt && now) {
            setTime(prevTime + now - startAt);
        }
    }, [now])

    return (
        <div className="Page StopWatch">
            <WatchDisplay time={time}/>
            <button className="StopWatch ToggleButton" onClick={onStopWatchToggle}>O</button>
        </div>

    );
}

export default Stopwatch;
