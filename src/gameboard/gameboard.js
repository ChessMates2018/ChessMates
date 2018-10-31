import React, { Component } from "react";
import PropTypes from "prop-types";
import MoveList from './components/moveList'
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import axios from 'axios'
import Chessboard from "chessboardjsx";
// import io from 'socket.io-client'
import {socket} from '../utils/SocketFunctions'


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
      joined: false,
      message: ''
    };


  }
  static propTypes = { children: PropTypes.func };

  

  componentDidMount() {
    this.game = new Chess();
    this.runSockets()
    
    this.socket.emit('new-game', {
      message: this.game,
      room: this.state.room
    })
    this.socket.on('update-game', (data) => {
      this.updateNewMove(data)
      console.log('data', data)
    })
  }

  movePiece(sourceSquare, targetSquare){
    return this.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // always promote to a queen for example simplicity
      });
    
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
    // this.socket.on('update-game', (newMove) => {
    //   console.log(newMove)
      // this.updateNewMove(newMove)
    // })
  }

  updateNewMove =(newMove)=> {
    console.log('wait for iiiii....')
    this.movePiece(newMove.sourceSquare, newMove.targetSquare)
    let {fen, history, squareStyles} = newMove
    this.setState({fen, history, squareStyles}, () => console.log(this.state))
  }

  testSockets =() => {
    this.socket.emit('back end test')
  }

  showHistory = () => {
  let {history} = this.state
  let counter = 0
  // console.log("HISTORY",history)
  let moveList = history.map((element,index) => {
    return(
      <div key={index}>
      {element}
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

  //  showTurn(arr) {
  //   let counter = 0
  //   let moves = []
  //   for (let i=0; i <arr.length; i++) {
  //     for (let key in arr[i]) {
  //       if (key == 'san') {
  //         let something = Object.values(arr[i].san).join('')
  //         moves.push(something)
  //         counter = counter += 1
  //         console.log(counter)
  //       }
  //     } 
  //   }
  //   // if (counter === 2) {
  //   //   this.setState({
  //   //     SAN: moves
  //   //   })
  //   //   counter = 0
  //   // }
   
  //   return moves
  //  }

   

  render() {
    let {history} = this.state
    // console.log('Dean',this.state.SAN)
    // console.log('Sam',this.showTurn(history))
    // SAN = this.showTurn(history)
    // console.log(this.state.history)
    // console.log(SAN)

    const { fen, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
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
      testSockets: this.testSockets
    });
  }
}

export default function Gameboard() {

  return (
    <div>
      <HumanVsHuman>
        {({
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
        }) => (
          <>
          
          <Chessboard
            id="humanVsHuman"
            width={720}
            // orientation="black"
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            />
          <MoveList 
          move={showHistory}/>
          <button onClick={testSockets}>CLICK ME</button>
          </>
        )}
      </HumanVsHuman>
    </div>
  );
}

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
