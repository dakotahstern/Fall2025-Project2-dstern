// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(function () {
    $("#bttnTime").on("click", function () {
        const now = new Date();
        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

        $("#time")
            .text(time)
            .css("visibility", "visible")
            .dialog({
                modal: true,
                title: "Current Time",
                buttons: {
                    Close: function () {
                        $(this).dialog("close");
                    }
                }
            });
    });
});
