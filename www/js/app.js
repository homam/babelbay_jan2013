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
        $.when.apply(null, [
            'cordova-2.3.0.js', 
            'js/lib/storage/storage.js', 
            'js/lib/_.js', 
            'js/lib/touchwipe.js', 
            'js/lib/hashParams.js', 
            'js/Page.js'
        ].map(function (file) {
            return $.getScript(file);
        })).done(function () {
            if(scripts.length == 0) {
                $.getScript(scripts[0]).done(def.resolve);
            } else {
                $.when.apply(null, scripts.map(function (f) {
                    return $.getScript(f);
                })).done(def.resolve);
            }
        });
        return def;
    },
    targetLang: localStorage.getItem("targetLang"),
    nativeLang: localStorage.getItem("nativeLang"),
    render: function (page) {
        var def = $.Deferred();
        app.load([
            'js/' + page + '.js'
        ]).done(function () {
            return new PG[page]().render().done(def.resolve);
        });
        return def;
    }
};
var switchPage = function (url) {
    $("body").removeClass("loaded");
    location.href = url;
};
