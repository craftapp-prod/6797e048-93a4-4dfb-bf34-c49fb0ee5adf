"use client";
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, Clock } from 'lucide-react';

export default function TimerPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState('');
  const [timerComplete, setTimerComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            setTimerComplete(true);
            if (audioRef.current) {
              audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    if (time > 0) {
      setIsRunning(true);
      setTimerComplete(false);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime('');
    setTimerComplete(false);
  };

  const handleSetTime = () => {
    const parsedTime = parseInt(inputTime, 10);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      setTime(parsedTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2 flex items-center">
            <Clock className="mr-2" /> MiniTimer
          </h1>
          <p className="text-gray-600 text-center">
            A simple and efficient timer for your quick timing needs
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="number"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              placeholder="Enter time in seconds"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
            />
            <button
              onClick={handleSetTime}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors"
            >
              Set
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className={`text-6xl font-bold mb-4 ${timerComplete ? 'text-red-500 animate-pulse' : 'text-primary-600'}`}>
            {formatTime(time)}
          </div>
          <div className="flex space-x-4">
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={time <= 0}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Play className="mr-2" /> Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
              >
                <Pause className="mr-2" /> Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <RotateCcw className="mr-2" /> Reset
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center text-gray-600 mb-4">
          <Bell className="mr-2" />
          <span>Alert sound will play when timer completes</span>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Simple timer for your daily tasks</p>
        </div>
      </div>

      <audio ref={audioRef} src="/alert-sound.mp3" preload="auto" />

      <div className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-primary-600 mb-4">How to use MiniTimer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-primary-600 mb-2 flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Set Time
            </h3>
            <p className="text-gray-600">Enter the desired time in seconds and click Set</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-primary-600 mb-2 flex items-center">
              <Play className="mr-2 h-4 w-4" /> Start Timer
            </h3>
            <p className="text-gray-600">Click Start to begin the countdown</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-primary-600 mb-2 flex items-center">
              <Pause className="mr-2 h-4 w-4" /> Pause Timer
            </h3>
            <p className="text-gray-600">Pause the timer when needed</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-primary-600 mb-2 flex items-center">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset Timer
            </h3>
            <p className="text-gray-600">Reset the timer to start over</p>
          </div>
        </div>
      </div>
    </div>
  );
}