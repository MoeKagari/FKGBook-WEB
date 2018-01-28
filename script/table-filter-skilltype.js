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
