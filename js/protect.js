// ============================================
// MEDIA PROTECTION — deter casual image/video copying
// --------------------------------------------
// NOTE: Client-side protection can only DETER copying.
// It cannot fully prevent a determined technical user,
// because any image/video shown on a web page is always
// downloaded by the browser to be displayed. The only real
// protection is watermarking and serving low-resolution files.
// ============================================
(function () {
    'use strict';

    // 1) Block the right-click context menu (stops "Save image as…").
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, { capture: true });

    // 2) Block dragging images / videos out to the desktop or another tab.
    document.addEventListener('dragstart', function (e) {
        var t = e.target;
        if (t && (t.tagName === 'IMG' || t.tagName === 'VIDEO' || t.tagName === 'PICTURE' || t.tagName === 'SOURCE')) {
            e.preventDefault();
        }
    }, { capture: true });

    // 3) Discourage common save / view-source / DevTools shortcuts.
    //    (Light deterrent only — easily bypassed.)
    document.addEventListener('keydown', function (e) {
        var key = (e.key || '').toLowerCase();
        var ctrl = e.ctrlKey || e.metaKey;

        if (
            key === 'f12' ||                                                 // DevTools
            (ctrl && key === 's') ||                                         // Save page
            (ctrl && key === 'u') ||                                         // View source
            (ctrl && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) // DevTools
        ) {
            e.preventDefault();
        }
    });

    // 4) Harden individual media elements (also covers ones added later by JS).
    function hardenImg(img) {
        img.setAttribute('draggable', 'false');
        img.oncontextmenu = function () { return false; };
    }

    function hardenVideo(video) {
        video.setAttribute('draggable', 'false');
        video.setAttribute('controlsList', 'nodownload');
        video.setAttribute('disablePictureInPicture', '');
        video.oncontextmenu = function () { return false; };
    }

    function hardenNode(node) {
        if (!node || node.nodeType !== 1) return;
        if (node.tagName === 'IMG') hardenImg(node);
        else if (node.tagName === 'VIDEO') hardenVideo(node);
        if (node.querySelectorAll) {
            node.querySelectorAll('img').forEach(hardenImg);
            node.querySelectorAll('video').forEach(hardenVideo);
        }
    }

    function init() {
        hardenNode(document.body);

        // The project detail page builds its gallery dynamically,
        // so watch for media inserted after load and harden it too.
        if ('MutationObserver' in window) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (m) {
                    m.addedNodes.forEach(hardenNode);
                });
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
