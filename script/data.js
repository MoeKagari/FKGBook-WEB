FKGBook.data.getCharaIconByCharaId = id => {
    return "<img src='data:image/png;base64," +
        FKGBook.data.icon["chara" + id] +
        "' style='display:block;padding:0px;margin:3px auto;'></img>";
}

FKGBook.data.getWikiUrlByCharaName = (charaName, text) => {
    var wikiUrl = "http://xn--eckq7fg8cygsa1a1je.xn--wiki-4i9hs14f.com/index.php\?" + charaName;
    return "<a class='wiki' target='_blank' title='" +
        ("wiki - " + charaName + "\n" + wikiUrl) +
        "' href='" + wikiUrl + "'>" +
        (text ? text : "WIKI") +
        "</a>";
}

FKGBook.data.getRarityString = rarity => {
    return "★★★★★★★★★★".substr(0, rarity);
}

FKGBook.data.init = function() {
    //解析 raw 数据
    for (dataLayer0Data of FKGBook.data.chara) {
        for (dataLayer1Data of dataLayer0Data.group) {
            for (dataLayer2Data of dataLayer1Data.group) {
                FKGBook.data.allChara.push({
                    "currentCharaData": dataLayer2Data,
                    "charaGroupData": dataLayer0Data
                });
            }
        }
    }

    //按照图鉴编号排序,相等则按照oeb排序
    FKGBook.data.allChara = FKGBook.data.allChara.sort(function(a, b) {
        var result = b.currentCharaData["bid"] - a.currentCharaData["bid"];
        if (result == 0) {
            result = a.currentCharaData["oeb"] - b.currentCharaData["oeb"];
        }
        return result;
    });
}
