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
