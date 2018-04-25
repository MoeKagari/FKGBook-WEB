FKGBook.table.option.init = function() {
    FKGBook.table.option.button.init();
    FKGBook.table.option.select.init();
}

FKGBook.table.option.filter = function() {
    var button_filter = FKGBook.table.option.button.filter();
    var select_filter = FKGBook.table.option.select.filter();
    return tbody_tr => button_filter(tbody_tr) && select_filter(tbody_tr);
}
