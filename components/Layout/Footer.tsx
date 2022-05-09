import { Col,Row } from "antd";

export const Footer = () => {
  return (
    <Row>
      <Col xs={24}>
        <a>Impressum</a>
        <a href="https://google.de">Datenschutz</a>
      </Col>
    </Row>
  );
}
