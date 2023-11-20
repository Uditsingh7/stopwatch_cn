// Get the references to the neccesary HTML elements

// Element Displaying the time
const timeDisplay = document.getElementById('display')
// Element Displaying the Start buttom
const startButton = document.getElementById('start')
// Element Displaying the Reset Button
const resetButton = document.getElementById('reset')
// Capturing laps
const lapsContainer = document.getElementById('laps');
let lapCounter = 1;
// Get reference to the "lap" button
const lapButton = document.getElementById('lap')

const modeToggle = document.getElementById('mode-toggle');
const stopwatch = document.querySelector('.stopwatch');

// Initialize variables to track stopwatch state and timings
// Tracks if the stopwatch is running
let running = false;
var startTime = null,
    stopTime = null,
    pausedDuration = 0,
    intervalID = null;

modeToggle.addEventListener('change', function () {
    if (modeToggle.checked) {
        // Enable dark mode
        stopwatch.classList.add('dark-mode');
    } else {
        // Enable light mode
        stopwatch.classList.remove('dark-mode');
    }
});

startButton.addEventListener('click', () => {
    // If the stopwatch is not running
    if (!running) {
        // If the stopwatch has not started before, set the start time
        if (startTime === null) {
            startTime = new Date();
        }

        // If the stopwatch was previously paused, calculate the paused duration
        if (stopTime !== null) {
            pausedDuration += (new Date() - stopTime);
        }

        // Start an interval to update the display every 10 milliseconds
        intervalID = setInterval(updateDisplay, 10);
        startButton.textContent = 'Stop';
        resetButton.style.display = 'inline-block'; // Show the reset button
    }
    else {
        // Record the pause time and clear the interval
        stopTime = new Date();
        clearInterval(intervalID);
        startButton.textContent = 'Start'
    }
    // Toggling the running state
    running = !running;
})

resetButton.addEventListener('click', () => {
    // Clear the interval, reset timings, and update the display
    clearInterval(intervalID);
    pausedDuration = 0;
    startTime = null;
    stopTime = null;

    resetButton.style.display = 'none'; // dont show the reset button
    startButton.textContent = "Start";
    running = false;
    // Reset the timmings
    document.getElementById("display").innerHTML = "00:00:00.000";
    // Resetting all the captured laps
    lapsContainer.innerHTML = ''; // Will reomve all the laps entries
    lapCounter = 1; // reset the lap counter

})

// Function to update the display with the current stopwatch time
function updateDisplay() {
    // Get the current time
    var currentTime = new Date();
    // Calculate the elapsed time by subtracting the start time and paused duration
    // This gives us the time that has passed since the stopwatch started (excluding pauses)
    var elapsed = new Date(currentTime - startTime - pausedDuration);
    // Update the display with the formatted time
    document.getElementById("display").innerHTML = formattedTime(elapsed)
};




// Event listener for the "lap" button
lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = new Date(new Date() - startTime - pausedDuration);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap-entry'); // Add the CSS class for lap entry

        const lapCounterElement = document.createElement('span');
        lapCounterElement.textContent = `Lap ${lapCounter}:`;
        lapElement.appendChild(lapCounterElement); // Add lap counter to the left

        const lapTimeElement = document.createElement('span');
        lapTimeElement.textContent = formattedTime(lapTime);
        lapTimeElement.style.marginLeft = 'auto'; // Push lap time to the right
        lapElement.appendChild(lapTimeElement); // Add lap time to the right

        console.log(lapElement);
        lapsContainer.prepend(lapElement);
        lapCounter++;
    }

})


// // Format the time
// Function to format time as HH:MM:SS.MS
function formattedTime(time) {
    // Extract hours, minutes, seconds, and milliseconds from the elapsed time
    var hours = time.getUTCHours();        // Get the hours component of the elapsed time
    var minutes = time.getUTCMinutes();    // Get the minutes component of the elapsed time
    var seconds = time.getUTCSeconds();    // Get the seconds component of the elapsed time
    var milliseconds = time.getUTCMilliseconds(); // Get the milliseconds component of the elapsed time
    // Format hours, minutes, seconds, and milliseconds with leading zeros if needed
    const formattedTime = (hours > 9 ? hours : "0" + hours) + ":" +               // Hours
        (minutes > 9 ? minutes : "0" + minutes) + ":" +         // Minutes
        (seconds > 9 ? seconds : "0" + seconds) + "." +         // Seconds
        (milliseconds > 99 ? milliseconds :                      // Milliseconds
            milliseconds > 9 ? "0" + milliseconds : "00" + milliseconds);
    return formattedTime;
}
