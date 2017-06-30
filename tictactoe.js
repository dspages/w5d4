const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {

  constructor(){
    this.board=[[null,null,null],[null,null,null],[null,null,null]];
    this.player='X';
  }
  print(){
    console.log(JSON.stringify(this.board[0]));
    console.log(JSON.stringify(this.board[1]));
    console.log(JSON.stringify(this.board[2]));
  }

  swapPlayer(){
    if(this.player==='X') {this.player='O'; return;}
    if(this.player==='O') {this.player='X'; return;}
  }

  move(x,y){
    if (this.isValidMove(x, y)) {
      this.board[x][y] = this.player;
      this.swapPlayer();
      return true;
    }
    return false;
  }

  isValidMove(x, y){
    if (x === null || y === null) {
      return false;
    }
    if (!this.board[x][y]) {
      return true;
    } else {
      return false;
    }
  }

  isWon(){
    let diag1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
    if (this.allThreeSame(diag1)) {
      return this.allThreeSame(diag1);
    }
    let diag2 = [this.board[0][2], this.board[1][1], this.board[2][0]];
    if (this.allThreeSame(diag2)) {
      return this.allThreeSame(diag2);
    }
    for (var i = 0; i < 3; i++) {
      if (this.allThreeSame(this.board[i])) {
        return this.allThreeSame(this.board[i]);
      }
      let callWinner = this.allThreeSame([this.board[0][i], this.board[1][i], this.board[2][i]]);
      if (callWinner) {
        return callWinner;
      }
    }
  }

  allThreeSame(arr) {
    let pos1 = arr[0];
    let pos2 = arr[1];
    let pos3 = arr[2];
    if (pos1 === 'X' && pos2 === 'X' && pos3 === 'X') {
      return 'X';
    }
    if (pos1 === 'O' && pos2 === 'O' && pos3 === 'O') {
      return 'O';
    }
    return null;
  }

  promptMove(){
    this.print();
    reader.question("Where would you like to move? Format is 'x,y'", function(move){
        let x_move=move.slice(0,1);
        let y_move=move.slice(2,3);
        // console.log(start_tower_idx,end_tower_idx);
        if (!this.move(x_move, y_move)) {
          return this.promptMove();
        }
        if(this.isWon()){
          reader.close();
          console.log(this.isWon() + " wins!");
        }
        else{
          this.promptMove();
        }
      }.bind(this)
    );
  }

  run(){
    this.promptMove();
  }

}

let game = new Game();
game.run();
