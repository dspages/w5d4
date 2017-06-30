const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("What is your number?", function(answer) {
      sum+=parseInt(answer);
      console.log(sum);
      --numsLeft;
      if (numsLeft===0)
      {completionCallback(sum);}else
      {addNumbers(sum,numsLeft,completionCallback);}
    });
  }
}

addNumbers(0,3,sum => console.log(`Total Sum: ${sum}`));


//
// const reader = readline.createInterface({
//   // it's okay if this part is magic; it just says that we want to
//   // 1. output the prompt to the standard output (console)
//   // 2. read input from the standard input (again, console)
//
//   input: process.stdin,
//   output: process.stdout
// });
//
// reader.question("What is your name?", function (answer) {
//   console.log(`Hello ${answer}!`);
// });
//
// console.log("Last program line");
