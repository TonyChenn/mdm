/*
Preserved original comments:
//鏉╂柨娲栨い鍫曞劥閻愮懓鍤禍瀣╂
//鐠佸墽鐤嗘稉濠氼暯
// 閸ュ墽澧栭幊鎺戝鏉?
//娑撳顣介崚鍥ㄥ床
//閸ュ墽澧栨０鍕潔
//var src = _this.attr("src"); //閼惧嘲褰囪ぐ鎾冲閻愮懓鍤惃鍒mmon-img閸忓啰绀屾稉顓犳畱src鐏炵偞鈧?
//鐠佸墽鐤?bigImg閸忓啰绀岄惃鍓唕c鐏炵偞鈧?
/*閼惧嘲褰囪ぐ鎾冲閻愮懓鍤崶鍓у閻ㄥ嫮婀＄€圭偛銇囩亸蹇ョ礉楠炶埖妯夌粈鍝勮剨閸戝搫鐪伴崣濠傘亣閸?*\/
*/

var mdmPageReady = false;
var mdmThemeToggleBound = false;
var mdmNavigationDrawerBound = false;

function applyImageFallback(img) {
    if (!img || img.getAttribute('data-mdm-error-applied') === 'true') {
        return;
    }

    var fallbackUrl = img.getAttribute('data-mdm-error-src');
    if (!fallbackUrl) {
        return;
    }

    img.setAttribute('data-mdm-error-applied', 'true');
    img.classList.add('mdm-image-error');
    img.src = fallbackUrl;
}

document.addEventListener('error', function (event) {
    if (event.target && event.target.matches && event.target.matches('img[data-mdm-error-src]')) {
        applyImageFallback(event.target);
    }
}, true);

function bindThemeToggle() {
    var themeButton = document.getElementById('themeIconButton');
    if (!themeButton || mdmThemeToggleBound) {
        return;
    }

    mdmThemeToggleBound = true;
    themeButton.removeAttribute('onclick');
    themeButton.addEventListener('click', function (event) {
        event.preventDefault();
        themeChange();
    });
}

function bindNavigationDrawer() {
    var drawer = document.getElementById('navigationDrawer');
    var drawerButton = document.getElementById('navigationDrawerButton');
    if (!drawer || !drawerButton || mdmNavigationDrawerBound) {
        return;
    }

    mdmNavigationDrawerBound = true;
    drawerButton.addEventListener('click', function () {
        drawer.open = true;
    });
}

function initColorScheme() {
    var color = document.documentElement.getAttribute('data-mdm-color') || '#6750A4';
    if (window.mdui && typeof window.mdui.setColorScheme === 'function') {
        window.mdui.setColorScheme(color);
    }
}

