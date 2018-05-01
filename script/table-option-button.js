FKGBook.table.option.button.buttonInfoGroupArray = [ //
    {
        "parent": "div_option_1",
        "name": "eventChara",
        "type": "radio",
        "group": [{
            "value": "haveEventChara",
            "text": "活动角色(有)"
        }, null, {
            "value": "notEventChara",
            "text": "活动角色(无)"
        }, null, {
            "value": "onlyEventChara",
            "text": "活动角色(仅)"
        }]
    },
    {
        "parent": "div_option_1",
        "type": null
    },
    {
        "parent": "div_option_1",
        "name": "shortcut",
        "type": "button",
        "group": [{
            "value": "原始角色",
            "clickEventInfos": [{
                "target": "option_oeb",
                "value": false
            }, {
                "target": "option_oeb_normal_original",
                "value": true
            }]
        }, null, {
            "value": "进化角色",
            "clickEventInfos": [{
                "target": "option_oeb",
                "value": false
            }, {
                "target": "option_oeb_normal_evolution",
                "value": true
            }]
        }, null, {
            "value": "开花角色",
            "clickEventInfos": [{
                "target": "option_oeb",
                "value": false
            }, {
                "target": "option_oeb_normal_bloom",
                "value": true
            }]
        }, null, {
            "value": "升华角色",
            "clickEventInfos": [{
                "target": "option_oeb",
                "value": false
            }, {
                "target": "option_oeb_normal_sublimation",
                "value": true
            }]
        }, null, {
            "value": "所有角色",
            "clickEventInfos": [{
                "target": "option_oeb",
                "value": false
            }, {
                "target": "option_oeb_normal",
                "value": true
            }]
        }]
    },
    {
        "parent": "div_option_2",
        "name": "oeb",
        "type": "checkbox",
        "group": [{
            "class": ["option_oeb", "option_oeb_other", "option_oeb_other_notHaveBloom"],
            "value": "notHaveBloomChara",
            "text": "开花(未)",
            "clickEventInfos": [{
                "target": "option_oeb_other_mostLevel",
                "value": false
            }, {
                "target": "option_oeb_normal",
                "value": false
            }]
        }, null, {
            "class": ["option_oeb", "option_oeb_other", "option_oeb_other_mostLevel"],
            "value": "mostLevelChara",
            "text": "最高进化",
            "clickEventInfos": [{
                "target": "option_oeb_other_notHaveBloom",
                "value": false
            }, {
                "target": "option_oeb_normal",
                "value": false
            }]
        }]
    },
    {
        "parent": "div_option_2",
        "type": null
    },
    {
        "parent": "div_option_2",
        "name": "oeb",
        "type": "checkbox",
        "group": [{
            "class": ["option_oeb", "option_oeb_normal", "option_oeb_normal_original"],
            "value": "originalChara",
            "text": "原始",
            "clickEventInfos": [{
                "target": "option_oeb_other",
                "value": false
            }]
        }, null, {
            "class": ["option_oeb", "option_oeb_normal", "option_oeb_normal_evolution"],
            "value": "evolutionChara",
            "text": "进化",
            "clickEventInfos": [{
                "target": "option_oeb_other",
                "value": false
            }]
        }, null, {
            "class": ["option_oeb", "option_oeb_normal", "option_oeb_normal_bloom", "option_oeb_normal_kariBloom"],
            "value": "kariBloomChara",
            "text": "开花(假)",
            "clickEventInfos": [{
                "target": "option_oeb_other",
                "value": false
            }]
        }, null, {
            "class": ["option_oeb", "option_oeb_normal", "option_oeb_normal_bloom", "option_oeb_normal_notKariBloom"],
            "value": "notKariBloomChara",
            "text": "开花(真)",
            "clickEventInfos": [{
                "target": "option_oeb_other",
                "value": false
            }]
        }, null, {
            "class": ["option_oeb", "option_oeb_normal", "option_oeb_normal_sublimation", "option_oeb_normal_sublimationEvolution"],
            "value": "sublimationEvolutionChara",
            "text": "升华(进化)",
            "clickEventInfos": [{
                "target": "option_oeb_other",
                "value": false
            }]
        }, null, {
            "class": ["option_oeb", "option_oeb_normal", "option_oeb_normal_sublimation", "option_oeb_normal_sublimationBloom"],
            "value": "sublimationBloomChara",
            "text": "升华(开花)",
            "clickEventInfos": [{
                "target": "option_oeb_other",
                "value": false
            }]
        }]
    }
];

