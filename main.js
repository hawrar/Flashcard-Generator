'use strict';

var json = require('./flashcards.json');
var inquirer = require('inquirer');
var flashcard = require('./ClozeCard');

var createPrompt = [
    {
        type: 'list',
        name: 'type',
        message: 'What type of flashcard would you like to create?',
        choices: ['Basic', 'cloze']
    },
    {
        type: 'input',
        name: 'back',
        message: 'What is the back/answer?'
    }
];

var reqviewPrompt = {
    type: 'confirm',
    name: 'review',
    message: 'Would you like to review your new flashcard?'
};

var validatePrompt = {
    type: 'confirm',
    name: 'valid',
    message: 'Cloze is not valid - would you like to re-create the flashcard?'
};

function createCard() {
    inquirer.prompt(createprompt).then(function(response) {
        if(res.type === 'Cloze') {
            let fc = new flashcard(res.front.trim(), res.back.trim(), true);

            if(!fc.valudate()) {
                createCard();
            } else {
                return;
            }
        });
    } else {
        let fc = new flashcard(res.front.trim(), res.back.trim());
        reviewCard(fc);
    }
});
}


function reviewCard(flashcard_for_review) {
    var fc = flashcard_for_review;
    // requiring here for scoping
    const main_menu = require('./index.js');
    // check if user wants to review the flashcard
    inquirer.prompt(reviewPrompt).then(function(res) {
        if (res.review) {
            // review flashcard
            let reviewMessage = 'question: ' + ' ' + fc.getQuestion() + ' answer: ' + fc.back + ' (approve?)';
            inquirer.prompt({type:'confirm', name:'fontR', message:reviewMessage})
                .then(function(res) {
                    if (res.fontR) {
                        // save the flashcard
                        inquirer.prompt(savePrompt).then(function(res) {
                            if (res.save) {
                                // save flashcard
                                saveCard(fc);
                                // create another?
                                inquirer.prompt(againPrompt).then(function(res) {
                                    if (res.again) {
                                        createCard();
                                    } else {
                                        // return to main menu 
                                        main_menu();
                                    }
                                });
                            }
                        }); // end savePrompt promise 
                    } else {
                        // create another?
                        inquirer.prompt(againPrompt).then(function(res) {
                            if (res.again) {
                                createCard();
                            } else {
                                // return to main menu 
                                main_menu();
                            }
                        }); // end againPrompt promise 
                    }
                }); // end reviewMessage promise 
        } else {
            // save the flashcard
            inquirer.prompt(savePrompt).then(function(res) {
                if (res.save) {
                    // save flashcard
                    saveCard(fc);
                    // create another?
                    inquirer.prompt(againPrompt).then(function(res) {
                        if (res.again) {
                            createCard();
                        } else {
                            // return to main menu 
                            main_menu();
                        }
                    }); // end againPrompt promise 
                } else {
                    // create another?
                    inquirer.prompt(againPrompt).then(function(res) {
                        if (res.again) {
                            createCard();
                        } else {
                            // return to main menu 
                            main_menu();
                        }
                    });
                }
            }); // end savePrompt promise 
        }
    });
}

// save new flashcard 
function saveCard(fc) {
    // set file location
    const file = './flashcards.json';
    // read in file contents
    let contents = jsonfile.readFileSync(file);
    // push new flashcard to array
    contents.flashcards.push(fc);
    // write updated content to file 
    jsonfile.writeFileSync(file, contents, {spaces: 2});

    return;
}

module.exports = createCard;
