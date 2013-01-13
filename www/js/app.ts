/// <reference path="lib/jquery-1.8.d.ts" />

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    },

    load: function (scripts: string[] = []): JQueryDeferred {
        var def = $.Deferred();
         $.when(['cordova-2.3.0.js', 'js/lib/storage/storage.js', 'js/lib/_.js',
              'js/lib/touchwipe.js', 'js/lib/hashParams.js']
            .map(file => $.getScript(file)))
                .done(() => $.when(scripts.map(f => $.getScript(f)))
                    .done(()=>def.resolve()));
         return def;
    }
};