FKGBook.table.option.button.init = function() {
    var getClickEventFunction = clickEventInfos => {
        return () => {
            for (clickEventInfo of clickEventInfos ? clickEventInfos : []) {
                $("." + clickEventInfo.target).prop("checked", clickEventInfo.value);
            }
            FKGBook.table.refresh();
        };
    };
    for (buttonInfoGroup of FKGBook.table.option.button.buttonInfoGroupArray) {
        var parent = $("#" + buttonInfoGroup.parent);
        if (buttonInfoGroup.type == null) {
            parent.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            continue;
        }
        for (buttonInfo of buttonInfoGroup.group) {
            if (buttonInfo == null) {
                parent.append("&nbsp;&nbsp;");
                continue;
            }
            var input = $("<input style='opacity:0.4;margin:auto 0px;vertical-align:middle;'></input>"); {
                input.attr("name", buttonInfoGroup.name);
                input.attr("type", buttonInfoGroup.type);
                input.attr("value", buttonInfo.value);
                input.attr("id", buttonInfo.value);
                for (c of buttonInfo.class ? buttonInfo.class : []) input.addClass(c);
                input.bind("click", getClickEventFunction(buttonInfo.clickEventInfos));
            }
            parent.append(input);
            if (buttonInfo.text) {
                parent.append("<label for='" + buttonInfo.value + "'>" + buttonInfo.text + "</label>");
            }
        }
    }

    //默认选择
    $("#haveEventChara").prop("checked", true);
    $(".option_oeb_normal").prop("checked", true);
}

FKGBook.table.option.button.getFilter = function() {
    var isInputSelected = input => $("#" + input).prop("checked");
    var haveEventChara_checked = isInputSelected("haveEventChara");
    var notEventChara_checked = isInputSelected("notEventChara");
    var onlyEventChara_checked = isInputSelected("onlyEventChara");
    var notHaveBloomChara_checked = isInputSelected("notHaveBloomChara");
    var mostLevelChara_checked = isInputSelected("mostLevelChara");
    var originalChara_checked = isInputSelected("originalChara");
    var evolutionChara_checked = isInputSelected("evolutionChara");
    var kariBloomChara_checked = isInputSelected("kariBloomChara");
    var notKariBloomChara_checked = isInputSelected("notKariBloomChara");
    var sublimationEvolutionChara_checked = isInputSelected("sublimationEvolutionChara");
    var sublimationBloomChara_checked = isInputSelected("sublimationBloomChara");

    var filter_eventchara = tbody_tr => {
        return haveEventChara_checked ||
            (notEventChara_checked && tbody_tr.dataset.isEventChara == "false") ||
            (onlyEventChara_checked && tbody_tr.dataset.isEventChara == "true");
    }
    var filter_oeb = tbody_tr => {
        return (notHaveBloomChara_checked && tbody_tr.dataset.notHaveBloom == "true") ||
            (mostLevelChara_checked && tbody_tr.dataset.mostLevel == "true") ||
            (
                (originalChara_checked && tbody_tr.dataset.oeb == "1") ||
                (evolutionChara_checked && tbody_tr.dataset.oeb == "2") ||
                (kariBloomChara_checked && tbody_tr.dataset.oeb == "3" && tbody_tr.dataset.kariBloom == "true") ||
                (notKariBloomChara_checked && tbody_tr.dataset.oeb == "3" && tbody_tr.dataset.kariBloom == "false") ||
                (sublimationEvolutionChara_checked && tbody_tr.dataset.oeb == "99" && tbody_tr.dataset.bloomChara == "false") ||
                (sublimationBloomChara_checked && tbody_tr.dataset.oeb == "99" && tbody_tr.dataset.bloomChara == "true")
            )
    }

    return tbody_tr => filter_eventchara(tbody_tr) && filter_oeb(tbody_tr);
}
