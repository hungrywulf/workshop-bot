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
 *  bot.js
 *  author: Joseph DeBartola
 *
 *  Composed alongside tutorial at: https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers
 *
 *  Many thanks to tutorial author Luciano Mammino for the lesson!
 */
'use strict';

var WorkshopBot = require('../lib/workshop-bot');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var workshopBot = new WorkshopBot({
  token: token,
  name: name
});

workshopBot.run();
