import {useAppSelector} from "../../../store/hooks";
import {Col, Row} from "antd";

export const PaymentSummary = () => {
    const paymentOptions = useAppSelector(state => state.payment);
    return(
        <div>
            <Row>
                <Col sm={18}>
                    <span>Chain selected -</span>
                </Col>
                <Col sm={6}>
                    <span>{paymentOptions.blockchain}</span>
                </Col>
                <Col sm={18}>
                    <span>Wallet selected - </span>
                </Col>
                <Col sm={6}>
                    <span>{paymentOptions.wallet}</span>
                </Col>
                <Col sm={18}>
                    <span>Coin selected -</span>
                </Col>
                <Col sm={6}>
                    <span>{paymentOptions.coin}</span>
                </Col>
                <Col sm={18}>
                    <span>Amount of coins being paid -</span>
                </Col>
                <Col sm={6}>
                    <span>{paymentOptions.amount}</span>
                </Col>
            </Row>
        </div>
    )
}
