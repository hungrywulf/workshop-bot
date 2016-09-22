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

var Bot    = require('slackbots');
var _      = require('lodash');
var pretty = require('pretty-js');

/**
 * To be executed when bot's name is mentioned in channel
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function onWorkshopBotMentioned(message) {
  this.postMessage(
    message.channel,
    'Your message payload:\n```\n' + pretty(JSON.stringify(message)) + '\n```',
    {as_user: true}
  );
}

module.exports = function(bot, message) {
  if (message.match(/workshop\-bot/i)) {
    onWorkshopBotMentioned.apply(bot, message);
  }
};
