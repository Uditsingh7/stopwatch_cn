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


// Initialising the variables
// Tracks if the stopwatch is running
let running = false;
// Tracks the elapsed time in seconds
let time = 0;
// Holds the interval id for the updated loop
let interval;

// Function to update the displayed time
function updateTime() {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time / 3600) / 60)
    const seconds = time % 60;
    // Formatting and displaying the time on screen as HH:MM:SS
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    // Updating the displayed time
    timeDisplay.textContent = formattedTime;
}

startButton.addEventListener('click', () => {
    // If the stopwatch is not running
    if (!running) {
        interval = setInterval(() => {
            // Increment The elapsed time
            time++;
            // Update the displayed Time
            updateTime();
            // Running the interval every 1 seconds
        }, 1000)

        // Change the button to Stop
        startButton.textContent = 'Stop';
        resetButton.style.display = 'inline-block'; // Show the reset button
    }
    else {
        // Clear the interval to stop the updating the time
        clearInterval(interval);
        startButton.textContent = 'Start'
    }
    // Toggling the running state
    running = !running;
})

resetButton.addEventListener('click', () => {
    // Clear the interval
    resetButton.style.display = 'none'; // Show the reset button
    clearInterval(interval);
    startButton.textContent = "Start";
    // Set the running state to false
    running = false;
    // Reseting the timer back to zero
    time = 0;
    // Resetting the display text content of the time
    updateTime();
    // Resetting all the captured laps
    lapsContainer.innerHTML = ''; // Will reomve all the laps entries
    lapCounter = 1; // reset the lap counter

})



// Event listener for the "lap" button
lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = time;
        const lapElement = document.createElement('div');
        lapElement.textContent = `lap ${lapCounter}: ${formattedTime(lapTime)}`
        lapElement.classList.add('lap-entry')
        console.log(lapElement);
        lapsContainer.prepend(lapElement);
        lapCounter++;
    }
})


// Format the time
// Function to format time as HH:MM:SS
function formattedTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    return formattedTime;
}
