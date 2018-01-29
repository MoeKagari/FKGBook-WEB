FKGBook.option.country = {};
FKGBook.option.country.value = 0;
FKGBook.option.country.enum = {
    "无": 0,
    "ウィンターローズ": 1,
    "バナナオーシャン": 2,
    "ブロッサムヒル": 3,
    "ベルガモットバレー": 4,
    "リリィウッド": 5,
    "ロータスレイク": 7
};
FKGBook.option.country.filter = function(data) {
    return this.value == 0 || this.value == data["country"];
}
