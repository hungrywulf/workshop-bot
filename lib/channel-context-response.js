/**
 *   _     _  _______  ______    ___   _  _______  __   __  _______  _______ 
 *  | | _ | ||       ||    _ |  |   | | ||       ||  | |  ||       ||       |
 *  | || || ||   _   ||   | ||  |   |_| ||  _____||  |_|  ||   _   ||    _  |
 *  |       ||  | |  ||   |_||_ |      _|| |_____ |       ||  | |  ||   |_| |
 *  |       ||  |_|  ||    __  ||     |_ |_____  ||       ||  |_|  ||    ___|
 *  |   _   ||       ||   |  | ||    _  | _____| ||   _   ||       ||   |    
 *  |__| |__||_______||___|  |_||___| |_||_______||__| |__||_______||___|    
 *   _______  _______  _______                                               
 *  |  _    ||       ||       |                                              
 *  | |_|   ||   _   ||_     _|                                              
 *  |       ||  | |  |  |   |                                                
 *  |  _   | |  |_|  |  |   |                                                
 *  | |_|   ||       |  |   |                                                
 *  |_______||_______|  |___|                                                
 *
 *  workshop-bot.js
 *  author: Joseph DeBartola
 *
 *  Composed alongside tutorial at: https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers
 *
 *  Many thanks to tutorial author Luciano Mammino for the lesson!
 */

'use strict';

var Bot      = require('slackbots');
var _        = require('lodash');
var pretty   = require('pretty-js');
var catFacts = require('cat-facts');

/**
 * To be executed when bot's name is mentioned in channel
 * @param  {Object} bot     [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function onWorkshopBotMentioned(bot, message) {
  bot.postMessage(
    message.channel,
    'Your message payload:\n```\n' + pretty(JSON.stringify(message)) + '\n```',
    {as_user: true}
  );
}

/**
 * To be executed when cats are mentioned in channel
 * @param  {Object} bot     [description]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function onCatsMentioned(bot, message) {
  bot.postMessage(
    message.channel,
    'Did someone mention cats?\n```\n' + catFacts.random() + '\n```',
    {as_user: true}
  );
}

module.exports = function(bot, message) {
  switch (true) {
    case /workshop\-bot/i.test(message.text):
      onWorkshopBotMentioned(bot, message); break;
    case /cats?/i.test(message.text):
      onCatsMentioned(bot, message);
  }
};
