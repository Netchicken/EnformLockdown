     < !--Add script to update the page and send messages.-- >
    

        function hideWarningMessageAdmin() {
            var name = document.getElementById("Name").value;
            console.log(name)
            var warningInput = document.getElementById("WarningMessageAdmin");
            if (name == "admin") {

            document.getElementById("WarningMessageAdmin").hidden = false;
                console.log(name + " display shown")
            } else {
            warningInput.hidden = true;
                console.log(name + " display hidden")
            }

        }


        //DOMContentLoaded event – DOM is ready, so the handler can lookup DOM nodes, initialize the interface.
        document.addEventListener('DOMContentLoaded', function () {

            hideWarningMessageAdmin();

            //get the messages and store to send use in  connection.invoke
            var messageInput = document.getElementById('message');
            var warningInput = document.getElementById('WarningMessageAdmin');

            // Get the user name and store it to prepend to messages.
            var name = prompt('Enter your Name and Room Number:', '');

            document.getElementById("Name").value = name; //pass to name input box



            // Set initial focus to message input box.
            messageInput.focus();

            // Start the connection. The JavaScript for SignalR relies on a few objects from the client-side libraries, such as the connection. Notice you must call the connection’s start method to actually connect.
            var connection = new signalR.HubConnectionBuilder()
                .withUrl('/chat')
                .build();

            // Create a function that the hub can call to broadcast messages. The on method allows the server to call the code in it directly. Here’s where the UI is updated – in this case, simply adding messages to a list item. It’s a good practice to encode the data
            connection.on('broadcastMessage', function (name, message, WarningMessageAdmin) {

                //time to add to list
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                console.log(WarningMessageAdmin);
                // Html encode display name and message.
                var encodedName = name;
                var encodedMsg = message;
                var encodedWarning = WarningMessageAdmin;

                //create a text element and pass the data to it then pass to text box
                var text = document.createElement('text');

                text.innerHTML = encodedName + "   " + encodedMsg;
                document.getElementById('latestMessage').value = text.innerHTML;

                // Add the message to the page in a List Element
                var liElement = document.createElement('li');
                liElement.innerHTML = time + '&nbsp;&nbsp;<strong>' + encodedName + '</strong>:&nbsp;&nbsp;' + encodedMsg;

                document.getElementById('discussion').prepend(liElement);

                //add the warning message to the relevent boxes

                var warningMessageText = document.createElement('WarningMessageShow');
                warningMessageText.innerHTML = encodedWarning
                // document.getElementById('WarningMessage').value = WarningMessageAdmin;
                document.getElementById("WarningMessageShow").innerHTML = WarningMessageAdmin;//warningMessageText.innerHTML;

            });



            // Transport fallback functionality is now built into start.
            connection.start()
                .then(function () {
            console.log('connection started');
                    document.getElementById('sendmessage').addEventListener('click', function (event) {
            // Call the Send method on the hub. To make calls to the server, wire up an event to a button or other UI element, capture the data you want to send, and call the invoke method
            connection.invoke('send', name, messageInput.value, warningInput.value);

                        // Clear text box and reset focus for next comment.
                        messageInput.value = '';
                        messageInput.focus();
                        event.preventDefault();
                    });
                })
                .catch(error => {
            console.error(error.message);
                });
        });
    