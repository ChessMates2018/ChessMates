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
      dropSquareStyle: {},
      squareStyles: {},
      pieceSquare: "",
      square: "",
      positionCount: 0,
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
      turn: true,
      message: '',
      isOpen: false,
      winner: '',
      loser: '',
      results: '',
      areYouSure: false,
      resigned: false,
      finished: false
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
      this.endgameConditions()
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
      }, () => this.eloCalculator())
    })
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

  toggleModal (e) {
    this.setState({ isOpen: !this.state.isOpen })
  }

  updatingPlayers(){
    let {roomId, dark, light} = this.props.match.params
    this.setState({
      light, dark
    }, this.getPlayerRatings())
  }

  movePiece(sourceSquare, targetSquare){
    return this.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // always promote to a queen for example simplicity
        //Will need to set up options for piece selection upon pawn reaching eighth rank.
      });
  }

  endgameConditions = () => {
    let {light, dark, lightRating, darkRating, lightPointsWin, lightPointsDraw, lightPointsLose, darkPointsWin, darkPointsDraw, darkPointsLose} = this.state
    let {in_checkmate, in_stalemate, insufficient_material, in_threefold_repetition, turn} = this.game
    let lightEloDraw = lightPointsDraw;
    let darkEloDraw = darkPointsDraw;
    if (in_checkmate()) {
      if(turn() === "b"){
        let win = 1;
        let loss = 1;
        let eloGain = lightPointsWin - lightRating;
        let eloLost = darkRating - darkPointsLose;
        this.setState({finished: true,winner: light, loser: dark, isOpen: true, message: `Checkmate! ${light} has won.`, results: `${light} has gained ${eloGain} points and ${dark} has lost ${eloLost} points.`}, () => {
          let {winner, loser} = this.state
          axios.put(`/api/updateRating/`, {win, loss, eloGain, eloLost, winner, loser})
        })
      } else if (turn() === "w") {
        let win = 1;
        let loss = 1;
        let eloGain = darkPointsWin - darkRating;
        let eloLost = lightRating - lightPointsLose;
        this.setState({finished: true, winner: dark, loser: light, isOpen: true, message: `Checkmate! ${dark} has won.`, results: `${dark} has gained ${eloGain} points and ${light} has lost ${eloLost} points.`}, () => {
          let{winner, loser} = this.state
          axios.put(`/api/updateRating/`, {win, loss, eloGain, eloLost, winner, loser})
        })
      } 
    } else if(in_stalemate()){
      this.setState({finished: true, isOpen: true, message:`Game Over! The game has ended in stalemate.`, results: `${light}'s new rating is ${lightEloDraw} and ${dark}'s new rating is ${darkEloDraw}.`}, () =>{
        axios.put('/api/updateRatingsDraw/', {light, dark, lightEloDraw, darkEloDraw})
      })
    } else if(insufficient_material()){
      this.setState({finished: true, isOpen: true, message:`Game Over! The game has ended in a draw: Insufficient material.`, results: `${light}'s new rating is ${lightEloDraw} and ${dark}'s new rating is ${darkEloDraw}.`}, () => {
        axios.put('/api/updateRatingsDraw/', {light, dark, lightEloDraw, darkEloDraw})
      })
    } else if(in_threefold_repetition()){
      this.setState({finished: true, isOpen: true, message:`Game Over! The game has ended in a draw: Threefold repetition.`, results: `${light}'s new rating is ${lightEloDraw} and ${dark}'s new rating is ${darkEloDraw}.`}, () => {
        axios.put('/api/updateRatingsDraw/', {light, dark, lightEloDraw, darkEloDraw})
      })
    }
  }


  onDrop = ({ sourceSquare, targetSquare }) => {
    if (this.state.resigned) return
    // see if the move is legal
    let move = this.movePiece(sourceSquare, targetSquare)
    // illegal move
    if (move === null) return;
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: false }),
      squareStyles: squareStyling({ pieceSquare, history }),
    }), () => {
      window.setTimeout(this.computerMove(), 3000);
      this.endgameConditions()
    });
  };

  computerMove = () => {
    let game = this.game
    let possibleMoves = this.game.moves({
      verbose:true
    })
    //game over
    if (possibleMoves.length === 0) return;

    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    let move = possibleMoves[randomIndex];
    
    let {from, to} = move
    let sourceSquare = from;
    let targetSquare = to;
    let compMove = this.movePiece(sourceSquare, targetSquare)
    if (compMove === null) return;

    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: false }),
      squareStyles: squareStyling({ pieceSquare, history }),
    }), () => {
      let {fen, history, squareStyles} = this.state
      let newMove = {fen, history, squareStyles,sourceSquare, targetSquare}
      this.socket.emit('move', newMove)
    });
  }

  runSockets = () => {
    this.socket = socket
    this.socket.on('users', (data) => this.setState({white: 'ADD PROPS', black: 'ADD PROPS'}))
  }

  updateNewMove =(newMove)=> {
    this.movePiece(newMove.sourceSquare, newMove.targetSquare)
    let {fen, history, squareStyles} = newMove
    this.setState({fen, history, squareStyles})
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
    }, () => {
      window.setTimeout(this.computerMove(), 3000);
      this.endgameConditions()
    });
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  resignation = (e) => {
    if (this.state.resigned || this.state.finished) return
    let win = 1;
    let loss = 1;
    let {light, dark, lightRating, darkRating, lightPointsWin, lightPointsDraw, lightPointsLose, darkPointsWin, darkPointsDraw, darkPointsLose} = this.state
    let eloGain = lightPointsWin - lightRating;
    let eloLost = darkRating - darkPointsLose;
    this.setState({resigned: true, winner: dark, loser: light, isOpen: true, message: `You have resigned. ${dark} has won.`, results: `${dark} has gained ${eloGain} points and ${light} has lost ${eloLost} points.`}, () => {
      let{winner, loser} = this.state
      axios.put(`/api/updateRating/`, {win, loss, eloGain, eloLost, winner, loser})
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
    const { fen, dropSquareStyle, squareStyles, endGame, isOpen, winner, message, light, dark, results, areYouSure } = this.state;
    return this.props.children({
      screenWidthCalc: this.screenWidthCalc,
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
      computerMove: this.computerMove,
      results: results
    });
  }
}

 function Gameboard(props) {
  let {light, dark} = props.match.params
  return (
    <div className="the_BFB">
      <HumanVsHuman theHistory={props.history} match={props.match}>
        {({
          screenWidthCalc,
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
          isOpen,
          toggleModal,
          winner,
          message,
          results,
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
            id="humanVsHuman"
            calcWidth={({ screenWidth }) => screenWidthCalc(screenWidth)}
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
            id="humanVsHuman"
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
          move={showHistory}
          resignation = {resignation}
          light={light}
          dark={dark}
          />
          

        <StyledModal
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
