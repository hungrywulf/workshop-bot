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

var util   = require('util');
var path   = require('path');
var fs     = require('fs');
var Bot    = require('slackbots');
var _      = require('lodash');
var pretty = require('pretty-js');

/**
 * WorkshopBot Constructor
 * @param {Object} settings [description]
 */
var WorkshopBot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'workshop-bot';
};

/**
 * Startup function
 */
WorkshopBot.prototype.run = function() {
  WorkshopBot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
};

/**
 * Loads Bot User and prints welcome message
 */
WorkshopBot.prototype._onStart = function() {
  this._loadBotUser();
  this._welcomeMessage();
};

/**
 * Grabs Bot user information
 */
WorkshopBot.prototype._loadBotUser = function() {
  var self = this;

  this.user = this.users.filter(function(user){
    return user.name === self.name;
  })[0];
};

/**
 * Prints welcome message
 */
WorkshopBot.prototype._welcomeMessage = function() {
  this.postMessageToChannel(
    'general',
    'Hey, everyone! Don\'t mind me--just coming online.',
    {as_user: true}
  );
};

/**
 * Called on receipt of message
 * @param  {Object} message Slack message
 */
WorkshopBot.prototype._onMessage = function(message) {
  if (!this._isFromWorkshopBot(message)) {

    if (this._isChatMessage(message)) {
      this._delegateReply(message);
    } else if (this._isChannelConversation(message)) {
      // Do other stuff
    }
    
  }
};

/**
 * Delegates appropriate reply for message content
 * @param  {Object} originalMessage Slack message
 */
WorkshopBot.prototype._delegateReply = function(originalMessage) {
  var channel = this._getChannelById(originalMessage.channel);
  this.postMessage(
    originalMessage.channel,
    'Your message payload:\n```\n' + pretty(JSON.stringify(originalMessage)) + '\n```',
    {as_user: true}
  );
};

/**
 * Gets message channel by channel id
 * @param  {[type]} channelId [description]
 * @return {Object}           Slack channel
 */
WorkshopBot.prototype._getChannelById = function(channelId) {
  return this.channels.filter(function(item){
    return item.id === channelId;
  })[0];
};

/**
 * Determines if message is direct chat message
 * @param  {Object}  message Slack message
 * @return {Boolean}
 */
WorkshopBot.prototype._isChatMessage = function(message) {
  return message.type === 'message' && !!message.text;
};

/**
 * Determines if message is channel chat
 * @param  {Object}  message Slack message
 * @return {Boolean}
 */
WorkshopBot.prototype._isChannelConversation = function(message) {
  // Slack tags chat channel IDs with a leading `C`
  return typeof message.channel === 'string' && message.channel[0] === 'C';
};

/**
 * Determines if message originated from Workshop Bot
 * @param  {Object}  message Slack message
 * @return {Boolean}
 */
WorkshopBot.prototype._isFromWorkshopBot = function(message) {
  return message.user === this.user.id;
};

util.inherits(WorkshopBot, Bot);

module.exports = WorkshopBot;
