import React, { useState, useEffect } from 'react';
import { Heart, Leaf, Users, FileText, Plus, Camera, Check, Zap, Globe, Award, ArrowRight, Sparkles, Brain, Wind, Waves, Fish, Trophy, Target, Star, Search, Bell, Settings } from 'lucide-react';

const SolaraApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [activeTab, setActiveTab] = useState('wellness');
  const [moodLevel, setMoodLevel] = useState(3);
  const [todayActions, setTodayActions] = useState([]);
  const [petitionsSigned, setPetitionsSigned] = useState(12);
  const [circleMembers, setCircleMembers] = useState(47);
  const [isPremium, setIsPremium] = useState(false);
  const [aiPermission, setAiPermission] = useState(false);
  const [todayAiUsage, setTodayAiUsage] = useState({ 
    conversations: 12, 
    carbon: 0.8, 
    water: 2.3 
  });

  // AI Therapy Bot States
  const [showTherapyBot, setShowTherapyBot] = useState(false);
  const [therapyMessages, setTherapyMessages] = useState([
    { id: 1, sender: 'bot', message: "Hello! I'm Luna, your climate wellness companion. How are you feeling about environmental issues today?", timestamp: new Date() }
  ]);
  const [therapyInput, setTherapyInput] = useState('');

  // Petition Search State
  const [petitionSearch, setPetitionSearch] = useState('');

  // Blue Carbon Gamification States
  const [blueCarbonPoints, setBlueCarbonPoints] = useState(2850);
  const [blueCarbonLevel, setBlueCarbonLevel] = useState(7);
  const [blueCarbonActions, setBlueCarbonActions] = useState([]);
  const [streakDays, setStreakDays] = useState(12);
  const [achievements, setAchievements] = useState(['ocean_guardian', 'mangrove_protector']);

  // Air Quality States
  const [airQuality, setAirQuality] = useState({
    aqi: 168,
    status: 'Unhealthy',
    pm25: 45,
    pm10: 89,
    o3: 23,
    no2: 34,
    location: 'Karachi, Sindh'
  });

  const tabs = [
    { id: 'wellness', icon: Heart, label: 'Wellness', color: 'from-violet-400 to-purple-500' },
    { id: 'tracker', icon: Leaf, label: 'Impact', color: 'from-emerald-400 to-green-500' },
    { id: 'bluecarbon', icon: Waves, label: 'Ocean', color: 'from-blue-400 to-cyan-500' },
    { id: 'airquality', icon: Wind, label: 'Air', color: 'from-slate-400 to-gray-500' },
    { id: 'crisis', icon: Globe, label: 'Alerts', color: 'from-red-400 to-pink-500' },
    { id: 'circles', icon: Users, label: 'Circles', color: 'from-teal-400 to-cyan-500' },
    { id: 'petitions', icon: FileText, label: 'Action', color: 'from-indigo-400 to-purple-500' }
  ];

  const ecoActions = [
    { id: 1, text: 'Used reusable water bottle', points: 5, completed: false },
    { id: 2, text: 'Took public transport', points: 10, completed: false },
    { id: 3, text: 'Ate plant-based meal', points: 8, completed: false },
    { id: 4, text: 'Reduced screen time by 30min', points: 3, completed: false }
  ];

  const blueCarbonChallenges = [
    { id: 1, title: 'Beach Cleanup', description: 'Remove 10 pieces of plastic from beach', points: 150, type: 'cleanup', icon: '🏖️', completed: false },
    { id: 2, title: 'Mangrove Planting', description: 'Plant a mangrove sapling', points: 300, type: 'restoration', icon: '🌱', completed: false },
    { id: 3, title: 'Ocean Education', description: 'Share ocean facts with 5 friends', points: 75, type: 'education', icon: '📚', completed: false },
    { id: 4, title: 'Plastic-Free Day', description: 'Go 24 hours without single-use plastic', points: 100, type: 'lifestyle', icon: '♻️', completed: false },
    { id: 5, title: 'Seagrass Protection', description: 'Avoid anchoring in seagrass beds', points: 120, type: 'protection', icon: '🌿', completed: false }
  ];

  const achievementsList = [
    { id: 'ocean_guardian', name: 'Ocean Guardian', description: 'Complete 50 blue carbon actions', icon: '🌊', unlocked: true },
    { id: 'mangrove_protector', name: 'Mangrove Protector', description: 'Plant 10 mangrove saplings', icon: '🌳', unlocked: true },
    { id: 'plastic_warrior', name: 'Plastic Warrior', description: 'Remove 100 pieces of ocean plastic', icon: '⚔️', unlocked: false },
    { id: 'blue_carbon_master', name: 'Blue Carbon Master', description: 'Reach level 10', icon: '👑', unlocked: false },
    { id: 'streak_champion', name: 'Streak Champion', description: '30 day streak', icon: '🔥', unlocked: false }
  ];

  const petitions = [
    {
      id: 1,
      title: 'Ban Single-Use Plastics in Food Delivery',
      supporters: 45672,
      urgent: true,
      category: 'plastic'
    },
    {
      id: 2,
      title: 'Protect Old-Growth Forests from Logging',
      supporters: 23891,
      urgent: false,
      category: 'forest'
    },
    {
      id: 3,
      title: 'Mandate Solar Panels on New Buildings',
      supporters: 67234,
      urgent: false,
      category: 'energy'
    },
    {
      id: 4,
      title: 'Stop Ocean Plastic Dumping by Corporations',
      supporters: 89456,
      urgent: true,
      category: 'ocean'
    },
    {
      id: 5,
      title: 'Renewable Energy Tax Incentives',
      supporters: 34567,
      urgent: false,
      category: 'energy'
    },
    {
      id: 6,
      title: 'Protection of Marine Wildlife Sanctuaries',
      supporters: 56789,
      urgent: false,
      category: 'ocean'
    }
  ];

  const crises = [
    { 
      id: 1, 
      location: 'Los Angeles, CA', 
      type: 'Wildfire', 
      severity: 'Critical',
      description: '15,000+ homes destroyed, families need immediate shelter & supplies',
      helpActions: ['Donate to Red Cross', 'Offer temporary housing', 'Volunteer at shelters'],
      timeAgo: '2 hours ago',
      urgent: true
    },
    { 
      id: 2, 
      location: 'Mumbai, India', 
      type: 'Flooding', 
      severity: 'High',
      description: 'Monsoon floods affecting 2M+ people, water & food shortages',
      helpActions: ['Fund clean water', 'Support local NGOs', 'Spread awareness'],
      timeAgo: '6 hours ago',
      urgent: false
    },
    { 
      id: 3, 
      location: 'Your Area', 
      type: 'Heat Wave', 
      severity: 'Medium',
      description: 'Extreme temperatures expected for next 5 days, elderly at risk',
      helpActions: ['Check on neighbors', 'Share cooling centers info', 'Reduce energy use'],
      timeAgo: '1 day ago',
      urgent: false
    }
  ];

  const circles = [
    {
      id: 1,
      name: "Karachi Climate Warriors",
      members: 47,
      type: "Local",
      description: "Young activists fighting climate change in Karachi",
      recentActivity: "Organized beach cleanup - removed 200kg plastic"
    },
    {
      id: 2,
      name: "Blue Carbon Heroes",
      members: 23,
      type: "Interest",
      description: "Focused on ocean conservation and blue carbon projects",
      recentActivity: "Planted 50 mangrove saplings this week"
    },
    {
      id: 3,
      name: "Eco Students Pakistan",
      members: 156,
      type: "Educational",
      description: "University students taking climate action",
      recentActivity: "Launched campus sustainability initiative"
    }
  ];

  const moodEmojis = ['😰', '😟', '😐', '🙂', '😊'];
  const moodLabels = ['Anxious', 'Worried', 'Neutral', 'Good', 'Great'];

  // Air Quality Helper Functions
  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return 'from-green-400 to-green-600';
    if (aqi <= 100) return 'from-yellow-400 to-yellow-600';
    if (aqi <= 150) return 'from-orange-400 to-orange-600';
    if (aqi <= 200) return 'from-red-400 to-red-600';
    if (aqi <= 300) return 'from-purple-400 to-purple-600';
    return 'from-red-800 to-red-900';
  };

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const toggleAction = (actionId) => {
    setTodayActions(prev => {
      if (prev.includes(actionId)) {
        return prev.filter(id => id !== actionId);
      } else {
        return [...prev, actionId];
      }
    });
  };

  const completeBlueCarbonAction = (actionId) => {
    const action = blueCarbonChallenges.find(a => a.id === actionId);
    if (action && !blueCarbonActions.includes(actionId)) {
      setBlueCarbonPoints(prev => prev + action.points);
      setBlueCarbonActions(prev => [...prev, actionId]);
      
      // Check for level up (every 500 points = new level)
      const newLevel = Math.floor((blueCarbonPoints + action.points) / 500) + 1;
      if (newLevel > blueCarbonLevel) {
        setBlueCarbonLevel(newLevel);
      }
    }
  };

  // AI Therapy Bot Functions
  const sendTherapyMessage = () => {
    if (!therapyInput.trim()) return;
    
    const userMessage = {
      id: therapyMessages.length + 1,
      sender: 'user',
      message: therapyInput,
      timestamp: new Date()
    };
    
    setTherapyMessages(prev => [...prev, userMessage]);
    setTherapyInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand those feelings. Climate anxiety is very common. What specific environmental issue worries you most?",
        "It's completely normal to feel overwhelmed by climate change. Would you like to explore some coping strategies?",
        "Your awareness shows you care deeply about our planet. How can we channel that concern into positive action today?",
        "Thank you for sharing that with me. Remember, every small action makes a difference. What's one thing you could do today?",
        "Those emotions are valid. Many people feel the same way. Let's focus on what's within your control right now.",
        "I hear your frustration. Climate action can feel overwhelming, but you're not alone in this. What support do you need?"
      ];
      
      const botMessage = {
        id: therapyMessages.length + 2,
        sender: 'bot',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setTherapyMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  // Filter petitions based on search
  const filteredPetitions = petitions.filter(petition =>
    petition.title.toLowerCase().includes(petitionSearch.toLowerCase()) ||
    petition.category.toLowerCase().includes(petitionSearch.toLowerCase())
  );

  const SolaraLogo = ({ size = 60 }) => (
    <div className="relative">
      <svg width={size} height={size} viewBox="0 0 60 60" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6"/>
            <stop offset="50%" stopColor="#7c3aed"/>
            <stop offset="100%" stopColor="#6d28d9"/>
          </linearGradient>
          <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa"/>
            <stop offset="50%" stopColor="#8b5cf6"/>
            <stop offset="100%" stopColor="#7c3aed"/>
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1"/>
          </radialGradient>
        </defs>
        
        <circle cx="30" cy="30" r="28" fill="url(#glow)"/>
        
        <path 
          d="M30 10 C38 12, 46 20, 44 32 C42 44, 34 50, 30 50 C26 50, 18 44, 16 32 C14 20, 22 12, 30 10 Z" 
          fill="url(#leafGrad)" 
          className="animate-pulse"
        />
        
        <path 
          d="M30 12 Q30 18, 30 24 Q30 30, 30 36 Q30 42, 30 48" 
          stroke="#6d28d9" 
          strokeWidth="2" 
          fill="none"
          className="animate-pulse"
        />
        
        <g opacity="0.9">
          <circle cx="24" cy="22" r="2" fill="url(#brainGrad)" className="animate-pulse"/>
          <circle cx="36" cy="25" r="1.5" fill="url(#brainGrad)" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
          <circle cx="27" cy="32" r="1.8" fill="url(#brainGrad)" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
          <circle cx="33" cy="38" r="1.2" fill="url(#brainGrad)" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
          
          <path d="M24 22 Q30 24, 36 25" stroke="url(#brainGrad)" strokeWidth="1.2" fill="none" opacity="0.7"/>
          <path d="M27 32 Q30 28, 33 25" stroke="url(#brainGrad)" strokeWidth="1.2" fill="none" opacity="0.7"/>
          <path d="M27 32 Q30 35, 33 38" stroke="url(#brainGrad)" strokeWidth="1.2" fill="none" opacity="0.7"/>
        </g>
        
        <g fill="white" opacity="0.9">
          <circle cx="20" cy="18" r="0.8" className="animate-ping"/>
          <circle cx="40" cy="20" r="0.5" className="animate-ping" style={{animationDelay: '0.5s'}}/>
          <circle cx="22" cy="42" r="0.6" className="animate-ping" style={{animationDelay: '1s'}}/>
        </g>
      </svg>
    </div>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white px-6 animate-fade-in">
      <div className="text-center space-y-8">
        <div className="flex justify-center mb-8">
          <SolaraLogo size={120} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            Solara
          </h1>
          <p className="text-xl text-purple-100">One App. Every Action.</p>
        </div>
        
        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-lg text-white/90 leading-relaxed">
            Transform climate anxiety into meaningful action with AI-powered wellness support
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="bg-gradient-to-br from-purple-200 to-violet-200 rounded-full p-3 w-fit mx-auto mb-3">
                <Brain className="text-purple-700" size={28} />
              </div>
              <p className="font-semibold text-white text-sm">Mental Wellness</p>
              <p className="text-xs text-purple-100 mt-1">Eco-anxiety support</p>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full p-3 w-fit mx-auto mb-3">
                <Waves className="text-blue-700" size={28} />
              </div>
              <p className="font-semibold text-white text-sm">Ocean Impact</p>
              <p className="text-xs text-purple-100 mt-1">Blue carbon gaming</p>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="bg-gradient-to-br from-gray-200 to-slate-200 rounded-full p-3 w-fit mx-auto mb-3">
                <Wind className="text-gray-700" size={28} />
              </div>
              <p className="font-semibold text-white text-sm">Air Quality</p>
              <p className="text-xs text-purple-100 mt-1">Real-time monitoring</p>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full p-3 w-fit mx-auto mb-3">
                <Sparkles className="text-yellow-700" size={28} />
              </div>
              <p className="font-semibold text-white text-sm">AI-Powered</p>
              <p className="text-xs text-purple-100 mt-1">Personalized actions</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setCurrentView('app')}
          className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto mt-8"
        >
          Start Your Journey
          <ArrowRight size={20} />
        </button>
        
        <div className="mt-12 space-y-6">
          <div className="flex justify-center gap-8 text-purple-100">
            <div className="text-center">
              <div className="text-2xl font-bold">47K+</div>
              <div className="text-sm">Young Activists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2.3M</div>
              <div className="text-sm">Actions Taken</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15K</div>
              <div className="text-sm">Petitions Signed</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-2xl p-4 border border-yellow-300/30 mx-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-yellow-300" size={20} />
              <span className="text-yellow-200 font-semibold text-sm">Solara Premium</span>
            </div>
            <p className="text-white/90 text-sm">Expert mentorship • Policy maker town halls • Advanced analytics</p>
            <p className="text-purple-100 text-xs mt-1">Free for students with school ID verification</p>
          </div>
        </div>
      </div>
    </div>
  );

  const WellnessTab = () => (
    <div className="space-y-6 animate-fade-in">
      {/* AI Therapy Bot Toggle */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-purple-800 flex items-center gap-2">
            <Brain className="text-purple-600" size={20} />
            Luna - AI Wellness Companion
          </h3>
          <button
            onClick={() => setShowTherapyBot(!showTherapyBot)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              showTherapyBot
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            {showTherapyBot ? 'Close Chat' : 'Start Chat'}
          </button>
        </div>
        
        {showTherapyBot ? (
          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="bg-white rounded-xl p-4 max-h-64 overflow-y-auto space-y-3 border border-purple-100">
              {therapyMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={therapyInput}
                onChange={(e) => setTherapyInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendTherapyMessage()}
                placeholder="Share how you're feeling..."
                className="flex-1 px-4 py-2 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <button
                onClick={sendTherapyMessage}
                className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-purple-700 mb-4">Chat with Luna about climate anxiety, eco-grief, and finding hope in action</p>
            <div className="flex items-center justify-center gap-4 text-sm text-purple-600">
              <span>🌱 Eco-anxiety support</span>
              <span>💚 Coping strategies</span>
              <span>🌍 Action planning</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
        <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <Sparkles className="text-purple-600" size={20} />
          AI Action Cards
        </h3>
        <div className="bg-white rounded-xl p-4 border border-purple-100 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-purple-600 font-medium">Personalized for you</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">🌱 Start a mini herb garden</h4>
          <p className="text-sm text-gray-600 mb-3">Based on your anxiety levels and urban location, growing herbs can reduce stress while helping the environment.</p>
          <div className="flex gap-2">
            <button className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
              Accept Challenge
            </button>
            <button className="border border-purple-300 text-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-50 transition-colors">
              Skip
            </button>
          </div>
        </div>
        <button className="w-full text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
          Generate New Card ✨
        </button>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
        <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center gap-2">
          <Heart className="text-emerald-600" size={20} />
          Daily Check-in
        </h3>
        <p className="text-emerald-700 mb-4">How are you feeling about climate issues today?</p>
        
        <div className="flex justify-between items-center mb-6">
          {moodEmojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => setMoodLevel(index)}
              className={`text-3xl p-3 rounded-full transition-all duration-300 ${
                moodLevel === index 
                  ? 'bg-emerald-200 scale-110 shadow-lg' 
                  : 'hover:bg-emerald-100 hover:scale-105'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        
        <div className="text-center">
          <span className="text-emerald-800 font-medium">{moodLabels[moodLevel]}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">💚 Today's Reflection</h3>
        <div className="bg-gradient-to-r from-purple-400 to-violet-500 rounded-xl p-4 text-white">
          <p className="italic">"Small actions, when multiplied by millions of people, can transform the world."</p>
          <p className="text-sm mt-2 opacity-90">- Howard Zinn</p>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">🌱 Breathing Exercise: Try the 4-7-8 technique</p>
          <p className="text-sm text-gray-600">🌍 Remember: Every action matters</p>
        </div>
      </div>
