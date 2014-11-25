/*
    Klasse MessageHandler
    Zum Anzeigen und Ausblenden von Nachrichten
*/

var MessageHandler = function () {
    
    function getMessageBox() {
        var messageBox;

        if (typeof(document.getElementById("message")) == "undefined") {
            messageBox = document.createElement("div");
            messageBox.id = "message";
            messageBox.className = "message_hidden";
            document.getElementsByTagName("body")[0].appendChild(messageBox);
        }
        else {
            messageBox = document.getElementById("message");
        }

        return messageBox;
    }

    this.removeMessage = function () {
        var messageBox = getMessageBox();
        messageBox.innerHTML = "";
        messageBox.className = "message_hidden";
    }

    this.displayMessage = function (message) {
        var messageBox = getMessageBox();
        messageBox.innerHTML = message;
        messageBox.className = "message";
    }

    this.displayError = function (errorDescription) {
        this.displayMessage(errorDescription);
    }
}