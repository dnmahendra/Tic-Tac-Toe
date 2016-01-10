var myDataRef = new Firebase('https://boiling-fire-3617.firebaseIO.com');

      $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          myDataRef.push({name: name, text: text});
          $('#messageInput').val('');
        }
      });

var count = 0;
var turn = 'X';
var playerOne = 'X';
var playerTwo = 'O';

 var gamePlay = function() {
 				var board = designGame.gameBoard();
 				var pos;

      			$('.gameboard').on('click', 'td', function() {
      				if(!$(this).html()) {
      						if(count === 0) {
      							$(event.target).html(turn);
      							pos = $(event.target).attr('id');
      							board[pos] = $(event.target).html;
      							count++;
      						}
      						else {
      						turn = turn === 'X' ? 'O' : 'X'
      							$(event.target).html(turn);
      							pos = $(event.target).attr('id');
      							board[pos] = $(event.target).html;
      							count++;
      					}
      				}

      			});
      }