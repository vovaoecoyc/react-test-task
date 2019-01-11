import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ButtonGroup, Button } from 'reactstrap'

class ModalDataSelect extends Component {
  handlerClick = (e, value) => {
    this.props.selectDataCallback(value)
  }
  render() {
    let { showModal } = this.props
    return (
      <Modal isOpen={showModal}>
        <ModalHeader className="m-auto">Выберите тип данных</ModalHeader>
        <ModalBody className="text-center">
          <ButtonGroup className="d-flex justify-content-around">
            <Button onClick={e => this.handlerClick(e, 0)} color="primary">
              Data
            </Button>
            <Button onClick={e => this.handlerClick(e, 1)} className="ml-2" color="primary">
              Big Data
            </Button>
          </ButtonGroup>
        </ModalBody>
      </Modal>
    )
  }
}

export default ModalDataSelect
