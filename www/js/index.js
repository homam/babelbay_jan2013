/// <reference path="lib/jquery-1.8.d.ts" />
/// <reference path="lib/storage/storage.ts" />
/// <reference path="app.ts" />
$(function () {
    var ls = new PG.Storage('runs');
    var runs = ls.get() || 0;
    ls.set(++runs);
    $("#runs").html(runs);
    //console.log(runs);
    });
$(function () {
    var renderLevels = function (levelsStr) {
        var levels = JSON.parse(levelsStr);
        $("h1").html(levels[0].name);
        var ul = $("#levels");
        var template = ul.find("li").remove();
        levels.forEach(function (level) {
            var li = template.clone();
            li.css("background-image", "url('http://m.babelbay.com/LevelsMedia/Set" + level.number + "/" + (level.number * 100 + 1) + ".jpg')");
            li.find(".name").text(level.name[app.nativeLang].Native);
            li.find("a").attr("href", 'javascript:switchPage("level.html#level=' + level.number + '")');
            ul.append(li);
        });
        $("body").addClass("loaded");
        localStorage.setItem('levels', levelsStr);
    };
    $.get("data/levels.js").done(renderLevels);
});
