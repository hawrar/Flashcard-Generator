'use strict';

var fs = require('fs');
// The constructor 
function Flashcard(front, back, cloze = false) {
    // This is the if statement for the constructor
    if(!(this instanceof Flashcard)) {
        return new Flashcard(front, back, cloze);
    }
    this.front = front;
    this.back = back;
    this.cloze = cloze; 
} 

// The following are the  prototype methods 
Flashcard.prototype = {
    // The first is to validate it 
    validate: function validate() {
        if (this.cloze && this.front.includes(this.back)) {
            return true;
        } else if (this.cloze) {
            this.logIt('invalid cloze provided\n');
            return false;
        } else {
            this.logIt('Validate called on non-cloze\n');
            return false;
        }
    },
    // Loggint it in the txt file
    logIt: function logIt(message) {


        
        fs.appendFile("log.txt", message, function(error) {
            if (error) {
                


                console.log('error with the log file\n', error);
            }
        });
    },
    // the if and return function

    getQuestion: function getQuestion() {
        if (this.cloze) {
            return this.clozeDeleted();
        } else {
            return this.front;
        }
    },


    // Here we returnt the closze after it is deleted


    clozeDeleted: function clozeDeleted() {

        
        // Another return for replace function


        return this.front.replace(this.back, '.....');
    }
};

module.exports = flashcard;