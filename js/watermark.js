// ============================================
// WATERMARK — builds a tiled "Quý Tiên Nguyễn" SVG and
// exposes it to CSS via the --wm-bg custom property.
// Using JS + encodeURIComponent guarantees correct UTF-8
// encoding for the Vietnamese diacritics in a data URI.
// ============================================
(function () {
    'use strict';

    var name = 'Quý Tiên Nguyễn';

    // One repeating tile (300x200) with the name rotated -30°.
    // White fill for dark images + a faint dark stroke so it
    // stays legible on light images too.
    var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">' +
            '<text x="150" y="100" text-anchor="middle" dominant-baseline="central" ' +
                'transform="rotate(-30 150 100)" ' +
                'font-family="Inter, Arial, sans-serif" font-size="18" font-weight="700" ' +
                'fill="#ffffff" fill-opacity="0.85" ' +
                'stroke="#000000" stroke-opacity="0.32" stroke-width="0.7">' +
                name +
            '</text>' +
        '</svg>';

    var url = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
    document.documentElement.style.setProperty('--wm-bg', url);
})();
