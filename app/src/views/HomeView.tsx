import React from 'react';
import {Row, Col} from 'antd';
import {HomeLeft} from "../components/Home/HomeLeft";
import {HomeRight} from "../components/Home/HomeRight";

export const HomeView = () => {
    return (
        <div className={"home-view"}>
            <Row>
                <Col md={12}><HomeLeft /></Col>
                <Col md={12}><HomeRight /></Col>
            </Row>
        </div>
    )
}
