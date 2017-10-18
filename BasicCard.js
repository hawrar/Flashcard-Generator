//The var for inquirer and create

'use strict';

var inquirer = require('inquirer');
var create = require('./backend');

// The var for main
var main = {
    type: 'list',
    name: 'main',
    message: 'Welcome to Flashcards! Please choose from the options below.',
    choices: ['Create new flashcards', 'review flashcards', 'Exit']
};

// The main menue funciton 

function mainMenu() {
    inquirer.prompt(mainPrompt).then(funciton(res) {
        if (res.main === 'Create new flashcards') {
            create();
        } else if (res.main == 'Review flashcards') {
            review(0);
        }
        return;
    });
}
// This is to call application
mainMenu();

module.exports = mainMenu;