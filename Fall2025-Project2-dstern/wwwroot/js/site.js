// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(function () {

    let backgrndIndex = 0;

    const backgrounds = [
        "https://wallup.net/wp-content/uploads/2016/01/13156-threadless-humor-simple-minimalism-computer-basketball-coffee-simple_background.jpg", "https://wallpapers.com/images/featured/simple-desktop-background-irf9eel64ijrae3g.jpg", "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0xNDctbXludC03MF8xLmpwZw.jpg", "https://marketplace.canva.com/EAFSAsQmQeg/1/0/1600w/canva-orange-illustrated-cute-christmas-house-desktop-wallpaper-IscQ9unhXnA.jpg", "https://wallpapers.com/images/hd/simple-desktop-keyboard-keys-fzpfef8zvxj6jnt7.jpg"

    ];

    function applyBackground() {
        document.body.style.backgroundImage = `url("${backgrounds[backgrndIndex]}")`;
    }

    applyBackground();

    $("#title").on("click", function () {
        backgrndIndex = (backgrndIndex + 1) % backgrounds.length;
        applyBackground();
    });

    $("#bttnTime").on("click", function () {
        const now = new Date();
        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
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
