import {Col, Row} from "antd";

export const BoughtItems = () => {
    const ITEMS = [
        {
            url: "https://images-na.ssl-images-amazon.com/images/I/61n-yWHcmSS.__AC_SY300_SX300_QL70_FMwebp_.jpg",
            name: "PS4",
            qty: 1,
            price: 30
        },
        {
            url: "https://images.news18.com/ibnlive/uploads/2021/08/football-16287529283x2.jpg",
            name: "Football",
            qty: 1,
            price: 40
        },
        {
            url: "https://images-na.ssl-images-amazon.com/images/I/61n-yWHcmSS.__AC_SY300_SX300_QL70_FMwebp_.jpg",
            name: "PS4",
            qty: 1,
            price: 60
        },
    ]
    return (
        <div>
            {
                ITEMS.map(item => {
                    return (
                        <Row style={{marginTop: 30}}>
                            <Col sm={4}>
                                <img src={item.url} alt={"Bought"} height={70} style={{flex: 1}} />
                            </Col>
                            <Col sm={12}>
                                <div className={"vertical-div"}>
                                    <div>{item.name}</div>
                                    <div>Qty: {item.qty}</div>
                                </div>
                            </Col>
                            <Col sm={8}>
                                <span style={{fontWeight: 600}}>${item.price}</span>
                            </Col>
                        </Row>
                    )
                })
            }
        </div>
    )
}
