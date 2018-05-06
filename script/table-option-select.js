FKGBook.table.option.select.selectInfoGroupArray = [{
    "name": "稀有度",
    "items": [{
        "text": "★2",
        "value": "2"
    }, {
        "text": "★3",
        "value": "3"
    }, {
        "text": "★4",
        "value": "4"
    }, {
        "text": "★5",
        "value": "5"
    }, {
        "text": "★6",
        "value": "6"
    }]
}, null, {
    "name": "属性",
    "items": [{
        "text": "斩",
        "value": "斩"
    }, {
        "text": "打",
        "value": "打"
    }, {
        "text": "突",
        "value": "突"
    }, {
        "text": "魔",
        "value": "魔"
    }]
}, null, {
    "name": "国家",
    "items": [{
        "text": "ウィンターローズ",
        "value": "ウィンターローズ"
    }, {
        "text": "バナナオーシャン",
        "value": "バナナオーシャン"
    }, {
        "text": "ブロッサムヒル",
        "value": "ブロッサムヒル"
    }, {
        "text": "ベルガモットバレー",
        "value": "ベルガモットバレー"
    }, {
        "text": "リリィウッド",
        "value": "リリィウッド"
    }, {
        "text": "ロータスレイク",
        "value": "ロータスレイク"
    }]
}, null, {
    "name": "能力",
    "items": [{
        'text': '降攻',
        'value': '32'
    }, {
        'text': '敌攻击无效',
        'value': '20'
    }, {
        'text': '暴击率上升or暴击伤害增加',
        'value': '15'
    }, {
        'text': '防御上升-受到伤害下降-3扛',
        'value': '18'
    }, {
        'text': '属性赋予(单)',
        'value': '12'
    }, {
        'text': '属性赋予(多)',
        'value': '37'
    }, {
        'text': '技能发动率(1)',
        'value': '13'
    }, {
        'text': '技能发动率(2)',
        'value': '14'
    }, {
        'text': '伤害增加',
        'value': '10'
    }, {
        'text': '伤害增加(BOSS)',
        'value': '11'
    }, {
        'text': '回复(一定条件)',
        'value': '22'
    }, {
        'text': '再动',
        'value': '16'
    }, {
        'text': '再动(第一回合)',
        'value': '17'
    }, {
        'text': '几率反击',
        'value': '21'
    }, {
        'text': '几率回避',
        'value': '19'
    }, {
        'text': '攻击力上升',
        'value': '1'
    }, {
        'text': '攻击力上升(回合数)',
        'value': '38'
    }, {
        'text': '攻击力上升(BOSS战)',
        'value': '9'
    }, {
        'text': '攻击力上升(战斗开始时的敌数)',
        'value': '7'
    }, {
        'text': '攻击力上升(技能等级)',
        'value': '6'
    }, {
        'text': '攻击力上升(移动力)',
        'value': '4'
    }, {
        'text': '攻击力上升(第一回合)',
        'value': '2'
    }, {
        'text': '攻击力上升(队友技能发动)',
        'value': '8'
    }, {
        'text': '攻击力上升(阳光炮)',
        'value': '3'
    }, {
        'text': '放置[1.1技能发动率-HP回复]点',
        'value': '29'
    }, {
        'text': '放置回复点',
        'value': '27'
    }, {
        'text': '放置阳光点',
        'value': '28'
    }, {
        'text': '敌技能发动率降低',
        'value': '34'
    }, {
        'text': '敌攻击几率MISS',
        'value': '33'
    }, {
        'text': '移动力增加',
        'value': '24'
    }, {
        'text': '移动力不受增减',
        'value': '26'
    }, {
        'text': '阳光炮能量上升',
        'value': '23'
    }, {
        'text': '加农炮的攻击数量加一',
        'value': '35'
    }, {
        'text': '回复点效果倍增',
        'value': '30'
    }, {
        'text': '地图上的害虫相关',
        'value': '31'
    }]
}, null];

FKGBook.table.option.select.init = function() {
    var parent = $("#div_option_3");

    for (selectInfoGroup of FKGBook.table.option.select.selectInfoGroupArray) {
        if (selectInfoGroup == null) {
            parent.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            continue;
        }

        var select = $("<select name='" + selectInfoGroup.name + "'></select>"); {
            select.bind("change", () => FKGBook.table.refresh());
            select.css({
                "outline": "none",
                "min-width": "50px",
                "color": "#aaaaaaaa",
                "background-color": "#00000000",
                "border": "1px solid #88888844"
            });
            select.append("<option style='background-color:#000000bb;' value='null'>无</option>");
            for (item of selectInfoGroup.items) {
                select.append("<option style='background-color:#000000bb;' " +
                    "value='" + item.value + "'>" + item.text + "</option>");
            }
        }

        parent.append(selectInfoGroup.name + ":&nbsp;");
        parent.append(select);
    }

    //重置按钮
    var button_reset = $("<button style='opacity:0.4;' id='button_reset'>重置</button>");
    button_reset.bind("click", () => {
        for (selectInfoGroup of FKGBook.table.option.select.selectInfoGroupArray) {
            if (selectInfoGroup == null) continue;
            $("select[name='" + selectInfoGroup.name + "']").val("null");
        }
        FKGBook.table.refresh();
    });
    parent.append(button_reset);
}

FKGBook.table.option.select.getFilter = function() {
    var rarity_value = $("select[name='稀有度']").val();
    var attackAttribute_value = $("select[name='属性']").val();
    var country_value = $("select[name='国家']").val();
    var ability_value = $("select[name='能力']").val();

    return tbody_tr => {
        if (rarity_value != "null" && rarity_value != tbody_tr.dataset.rarity) {
            return false;
        }

        if (attackAttribute_value != "null" && attackAttribute_value != tbody_tr.dataset.attackAttribute) {
            return false;
        }

        if (country_value != "null" && country_value != tbody_tr.dataset.country) {
            return false;
        }

        if (ability_value == "null") {
            return true;
        } else {
            for (var index = 1; index <= 4; index++) {
                if (ability_value == tbody_tr.dataset["ability" + index]) {
                    return true;
                }
            }
            return false;
        }
    };
}
