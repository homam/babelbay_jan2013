/// <reference path="lib/jquery-1.8.d.ts" />
/// <reference path="lib/storage/storage.ts" />
/// <reference path="Page.ts" />
/// <reference path="app.ts" />

module PG {
    export class ChooseLangsPage extends Page {
        _render = function (): JQueryDeferred {

            var ul = $("#nativeLangs");
            var template = ul.find(".template");
            template.removeClass("template");
            template.remove();

            ['en', 'es', 'ar', 'fr', 'de', 'th', 'az', 'tr', 'pl'].forEach(lang => {
                var li = template.clone();
                var a = li.find("a").text(lang).attr("data-lang", lang).attr("href","#here");//.attr("href", "javascript:chooseNativeLang('" + lang + "')");
                ul.append(li);
            });

            $("body").attr("data-state", 'chooseNativeLang');

            ul.find("a").bind("click", function () {
                chooseNativeLang($(this).attr("data-lang"));
            });

            return $.Deferred().resolve();
        }
    }
}




var switchView_chooseTargetLang = function(selectedNativeLangCode:string) {
    $("body").attr("data-state",'chooseTargetLang');

    var ul = $("#targetLangs");
    var template = ul.find(".template");
    template.removeClass("template");
    template.remove();

    ['en', 'es', 'ar', 'fr', 'de', 'ru'].filter(lang => selectedNativeLangCode != lang).forEach(lang => {
        var li = template.clone();
        li.find("a").text(lang).attr("data-lang", lang).attr("href","#here");//.attr("href", "javascript:chooseTargetLangs('" + lang + "')");
        ul.append(li);
    });

    ul.find("a").bind("click", function () {
        chooseTargetLangs($(this).attr("data-lang"));
    });
}

var chooseNativeLang = function (langCode) {
    localStorage.setItem("nativeLang", langCode);
    switchView_chooseTargetLang(langCode);
};

var chooseTargetLangs = function (langCode) {
    localStorage.setItem("targetLang", langCode);
    location.href = "index.html";
}