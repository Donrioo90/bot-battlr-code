import React, { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import BotSpecs from './components/BotSpecs';
import './App.css'; 

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  // Fetch bots from the backend
  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then(response => response.json())
      .then(data => setBots(data));
  }, []);

  // Handle enlistment of bots into the army
  const handleEnlist = (bot) => {
    if (!army.some(enlistedBot => enlistedBot.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  // Handle release of bots from the army
  const handleRelease = (bot) => {
    setArmy(army.filter(enlistedBot => enlistedBot.id !== bot.id));
  };

  // Handle discharge (deletion) of bots
  const handleDischarge = (botId) => {
    fetch(`http://localhost:8001/bots/${botId}`, {
      method: 'DELETE',
    }).then(() => {
      setArmy(army.filter(bot => bot.id !== botId));
      setBots(bots.filter(bot => bot.id !== botId));
    });
  };

  // Handle bot selection for viewing detailed specs
  const handleSelectBot = (bot) => {
    setSelectedBot(bot);
  };

  // Handle going back from BotSpecs to the BotCollection
  const handleBack = () => {
    setSelectedBot(null);
  };

  return (
    <div className="App">
      <h1>Bot Battlr</h1>
      
      {/* Render BotSpecs if a bot is selected, otherwise render BotCollection */}
      {selectedBot ? (
        <BotSpecs bot={selectedBot} onBack={handleBack} onEnlist={handleEnlist} />
      ) : (
        <BotCollection bots={bots} onEnlist={handleEnlist} onSelectBot={handleSelectBot} />
      )}
      
      <YourBotArmy army={army} onRelease={handleRelease} onDischarge={handleDischarge} />
    </div>
  );
}

export default App;
