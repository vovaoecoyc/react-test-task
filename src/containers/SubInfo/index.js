import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Input, Label } from 'reactstrap'

class SubInfo extends React.Component {
  render() {
    const { subData } = this.props
    const content =
      subData !== null ? (
        <Container className="text-center align-items-center">
          <Row className="justify-content-center">
            <Col>
              <b>Выбран пользователь:</b> {` ${subData.firstName} ${subData.lastName}`}
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <Label for="description">
                <b>Описание:</b>
              </Label>
              <Input disabled id="description" type="textarea" defaultValue={subData.description} />
            </Col>
          </Row>
          <Row>
            <Col>
              <b>Адрес проживания:</b>
              {` ${subData.address.streetAddress}`}
            </Col>
          </Row>
          <Row>
            <Col>
              <b>Город:</b>
              {` ${subData.address.city}`}
            </Col>
          </Row>
          <Row>
            <Col>
              <b>Провинция/штат:</b>
              {` ${subData.address.state}`}
            </Col>
          </Row>
          <Row>
            <Col>
              <b>Индекс:</b>
              {` ${subData.address.zip}`}
            </Col>
          </Row>
        </Container>
      ) : (
        ''
      )
    return content
  }
}

const mapStateToProps = state => ({
  subData: state.subInformation.dataSubInformation
})

export default connect(mapStateToProps)(SubInfo)