function initInfiniteScroll() {
    var postList = document.getElementById('recent-posts');
    var paginator = document.getElementById('paginator');
    if (!postList || !paginator || !('IntersectionObserver' in window) || typeof window.fetch !== 'function') {
        return;
    }

    var nextLink = paginator.querySelector('a.extend.next');
    if (!nextLink) {
        return;
    }

    var nextPageUrl = nextLink.href;
    var isLoading = false;
    var currentPage = paginator.querySelector('.page-number.current');
    var loadedPage = currentPage ? parseInt(currentPage.textContent, 10) || 1 : 1;
    var status = document.createElement('div');
    status.className = 'infinite-scroll-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    postList.after(status);
    paginator.hidden = true;

    function setStatus(state, message) {
        status.className = 'infinite-scroll-status infinite-scroll-' + state;
        if (state === 'loading') {
            status.innerHTML = '<mdui-circular-progress></mdui-circular-progress><span>' + message + '</span>';
            return;
        }
        if (state === 'finished') {
            status.innerHTML = '<span class="material-symbols-rounded">check_circle</span><span>' + message + '</span>';
            return;
        }
        if (state === 'error') {
            status.innerHTML = '<span class="material-symbols-rounded">error_outline</span><span>' + message + '</span><mdui-button variant="text">重新加载</mdui-button>';
            status.querySelector('mdui-button').addEventListener('click', loadNextPage);
            return;
        }
        status.textContent = message;
    }

    async function loadNextPage() {
        if (isLoading || !nextPageUrl) {
            return;
        }

        isLoading = true;
        setStatus('loading', '正在加载下一页…');

        try {
            var response = await window.fetch(nextPageUrl, {
                credentials: 'same-origin',
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            });
            if (!response.ok) {
                throw new Error('Request failed: ' + response.status);
            }

            var html = await response.text();
            var nextDocument = new DOMParser().parseFromString(html, 'text/html');
            var nextPostList = nextDocument.getElementById('recent-posts');
            var nextCards = nextPostList ? nextPostList.querySelectorAll('mdui-card.post-card') : [];
            if (!nextCards.length) {
                throw new Error('No posts found');
            }

            var fragment = document.createDocumentFragment();
            for (var i = 0; i < nextCards.length; i++) {
                fragment.appendChild(document.importNode(nextCards[i], true));
            }
            postList.appendChild(fragment);
            loadedPage++;
            status.setAttribute('data-loaded-page', loadedPage);

            var followingLink = nextDocument.querySelector('#paginator a.extend.next');
            nextPageUrl = followingLink ? new URL(followingLink.getAttribute('href'), nextPageUrl).href : '';

            if (nextPageUrl) {
                setStatus('idle', '继续向下滚动加载更多');
            } else {
                observer.disconnect();
                setStatus('finished', '已经到底了');
            }
        } catch (error) {
            setStatus('error', '加载失败，请重试');
        } finally {
            isLoading = false;
        }
    }

    var observer = new IntersectionObserver(function (entries) {
        if (entries[0] && entries[0].isIntersecting) {
            loadNextPage();
        }
    }, {
        rootMargin: '800px 0px'
    });

    setStatus('idle', '继续向下滚动加载更多');
    observer.observe(status);
}

function handleScrollState() {
    var isVisible = document.body.scrollTop > 200 || document.documentElement.scrollTop > 200;
    var goTopFab = document.querySelector('.go-top-fab');
    var sidebar = document.getElementById('sidebar');

    if (goTopFab) {
        goTopFab.classList.toggle('go-top-visible', isVisible);
    }

    if (sidebar) {
        sidebar.classList.toggle('fixPosition', isVisible);
    }
}

function handlePageReady() {
    if (mdmPageReady) {
        return;
    }

    mdmPageReady = true;
    window.addEventListener('scroll', handleScrollState);
    handleScrollState();

    var goTopFab = document.querySelector('.go-top-fab');
    if (goTopFab) {
        goTopFab.addEventListener('click', function () {
            goTopFab.classList.remove('go-top-visible');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        });
    }

    initColorScheme();
    initTheme();
    bindNavigationDrawer();
    initInfiniteScroll();
}

function themeChange() {
    var isDark = document.documentElement.classList.contains('mdui-theme-dark');
    var nextTheme = isDark ? 'light' : 'dark';
    var html = document.documentElement;
    var themeButton = document.getElementById('themeIconButton');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (themeButton) {
        var buttonRect = themeButton.getBoundingClientRect();
        html.style.setProperty('--mdm-theme-x', buttonRect.left + buttonRect.width / 2 + 'px');
        html.style.setProperty('--mdm-theme-y', buttonRect.top + buttonRect.height / 2 + 'px');
    }

    if (!reduceMotion && typeof document.startViewTransition === 'function') {
        html.classList.add('mdm-theme-view-transition');
        var transition = document.startViewTransition(function () {
            applyTheme(nextTheme);
        });
        transition.finished.finally(function () {
            html.classList.remove('mdm-theme-view-transition');
        });
        return;
    }

    if (!reduceMotion) {
        html.classList.add('mdm-theme-transitioning');
        window.requestAnimationFrame(function () {
            applyTheme(nextTheme);
            window.setTimeout(function () {
                html.classList.remove('mdm-theme-transitioning');
            }, 420);
        });
        return;
    }

    applyTheme(nextTheme);
}

