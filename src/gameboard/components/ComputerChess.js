const AI = {
    positionCount: 0,
    minimaxRoot: function(depth, game, isMaximisingPlayer) {
      var newGameMoves = game.moves();
      var bestMove = -9999;
      var bestMoveFound;
  
      for(var i = 0; i < newGameMoves.length; i++) {
          var newGameMove = newGameMoves[i];
          game.move(newGameMove);
          var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
          game.undo();
          if(value >= bestMove) {
              bestMove = value;
              bestMoveFound = newGameMove;
          }
      }
      return bestMoveFound;
  },
  minimax: function (depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }
  
    var newGameMoves = game.moves();
  
    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
  },
  makeBestMove: function (game) {
      let bestMove = getBestMove(game);
      return bestMove;
  },
  getBestMove: function (game) {
    positionCount = 0;
    var depth = 2;
    var bestMove = this.minimaxRoot(depth, game, true);
    return bestMove;
  }
  }

  export default AI;