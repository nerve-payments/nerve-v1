import {Typography} from "antd";
import {useAppSelector} from "../../../store/hooks";

export const TotalAmountHeader = () => {
    const paymentData = useAppSelector(state => state.payment);
    return (
        <div>
            <Typography.Title level={4} style={{color: "#fff", marginTop: 20}}>Pay <i>{paymentData.merchant}</i></Typography.Title>
            <Typography.Title style={{color: "#fff"}}>${paymentData.amount}</Typography.Title>
        </div>
    )
}
