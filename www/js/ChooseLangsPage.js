var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="lib/jquery-1.8.d.ts" />
/// <reference path="lib/storage/storage.ts" />
/// <reference path="Page.ts" />
/// <reference path="app.ts" />
var PG;
(function (PG) {
    var ChooseLangsPage = (function (_super) {
        __extends(ChooseLangsPage, _super);
        function ChooseLangsPage() {
            _super.apply(this, arguments);

            this._render = function () {
                var ul = $("#nativeLangs");
                var template = ul.find(".template");
                template.removeClass("template");
                template.remove();
                [
                    'en', 
                    'es', 
                    'ar', 
                    'fr', 
                    'de', 
                    'th', 
                    'az', 
                    'tr', 
                    'pl'
                ].forEach(function (lang) {
                    var li = template.clone();
                    li.find("a").text(lang).attr("href", "javascript:chooseNativeLang('" + lang + "')");
                    ul.append(li);
                });
                $("body").attr("data-state", 'chooseNativeLang');
                return $.Deferred().resolve();
            };
        }
        return ChooseLangsPage;
    })(PG.Page);
    PG.ChooseLangsPage = ChooseLangsPage;    
})(PG || (PG = {}));
var switchView_chooseTargetLang = function (selectedNativeLangCode) {
    $("body").attr("data-state", 'chooseTargetLang');
    var ul = $("#targetLangs");
    var template = ul.find(".template");
    template.removeClass("template");
    template.remove();
    [
        'en', 
        'es', 
        'ar', 
        'fr', 
        'de', 
        'ru'
    ].filter(function (lang) {
        return selectedNativeLangCode != lang;
    }).forEach(function (lang) {
        var li = template.clone();
        li.find("a").text(lang).attr("href", "javascript:chooseTargetLangs('" + lang + "')");
        ul.append(li);
    });
};
var chooseNativeLang = function (langCode) {
    localStorage.setItem("nativeLang", langCode);
    switchView_chooseTargetLang(langCode);
};
var chooseTargetLangs = function (langCode) {
    localStorage.setItem("targetLang", langCode);
    location.href = "index.html";
};
