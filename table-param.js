var tableColumnNameIndex = 0;
var tableColumnValueIndex = 1;
var tableColumnInformationList = [
    ["No", null],
    ["icon", function(json) {
        var image_id = json["id"];
        if (json["oeb"] == 3 && json["kariBloom"]) {
            image_id = image_id - 300000 + 1;
        }
        return "<img src='icon/" + image_id + ".png'></img>";
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
        var attackAttributeNumber = json["attackAttribute"];
        for (var key in attackAttributeEnum) {
            if (attackAttributeEnum.hasOwnProperty(key)) {
                if (attackAttributeEnum[key] == attackAttributeNumber) {
                    return key;
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
        var countryNumber = json["country"];
        for (var key in countryEnum) {
            if (countryEnum.hasOwnProperty(key)) {
                if (countryEnum[key] == countryNumber) {
                    return key;
                }
            }
        }
        return "";
    }],
    ["版本", function(json) {
        return json["version"];
    }],
    ["图鉴编号", function(json) {
        return json["bid"];
    }],
    ["开花编号", function(json) {
        var bloomNumber = json["bloomNumber"];
        return bloomNumber == 0 ? "" : bloomNumber;
    }]
];

//好感度
var favorValue = 0;
var favorEnum = {
    "200%": 0,
    "100%": 1,
    "000%": 2
};

function addFavorPart(parentDiv) { //添加 好感度 选择器
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
        parentDiv.append(favorLabel);
    });

    return parentDiv;
}

function addOebPart(parentDiv) { //添加 oeb筛选器
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
        parentDiv.append(oebLabel);
    });

    return parentDiv;
}

function addFilterPart(parentDiv) {
    function createNewFilterSelect(name, infoEnum, valueGetter, valueSetter) {
        var select = $("<select name='" + name + "'></select>");

        var label = $("<label style='margin-right: 10px;'></label>");
        label.append(name + " : ");
        label.append(select);
        parentDiv.append(label);

        $.each(infoEnum, function(key, value) {
            select.append($("<option value='" + value + "'>" + key + "</option>"));
        });

        select.bind("change", function() {
            var value = parseInt($(this).val());
            if (value == valueGetter()) {
                //重复点击,不做任何事
            } else {
                valueSetter(value);
                loadData();
            }
        });

        return select;
    }

    createNewFilterSelect("稀有度", rarityEnum, function() {
        return rarityValue;
    }, function(value) {
        rarityValue = value;
    });

    createNewFilterSelect("属性", attackAttributeEnum, function() {
        return attackAttributeValue;
    }, function(value) {
        attackAttributeValue = value;
    });

    createNewFilterSelect("国家", countryEnum, function() {
        return countryValue;
    }, function(value) {
        countryValue = value;
    });

    createNewFilterSelect("技能", skillTypeEnum, function() {
        return skillTypeValue;
    }, function(value) {
        skillTypeValue = value;
    });

    return parentDiv;
}
