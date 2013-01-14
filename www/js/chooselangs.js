$(function () {
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
        var a = li.find("a").text(lang).attr("href", "javascript:chooseNativeLang('" + lang + "')");
        ul.append(li);
    });
    $("body").attr("data-state", 'chooseNativeLang');
});
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
        var a = li.find("a").text(lang).attr("href", "javascript:chooseTargetLangs('" + lang + "')");
        ul.append(li);
    });
};
var chooseNativeLang = function (langCode) {
    alert('nativ');
    localStorage.setItem("nativeLang", langCode);
    switchView_chooseTargetLang(langCode);
};
var chooseTargetLangs = function (langCode) {
    localStorage.setItem("targetLang", langCode);
    location.href = "index.html";
};
