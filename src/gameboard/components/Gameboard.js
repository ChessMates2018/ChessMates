import React from 'react'
import HumanVsHuman from '../gameboard'
import Chessboard from "chessboardjsx"


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
          }) => (
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
          )}
        </HumanVsHuman>
        
      </div>
    );
  }