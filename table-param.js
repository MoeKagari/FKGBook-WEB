var tableColumnNameIndex = 0;
var tableColumnValueIndex = 1;
var tableColumnInformationList = [
  ["No", null],
  ["",function(json){
    return "<img src='icon/"+json["id"]+".png'></img>";
  }],
  ["id", function(json) {
    return json["id"];
  }],
  ["花名", function(json) {
    return json["name"];
  }],
  ["稀有度", function(json) {
    return "★★★★★★★★★★".substr(0, json["rarity"]);
  }],
  ["属性", function(json) {
    for (var variable in attackAttributeEnum) {
      if (attackAttributeEnum.hasOwnProperty(variable)) {
        if (attackAttributeEnum[variable] == json["attackAttribute"]) {
          return variable;
        }
      }
    }
    return "";
  }],
  ["移动力", function(json) {
    return json["move"];
  }],
  ["HP", function(json) {
    return json["hp"][favorValue];
  }],
  ["攻击", function(json) {
    return json["attack"][favorValue];
  }],
  ["防御", function(json) {
    return json["defense"][favorValue];
  }],
  ["综合力", function(json) {
    return json["hp"][favorValue] + json["attack"][favorValue] + json["defense"][favorValue];
  }],
  ["国家", function(json) {
    for (var variable in countryEnum) {
      if (countryEnum.hasOwnProperty(variable)) {
        if (countryEnum[variable] == json["country"]) {
          return variable;
        }
      }
    }
    return "";
  }],
  ["版本", function(json) {
    return json["version"];
  }]
];

//好感度
var favorValue = 0;
var favorEnum = {
  "200%": 0,
  "100%": 1,
  "000%": 2
};

function addFavorPart() { //添加 好感度 选择器
  var favorGroup = $("<div></div>");
  $("#option").append(favorGroup);
  $.each(favorEnum, function(key, value) {
    var favorButton = $("<input type='radio' name='favor' " + (value === favorValue ? "checked" : "") + " value='" + value + "'>");
    favorButton.bind("click", function() {
      if (this.value == favorValue) {
        //重复点击,不做任何事
      } else {
        favorValue = parseInt(this.value);
        loadData();
      }
    });

    var favorLabel = $("<label style='margin-right: 10px;'></label>");
    favorLabel.append(favorButton);
    favorLabel.append(key);
    favorGroup.append(favorLabel);
  });
}

var oebValue = 1;
var oebEnum = {
  "原始": 1,
  "进化": 2,
  "无开花": 13,
  "假开花": 4,
  "真开花": 5,
  "开花": 3,
  "最高进化": 11,
  "全部角色": 12
};

function addOebPart() { //添加 oeb筛选器
  var oebGroup = $("<div></div>");
  $("#option").append(oebGroup);
  $.each(oebEnum, function(key, value) {
    var oebButton = $("<input type='radio' name='oeb' " + (value === oebValue ? "checked" : "") + " value='" + value + "'>");
    oebButton.bind("click", function() {
      if (this.value == oebValue) {
        //重复点击,不做任何事
      } else {
        oebValue = parseInt(this.value);
        loadData();
      }
    });

    var oebLabel = $("<label style='margin-right: 10px;'></label>");
    oebLabel.append(oebButton);
    oebLabel.append(key);
    oebGroup.append(oebLabel);
  });
}

function oebFilter(data) {
  var oeb = data["oeb"];
  var kariBloom = data["kariBloom"];
  var hasBloom = data["hasBloom"];
  switch (oebValue) {
    case 1:
    case 2:
    case 3:
      return oeb == oebValue;
    case 4:
      return oeb == 3 && kariBloom;
    case 5:
      return oeb == 3 && !kariBloom;

    case 12:
      return true;
    case 11:
      switch (oeb) {
        case 1:
          return false;
        case 2:
          return !hasBloom;
        case 3:
          return true;
      }
      break;
    case 13:
      switch (oeb) {
        case 1:
          return false;
        case 2:
          return !hasBloom;
        case 3:
          return false;
      }
      break;
  }
  return false;
}

