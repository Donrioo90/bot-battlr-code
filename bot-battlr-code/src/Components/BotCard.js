import React from 'react';
import './BotCard.css'; // Modern card CSS

function BotCard({ bot, onEnlist }) {
  return (
    <div className="bot-card" onClick={() => onEnlist(bot)}>
      <img src={bot.avatar_url} alt={bot.name} className="bot-avatar" />
      <h3>{bot.name}</h3>
      <p>Class: {bot.bot_class}</p>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      <p>{bot.catchphrase}</p>
    </div>
  );
}

export default BotCard;
