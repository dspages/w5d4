const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Write this first.
function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
  reader.question(`Is ${el1} greater than ${el2}?`, function (answer) {
    if (answer==="yes") {callback(true);}
    if (answer==="no") {callback(false);}
  });
}

// askIfGreaterThan(5,6, function(bool){console.log(`Response is: ${bool}`);});

// Once you're done testing askIfGreaterThan with dummy arguments, write this.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
    if (i===arr.length-1){
      outerBubbleSortLoop(madeAnySwaps);
    }else{
      askIfGreaterThan(arr[i],arr[i+1],function(bool){
        if(bool===true){
          let holder=arr[i];
          arr[i]=arr[i+1];
          arr[i+1]=holder;
        }
        innerBubbleSortLoop(arr,i+1,madeAnySwaps||bool,outerBubbleSortLoop);
      });
    }
}

// innerBubbleSortLoop([4,3,5],0,false,function(ary){console.log(`Response is: ${ary}`);
// });

// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
  outerBubbleSortLoop(true);
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
    if (madeAnySwaps) {
      madeAnySwaps=false;
      innerBubbleSortLoop(arr,0,madeAnySwaps,outerBubbleSortLoop);
    }
    else {
      sortCompletionCallback(arr);
    }
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

absurdBubbleSort([3, 2, 1], function(arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
