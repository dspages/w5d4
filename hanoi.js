const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {

  constructor(){
    this.stacks=[[1],[],[3,2]];
  }

  move (startIdx,endIdx){
    // console.log(this);
    if(this.isValidMove(startIdx,endIdx)){
      let stack1=this.stacks[startIdx];
      let stack2=this.stacks[endIdx];
      stack2.push(stack1.pop());
    }
    return false;
  }

  isValidMove (startIdx,endIdx){
    // console.log(this);
    let stack1=this.stacks[parseInt(startIdx)];
    if(stack1.length===0){return false;}
    let stack2=this.stacks[parseInt(endIdx)];
    if(stack2.length===0){return true;}
    let piece1=stack1[stack1.length-1];
    let piece2=stack2[stack2.length-1];
    return piece2>piece1;
  }

  promptMove (callback) {
    this.print();
    reader.question("Where would you like to move? Format is 'start,end'", function(move){
        let start_tower_idx=move.slice(0,1);
        let end_tower_idx=move.slice(2,3);
        // console.log(start_tower_idx,end_tower_idx);
        this.move(start_tower_idx, end_tower_idx);
        if(this.isWon()){callback();}
        else{this.promptMove(callback);}
      }.bind(this)
    );
  }

  isWon(){
    if (this.stacks[0].length===0&&
      (this.stacks[1].length===0||this.stacks[2].length===0)){
        return true;
      }
    return false;
  }

  print(){
    console.log(JSON.stringify(this.stacks));
  }

  run(completionCallback){
    console.log(this);
    this.promptMove(completionCallback);
  }
}

// const bound

// game.promptMove((out)=>{console.log(out);});

let completeBehavior=function(){
  reader.question("You win! Would you like to play again? y/n", function(answer){
    if (answer==="y")
    {
      game=new Game();
      game.run(completeBehavior);
    }
    else {
      reader.close();
    }
  }
);
};

let game=new Game();

game.run(completeBehavior);
// console.log(game.isWon());
// game.move(0,2);
// game.move(0,1);
// game.move(2,1);
// game.move(0,2);
// game.move(1,0);
// game.move(1,2);
// console.log(game.isWon());
// game.move(0,2);
// console.log(game.isWon());
// game.print();
