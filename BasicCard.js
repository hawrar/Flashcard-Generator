'use strict';

var inquirer = require('inquirer');
var create = require('./backend');


var main = {
    type: 'list',
    name: 'main',
    message: 'Welcome to Flashcards! Please choose from the options below.',
    choices: ['Create new flashcards', 'review flashcards', 'Exit']
};

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
// invoke the application
mainMenu();

module.exports = mainMenu;