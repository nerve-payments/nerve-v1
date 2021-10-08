import {Col, Row} from "antd";

export const BoughtItems = () => {
    return (
        <Row>
            <Col sm={6}>
                <img src={"https://images-na.ssl-images-amazon.com/images/I/61n-yWHcmSS.__AC_SY300_SX300_QL70_FMwebp_.jpg"} alt={"Bought"} height={70} style={{flex: 1}} />
            </Col>
            <Col sm={12}>
                <div className={"vertical-div"}>
                    <div>PS4</div>
                    <div>Qty 1</div>
                </div>
            </Col>
            <Col sm={6}>
                <span style={{fontWeight: 600}}>$33</span>
            </Col>
        </Row>
    )
}
