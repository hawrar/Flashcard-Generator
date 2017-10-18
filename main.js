// The vars for json, inquirer, and flashcard

'use strict';

var json = require('./flashcards.json');
var inquirer = require('inquirer');
var flashcard = require('./ClozeCard');


// The create prompt for the objects

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


// The requview prompt
var reqviewPrompt = {
    type: 'confirm',
    name: 'review',
    message: 'Would you like to review your new flashcard?'
};

//The validate prompt

var validatePrompt = {
    type: 'confirm',
    name: 'valid',
    message: 'Cloze is not valid - would you like to re-create the flashcard?'
};


// The create card funciton with if and return;

function createCard() {
    inquirer.prompt(createprompt).then(function(response) {
        if(res.type === 'Cloze') {
            var fc = new flashcard(res.front.trim(), res.back.trim(), true);

            if(!fc.valudate()) {
                createCard();
            } else {
                return;
            }
        };
    } else {
        var fc = new flashcard(res.front.trim(), res.back.trim());
        reviewCard(fc);
    }
});
}


function reviewCard(flashcard_for_review) {
    var fc = flashcard_for_review;
    

    var main_menu = require('./index.js');


    // This is to ask the user to check their choice

    inquirer.prompt(reviewPrompt).then(function(res) {
        if (res.review) {
            // Second step to check their choice

            var reviewMessage = 'question: ' + ' ' + fc.getQuestion() + ' answer: ' + fc.back + ' (approve?)';
            inquirer.prompt({type:'confirm', name:'fontR', message:reviewMessage})
                .then(function(res) {
                    if (res.fontR) {


                        // This is to save their choice

                        inquirer.prompt(savePrompt).then(function(res) {
                            if (res.save) {
                              //  Another step to save the card


                                saveCard(fc);
                                
                                inquirer.prompt(againPrompt).then(function(res) {
                                    if (res.again) {
                                        createCard();
                                    } else {
                                        

                                        // Function to go back to the main menu
                                        main_menu();
                                    }
                                });
                            }
                        }); 


                    } else {
                        // Here is another create step


                        inquirer.prompt(againPrompt).then(function(res) {
                            if (res.again) {
                                createCard();
                            } else {
                                

                                // Going back to the main menue
                                main_menu();
                            }
                        }); 
                    }
                }); 



        } else {


            // Another step to save the card



            inquirer.prompt(savePrompt).then(function(res) {
                if (res.save) {
                    

                    saveCard(fc);
                    

                    //Another step to create

                    inquirer.prompt(againPrompt).then(function(res) {
                        if (res.again) {
                            createCard();
                        } else {
                            
                            main_menu();
                        }
                    });


                } else {


                    // Another stop to create


                    inquirer.prompt(againPrompt).then(function(res) {
                        if (res.again) {
                            createCard();
                        } else {
                            


                            main_menu();
                        }
                    });
                }
            }); 


        }
    });
}

// This is to save the card


function saveCard(fc) {
    // The path to the json file
    var file = './flashcards.json';
    

    var contents = jsonfile.readFileSync(file);
    

    // this for pushing the content and write 
    contents.flashcards.push(fc);
    


    jsonfile.writeFileSync(file, contents, {spaces: 2});

    return;
}

module.exports = createCard;
