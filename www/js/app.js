var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    },
    load: function (scripts) {
        if (typeof scripts === "undefined") { scripts = []; }
        var def = $.Deferred();
        $.when([
            'cordova-2.3.0.js', 
            'js/lib/storage/storage.js', 
            'js/lib/_.js', 
            'js/lib/touchwipe.js', 
            'js/lib/hashParams.js'
        ].map(function (file) {
            return $.getScript(file);
        })).done(function () {
            return $.when(scripts.map(function (f) {
                return $.getScript(f);
            })).done(function () {
                return def.resolve();
            });
        });
        return def;
    }
};
