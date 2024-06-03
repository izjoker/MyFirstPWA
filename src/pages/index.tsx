import { useState, useEffect, useRef } from 'react';
import { Consts } from '../config';
import PastPeriods from '../components/index/pastPeriod';
import { Period } from '../classes/classes';
import './style.css';

function Index(props: any) {
    const startDateId = 'start-date';
    const endDateId = 'end-date';
    const [pastPeriodsState, setPastPeriodsState] = useState(null);

    
    const submitHander = (event: any) => {
        event.preventDefault();
        const startDate = event.target[startDateId].value;
        const endDate = event.target[endDateId].value;
        if (checkDatesInvalid(startDate, endDate)) {
            return;
        }
        storeNewPeriod(startDate, endDate);
    }

    function checkDatesInvalid(startDate: Date, endDate: Date) {
        if (!startDate || !endDate || startDate > endDate) {
            return true;
        }
        return false;
    }
    
    function storeNewPeriod(startDate: Date, endDate: Date) {
        const periods = getAllStoredPeriods();
        periods.push(new Period(startDate, endDate));
        periods.sort((a: any, b: any) => {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
        window.localStorage.setItem(Consts.PERIOD_STORAGE_KEY, JSON.stringify(periods));
        setPastPeriodsState(periods);
    }
    
    function clearPastPeriods() {
        window.localStorage.setItem(Consts.PERIOD_STORAGE_KEY, '');
        setPastPeriodsState(null);    
    }

    useEffect(() => {
        if (!pastPeriodsState) {setPastPeriodsState(getAllStoredPeriods())} ;
        return
    }, [pastPeriodsState])


    return (
        <div className="Page Index">
            <h1>Period tracker</h1>
            <form onSubmit={submitHander}>
                <fieldset>
                    <legend>Enter your period start and end date</legend>
                    <p>
                    <label htmlFor="start-date">Start date</label>
                    <input type="date" id={startDateId} required />
                    </p>
                    <p>
                    <label htmlFor="end-date">End date</label>
                    <input type="date" id={endDateId} required />
                    </p>
                </fieldset> 
                <p>
                <button type="submit">Add Period</button>
                </p>
            </form>
            <button onClick={clearPastPeriods}>clear</button>
            <section id="past-periods">
                {pastPeriodsState ? <PastPeriods /> : <></>}
            </section>
        </div>
    );
}

export default Index;

export function getAllStoredPeriods() {
    const data = window.localStorage.getItem(Consts.PERIOD_STORAGE_KEY);
    const periods = data ? JSON.parse(data) : [];
    return periods;
}