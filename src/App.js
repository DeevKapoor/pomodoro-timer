import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isSession, setIsSession] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerLabel, setTimerLabel] = useState("Session");

  useEffect(() => {
    if (timeLeft === 0) {
      const beepSound = document.getElementById("beep");
      beepSound.play(); 
      handleTimerCompletion();
    }
  }, [timeLeft]);

  const handleTimerCompletion = () => {
    if (isSession) {
      setIsSession(false);
      setTimeLeft(breakLength * 60); 
      setTimerLabel("Break");
    } else {
      setIsSession(true);
      setTimeLeft(sessionLength * 60); 
      setTimerLabel("Session");
    }
  };

  const handleStartStop = () => {
    setTimerRunning(!timerRunning);
  };

  const handleReset = () => {
    setTimerRunning(false);
    const beepSound = document.getElementById("beep");
    beepSound.pause(); 
    beepSound.currentTime = 0;
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60); 
    setTimerLabel("Session");
    setIsSession(true);
  };

  const handleIncrement = (type) => {
    if (type === "session" && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60); 
    } else if (type === "break" && breakLength < 60) {
      setBreakLength(breakLength + 1); 
    }
  };

  const handleDecrement = (type) => {
    if (type === "session" && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60); 
    } else if (type === "break" && breakLength > 1) {
      setBreakLength(breakLength - 1); 
    }
  };

  useEffect(() => {
    let timerInterval;
    if (timerRunning) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval); 
    }

    return () => clearInterval(timerInterval); 
  }, [timerRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="App">
      <div className="controls">
        <div>
          <h3 id="break-label">Break Length</h3>
          <button id="break-decrement" onClick={() => handleDecrement("break")}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => handleIncrement("break")}>+</button>
        </div>
        <div>
          <h3 id="session-label">Session Length</h3>
          <button id="session-decrement" onClick={() => handleDecrement("session")}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => handleIncrement("session")}>+</button>
        </div>
      </div>
  
      <div id="timer-label">
        <h2>{timerLabel}</h2>
      </div>
  
      <div id="time-left">{formatTime(timeLeft)}</div>
  
      <div className="controls">
        <button id="start_stop" onClick={handleStartStop}>
          {timerRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>Reset</button>
      </div>
  
      <audio id="beep" preload="auto">
        <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
  
      {/* Footer */}
      <footer>
        Created by <a href="https://github.com/DeevKapoor" target="_blank" rel="noopener noreferrer">Deevanshu Kapoor</a>
      </footer>
    </div>
  );
  
};

export default App;
