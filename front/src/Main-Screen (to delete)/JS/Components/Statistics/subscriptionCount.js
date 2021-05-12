import React from "react";
import { subscriptionCount } from "../../Services/statisticsService";

const  months = ['January','February','March','April','May','June','July','August','September','October','November','December']

const SubscriptionCount = () => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        subscriptionCount().then(res => setData(res))
    }, [])

    return (
        <div className="subscription-count">
            <h2>Number of new monthly subscriptions during the last 6 months</h2>
            <div>
                <p>Month of Year</p>
                <p>Number of subscriptions</p>
            {
                data.map(month => {
                    return (
                        <React.Fragment>
                            <p>{`${months[new Date(month.start_date_a_mes).getMonth()+1]}
                            of ${new Date(month.start_date_a_mes).getFullYear()}`}</p>
                            <p>{month.cantidad}</p>
                        </React.Fragment>
                    )
                })
            }
            </div>
            {
                (data.length === 0) && <p>There is not new subscriptions</p>
            }
        </div>
    )
}

export default SubscriptionCount