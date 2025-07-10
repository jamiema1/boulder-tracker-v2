import React from "react"

import Calendar from "modules/pages/dashboardPage/calendar"
import SessionLengthLineGraph from "modules/pages/dashboardPage/sessionLengthLineGraph"
import SessionClimbsAttemptsSendsLineGraph from "modules/pages/dashboardPage/sessionClimbsAttemptsSendsLineGraph"
import SessionGymDoughnutGraph from "modules/pages/dashboardPage/sessionGymDoughnutGraph"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import SessionClimbsGradeBubbleGraph from "./sessionClimbsGradeBubbleGraph"
import SessionAttemptsGradeBubbleGraph from "./sessionAttemptsGradeBubbleGraph"
import SessionSendsGradeBubbleGraph from "./sessionSendsGradeBubbleGraph"
import SessionFailsGradeBubbleGraph from "./sessionFailsGradeBubbleGraph"

export default function DashboardPage() {
  return (
    <div className="page">
      <div className="pageTitle">Dashboard</div>
      <Container>
        <Row className="mb-5">
          <Col>
            <Calendar />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <SessionLengthLineGraph />
          </Col>
          <Col>
            <SessionClimbsAttemptsSendsLineGraph />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <SessionClimbsGradeBubbleGraph />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <SessionAttemptsGradeBubbleGraph />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <SessionSendsGradeBubbleGraph />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <SessionFailsGradeBubbleGraph />
          </Col>
        </Row>
        <Row>
          <Col>
            <SessionGymDoughnutGraph />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
