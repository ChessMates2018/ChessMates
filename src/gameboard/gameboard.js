import React, { Component } from "react";
import PropTypes from "prop-types";
import MoveList from './components/moveList'
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import axios from 'axios'
import Chessboard from "chessboardjsx";
// import io from 'socket.io-client'
import {socket} from '../utils/SocketFunctions'
import {connect} from 'react-redux'
import { relative } from "path";
//set up endGame
//resignation or checkmate assings victor and loser leaving counts as resignation
//under any other condition the game is a draw including
import Chat from './components/chat'
import Modal from 'styled-react-modal'

const StyledModal = Modal.styled`
  width: 30rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0px 0px 15px white;
  font-family: Helvetica, Arial;    
  h1 {
    color: white;
  }
  h3 {
    color: white;
    padding: 10px;
    text-align: center;
    margin-bottom: 10px;

  }
  button {
    margin-top: 20px 0px;
    box-shadow: 0px 0px 15px white;
    font-weight: bold;    
  }
`


class HumanVsHuman extends Component {
  constructor(props) {
    super (props)

    this.state = {
      fen: "start",
      // square styles for active drop square
      dropSquareStyle: {},
      // custom square styles
      squareStyles: {},
      // square with the currently clicked piece
      pieceSquare: "",
      // currently clicked square
      square: "",
      // array of past game moves
      history: [],
      room: null,
      light: '',
      dark: '',
      turn: true,
      message: '',
      isOpen: false,
      winner: '',
      loser: ''
    };

    this.toggleModal = this.toggleModal.bind(this)
  }
  static propTypes = { children: PropTypes.func };


  componentDidMount() {
    this.updatingPlayers()
    this.runSockets()
    
    this.game = new Chess();
    this.socket.emit('new-game', {
      message: this.game,
      room: this.state.room
    })
    this.socket.on('update-game', (data) => {
      this.updateNewMove(data)
      // console.log('data', data)
    })
    this.socket.on('checkMaaate', (data) => {
      console.log('GOT TO CHECKMATE')
      this.endgameConditions()
      // this.props.theHistory.push('/profile')
    })
  }

  toggleModal (e) {
    this.setState({ isOpen: !this.state.isOpen })
  }

  updatingPlayers(){
    let {roomId, dark, light} = this.props.match.params
    this.setState({
      light, dark
    }, console.log('UPDATING', this.state))
  }

