'use strict';

var fs = require('fs');
// flashcard constructor
function Flashcard(front, back, cloze = false) {
    // scope safe constructor
    if(!(this instanceof Flashcard)) {
        return new Flashcard(front, back, cloze);
    }
    this.front = front;
    this.back = back;
    this.cloze = cloze; // cloze if it is true, default if it is false/basic
} 

// flashcard prototype methods 
Flashcard.prototype = {
    // validating the cloze
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
    // log it to log.txt
    logIt: function logIt(message) {
        // appending message to the log file 
        fs.appendFile("log.txt", message, function(error) {
            if (error) {
                // send it to console if there is an error with the log file 
                console.log('error with the log file\n', error);
            }
        });
    },
    // return the question based on the type
    getQuestion: function getQuestion() {
        if (this.cloze) {
            return this.clozeDeleted();
        } else {
            return this.front;
        }
    },
    // return cloze deleted 
    clozeDeleted: function clozeDeleted() {
        // replace the cloze text
        return this.front.replace(this.back, '.....');
    }
};

module.exports = flashcard;