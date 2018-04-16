FKGBook.table.option.buttonInfoGroupArray = [{
  "parent": "div_other_option",
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
}, {
  "parent": "div_other_option",
  "type": null
}, {
  "parent": "div_other_option",
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
}, {
  "parent": "div_oeb_option",
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
}, {
  "parent": "div_oeb_option",
  "type": null
}, {
  "parent": "div_oeb_option",
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
}];

FKGBook.table.option.init = function() {
  var getClickEventFunction = clickEventInfos => {
    return () => {
      for (clickEventInfo of clickEventInfos ? clickEventInfos : []) {
        $("." + clickEventInfo.target).prop("checked", clickEventInfo.value);
      }
      FKGBook.table.refresh();
    };
  };
  for (buttonInfoGroup of FKGBook.table.option.buttonInfoGroupArray) {
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

      var input = $("<input style='margin:auto 0px;vertical-align:middle;'></input>"); {
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

FKGBook.table.option.filter = function(tbody_tr) {
  var isInputSelected = input => $("#" + input).prop("checked");
  //haveEventChara 选中时 , 不做任何过滤
  if (isInputSelected("notEventChara") && tbody_tr.attr("isEventChara") == "true") {
    return false;
  }
  if (isInputSelected("onlyEventChara") && tbody_tr.attr("isEventChara") == "false") {
    return false;
  }

  if (isInputSelected("notHaveBloomChara") && tbody_tr.attr("notHaveBloom") == "true") {
    return true;
  }
  if (isInputSelected("mostLevelChara") && tbody_tr.attr("mostLevel") == "true") {
    return true;
  }

  if (
    (isInputSelected("originalChara") && tbody_tr.attr("oeb") == 1) ||
    (isInputSelected("evolutionChara") && tbody_tr.attr("oeb") == 2) ||
    (isInputSelected("kariBloomChara") && tbody_tr.attr("oeb") == 3 && tbody_tr.attr("kariBloom") == "true") ||
    (isInputSelected("notKariBloomChara") && tbody_tr.attr("oeb") == 3 && tbody_tr.attr("kariBloom") == "false") ||
    (isInputSelected("sublimationEvolutionChara") && tbody_tr.attr("oeb") == 99 && tbody_tr.attr("bloomChara") == "false") ||
    (isInputSelected("sublimationBloomChara") && tbody_tr.attr("oeb") == 99 && tbody_tr.attr("bloomChara") == "true")
  ) {
    return true;
  }

  return false;
}
