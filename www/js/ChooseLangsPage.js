var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
                    var a = li.find("a").text(lang).attr("data-lang", lang).attr("href", "#here");
                    ul.append(li);
                });
                $("body").attr("data-state", 'chooseNativeLang');
                ul.find("a").bind("click", function () {
                    chooseNativeLang($(this).attr("data-lang"));
                });
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
        li.find("a").text(lang).attr("data-lang", lang).attr("href", "#here");
        ul.append(li);
    });
    ul.find("a").bind("click", function () {
        chooseTargetLangs($(this).attr("data-lang"));
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
