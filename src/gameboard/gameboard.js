import React, { Component } from "react";
import PropTypes from "prop-types";
import MoveList from './components/moveList'
import Chess from "chess.js"; 
import axios from 'axios'
import Chessboard from "chessboardjsx";
import {socket} from '../utils/SocketFunctions'
import {connect} from 'react-redux'
import Chat from './components/chat'
import Modal from 'styled-react-modal'
import {confirmAlert} from 'react-custom-confirm-alert'


const EndGameModal = Modal.styled`
  width: 30rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0px 0px 15px white;
  font-family: Helvetica, Arial;   
  h1,h2,h3,h4{
    color: white;
  } 
  h3 {
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
      lightRating: 0,
      darkRating: 0,
      dark: '',
      lightPointsWin: 0,
      lightPointsDraw: 0,
      lightPointsLose: 0,
      darkPointsWin: 0,
      darkPointsDraw: 0,
      darkPointsLose: 0,
      turn: false,
      message: '',
      isOpen: false,
      winner: '',
      loser: '',
      results: '',
      drawWasSent: false,
      drawDecline: false,
      finished: false,
      drawSentNumber: 0,
      options: {
        title: 'Draw Offer',
        message: 'Your opponent has offered a draw. Do you accept?',
        buttons: [
          {
          label: 'Yes',
          onClick: () => this.drawAccepted()
          },
          {
          label: 'No',
          onClick: () => this.drawDeclined()
          }
        ],
        childrenElement: () => <div />,
        willUnmount: () => {}
      },
      rejection: {
        title: 'Draw Declined',
        message: 'Your opponent declined the draw.',
        buttons: [
          {
            label: 'Accept'
          }
        ],
        childrenElement: () => <div />,
        willUnmount: () => {}
      }
    };
    this.toggleModal = this.toggleModal.bind(this)
    this.drawAccepted = this.drawAccepted.bind(this)
    this.drawDeclined = this.drawDeclined.bind(this)
  }
  static propTypes = { children: PropTypes.func };


  componentDidMount() {
    this.updatingPlayers()
    this.runSockets()
    this.game = new Chess();
    this.setState({room: this.props.match.params.roomId}, () => console.log(this.state.room))
    this.socket.emit('new-game', {
      message: this.game,
      room: this.props.match.params.roomId
    })
    this.socket.on('update-history', (clickMove) => {
      this.setState({turn: true})
      this.updateHistory(clickMove)
    })
    this.socket.on('update-game', (move) => {
      this.setState({turn: true})
      this.updateNewMove(move)
    })
    this.socket.on('resign', (resign) => {
      this.endgameConditions(resign)
    })
    this.socket.on('draw', () => {
      this.toggleDrawOfferModal()
    })
    this.socket.on('drawAccept', () => {
      let draw = 'draw'
      this.endgameConditions(draw)
    })
    this.socket.on('drawDecline', () => {
      this.drawDeclineMessage()
    })
  }

  simulateClick(){
  const square = document.querySelectorAll('[data-testid]')[0]
  square.click()
  }

  componentWillUnmount() {
    socket.off('draw');
 }

  toggleModal (e) {
    this.setState({ isOpen: !this.state.isOpen })
  }

  toggleDrawOfferModal(){
    let {options} = this.state
    console.log('how many times is toggleDrawOfferModal firing?')
    confirmAlert(options)
  }

  drawDeclineMessage(){
    let {rejection} = this.state
    this.setState({drawWasSent: false}, () => {
      confirmAlert(rejection)
    })
  }

  getPlayerRatings(){
    let {dark, light} = this.props.match.params
    let userStr = `${light},${dark}`
    let usernames = userStr.split(',')
    axios.get(`/api/getRatings/${usernames}`).then(res => {
      let lightRating  = res.data[0]
      let darkRating = res.data[1]
      this.setState({
        lightRating, darkRating
      }, () => {
        this.eloCalculator()
        if (this.props.username === this.state.light){
          this.setState({
            turn: true
          })
        }
        this.simulateClick()
      })
    })
  }

  updatingPlayers(){
    let {dark, light} = this.props.match.params
    this.setState({
      light, dark
    }, this.getPlayerRatings())
  }

  movePiece(sourceSquare, targetSquare){
    return this.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // always promote to a queen for example simplicity
      });
  }

  eloCalculator = (result) => {
    let {lightRating, darkRating} = this.state
    let win = 1
    let draw = 0.5
    let loss = 0
    //If Light Player Wins
    let newLightEloWin = lightRating+Math.round((32-((Math.floor(lightRating/2101)+Math.floor(lightRating/2401))*8)) * (win - (1 / (1 + Math.pow(10, -(lightRating - darkRating) / 400)))));
    //If Light Player Draws
    let newLightEloDraw = lightRating+Math.round((32-((Math.floor(lightRating/2101)+Math.floor(lightRating/2401))*8)) * (draw - (1 / (1 + Math.pow(10, -(lightRating - darkRating) / 400)))));
    //If Light Player Loses
    let newLightEloLose = lightRating+Math.round((32-((Math.floor(lightRating/2101)+Math.floor(lightRating/2401))*8)) * (loss - (1 / (1 + Math.pow(10, -(lightRating - darkRating) / 400)))));

    //If Dark Player wins
    let newDarkEloWin = darkRating+Math.round((32-((Math.floor(darkRating/2101)+Math.floor(darkRating/2401))*8)) * (win - (1 / (1 + Math.pow(10, -(darkRating - lightRating) / 400)))));
    //If Dark Player Draws
    let newDarkEloDraw = darkRating+Math.round((32-((Math.floor(darkRating/2101)+Math.floor(darkRating/2401))*8)) * (draw - (1 / (1 + Math.pow(10, -(darkRating - lightRating) / 400)))));
    //If Dark Player Loses
    let newDarkEloLose = darkRating+Math.round((32-((Math.floor(darkRating/2101)+Math.floor(darkRating/2401))*8)) * (loss - (1 / (1 + Math.pow(10, -(darkRating - lightRating) / 400)))));
    
    this.setState({
      lightPointsWin: newLightEloWin,
      lightPointsDraw: newLightEloDraw,
      lightPointsLose: newLightEloLose,
      darkPointsWin: newDarkEloWin,
      darkPointsDraw: newDarkEloDraw,
      darkPointsLose: newDarkEloLose
    })
  }

  endgameConditions = (resign) => {
    console.log('endGame is firing!')
    let {light, dark, lightRating, darkRating, lightPointsWin, lightPointsDraw, lightPointsLose, darkPointsWin, darkPointsDraw, darkPointsLose} = this.state
    let {in_checkmate, in_stalemate, insufficient_material, in_threefold_repetition, turn} = this.game
    let lightEloDraw = lightPointsDraw;
    let darkEloDraw = darkPointsDraw;

    if (resign === 'draw'){
      this.setState({isOpen: true, finished: true, message:`Game Over! The game has ended in a draw: Draw Agreed.`, results: `${light}'s new rating is ${lightEloDraw} and ${dark}'s new rating is ${darkEloDraw}.`}, () => {
        axios.put('/api/updateRatingsDraw/', {light, dark, lightEloDraw, darkEloDraw})
      })
    }
    if (resign === light) {
        let win = 1;
        let loss = 1;
        let eloGain = darkPointsWin - darkRating;
        let eloLost = lightRating - lightPointsLose;
        this.setState({winner: dark, loser: light, isOpen: true, message: `${light} resigns! ${dark} has won.`, results: `${dark} has gained ${eloGain} points and ${light} has lost ${eloLost} points.`}, () => {
          let{winner, loser} = this.state
          axios.put(`/api/updateRating/`, {win, loss, eloGain, eloLost, winner, loser})
        })
      } else if (resign === dark){
        let win = 1;
        let loss = 1;
        let eloGain = lightPointsWin - lightRating;
        let eloLost = darkRating - darkPointsLose;
        this.setState({winner: light, loser: dark, isOpen: true, message: ` ${dark} Resigns! ${light} has won.`, results: `${light} has gained ${eloGain} points and ${dark} has lost ${eloLost} points.`}, () => {
          let {winner, loser} = this.state
          axios.put(`/api/updateRating/`, {win, loss, eloGain, eloLost, winner, loser})
        })
      }
    
    if (in_checkmate()) {
      if(turn() === "b"){
        let win = 1;
        let loss = 1;
        let eloGain = lightPointsWin - lightRating;
        let eloLost = darkRating - darkPointsLose;
        console.log(eloGain, eloLost)
        this.setState({winner: light, loser: dark, isOpen: true, message: `Checkmate! ${light} has won.`, results: `${light} has gained ${eloGain} points and ${dark} has lost ${eloLost} points.`}, () => {
          let {winner, loser} = this.state
          axios.put(`/api/updateRating/`, {win, loss, eloGain, eloLost, winner, loser})
        })
      } else if (turn() === "w") {
        let win = 1;
        let loss = 1;
        let eloGain = darkPointsWin - darkRating;
        let eloLost = lightRating - lightPointsLose;
        this.setState({winner: dark, loser: light, isOpen: true, message: `Checkmate! ${dark} has won.`, results: `${dark} has gained ${eloGain} points and ${light} has lost ${eloLost} points.`}, () => {
          let{winner, loser} = this.state
          axios.put(`/api/updateRating/`, {win, loss, eloGain, eloLost, winner, loser})
        })
      } 
    } else if(in_stalemate()){
      this.setState({isOpen: true, message:`Game Over! The game has ended in stalemate.`, results: `${light}'s new rating is ${lightEloDraw} and ${dark}'s new rating is ${darkEloDraw}.`}, () =>{
        axios.put('/api/updateRatingsDraw/', {light, dark, lightEloDraw, darkEloDraw})
      })
    } else if(insufficient_material()){
      this.setState({isOpen: true, message:`Game Over! The game has ended in a draw: Insufficient material.`, results: `${light}'s new rating is ${lightEloDraw} and ${dark}'s new rating is ${darkEloDraw}.`}, () => {
        axios.put('/api/updateRatingsDraw/', {light, dark, lightEloDraw, darkEloDraw})
      })
    } else if(in_threefold_repetition()){
      this.setState({isOpen: true, message:`Game Over! The game has ended in a draw: Threefold repetition.`, results: `${light}'s new rating is ${lightEloDraw} and ${dark}'s new rating is ${darkEloDraw}.`}, () => {
        axios.put('/api/updateRatingsDraw/', {light, dark, lightEloDraw, darkEloDraw})
      })
    }
  }

  //Original Code
  onDrop = ({ sourceSquare, targetSquare }) => {
    //check if game is already over. If yes, then cancel function
    if (this.state.winner || this.state.finished) return

    //check if it's player's turn. If false, the cancel function
    if (!this.state.turn) return

    let move = this.movePiece(sourceSquare, targetSquare)
    // illegal move
    if (move === null) return;
    
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: false }),
      squareStyles: squareStyling({ pieceSquare, history }),
      turn: false
    }), () => {
      let {fen, history, squareStyles, room} = this.state
      console.log(room)
      let newMove = {fen, history, squareStyles, sourceSquare, targetSquare, room}
      this.socket.emit('move', newMove)
      this.endgameConditions()
      this.simulateClick()
    });
  };


  runSockets = () => {
    this.socket = socket
    this.socket.on('test', data => console.log('test fired'))
    this.socket.on('users', (data) => this.setState({white: 'ADD PROPS', black: 'ADD PROPS'}))
  }


updateHistory = (clickMove) => {
  let {targetSquare, sourceSquare, history} = clickMove
  let move = this.movePiece(sourceSquare, targetSquare)
  if (move === null) return

  this.setState({
    fen: this.game.fen(),
    history: history,
    pieceSquare: '',
  }, ()=>{
    this.endgameConditions()
    this.simulateClick()
  })
}

updateNewMove =(move)=> {
  let newMove = this.movePiece(move.sourceSquare, move.targetSquare)

  // illegal move
  if (newMove === null) return;
  let {fen, history, squareStyles} = move
  this.setState({
    fen: this.game.fen(),
    history: history,
    pieceSquare: ''
}, () => {
  this.endgameConditions()
  this.simulateClick()
})
}

  showHistory = () => {
  let {history} = this.state
  let counter = 0

  let moveList = history.map((element,index) => {
    let moveNumber = 1 + index
    return(
      <div
        className = "move"
        key={index}>{element} 
      </div>
    )
  })
  return moveList
  }

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
    //check if it's player's turn. If false, the cancel function
     if (!this.state.turn) return

     //check if game is already over. If yes, then cancel function
     if (this.state.winner || this.state.finished) return

    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    let targetSquare = square;
    let sourceSquare = this.state.pieceSquare

    // illegal move
    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: false }),
      pieceSquare: "",
      turn: false
    }, () => {
      let {fen, history, room} = this.state
      let clickMove = {fen, history, targetSquare, sourceSquare, room}
      socket.emit('clickMove', clickMove)
      console.log(clickMove)
      this.endgameConditions()
      this.simulateClick()
    });
  };


  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  resignation = (username) => {
    //Checks to see if game is over by either checkmate/draw
    if (this.state.winner || this.state.finished) return
    let resign = username
    this.socket.emit('resign', resign)
  }

  draw = () => {
    //Check if game is over. If true, kill function.
    if (this.state.finished) return
    //Check if draw has already been sent to prevent spamming.
    if (this.state.drawWasSent) return
    //Check if game has winner.
    if (this.state.winner) return

    this.setState({drawWasSent: true}, () => {
      this.socket.emit('draw')
    })
  }

  drawAccepted(){
    this.setState({drawOffer: false}, () => {
      let {room} = this.state
      this.socket.emit('drawAccepted', room)
    })
  }

  drawDeclined(){
    this.setState({drawOffer: false}, () => {
      this.socket.emit('drawDeclined')
    })
  }

  screenWidthCalc(screenWidth){
    if (screenWidth < 320){
      return 240
    } else if (screenWidth < 400){
      return 280
    } else if (screenWidth < 500){
      return 360
    } else if (screenWidth < 1000){
      return 550
    }
  }

  render() { 
    const { fen, dropSquareStyle, squareStyles, endGame, isOpen, winner, message, light, dark, results, drawOffer } = this.state;

    return this.props.children({
      screenWidthCalc: this.screenWidthCalc, 
      isOpen: isOpen,
      toggleModal: this.toggleModal,
      winner: winner,
      message: message,
      results: results,
      resignation: this.resignation,
      draw: this.draw,
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
      updateNewMove: this.updateNewMove,
      simulateClick: this.simulateClick
    });
  }
}

 function Gameboard(props) {
  let {light, dark} = props.match.params
  return (
    <div className="the_BFB">
      <HumanVsHuman username={props.username}  theHistory={props.history} match={props.match}>
        {({
          screenWidthCalc,
          resignation,
          draw,
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
          isOpen,
          toggleModal,
          winner,
          message,
          results,
          updateNewMove,
          simulateClick
        }) => (
          <>
          <Chat
          light={light}
          dark={dark}
          username= {props.username}
          />
          {
            props.username === props.match.params.light
            ?
              <Chessboard
            simulateClick={simulateClick}
            username= {props.username}
            id='humanVsHuman'
            calcWidth={({ screenWidth }) => screenWidthCalc(screenWidth)}
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            updateNewMove={updateNewMove}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
              marginBottom: '50px',
              background: 'red'
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
            simulateClick={simulateClick}
            id='humanVsHuman'
            username= {props.username}
            updateNewMove={updateNewMove}
            calcWidth={({ screenWidth }) => screenWidthCalc(screenWidth)}
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
          move = {showHistory}
          resignation = {resignation}
          draw = {draw}
          username= {props.username}
          />

        <EndGameModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
          light={light}
          dark={dark}
          winner={winner}
          message={message}
          results={results}
          >
          
          <h1>Game Over</h1>
          <h3>{message}</h3>
          <h4>{results}</h4>
        </EndGameModal>
          
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
