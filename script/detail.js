FKGBook.detail.init = function() {
    $("#div_detail").click(function(event) {
        event.stopPropagation();
    });
    $("#container_detail").click(function(event) {
        $("#container_detail").fadeOut(200);
    });

    var toggleVersionUpdate = function() {
        $("#detail_chara_version_container").toggle();
        $("#detail_chara_update_container").toggle();
    }
    $("#detail_chara_version_title").click(toggleVersionUpdate);
    $("#detail_chara_update_title").click(toggleVersionUpdate);

    FKGBook.detail.update.init();
}

FKGBook.detail.show = function(currentCharaData) {
    if (currentCharaData) {
        FKGBook.detail.updateCurrentCharaData(currentCharaData);
        $("#div_detail_1").show();
        $("#div_detail_2").show();
    } else {
        $("#div_detail_1").hide();
        $("#div_detail_2").hide();
    }

    $("#container_detail").fadeIn(200);
}

FKGBook.detail.showVersion = function(currentCharaData, charaGroupData) {
    FKGBook.detail.version.update(currentCharaData, charaGroupData);
    $("#detail_chara_version_container").show();
    $("#detail_chara_update_container").hide();
    FKGBook.detail.show(currentCharaData);
}

FKGBook.detail.showUpdate = function() {
    FKGBook.detail.update.update();
    $("#detail_chara_version_container").hide();
    $("#detail_chara_update_container").show();
    FKGBook.detail.show();
}

FKGBook.detail.updateCurrentCharaData = function(currentCharaData) {
    var detail_chara_image_stand_s = $("#detail_chara_image_stand_s"); {
        detail_chara_image_stand_s.attr("src", "stand_s/" + currentCharaData.image_id + ".png");
        detail_chara_image_stand_s.parent().attr("href", "stand/" + currentCharaData.image_id + ".png");
    }
    $("#detail_chara_flower_language").html("花语：" + currentCharaData.flowerLanguage);
    $("#detail_chara_introduction").html(currentCharaData.introduction);

    $("#detail_chara_name").html(currentCharaData.name);

    $("#detail_chara_rarity").html(FKGBook.data.getRarityString(currentCharaData.rarity));
    $("#detail_chara_attribute").html(currentCharaData.attackAttribute);
    $("#detail_chara_country").html(currentCharaData.country);
    $("#detail_chara_move").html(currentCharaData.move);

    for (var index = 0; index < 3; index++) {
        $("#detail_chara_hp_" + index).html(currentCharaData.hp[index]);
        $("#detail_chara_attack_" + index).html(currentCharaData.attack[index]);
        $("#detail_chara_defense_" + index).html(currentCharaData.defense[index]);
        $("#detail_chara_power_" + index).html(currentCharaData.power[index]);
    }

    $("#detail_chara_skill_name").html(currentCharaData.skill.name);
    $("#detail_chara_skill_effect").html(currentCharaData.skill.effect);

    for (var index = 1; index <= 4; index++) {
        var ability = currentCharaData.ability[index - 1];
        $("#detail_chara_ability_" + index + "_description").html(ability.description);
        $("#detail_chara_ability_" + index + "_img").attr("src", "data:image/png;base64," + FKGBook.data.ability["type" + ability.type_icon]);
    }

    $(".selected_chara").removeClass("selected_chara");
    $(".detail_chara_icon_" + currentCharaData.id).addClass("selected_chara");
}
