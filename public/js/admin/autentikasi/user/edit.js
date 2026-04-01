$(document).ready(function () {
    const getLevelUrl = $("#userForm").data("url-getlevel");
    const getSelectLevelId = $("#userForm").data("select-id");
    const getSelectLevelText = $("#userForm").data("select-text");
    $("#selectedLevel").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Status Autentikasi",
        ajax: {
            url: getLevelUrl,
            dataType: "json",
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // Search term
                };
            },
            processResults: function (data) {
                return {
                    results: data.items.map(function (item) {
                        return {
                            id: item.id_level,
                            text: `${item.namalevel}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    var levelId = getSelectLevelId;
    var levelName = getSelectLevelText;
    if (levelId) {
        var newOption = new Option(levelName, levelId, true, true);
        $("#selectedLevel").append(newOption).trigger("change");
    }
});
