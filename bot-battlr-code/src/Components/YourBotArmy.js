import React from 'react';
import BotCard from './BotCard';
import './YourBotArmy.css';

function YourBotArmy({ army, onRelease, onDischarge }) {
  return (
    <div className="your-bot-army">
      {army.map(bot => (
        <div key={bot.id} className="army-bot">
          <BotCard bot={bot} onEnlist={onRelease} />
          <button className="discharge-btn" onClick={() => onDischarge(bot.id)}>x</button>
        </div>
      ))}
    </div>
  );
}

export default YourBotArmy;
