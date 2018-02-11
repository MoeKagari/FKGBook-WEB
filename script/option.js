FKGBook.option.addFavorPart = function(parentDiv) { //添加 favor 选择器
    $.each(FKGBook.option.favor.enum, function(key, value) {
        var button = $("<input " + (value === FKGBook.option.favor.value ? "checked" : "") + ">");
        button.attr("type", "radio");
        button.attr("name", "favor");
        button.attr("value", value);
        button.bind("click", function() {
            if (this.value != FKGBook.option.favor.value) {
                FKGBook.option.favor.value = parseInt(this.value);
                FKGBook.table.loadData();
            }
        });

        var label = $("<label></label>");
        label.css("margin-right","10px");
        label.append(button);
        label.append(key);
        parentDiv.append(label);
    });

    return parentDiv;
}

FKGBook.option.addOebPart = function(parentDiv) { //添加 oeb筛选器
    $.each(FKGBook.option.oeb.enum, function(key, value) {
        var button = $("<input " + (value === FKGBook.option.oeb.value ? "checked" : "") + ">");
        button.attr("type", "radio");
        button.attr("name", "oeb");
        button.attr("value", value);
        button.bind("click", function() {
            if (this.value != FKGBook.option.oeb.value) {
                FKGBook.option.oeb.value = parseInt(this.value);
                FKGBook.table.loadData();
            }
        });

        var label = $("<label></label>");
        label.css("margin-right","10px");
        label.append(button);
        label.append(key);
        parentDiv.append(label);
    });

    return parentDiv;
};

FKGBook.option.addFilterPart = function(parentDiv) {
    function createNewFilterSelect(name, filterType) {
        var select = $("<select name='" + name + "'></select>");
        $.each(filterType.enum, function(key, value) {
            var selectItem = $("<option></option>");
            selectItem.attr("value",value);
            selectItem.html(key);
            select.append(selectItem);
        });
        select.bind("change", function() {
            var value = parseInt($(this).val());
            if (value != filterType.value) {
                filterType.value = value;
                FKGBook.table.loadData();
            }
        });

        var label = $("<label></label>");
        label.css("margin-right","20px");
        label.append(name + " : ");
        label.append(select);
        return label;
    }

    parentDiv.append(createNewFilterSelect("稀有度", FKGBook.option.rarity));
    parentDiv.append(createNewFilterSelect("属性", FKGBook.option.attackAttribute));
    parentDiv.append(createNewFilterSelect("国家", FKGBook.option.country));
    parentDiv.append(createNewFilterSelect("技能", FKGBook.option.skillType));

    return parentDiv;
};
