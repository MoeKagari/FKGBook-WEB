FKGBook.option.rarity = {};
FKGBook.option.rarity.value = 0;
FKGBook.option.rarity.enum = {
    "无": 0,
    "星2": 2,
    "星3": 3,
    "星4": 4,
    "星5": 5,
    "星6": 6
};
FKGBook.option.rarity.filter = function(data) {
    return this.value == 0 || this.value == data["rarity"];
}
