var app = {
    initialize: // Application Constructor
    function () {
        this.bindEvents();
    },
    bindEvents: // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    function () {
        app.receivedEvent('deviceready');
    },
    receivedEvent: // Update DOM on a Received Event
    function (id) {
        console.log('Received Event: ' + id);
    }
};
