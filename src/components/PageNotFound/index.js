import React from "react";
import "./pagenotfound.scss";
import UniSVG from "./UniSVG";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { PATHS } from "../../constants";
import { Link } from "react-router-dom";

//
export default function index() {
    return (
        <Row className='page-not-found_row'>
            <Col md={6}>
                <UniSVG />
            </Col>
            <Col md={6} className='go-home'>
                <h1>Không tìm thấy kết quả !.!</h1>
                <Link to={PATHS.HOMEPAGE}>HOME</Link>
            </Col>
        </Row>
    );
}
