import { useState, useEffect, useRef } from 'react';

function Display(props: any) {
    const time = props.time
    const [hours, mins, secs] = resolveIntTime(toSec(time));
    

    useEffect(() => {
        return
    }, [])

    return (
        <div className="Stopwatch Display" style={{fontSize: '50px', fontFamily: 'monospace', fontWeight: 'bold'}}>
            <span className="Hours">{hours}</span>:
            <span className="Mins">{mins}</span>:
            <span className="Secs">{secs}</span>
        </div>
    );
}

export default Display;


function resolveIntTime(time: number){
    const hours = String(Math.floor(time / 60 / 60)).padStart(2, '0');
    const mins = String(Math.floor(time / 60) % 60).padStart(2, '0');
    const secs = String(Math.floor(time) % 60).padStart(2, '0');
    return [hours, mins, secs];
}

function toSec(time: number) {
    return time / 1000;
}