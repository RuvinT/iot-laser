
 client = new Messaging.Client("broker.emqx.io",8084,"ruvin");

 //Connect Options
      var options = {
        //Gets Called if the connection has sucessfully been established
        onSuccess: function () {
         console.log("Connected");
		  client.subscribe("testtopic/laser/pos", {qos: 2});
          console.log("Subscribed");
        },
        //Gets Called if the connection could not be established
        onFailure: function (message) {
          console.log("Connection failed: " + message.errorMessage);
        },
	useSSL: true
      };

     
	
	//Gets  called if the websocket/mqtt connection gets disconnected for any reason
      client.onConnectionLost = function (responseObject) {
        //Depending on your scenario you could implement a reconnect logic here
        console.log("connection lost: " + responseObject.errorMessage);
      };
	  var messages ="";
      client.onMessageArrived = function (message) {


        //Do something with the push message you received
        if (message.destinationName === "testtopic/laser/pos") {
          
           console.log("return value for sensor" +message.payloadString);
		   messages = messages +"</br>" + message.payloadString;
		
		   var x = document.getElementById('textArea');
		   x.value +=  message.payloadString+ '\r\n';
            
            

        } 


      };
	  
	   client.connect(options);
