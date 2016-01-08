

var designGame = {

	playersymbol: "",
	init: function() {

			$('.section').on('click', 'li', function() {
					var showSymbols = $('<h3>').html('Choose Symbol to Start..');
					$('.section').append(showSymbols);
					var divSymbols = $('<div>').addClass('symbols');
					$('.section').append(divSymbols);
					var listSymbols = $('<ul>').addClass('list-symbols');
					var naught = $('<li>').addClass('naughts').html('O');
					var cross = $('<li>').addClass('cross').html('X');
					listSymbols.append(naught);
					listSymbols.append(cross);
					divSymbols.append(listSymbols);

					designGame.hidePage();
			});

		},

	hidePage: function() {
			$('.symbols').on('click', 'li', function() {
				var symbol = $(event.target).html();
					$('.intro').hide();
					$('.game').show();

					designGame.playerSymbol = symbol;
					playGame.startGame();

			});

	},		
	gameBoard: function() {
		$('.gameboard').empty();

			var gridSize = 3;


		var board = [];
		var gridTable = $('<table/>').addClass('.gridtbl');
			for(var i=1; i<=gridSize; i++) {
				var gridRow = $('<tr/>').addClass('row' + i);
					gridRow.appendTo(gridTable);
				for(var j=1; j<=gridSize; j++) {
					var gridCol = $('<td/>');
					gridCol.appendTo(gridRow);

					board.push(0);
				}

			}

		gridTable.appendTo($('.gameboard'));

			for(var i=0; i< $('td').length; i++) {
				$('td').eq(i).attr('id', i);
			}
			return board;
		}
}

var playGame = {

	board: [],
	availableCells: [0,1,2,3,4,5,6,7,8],
	result: "",
	status: 'playing',
	playerSymbol: "" ,
	playerScore: 0,
	computerScore: 0,
	drawScore: 0,
	btnReset: 	 $('<button>').html('new board').appendTo('.controls'),
	startGame:	function() {
				
				playGame.playerSymbol = designGame.playerSymbol;
				playGame.board = designGame.gameBoard();
				if(playGame.playerSymbol === 'X') {
					AI.minPlayer = 'X';
					AI.maxPlayer = 'O';
					playGame.playerTurn();					
				}
				else {
					AI.minPlayer = 'O';
					AI.maxPlayer = 'X';
					playGame.computerTurn();
					playGame.playerTurn();
				}

				playGame.btnReset.on('click', function() {

						for(var i=0; i< $('td').length; i++) {
						$('td').eq(i).html("");
					}

						playGame.board = [];
						playGame.availableCells = [0,1,2,3,4,5,6,7,8];
						playGame.result = "";
						playGame.status = 'playing';

					if(playGame.playerSymbol === 'X') {

						 playGame.playerSymbol = 'O'
						 AI.minPlayer = 'O';
					     AI.maxPlayer = 'X';
					}
					else {
						 playGame.playerSymbol = 'X';
						 AI.minPlayer = 'X';
						 AI.maxPlayer = 'O';
					}

					playGame.board = designGame.gameBoard();

					if(playGame.playerSymbol === 'O') {
						playGame.computerTurn();
					}
				});

		},
	playerTurn: function() {

			if(playGame.status === 'playing') {
				$('.game-position').html('Your turn Player');

				$('.gameboard').on('click','td', function() {
				if(!$(this).html()) {
					var cellValue = $(this).html(playGame.playerSymbol);
					var cell = $(this).attr('id');

					$(this).append(cellValue).css('color', 'red');


					playGame.board[cell] = $(this).html();

					playGame.emptyCells();

					if(playGame.checkWinner()) {
						playGame.status = 'ended';
						playGame.updateScore();
						playGame.endGame();
					}
					else {
						$('.game-position').html("Computer's turn now");
						setTimeout(playGame.computerTurn, 1000);
					}
				}
				});
			}
		},
	computerTurn: function(cell) {
				if(playGame.status === 'playing') {

					var move = AI.bestMove(playGame.board);
					var randomNum = playGame.availableCells[Math.floor(Math.random() * playGame.availableCells.length)];
					var randomtd = $('td').eq(move);

					if(playGame.playerSymbol === 'X') {
						randomtd.text('O');
					}
					else {
						randomtd.text('X');
					}

					playGame.board[move] = randomtd.html();

					if(playGame.checkWinner()) {
						playGame.status = 'ended';
						playGame.updateScore();
						playGame.endGame();
					}
					else {
						$('.game-position').html('Your turn Player');
					}
			}
		},
	emptyCells: function() {
				var indexs = [];
				for(var i=0; i< playGame.board.length; i++) {
					if(playGame.board[i] === 0) {
						indexs.push(i);
					}
				}
				playGame.availableCells = indexs;
		},
	checkWinner: function() {

			var B= playGame.board;

			//check rows
	        for(var i = 0; i <= 6; i = i + 3) {
	            if(B[i] !== 0 && B[i] === B[i + 1] && B[i + 1] === B[i + 2]) {
					playGame.result = B[i] + "-won"; 
	                $('td').eq(i).css("background-color", 'green');
	                $('td').eq(i+1).css("background-color", 'green');
	                $('td').eq(i+2).css("background-color", 'green');
	                return true;
	            }
	        }

	        //check columns
	        for(var i = 0; i <= 2 ; i++) {
	            if(B[i] !== 0 && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
	                playGame.result = B[i] + "-won"; 
	                $('td').eq(i).css("background-color", 'green');
	                $('td').eq(i+3).css("background-color", 'green');
	                $('td').eq(i+6).css("background-color", 'green');
	                return true;
	            }
	        }

	        //check diagonals
	        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
	            if(B[i] !== 0 && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
	                playGame.result = B[i] + "-won";
	                $('td').eq(i).css("background-color", 'green');
	                $('td').eq(i+j).css("background-color", 'green');
	                $('td').eq(i + 2*j).css("background-color", 'green');
	                return true;
            	}
        	}

        	//check for draw
        	if(playGame.availableCells.length === 0) {
        		playGame.result = 'draw';
        		return true;
        	}
        	else {
        		return false;
        	}
		},
	updateScore: function() {
		var arrResult = playGame.result.split('-');
		if(playGame.playerSymbol === arrResult[0]) {
			playGame.playerScore++;
		}
		else if(arrResult[0] === 'draw') {
			playGame.drawScore++;
		}
		else {
			playGame.computerScore++;
		}
		var listScore = $('<ul>').addClass('score');
		var pScore = $('<li>').html('PLAYER: ' + playGame.playerScore);
		var cScore = $('<li>').html('COMPUTER: ' + playGame.computerScore);
		var dScore = $('<li>').html('DRAW: ' + playGame.drawScore);
		pScore.appendTo(listScore);
		cScore.appendTo(listScore);
		dScore.appendTo(listScore);

		listScore.appendTo('.scoreboard');
	},
	endGame: function() {
				if(this.result.substring(0,1) === this.playerSymbol) {
					$('.game-position').html("Congrats, Champion!!");
				}
				else if(this.result === 'draw') {
					$('.game-position').html("It's Draw, how dull!!");
				}
				else {
					$('.game-position').html("Game over, man!!");
				}
	}
}

