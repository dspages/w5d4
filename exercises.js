class Clock {
  constructor() {
    // 1. Create a Date object.
    let date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    // 2. Store the hours, minutes, and seconds.
    //  this.hours=date(hours);
    //
    // console.log(date);
    // 3. Call printTime.
    this.printTime();
    // 4. Schedule the tick at 1 second intervals.
    setTimeout(this._tick.bind(this),1000);
  }

  printTime() {
    console.log(this.hours+":"+this.minutes+":"+this.seconds);
    // Format the time in HH:MM:SS
    // Use console.log to print it.
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    console.log(this);
    this.seconds = this.seconds + 1;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes += 1;
    };
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours += 1;
    };

    console.log(this.seconds);
    this.printTime();
    setTimeout(this._tick.bind(this),1000);
  }
}

const clock = new Clock();
