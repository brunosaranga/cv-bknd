// ============================================================
//  CV page — screen-only enhancements.
//  None of this touches the PDF: the print stylesheet strips
//  the background and hides the button, so exports stay clean.
// ============================================================

(function () {
    "use strict";

    // ---- 1. Download-PDF button --------------------------------
    function addPrintButton() {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "print-btn";
        button.textContent = "Download PDF";
        button.addEventListener("click", function () {
            window.print();
        });
        document.body.appendChild(button);
    }

    // ---- 2. Time-aware ambient gutter gradient -----------------
    // JS decides the PALETTE from the viewer's local clock; CSS
    // handles the slow DRIFT and pauses it for reduced-motion.
    // Bright + warm at midday, muted at the edges, deep + cool
    // at night. Colours are interpolated between the anchors
    // below, so it shifts continuously through the day rather
    // than snapping between a few fixed looks.
    var ANCHORS = [
        { hour: 0,  stops: ["#171d33", "#241f3d", "#2b1c34"] }, // deep night
        { hour: 6,  stops: ["#f3c6a2", "#eab4c2", "#ccd4ef"] }, // dawn
        { hour: 12, stops: ["#ffde90", "#ffd4c0", "#b5dcff"] }, // bright midday
        { hour: 18, stops: ["#e5a05c", "#c87a6a", "#7c6da0"] }, // dusk
        { hour: 24, stops: ["#171d33", "#241f3d", "#2b1c34"] }  // wraps back to night
    ];

    function hexToRgb(hex) {
        var n = parseInt(hex.slice(1), 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function mix(fromHex, toHex, t) {
        var a = hexToRgb(fromHex);
        var b = hexToRgb(toHex);
        var r = Math.round(a[0] + (b[0] - a[0]) * t);
        var g = Math.round(a[1] + (b[1] - a[1]) * t);
        var bl = Math.round(a[2] + (b[2] - a[2]) * t);
        return "rgb(" + r + ", " + g + ", " + bl + ")";
    }

    function applyPalette() {
        var now = new Date();
        var hour = now.getHours() + now.getMinutes() / 60;

        // Find the two anchors this moment sits between.
        var i = 0;
        while (i < ANCHORS.length - 1 && hour >= ANCHORS[i + 1].hour) {
            i += 1;
        }
        var from = ANCHORS[i];
        var to = ANCHORS[i + 1];
        var t = (hour - from.hour) / (to.hour - from.hour);

        var root = document.documentElement;
        for (var s = 0; s < 3; s += 1) {
            root.style.setProperty("--g" + (s + 1), mix(from.stops[s], to.stops[s], t));
        }
    }

    function init() {
        addPrintButton();
        applyPalette();
        // Re-check every 5 min so a page left open drifts with the day.
        setInterval(applyPalette, 5 * 60 * 1000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
