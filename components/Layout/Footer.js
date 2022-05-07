import { Row, Col } from "antd";

export default function Footer() {
  return (
    <Row>
      <Col xs={24}>
        <a>Impressum</a>
        <a href="https://google.de">Datenschutz</a>
      </Col>
    </Row>
  );
}
