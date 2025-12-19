// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.




$(function () {

    const api = "AIzaSyDOdaQNwhsrHKTxA1ZArC2AsCZeP_3mRVA";
    const cx = "45aaadabb52d048e0";

    let backgrndIndex = 0;
    let startIndex = 1;
    let lastQuery = "";


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



    async function runSearch(append = false) {
        

        const query = $("#query").val().trim();
        if (!query) return;


        if (!append || query !== lastQuery) {
            lastQuery = query;
            startIndex = 1;
            $("#searchResults").empty();
        }

        const url = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(api)}&cx=${encodeURIComponent(cx)}&q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) return;

            const data = await response.json();
            const items = data.items || [];
            const $results = $("#searchResults");

            // append results (don't clear here)
            items.forEach(item => {
                const title = item.title || "(no title)";
                const link = item.link || "#";
                const snippet = item.snippet || "";
                const displayLink = item.displayLink || "";

                $results.append(`
              <div class="result">
                <a class="title" href="${link}" target="_blank" rel="noopener">${title}</a>
                <div class="link">${displayLink}</div>
                <div class="snippet">${snippet}</div>
              </div>
            `);
            });

            $results.css("visibility", "visible");

            
            if (items.length === 10) $("#bttnMore").show();
            else $("#bttnMore").hide();

            
            startIndex += 10;
        } catch {
            $("#bttnMore").hide();
        }
    }

    async function runLucky() {
        const query = $("#query").val().trim();
        if (!query) return;

        const url = `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(api)}&cx=${encodeURIComponent(cx)}&q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                window.open(data.items[0].link, "_blank", "noopener");

            } else {
                alert("No results found.");
            }
        } catch (err) {
            console.error(err);
            alert("Lucky search failed.");
        }
    }

    $("#bttnLucky").on("click", runLucky);
   
    $("#bttnSearch").on("click", runSearch);
    $("#bttnMore").on("click", () => runSearch(true));

    $("#query").on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            runSearch(false);
        }
    });

});
