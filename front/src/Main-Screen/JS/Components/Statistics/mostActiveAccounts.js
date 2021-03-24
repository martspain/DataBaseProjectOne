import React from "react"
import { mostActiveAccounts } from "../../Services/statisticsService"

const MostActiveAccounts = () => {
    const [data, setData] = React.useState([])

    React.useEffect(() => {
        mostActiveAccounts().then(res => setData(res))
    }, [])

    return (
        <div className="subscription-count">
            <h2>Most active accounts on the platform</h2>
            <div>
                <p>Account Username</p>
                <p>Number of Reproductions</p>
            {
                data.map(account => {
                    return (
                        <React.Fragment>
                            <p>{account.username}</p>
                            <p>{account.cantidad_reproducciones}</p>
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

export default MostActiveAccounts