var AI = {
	maxPlayer: "",
	minPlayer: "",
	checkWinner: function(player, board) {
      if (
          (board[0] == player && board[1] == player && board[2] == player) ||
          (board[3] == player && board[4] == player && board[5] == player) ||
          (board[6] == player && board[7] == player && board[8] == player) ||
          (board[0] == player && board[3] == player && board[6] == player) ||
          (board[1] == player && board[4] == player && board[7] == player) ||
          (board[2] == player && board[5] == player && board[8] == player) ||
          (board[0] == player && board[4] == player && board[8] == player) ||
          (board[2] == player && board[4] == player && board[6] == player)
          ) {
          return true;
      } else {
          return false;
      }
	},
	checkTie: function(board) {
		 for (var i = 0; i < board.length; i++) {
          if (board[i] === 0) {
              return false;
          }
      }
      return true;
	},
	bestMove: function(board) {
	      var bestMoveValue = -100;
	      var move = 0;
	      for (var i = 0; i < board.length; i++) {
	          var newBoard = this.makeMove(i, this.maxPlayer, board);
	          if (newBoard) {
	              var predictedMoveValue = this.minValue(newBoard);
	              if (predictedMoveValue > bestMoveValue) {
	                  bestMoveValue = predictedMoveValue;
	                  move = i;
	              }
	          }
	      }
	      return move;
  	},
	cloneBoard: function(board) {
				return board.slice(0); 
	},
	makeMove: function(move, player, board) {
				var newBoard = this.cloneBoard(board);
		      if (newBoard[move] === 0) {
		          newBoard[move] = player;
		          return newBoard;
		      } 
		      else {
		          return null;
		      }
	},

  	minValue: function(board) {

      if (this.checkWinner(this.maxPlayer, board)) {
          return 1;
      	} else if (this.checkWinner(this.minPlayer, board)) {
          return -1;
      	} else if (this.checkTie(board)) {
         return 0;
	     } else {

         var bestMoveValue = 100;
         var move = 0;
         for (var i = 0; i < board.length; i++) {
             var newBoard = this.makeMove(i, this.minPlayer, board);
             if (newBoard) {
                 var predictedMoveValue = this.maxValue(newBoard);
                 if (predictedMoveValue < bestMoveValue) {
                     bestMoveValue = predictedMoveValue;
                     move = i;
                 }
             }
         }
         return bestMoveValue;
       }
    },
    maxValue: function(board) {
     	if (this.checkWinner(this.maxPlayer, board)) {
         return 1;
     	} else if (this.checkWinner(this.minPlayer, board)) {
         return -1;
     	} else  if (this.checkTie(board)) {
         return 0;
     	} else {

         var bestMoveValue = -100;
         var move = 0;
         for (var i = 0; i < board.length; i++) {
             var newBoard = this.makeMove(i, this.maxPlayer, board);
             if (newBoard) {
                 var predictedMoveValue = this.minValue(newBoard);
                 if (predictedMoveValue > bestMoveValue) {
                     bestMoveValue = predictedMoveValue;
                     move = i;
                 	}
             	}
         	}

         return bestMoveValue;
    	}
	}
}

designGame.init();









