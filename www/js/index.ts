/// <reference path="jquery-1.8.d.ts" />
/// <reference path="storage/storage.ts" />

$(function () {
    var ls = new PG.Storage('runs');
    var runs = ls.get() || 0;
    ls.set(++runs);
    
    $("#runs").html(runs);
    //console.log(runs);
});



$(function () {
    $.get("data/levels.js").done(function (levelsStr) {
        var levels = JSON.parse(levelsStr);
        $("h1").html(levels[0].name)
        var ul = $("#levels");
        var template = ul.find("li").remove();

        levels.forEach(function (level) {
            var li = template.clone();
            li.css("background-image", "url('http://m.babelbay.com/LevelsMedia/Set" + level.number + "/" + (level.number*100+1) + ".jpg')");
            li.find(".name").text(level.name.en.Native);
            li.find("a").attr("href", "level.html#level=" + level.number);
            ul.append(li);
            console.log(li, ul);
        });

    });
});