function addFilterPart(parentDiv) {
  function createNewLabel(name, select) {
    var label = $("<label style='margin-right: 10px;'></label>");
    label.append(name + " : ");
    label.append(select);
    return label;
  }

  var raritySelect = $("<select name='稀有度'></select>");
  parentDiv.append(createNewLabel("稀有度", raritySelect));
  $.each(rarityEnum, function(key, value) {
    raritySelect.append($("<option value='" + value + "'>" + key + "</option>"));
  });
  raritySelect.bind("change", function() {
    var value = parseInt($(this).val());
    console.log(rarityValue);
    if (value == rarityValue) {
      //重复点击,不做任何事
    } else {
      rarityValue = value;
      loadData();
    }
    console.log(rarityValue);
  });

  var attackAttributeSelect = $("<select name='属性'></select>");
  parentDiv.append(createNewLabel("属性", attackAttributeSelect));
  $.each(attackAttributeEnum, function(key, value) {
    attackAttributeSelect.append($("<option value='" + value + "'>" + key + "</option>"));
  });
  attackAttributeSelect.bind("change", function() {
    var value = parseInt($(this).val());
    console.log(attackAttributeValue);
    if (value == attackAttributeValue) {
      //重复点击,不做任何事
    } else {
      attackAttributeValue = value;
      loadData();
    }
    console.log(attackAttributeValue);
  });

  var countrySelect = $("<select name='国家'></select>");
  parentDiv.append(createNewLabel("国家", countrySelect));
  $.each(countryEnum, function(key, value) {
    countrySelect.append($("<option value='" + value + "'>" + key + "</option>"));
  });
  countrySelect.bind("change", function() {
    var value = parseInt($(this).val());
    console.log(countryValue);
    if (value == countryValue) {
      //重复点击,不做任何事
    } else {
      countryValue = value;
      loadData();
    }
    console.log(countryValue);
  });

  var skillTypeSelect = $("<select name='技能'></select>");
  parentDiv.append(createNewLabel("技能", skillTypeSelect));
  $.each(skillTypeEnum, function(key, value) {
    skillTypeSelect.append($("<option value='" + value + "'>" + key + "</option>"));
  });
  skillTypeSelect.bind("change", function() {
    var value = parseInt($(this).val());
    console.log(skillTypeValue);
    if (value == skillTypeValue) {
      //重复点击,不做任何事
    } else {
      skillTypeValue = value;
      loadData();
    }
    console.log(skillTypeValue);
  });

  return parentDiv;
}

var rarityValue = 0;
var rarityEnum = {
  "无": 0,
  "星2": 2,
  "星3": 3,
  "星4": 4,
  "星5": 5,
  "星6": 6
};

function rarityFilter(data) {
  return rarityValue == 0 || rarityValue == data["rarity"];
}

var attackAttributeValue = 0;
var attackAttributeEnum = {
  "无": 0,
  "斩": 1,
  "打": 2,
  "突": 3,
  "魔": 4
};

function attackAttributeFilter(data) {
  return attackAttributeValue == 0 || attackAttributeValue == data["attackAttribute"];
}

var countryValue = 0;
var countryEnum = {
  "无": 0,
  "ウィンターローズ": 1,
  "バナナオーシャン": 2,
  "ブロッサムヒル": 3,
  "ベルガモットバレー": 4,
  "リリィウッド": 5,
  "ロータスレイク": 7
};

function countryFilter(data) {
  return countryValue == 0 || countryValue == data["country"];
}

var skillTypeValue = 0;
var skillTypeEnum = {
  "无": 0,
  "伤害增加-对BOSS": 11,
  "再动": 16,
  "再动(第一回合)": 17,
  "几率反击": 21,
  "几率回避": 19,
  "加农炮的攻击数量加一": 35,
  "回复点效果倍增": 30,
  "地图上的害虫相关": 31,
  "属性赋予": 12,
  "属性赋予-三种属性-每种属性2人": 37,
  "技能发动率(乘算系)": 13,
  "技能发动率(加算系)": 14,
  "攻击力上升": 1,
  "攻击力上升(30%*回合数)": 38,
  "攻击力上升(BOSS战)": 9,
  "攻击力上升(战斗开始时的敌数)": 7,
  "攻击力上升(技能等级)": 6,
  "攻击力上升(现在HP)": 10,
  "攻击力上升(移动力)": 4,
  "攻击力上升(第一回合)": 2,
  "攻击力上升(队友技能发动)": 8,
  "攻击力上升(阳光炮)": 3,
  "放置[1.1技能发动率]点": 29,
  "放置回复点": 27,
  "放置阳光点": 28,
  "敌技能发动率降低": 34,
  "敌攻击几率MISS": 33,
  "敌攻击无效": 20,
  "暴击率上升or暴击伤害增加": 15,
  "移动力不受增减": 26,
  "移动力增加": 24,
  "阳光炮能量上升": 23,
  "降攻": 32
}

function skillTypeFilter(data) {
  if (skillTypeValue == 0) return true;
  var ability = data["ability"];
  for (var index = 0; index < ability.length; index++) {
    var skillType = ability[index][0];
    if (skillType != 0 && skillType == skillTypeValue) {
      return true;
    }
  }
  return false;
}
