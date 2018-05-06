FKGBook.detail.init = function() {
    $("#div_detail").bind("click", function(event) {
        event.stopPropagation();
    });
    $("#container_detail").bind("click", function(event) {
        $("#container_detail").css("display", "none");
    });
}

FKGBook.detail.show = function(currentCharaData, charaGroupData) {
    FKGBook.detail.updateVersionData(currentCharaData, charaGroupData);
    FKGBook.detail.updateCurrentCharaData(currentCharaData);
    $("#container_detail").css("display", "grid");
}

FKGBook.detail.updateCurrentCharaData = function(currentCharaData) {
    var detail_chara_image_stand_s = $("#detail_chara_image_stand_s"); {
        detail_chara_image_stand_s.attr("src", "stand_s/" + currentCharaData.image_id + ".png");
        detail_chara_image_stand_s.parent().attr("href", "stand/" + currentCharaData.image_id + ".png");
    }
    $("#detail_chara_flower_language").html("花语：" + currentCharaData.flower_language);
    $("#detail_chara_introduction").html(currentCharaData.introduction);

    $("#detail_chara_name").html(currentCharaData.name);

    $("#detail_chara_rarity").html(FKGBook.data.getRarityString(currentCharaData.rarity));
    $("#detail_chara_attribute").html(currentCharaData.attackAttribute);
    $("#detail_chara_country").html(currentCharaData.country);
    $("#detail_chara_move").html(currentCharaData.move);

    for (var index = 0; index < 3; index++) {
        $("#detail_chara_hp_" + index).html(currentCharaData.hp[2 - index]);
        $("#detail_chara_attack_" + index).html(currentCharaData.attack[2 - index]);
        $("#detail_chara_defense_" + index).html(currentCharaData.defense[2 - index]);
        $("#detail_chara_power_" + index).html(currentCharaData.power[2 - index]);
    }

    $("#detail_chara_skill_name").html(currentCharaData.skill.name);
    $("#detail_chara_skill_effect").html(currentCharaData.skill.effect);

    for (var index = 1; index <= 4; index++) {
        var ability = currentCharaData.ability[index - 1];
        var ability_description = ability.description;
        var ability_type = ability.type;

        //属性赋予(单)
        if (ability_type == 12) {
            if (ability_description.indexOf("斩") > 0) {
                ability_type += "1";
            } else if (ability_description.indexOf("打") > 0) {
                ability_type += "2";
            } else if (ability_description.indexOf("突") > 0) {
                ability_type += "3";
            } else if (ability_description.indexOf("魔") > 0) {
                ability_type += "4";
            } else {
                ability_type = "0";
            }
        }

        $("#detail_chara_ability_" + index + "_description").html(ability_description);
        $("#detail_chara_ability_" + index + "_img")
            .attr("src", "data:image/png;base64," + FKGBook.data.ability["type" + ability_type]);
    }

    var detail_chara_about_data = $("#detail_chara_about_data");
    detail_chara_about_data.empty();
    for (about of currentCharaData.abouts) {
        detail_chara_about_data.append("<dt style='text-indent:2em;'>" + about + "</dt>");
    }

    $(".selected_chara").removeClass("selected_chara");
    $(".detail_chara_icon_" + currentCharaData.id).addClass("selected_chara");
}

FKGBook.detail.updateVersionData = function(currentCharaData, charaGroupData) {
    var detail_chara_version_data = $("#detail_chara_version_data");
    detail_chara_version_data.empty();
    for (var index = 0, length = charaGroupData.group.length; index < length; index++) {
        var rawCharaGroupDataVersion = charaGroupData.group[index];

        var version = rawCharaGroupDataVersion.chara_version;
        if (version == "") version = "通常";
        detail_chara_version_data.append(
            "<dt><h3 style='margin:0px;margin-bottom:2px;'>" +
            FKGBook.data.getWikiUrlByCharaName(rawCharaGroupDataVersion.group[0].name, version) +
            "</h3></dt>"
        );

        var div_chara_icon_group = FKGBook.detail.createNewCharaIconGroup(rawCharaGroupDataVersion);
        if (index != length - 1) { //最后一个div_chara_icon_group没有margin-bottom
            div_chara_icon_group.css("margin-bottom", "5px");
        }
        detail_chara_version_data.append(div_chara_icon_group);
    }
}

FKGBook.detail.createNewCharaIconGroup = function(rawCharaGroupDataVersion) {
    var div_chara_icon_group = $("<dt></dt>");

    div_chara_icon_group.css({
        "display": "grid",
        "grid-template-columns": "repeat(4, 1fr)",
        "grid-template-rows": "55px"
    });
    for (charaData of rawCharaGroupDataVersion.group) {
        div_chara_icon_group.append(FKGBook.tool.append(
            $(
                "<div style='display:grid;width:100%;height:100%;' class='detail_chara_icon_" +
                charaData.id + "'></div>"
            ),
            FKGBook.detail.createNewCharaIcon(charaData)
        ));
    }

    return div_chara_icon_group;
}

FKGBook.detail.createNewCharaIcon = function(charaData) {
    var div_chara_icon = $("<img></img>");

    div_chara_icon.bind("click", function(event) {
        FKGBook.detail.updateCurrentCharaData(charaData);
        event.stopPropagation();
    });
    div_chara_icon.css({
        "display": "block",
        "padding": "0px",
        "margin": "auto",
        "cursor": "pointer"
    });
    div_chara_icon.attr("src", "icon/" + charaData.id + ".png");

    return div_chara_icon;
}
