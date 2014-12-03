/*
    Klasse MessageHandler
    Shows and hides messages on a HTML webpage
*/

var MessageHandler = function (args) {
    var prefix;                             //The prefix for message IDs
    var lastMessageId = 0;                  //The ID of the most recently created message
    
    /*
        --------------------------Constructor--------------------------
    */
    prefix = typeof (args.prefix) !== 'undefined' ? 'msg_' : args.prefix;           //Assign the provided prefix, default value = 'msg_'
    /*
        --------------------------End of constructor--------------------------
    */

    /*
        Function for checking if a message box with a specific ID already exists. 
        Returns true if message box exists and false in any other case.
    */
    function messageExists(messageId) {
        var returnValue;
        if (typeof (document.getElementById(prefix + messageId)) == 'undefined') {
            returnValue = false;
        } else {
            returnValue = true;
        }

        return returnValue;
    }

    /*
        Function which returns the message box with the indicate ID. 
        If no message box with this ID exists, 'undefined' is beeing returned.
    */
    function getMessage(messageId) {
        var message;

        if (messageExists(messageId)) {
            message = document.getElementById('message');
        } else {
            message = 'undefined';
        }

        return message;
    }

    /*
        Funciton which creates the next, unused ID for a new message box.
    */
    function getNextMessageId() {
        var newId = lastMessageId + 1;
        while (messageExists(prefix + newId)) {
            ++newId;
        }

        return newId;
    }


    function createMessage(messageText) {
        var message;

        if (!messageBoxExists) {
            message = document.createElement('div');
            message.id = prefix + getNextMessageId();
            message.className = 'message_hidden';
            message.innerHTML = messageText;
            document.getElementsByTagName('body')[0].appendChild(message);
        } else {
            message = 'undefined';
        }

        return message;
    }

    /*
        Function to remove a message with a given ID.
        Return true if removal was successful and false in any other case.
    */
    this.removeMessage = function (messageId) {
        var message;
        var messageParent;
        var returnValue;
        
        try{
            if (messageExists) {
                message = getMessage(messageId);
                messageParent = message.parentNode;
                messageParent.removeChild(message);
                returnValue = true;
            } else {
                throw 'Message with ID [' + messageId + '] could not be found';
            }
        } catch (error) {
            returnValue = false;
        }
        
        return returnValue;
    }

    this.showHideMessage = new function (args) {
        var returnValue;

        if (typeof (args) !== undefined && typeof (args.messageId) !== 'undefined') {
            var message;

            var show = typeof (args.show) !== 'undefined' ? args.show : false;

            try {
                if (messageExists(args.messageId)) {
                    message = getMessage(args.messageId);
                    if (show) {
                        message.className = 'message_visible';
                    } else {
                        message.className = 'message_hidden';
                    }
                    
                    returnValue = true;
                } else {
                    throw 'Message with ID [' + messageId + '] could not be found';
                }
            } catch (error) {
                returnValue = false;
            }
        } else {
            returnValue = false;
        }
        
        return returnValue;
    }

    this.hideMessage = new function (messageId) {

    }

    this.showNewMessage = function (messageText) {
        var message = createMessage(messageText);

    }

    this.displayError = function (errorDescription) {
        this.displayMessage(errorDescription);
    }
}