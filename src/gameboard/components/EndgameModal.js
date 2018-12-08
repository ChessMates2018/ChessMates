import React, {Component} from 'react'
import Modal from 'styled-react-modal'

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
`

class EndgameModal extends Component {
  constructor (props) {
    super(props)
 
    this.state = {
      isOpen: false,
    }
 
    this.toggleModal = this.toggleModal.bind(this)
  }
 

  toggleModal (e) {
    this.setState({ isOpen: !this.state.isOpen })
  }
 
  render (props) {
    console.table(this.props)
    return (
      <div>
        <button onClick={this.toggleModal}>Click me</button>
        <StyledModal
          isOpen={this.state.isOpen}
          onBackgroundClick={this.toggleModal}
          onEscapeKeydown={this.toggleModal}>
          <h1>Hello! I am your friendly modal! How can I be of assistance today?</h1>
          <button onClick={this.toggleModal}>Close me</button>
        </StyledModal>
      </div>
    )
  }
}

export default EndgameModal