function initTheme() {
    var theme = getStoredTheme();
    applyTheme(theme);
    bindThemeToggle();
}

function getStoredTheme() {
    try {
        var storedTheme = window.localStorage.getItem('mdm-theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
            return storedTheme;
        }
    } catch (error) {
        // localStorage 不可用时继续读取旧版 Cookie
    }

    var dayFlag = getCookie('IsDayTime');
    if (dayFlag === 'false') {
        return 'dark';
    }
    if (dayFlag === 'true') {
        return 'light';
    }
    return 'light';
}

function setCookie(key, value) {
    var date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 3600 * 1000);
    document.cookie = key + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
}

function getCookie(name) {
    var _name = name + '=';
    var list = document.cookie.split(';');
    for (var i = 0; i < list.length; i++) {
        var item = list[i].trim();
        if (item.indexOf(_name) === 0) {
            return item.substring(_name.length, item.length);
        }
    }
    return '';
}

function applyTheme(theme) {
    var html = document.documentElement;
    var themeButton = document.getElementById('themeIconButton');
    var themeTooltip = document.getElementById('themeTooltip');
    var normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    var nextThemeLabel = normalizedTheme === 'dark' ? '切换到浅色主题' : '切换到深色主题';

    if (window.mdui && typeof window.mdui.setTheme === 'function') {
        window.mdui.setTheme(normalizedTheme);
    } else {
        html.classList.remove('mdui-theme-light', 'mdui-theme-dark', 'mdui-theme-auto');
        html.classList.add('mdui-theme-' + normalizedTheme);
    }

    setCookie('IsDayTime', normalizedTheme === 'light' ? 'true' : 'false');
    try {
        window.localStorage.setItem('mdm-theme', normalizedTheme);
    } catch (error) {
        // localStorage 不可用时 Cookie 仍可保持主题偏好
    }

    if (themeButton) {
        themeButton.icon = normalizedTheme === 'dark' ? 'light_mode' : 'dark_mode';
        themeButton.setAttribute('aria-label', nextThemeLabel);
    }
    if (themeTooltip) {
        themeTooltip.content = nextThemeLabel;
    }
}

window.themeChange = themeChange;
window.applyTheme = applyTheme;
window.initTheme = initTheme;

applyTheme(getStoredTheme());

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        handlePageReady();
    });
} else {
    initTheme();
    handlePageReady();
}

window.addEventListener('load', handlePageReady);

function createImgPrevious() {
    var imgs = document.querySelectorAll('.article-info img:not(.noclick)');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].classList.add('previewable-image');
        imgs[i].onclick = function (e) {
            var src = e.currentTarget.currentSrc || e.currentTarget.src;
            createCover(src);
        };
    }

    function createCover(src) {
        var oldDialog = document.getElementById('imagePreviewDialog');
        if (oldDialog) {
            oldDialog.remove();
        }

        var dialog = document.createElement('div');
        dialog.id = 'imagePreviewDialog';
        dialog.className = 'image-preview-dialog';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-label', '图片预览');
        dialog.innerHTML = '<div class="image-preview-panel">' +
            '<mdui-button-icon class="image-preview-close" icon="close" aria-label="关闭图片预览"></mdui-button-icon>' +
            '<img class="image-preview-content noclick" alt="图片预览"></div>';
        document.body.appendChild(dialog);

        var closeButton = dialog.querySelector('.image-preview-close');
        closeButton.addEventListener('click', function () {
            dialog.remove();
        });
        dialog.addEventListener('click', function (event) {
            if (event.target === dialog) {
                dialog.remove();
            }
        });
        imgShow(dialog, dialog.querySelector('img'), src);
    }
}

function imgShow(dialog, image, src) {
    image.src = src;
}

setTimeout(function () {
    createImgPrevious();
}, 1000);
