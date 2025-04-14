// Gerta's Birthday App - React version
import React, { useState, useEffect } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

const App = () => {
  const [isBirthday, setIsBirthday] = useState(false);
  const [step, setStep] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showLetter, setShowLetter] = useState(false);
  const today = new Date();
  const finalMessage = "HHappy birthday to my favorite little anxious ball 💛\nNow go take a nap and rewatch Friends… you've earned it haha 🍟";
  const isMay30 = today.getMonth() === 4 && today.getDate() === 30; // May = month 4 (0-indexed)

  
  

  useEffect(() => {
    if (isMay30) {
      setIsBirthday(true);
    }
  }, [isMay30]);

  const questions = [
    {
      q: "What do I usually call you ?",
      options: [
        "Cutie with a cloud",
        "G-Ball",
        "Little Anxious Ball 😵‍💫",
        "Stormy Queen"
      ],
      answer: "Little Anxious Ball 😵‍💫",
    },
    {
      q: "Which food instantly puts a smile on your face?",
      options: [
        "Fried Chicken 🍗",
        "Lasagna",
        "Sushi",
        "Chocolate Mousse"
      ],
      answer: "Fried Chicken 🍗",
    },
    {
      q: "What do you love doing more than anything?",
      options: [
        "Sleeping 💤",
        "Watching Friends ",
        "Cleaning (lol no)"
      ],
      answer: "Sleeping 💤",
    }, 
    {
      q: "If I were a fry, where would I wanna be?",
      options: [
        "In ketchup",
        "In your hand",
        "In your heart 💛",
        "In the oven (crispy edition)"
      ],
      answer: "In your heart 💛",
    }
  ];

  const handleAnswer = (option) => {
    if (option === questions[step].answer) {
      if (step === questions.length - 1) {
        setShowMessage(true);
        playSound();
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        let i = 0;
        const typing = setInterval(() => {
          setTypedText(prev => prev + finalMessage[i]);
          i++;
          if (i >= finalMessage.length) clearInterval(typing);
        }, 40);
      } else {
        setStep(step + 1);
      }
    } else {
      alert("Hmm… try again, nugget! 🍗");
    }
  };

  const playSound = () => {
    const audio = new Audio("/friends-theme.mp3");
    audio.volume = 0.8;
    audio.play().catch((e) => {
      console.warn("Autoplay blocked, waiting for user interaction");
    });
  };

  useEffect(() => {
    const preload = new Audio("/friends-theme.mp3");
    preload.load();
  }, []);

  const handleRestart = () => {
    setShowCredits(false);
    setShowMessage(false);
    setStep(0);
    setTypedText('');
    setShowLetter(false);
  };

  const FloatingEmojis = () => {
    const emojis = ["🍗", "🍟", "💛", "🧸"];
    return (
      <div className="emoji-container">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="floating-emoji" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s` }}>
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </span>
        ))}
      </div>
    );
  };
  if (!isBirthday) {
    return (
      <div className="app">
        <div className="locked-message">
          <h1>🎁 Surprise incoming...</h1>
          <p>This magical gift unlocks on <strong>May 30</strong> 💛<br />Until then, patience my little anxious ball 🧸</p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="app">
      <FloatingEmojis />
      {!showMessage ? (
        <div className="quiz">
          <h2>{questions[step].q}</h2>
          <div className="options">
            {questions[step].options.map((opt, index) => (
              <button key={index} onClick={() => handleAnswer(opt)}>{opt}</button>
            ))}
          </div>
        </div>
      ) : showCredits ? (
        <div className="final-message">
          <h2>🎬 Credits</h2>
          <img
            src={`${process.env.PUBLIC_URL}/us.webp`}
            alt="Us"
            className="credits-img"
          />
          <p>Made with love by Mouna 💛<br />
            For the one and only G 🧸<br />
            Featuring: Fries, Chicken, and Friends </p>
          <button onClick={handleRestart}>🔙 Go Back</button>
        </div>
      ) : (
        <div className="final-message">
          <img
            src={`${process.env.PUBLIC_URL}/gerta-chibi.webp`}
            alt="Chibi Gerta"
            className="chibi-img"
          />
          <h2>🎉 You did it, G! 🎉</h2>
          <p className="typing-text">{typedText}</p>
          <p onClick={() => setShowLetter(true)} className="secret-link"> Read My Letter</p>
          {showLetter && (
            <div className="love-letter">
              <p>
                Dear G,<br /><br />
                You’ve made my nights brighter, my days cozier, and even nuggies taste better.<br />
                You are more than my favorite snack — you’re my person. 💛<br /><br />
                I love you endlessly.<br />
                — Your fav M
              </p>
            </div>
          )}
          <button onClick={() => setShowCredits(true)}>💫 View Credits</button>
        </div>
      )}
    </div>
  );
};

export default App;

