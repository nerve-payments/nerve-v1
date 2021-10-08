import {Typography} from "antd";

export const TotalAmountHeader = () => {
    return (
        <div>
            <Typography.Title level={4} style={{color: "#fff", marginTop: 20}}>Pay {"<Merchant-Name>"}</Typography.Title>
            <Typography.Title style={{color: "#fff"}}>$27.34</Typography.Title>
        </div>
    )
}