  movePiece(sourceSquare, targetSquare){
    return this.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // always promote to a queen for example simplicity
      });
    
  }

  endgameConditions = () => {
    let {winner, light, dark} = this.state
    let {in_checkmate, in_stalemate, insufficient_material, in_threefold_repetition, turn} = this.game
    if (in_checkmate()) {
      if(turn() === "b"){
        this.setState({winner: light})
      } else if (turn() === "w") {
        this.setState({winner: dark})
      } 
      //determine winner/loser - light/dark from state - in_checkmate returns true
      this.setState({isOpen: true, message:`Checkmate! ${winner} has won.`})
      
      //callback - axios.put - {winner/username, loser/username} - +10 points to winner/ -10 points to loser
      // 
    } else if(in_stalemate()){
      this.setState({isOpen: true, message:`Game Over! The game has ended in stalemate.`})
    } else if(insufficient_material()){
      this.setState({isOpen: true, message:`Game Over! The game has ended in a draw: Insufficient material.`})
    } else if(in_threefold_repetition()){
      this.setState({isOpen: true, message:`Game Over! The game has ended in a draw: Threefold repetition.`})
    }
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = this.movePiece(sourceSquare, targetSquare)
    
    // illegal move
    if (move === null) return;
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: false }),
      squareStyles: squareStyling({ pieceSquare, history }),
    }), () => {
      let {fen, history, squareStyles} = this.state
      let newMove = {fen, history, squareStyles, sourceSquare, targetSquare}
      this.socket.emit('move', newMove)
      console.log('socket', this.socket)
    });
  };


  //line 190
  runSockets = () => {
    this.socket = socket
    this.socket.on('test', data => console.log('test fired'))
    this.socket.on('connect-to-room', data => 'PUT HISTORY.PUSH HERE?')
    this.socket.on('connect-to-room', data => this.socket.emit('user-info', 'ADD USER PROPS? HERE'))
    this.socket.on('users', (data) => this.setState({white: 'ADD PROPS', black: 'ADD PROPS'}))

  }

  updateNewMove =(newMove)=> {
    console.log('wait for iiiii....')
    let {roomId} = this.props.match.params
    console.log('roomId', roomId)
    this.movePiece(newMove.sourceSquare, newMove.targetSquare)
    let {fen, history, squareStyles} = newMove
    this.setState({fen, history, squareStyles}, () => {
     let checkMate = '';
      this.state.history.forEach(string => {
      checkMate = string.indexOf('#')
      })
      if(checkMate === -1){
        return null
      } else {
        console.log('roomId_under else', roomId)
        axios.delete(`/api/order66/${roomId}`).then(res => {
          console.log(res)
        })
        socket.emit('checkMaaate', 'Checkmate!')
      }
    })
  }


  showHistory = () => {
  let {history} = this.state
  let counter = 0
  // console.log("HISTORY",history)
  let moveList = history.map((element,index) => {
    let moveNumber = 1 + index
    return(
      <div
        className = "move"
        key={index}>{element} 
      </div>
    )
  })
    if (history.includes('#')) {
      axios.post('/api/gameMoves', {history})
      .then(() => 
      
      console.log('move updated', history.length % 5, history))
     }
  return moveList
  }

  // onMouseOverSquare = square => {
  //   // get list of possible moves for this square
  //   let moves = this.game.moves({
  //     square: square,
  //     verbose: true
  //   });

  //   // exit if there are no moves available for this square
  //   if (moves.length === 0) return;

  //   let squaresToHighlight = [];
  //   for (var i = 0; i < moves.length; i++) {
  //     squaresToHighlight.push(moves[i].to);
  //   }

  //   this.highlightSquare(square, squaresToHighlight);
  // };

  // onMouseOutSquare = square => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    });
  };

  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: false }),
      pieceSquare: ""
    });
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  resignation = () => {
    //know which one is resigning
    //axios to update game history by game id from routing params
    //this.props.theHistory.push('/profile')
  }

  render() { 
    const { fen, dropSquareStyle, squareStyles, endGame, isOpen, winner, message, light, dark } = this.state;
    console.log(dark, 'THIS IS THE WINNER')
    console.log(winner, 'This is winner')
    return this.props.children({
      // updatePlayers: this.updatePlayers,
      isOpen: isOpen,
      toggleModal: this.toggleModal,
      winner: winner,
      message: message,
      resignation: this.resignation,
      showHistory: this.showHistory,
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick,
      testSockets: this.testSockets,
    });
  }
}



 function Gameboard(props) {
  
  console.log('GM props', props)
  let {light, dark} = props.match.params
  return (
    <div className="the_BFB">
      <HumanVsHuman theHistory={props.history} match={props.match}>
        {({
          // updatePlayers,
          resignation,
          showHistory,
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick,
          testSockets,
          isOpen,
          toggleModal,
          winner,
          message
        }) => (
          <>
          <Chat
          light={light}
          dark={dark}
          />
          {
            props.username === props.match.params.light
            ?
          <Chessboard
            // updatePlayers={updatePlayers}
            id="humanVsHuman"
            width={777}
            // orientation="black"
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
              marginBottom: '50px'
            }}
            darkSquareStyle = {{
              backgroundColor: 'gray'
            }}
            lightSquareStyle = {{
              backgroundColor: 'white'
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            />
            :
            <Chessboard
            // updatePlayers={updatePlayers}
            id="humanVsHuman"
            width={777}
            orientation="black"
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
              marginBottom: '50px'
            
            }}
            darkSquareStyle = {{
              backgroundColor: 'gray'
            }}
            lightSquareStyle = {{
              backgroundColor: 'white'
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            />
          }
          <MoveList 
          move={showHistory}
          resignation = {resignation}
          />
          
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
          light={light}
          dark={dark}
          winner={winner}
          message={message}
          >
          
          <h1>Game Over</h1>
          <h3>{message}</h3>
          <button onClick={toggleModal}>Accept</button>
        </StyledModal>
          
          </>
        )}
      </HumanVsHuman>
    </div> 
  );
}

function mapStateToProps(state){
let {username} = state
return{
  username
}
}

export default connect(mapStateToProps)(Gameboard)


const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
};
