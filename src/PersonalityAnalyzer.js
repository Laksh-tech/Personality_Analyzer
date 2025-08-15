import React, { useState } from 'react';
import { Heart, Sparkles, Star, Flower } from 'lucide-react';

const PersonalityAnalyzer = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [personality, setPersonality] = useState(null);
  const [chatMode, setChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const questions = [
    {
      id: 'flower',
      question: "What's your favorite flower? 🌸",
      options: [
        { text: "Cherry Blossoms", value: "E", cute: "🌸" },
        { text: "Roses", value: "I", cute: "🌹" },
        { text: "Sunflowers", value: "E", cute: "🌻" },
        { text: "Lavender", value: "I", cute: "💜" }
      ]
    },
    {
      id: 'weekend',
      question: "Perfect weekend activity? ✨",
      options: [
        { text: "Big party with friends", value: "E", cute: "🎉" },
        { text: "Cozy movie marathon alone", value: "I", cute: "🍿" },
        { text: "Small gathering with close friends", value: "E", cute: "👭" },
        { text: "Reading in a quiet café", value: "I", cute: "📚" }
      ]
    },
    {
      id: 'decision',
      question: "How do you make decisions? 💭",
      options: [
        { text: "Follow my heart", value: "F", cute: "💖" },
        { text: "Think it through logically", value: "T", cute: "🧠" },
        { text: "Ask friends for advice", value: "F", cute: "👥" },
        { text: "Research all options", value: "T", cute: "📊" }
      ]
    },
    {
      id: 'future',
      question: "Your approach to the future? 🌟",
      options: [
        { text: "Detailed plans and schedules", value: "J", cute: "📅" },
        { text: "Go with the flow", value: "P", cute: "🌊" },
        { text: "Set goals but stay flexible", value: "P", cute: "🎯" },
        { text: "Structured but open to change", value: "J", cute: "⚖️" }
      ]
    },
    {
      id: 'information',
      question: "How do you process information? 🔮",
      options: [
        { text: "Focus on concrete facts", value: "S", cute: "📝" },
        { text: "Look for patterns and meanings", value: "N", cute: "🌙" },
        { text: "Trust what I can see/touch", value: "S", cute: "👁️" },
        { text: "Imagine possibilities", value: "N", cute: "✨" }
      ]
    },
    {
      id: 'stress',
      question: "When stressed, you... 😌",
      options: [
        { text: "Talk to someone", value: "E", cute: "💬" },
        { text: "Need alone time", value: "I", cute: "🏠" },
        { text: "Make lists and organize", value: "J", cute: "✅" },
        { text: "Take things as they come", value: "P", cute: "🌸" }
      ]
    }
  ];

  const personalities = {
    'ENFP': {
      name: 'The Dreamer Princess',
      description: 'You are creative, enthusiastic, and full of possibilities! You love inspiring others and bringing joy wherever you go.',
      anime: 'Usagi Tsukino (Sailor Moon)',
      traits: ['Creative', 'Optimistic', 'Empathetic', 'Spontaneous'],
      color: 'bg-gradient-to-br from-pink-300 to-purple-300'
    },
    'INFP': {
      name: 'The Gentle Soul',
      description: 'You are deeply caring, idealistic, and value authenticity. Your inner world is rich with imagination and compassion.',
      anime: 'Tohru Honda (Fruits Basket)',
      traits: ['Compassionate', 'Creative', 'Idealistic', 'Loyal'],
      color: 'bg-gradient-to-br from-purple-200 to-pink-200'
    },
    'ENFJ': {
      name: 'The Inspiring Leader',
      description: 'You are warm, encouraging, and natural at helping others grow. You bring out the best in people around you.',
      anime: 'Momo Yaoyorozu (My Hero Academia)',
      traits: ['Charismatic', 'Altruistic', 'Reliable', 'Natural Leader'],
      color: 'bg-gradient-to-br from-rose-300 to-purple-300'
    },
    'INFJ': {
      name: 'The Mystical Guardian',
      description: 'You are insightful, determined, and deeply care about making a positive impact. Your intuition guides you well.',
      anime: 'Kagome Higurashi (Inuyasha)',
      traits: ['Intuitive', 'Principled', 'Passionate', 'Altruistic'],
      color: 'bg-gradient-to-br from-indigo-200 to-pink-200'
    },
    'ESFP': {
      name: 'The Cheerful Star',
      description: 'You are spontaneous, energetic, and love bringing happiness to others. Life is an adventure with you!',
      anime: 'Chitoge Kirisaki (Nisekoi)',
      traits: ['Enthusiastic', 'Friendly', 'Spontaneous', 'Practical'],
      color: 'bg-gradient-to-br from-pink-400 to-rose-300'
    },
    'ISFP': {
      name: 'The Quiet Artist',
      description: 'You are gentle, caring, and have a strong aesthetic sense. You express yourself through creativity and kindness.',
      anime: 'Hinata Hyuga (Naruto)',
      traits: ['Gentle', 'Sensitive', 'Creative', 'Flexible'],
      color: 'bg-gradient-to-br from-purple-300 to-pink-200'
    },
    'ESFJ': {
      name: 'The Caring Helper',
      description: 'You are warm-hearted, cooperative, and always ready to help others. You create harmony wherever you go.',
      anime: 'Ochaco Uraraka (My Hero Academia)',
      traits: ['Supportive', 'Reliable', 'Warm-hearted', 'Dutiful'],
      color: 'bg-gradient-to-br from-rose-200 to-purple-200'
    },
    'ISFJ': {
      name: 'The Protective Angel',
      description: 'You are kind, reliable, and always put others first. Your caring nature makes everyone feel safe and loved.',
      anime: 'Mikasa Ackerman (Attack on Titan)',
      traits: ['Loyal', 'Patient', 'Reliable', 'Hard-working'],
      color: 'bg-gradient-to-br from-blue-200 to-pink-200'
    },
    'ENTP': {
      name: 'The Clever Innovator',
      description: 'You are quick-witted, innovative, and love exploring new ideas. Your curiosity knows no bounds!',
      anime: 'Senku Ishigami (Dr. Stone)',
      traits: ['Inventive', 'Enthusiastic', 'Strategic', 'Charismatic'],
      color: 'bg-gradient-to-br from-cyan-200 to-purple-200'
    },
    'INTP': {
      name: 'The Thoughtful Philosopher',
      description: 'You are logical, independent, and love understanding how things work. Your mind is your greatest asset.',
      anime: 'L Lawliet (Death Note)',
      traits: ['Analytical', 'Original', 'Independent', 'Objective'],
      color: 'bg-gradient-to-br from-slate-200 to-purple-200'
    },
    'ENTJ': {
      name: 'The Confident Commander',
      description: 'You are natural leaders, efficient and confident. You turn vision into reality with determination.',
      anime: 'Erwin Smith (Attack on Titan)',
      traits: ['Efficient', 'Energetic', 'Self-confident', 'Strong-willed'],
      color: 'bg-gradient-to-br from-amber-200 to-red-200'
    },
    'INTJ': {
      name: 'The Strategic Mastermind',
      description: 'You are independent, decisive, and have a clear vision for the future. Your plans are always well-thought-out.',
      anime: 'Lelouch Lamperouge (Code Geass)',
      traits: ['Independent', 'Decisive', 'Hard-working', 'Determined'],
      color: 'bg-gradient-to-br from-purple-300 to-indigo-300'
    },
    'ESTP': {
      name: 'The Bold Adventurer',
      description: 'You are energetic, perceptive, and love taking action. Life is meant to be lived to the fullest!',
      anime: 'Natsu Dragneel (Fairy Tail)',
      traits: ['Bold', 'Rational', 'Practical', 'Original'],
      color: 'bg-gradient-to-br from-orange-200 to-red-200'
    },
    'ISTP': {
      name: 'The Cool Craftsman',
      description: 'You are practical, flexible, and great at solving problems. You prefer action over words.',
      anime: 'Toph Beifong (Avatar)',
      traits: ['Tolerant', 'Flexible', 'Charming', 'Unpredictable'],
      color: 'bg-gradient-to-br from-green-200 to-blue-200'
    },
    'ESTJ': {
      name: 'The Reliable Organizer',
      description: 'You are practical, fact-minded, and reliable. You bring order and structure to any situation.',
      anime: 'Iida Tenya (My Hero Academia)',
      traits: ['Dedicated', 'Strong-willed', 'Direct', 'Loyal'],
      color: 'bg-gradient-to-br from-blue-300 to-indigo-300'
    },
    'ISTJ': {
      name: 'The Loyal Guardian',
      description: 'You are responsible, sincere, and methodical. People can always count on your reliability and dedication.',
      anime: 'Hermione Granger (Harry Potter)',
      traits: ['Responsible', 'Sincere', 'Practical', 'Fact-minded'],
      color: 'bg-gradient-to-br from-teal-200 to-blue-200'
    }
  };

  const calculatePersonality = () => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    Object.values(answers).forEach(answer => {
      scores[answer]++;
    });

    const type = 
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P');
    
    return personalities[type] || personalities['INFP'];
  };

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculatePersonality();
      setPersonality(result);
      setCurrentStep('result');
    }
  };

  const handleChatSubmit = () => {
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, { type: 'user', text: userInput }];
    
    // Simple personality-based responses
    let response = "That's such an interesting question! ";
    
    if (userInput.toLowerCase().includes('love') || userInput.toLowerCase().includes('relationship')) {
      response += `As ${personality.name}, you probably approach relationships with your heart leading the way. Your ${personality.traits[0].toLowerCase()} nature makes you really special in love! 💕`;
    } else if (userInput.toLowerCase().includes('career') || userInput.toLowerCase().includes('job')) {
      response += `With your personality type, you'd thrive in careers that let you use your ${personality.traits[1].toLowerCase()} and ${personality.traits[2].toLowerCase()} qualities! ✨`;
    } else if (userInput.toLowerCase().includes('friend')) {
      response += `Your ${personality.traits[0].toLowerCase()} personality makes you an amazing friend! You probably bring so much joy to your friendships! 🌸`;
    } else {
      response += `Based on your ${personality.name} personality, I think you handle things with such grace and your ${personality.traits[0].toLowerCase()} nature really shines through! 💖`;
    }

    newMessages.push({ type: 'bot', text: response });
    setChatMessages(newMessages);
    setUserInput('');
  };

  if (currentStep === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
          <div className="text-center space-y-6">
            <div className="relative">
              <Heart className="w-16 h-16 text-pink-400 mx-auto animate-pulse" />
              <Sparkles className="w-6 h-6 text-purple-400 absolute -top-2 -right-2 animate-bounce" />
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Personality Magic ✨
            </h1>
            
            <p className="text-gray-600 leading-relaxed">
              Discover your unique personality and find your perfect anime character match! 
              Answer some cute questions and let the magic begin! 🌸
            </p>
            
            <button
              onClick={() => setCurrentStep('quiz')}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Star className="w-5 h-5" />
              Start the Magic
              <Star className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const question = questions[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-purple-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx <= currentQuestion ? 'bg-pink-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200 hover:border-pink-300 hover:shadow-md transition-all duration-200 hover:scale-[1.02] flex items-center gap-3"
              >
                <span className="text-2xl">{option.cute}</span>
                <span className="text-gray-700 font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-4">
        <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full ${personality.color} mx-auto flex items-center justify-center shadow-lg`}>
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <Heart className="w-6 h-6 text-pink-400 absolute -top-1 -right-1 animate-bounce" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                You are...
              </h2>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                {personality.name}
              </h1>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                {personality.description}
              </p>
              
              <div className="mb-4">
                <h3 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Your Anime Match
                </h3>
                <p className="text-pink-600 font-medium">{personality.anime}</p>
              </div>

              <div>
                <h3 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                  <Flower className="w-4 h-4" />
                  Your Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {personality.traits.map((trait, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/60 rounded-full text-sm text-purple-600 border border-purple-200"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setChatMode(true)}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Ask me anything! 💬
              </button>
              
              <button
                onClick={() => {
                  setCurrentStep('start');
                  setCurrentQuestion(0);
                  setAnswers({});
                  setPersonality(null);
                  setChatMode(false);
                  setChatMessages([]);
                }}
                className="w-full bg-gradient-to-r from-purple-200 to-pink-200 text-purple-600 font-semibold py-3 px-6 rounded-2xl border border-purple-300 hover:shadow-md transition-all duration-300"
              >
                Take Quiz Again ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (chatMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-4">
        <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-200 flex flex-col h-[80vh]">
          <div className="p-6 border-b border-pink-200">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => setChatMode(false)}
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                ← Back
              </button>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Chat with {personality.name}
              </h2>
            </div>
            <p className="text-sm text-gray-600">Ask me anything about your personality! 💕</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <Sparkles className="w-8 h-8 text-pink-300 mx-auto mb-2" />
                <p>Start a conversation! Ask about love, career, friendships, or anything else! ✨</p>
              </div>
            )}
            
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                      : 'bg-gradient-to-r from-pink-50 to-purple-50 text-gray-700 border border-pink-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-pink-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Ask me something cute... 💭"
                className="flex-1 px-4 py-3 rounded-2xl border border-pink-200 focus:border-pink-400 focus:outline-none bg-white/60"
              />
              <button
                onClick={handleChatSubmit}
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                💕
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PersonalityAnalyzer;