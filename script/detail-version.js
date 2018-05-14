FKGBook.detail.version.update = function(currentCharaData, charaGroupData) {
    var detail_chara_version_data = $("#detail_chara_version_data");
    detail_chara_version_data.empty();
    for (var index = 0, length = charaGroupData.length; index < length; index++) {
        var rawCharaGroupData = charaGroupData[index];

        var version = rawCharaGroupData.info.version;
        if (version == "") version = "通常";

        detail_chara_version_data.append(FKGBook.tool.append(
            $("<div></div>"), [
                $("<h3 style='margin:0px;text-align:left;'>" + FKGBook.data.getWikiUrlByCharaName(rawCharaGroupData.info.name, version) + "</h3>"),
                FKGBook.detail.version.createNewCharaIconGroup(rawCharaGroupData)
            ]
        ));
    }
}

FKGBook.detail.version.createNewCharaIconGroup = function(rawCharaGroupData) {
    var chara_icon_group = $("<div></div>");

    chara_icon_group.css({
        "display": "grid",
        "grid-template-columns": "repeat(4, 1fr)",
        "grid-template-rows": "60px"
    });
    for (charaData of rawCharaGroupData.charas) {
        chara_icon_group.append(FKGBook.tool.append(
            //使 chara_icon 居中 , 并且用来突出显示 selected chara
            $("<div style='display:grid;width:100%;height:100%;' class='detail_chara_icon_" + charaData.id + "'></div>"),
            FKGBook.detail.version.createNewCharaIcon(charaData)
        ));
    }

    return chara_icon_group;
}

FKGBook.detail.version.createNewCharaIcon = function(charaData) {
    var chara_icon = $("<img></img>");

    chara_icon.click(function() {
        FKGBook.detail.updateCurrentCharaData(charaData);
    });
    chara_icon.css({
        "display": "block",
        "padding": "0px",
        "margin": "auto",
        "cursor": "pointer"
    });
    chara_icon.attr("src", "icon/" + charaData.id + ".png");

    return chara_icon;
}
