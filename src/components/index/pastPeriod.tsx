import { getAllStoredPeriods } from "../../pages/index";
import { Period } from "../../classes/classes";

function PastPeriods(props: any) {

    function createPastPeriods() {
        const periods = getAllStoredPeriods();
        const r: any = [];
        if (periods.length === 0) {
            return;
        }
        periods.forEach((period: Period, idx: Number) => {
            const periodEl = document.createElement("li");
            periodEl.textContent = ``;
            r.push(<li key={idx.toString()}>
                {`From ${formatDate(period.startDate)} to ${formatDate(period.endDate)}`}
            </li>)
        });
        
        return r;
    }
    
    function formatDate(dateString: Date) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { timeZone: "UTC" });
    }

    return <div className="component past-periods">
        <h2>Past periods</h2>
        <ul>{createPastPeriods()}</ul>
    </div>
}

export default PastPeriods;