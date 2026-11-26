// 向上滚动的时候显示header
// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function ($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function () {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});

// 低分辨率菜单变为层叠样式
// Drop Bootstarp low-performance Navbar
// Use customize navbar with high-quality material design animation
// in high-perf jank-free CSS3 implementation
jQuery(document).ready(function ($) {

    var $toggle = document.querySelector('.navbar-toggle');
    var $navbar = document.querySelector('#huxblog_navbar');
    var $collapse = document.querySelector('.navbar-collapse');

    if (!$toggle || !$navbar || !$collapse) return;

    $toggle.addEventListener('click', handleMagic);

    function handleMagic(e) {
        if ($navbar.classList.contains('in')) {
            // CLOSE
            $navbar.classList.remove('in');
            $toggle.setAttribute('aria-expanded', 'false');
            // wait until animation end.
            setTimeout(function () {
                // prevent frequently toggle
                if (!$navbar.classList.contains('in')) {
                    $collapse.style.height = "0px";
                }
            }, 400);
        } else {
            // OPEN
            $collapse.style.height = "auto";
            $navbar.classList.add('in');
            $toggle.setAttribute('aria-expanded', 'true');
        }
    }

});


// toc 目录生成
!function (a) {
    "use strict";
    a(function () {
        // 只在文章页（存在 TOC 容器）生成目录，避免在首页/归档页误处理标题
        var _$wrap = a('.bs-docs-sidenav');
        if (!_$wrap.length) return;

        // 生成二级菜单
        var $header = a('.post-container').find('h2,h3');
        var _tagLevel = 2;                  // 最初的level
        $header.each(function (index) {
            a(this).attr('id', 'articleHeader' + index);      // 加id
            var _tl = parseInt(a(this)[0].tagName.slice(1));  // 当前的tagLevel
            var _$li = null;

            if (index === 0 || _tl === _tagLevel) {  // 第一个或者是与上一个相同
                _$li = a('<li><a href="#articleHeader' + index + '">' + a(this).text() + '</a></li>');
                _$wrap.append(_$li);

            } else if (_tl > _tagLevel) {  // 当前的大于上次的
                _$li = a('<ul class="nav"><li><a href="#articleHeader' + index + '">' + a(this).text() + '</a></li></ul>');
                _$wrap.find('li').last().append(_$li);
                _$wrap = _$li;
            } else if (_tl < _tagLevel) {    // 当前的小于上次的
                _$li = a('<li><a href="#articleHeader' + index + '">' + a(this).text() + '</a></li>');
                // if(_tl === 1) {
                //     a('.bs-docs-sidenav').append(_$li);
                //     _$wrap = a('.bs-docs-sidenav');
                // } else {
                //     _$wrap.parent('ul').append(_$li);
                //     _$wrap = _$wrap.parent('ul');
                // }
                a('.bs-docs-sidenav').append(_$li);
                _$wrap = a('.bs-docs-sidenav');
            }

            _tagLevel = _tl;
        });

        var b = a(window), c = a(document.body);
        c.scrollspy({target: ".bs-docs-sidebar"});
        b.on("load", function () {
            c.scrollspy("refresh")
        });


        // 侧边栏改用 CSS position:sticky + 独立滚动（见 style.css），
        // 不再用 affix 固定，避免内容超高时 Tags 被裁掉无法滚动查看
        // 移除 affix 可能遗留的状态类与内联样式
        a(".bs-docs-sidebar").removeClass("affix affix-top affix-bottom").css({
            position: "",
            top: "",
            bottom: "",
            width: ""
        });

        setTimeout(function () {
            a(".bs-top").affix()
        }, 100);
    })
}(jQuery);


// sidebar 效果
jQuery(document).ready(function ($) {
    // categoryWidget 分类效果
    $('.categoryWidget .category').on('click', '.categoryName', function () {
        $('.categoryWidget .category span i').removeClass('fa-angle-double-down')
        $(this).prev().find('i').addClass('fa-angle-double-down');
    });

    // archiveWidget 分类效果
    $('.archiveWidget .archive').on('click', '.archiveName', function () {
        $('.archiveWidget .archive span i').removeClass('fa-angle-double-down')
        $(this).prev().find('i').addClass('fa-angle-double-down');
    });


    var pathname = window.location.pathname;
    pathname = pathname.substring(1, pathname.length - 1).split('/');

    // 如果你的网站没被放在子目录中 length=3 是二级 2是一级，如果放在了子目录中，那这里需要修改

    if (pathname[0] === 'categories') {
        // 根据网址显示活动的分类

        if (pathname.length === 3) {
            var category = pathname[2];
            var dom = $('.categoryWidget .collapse .categoryName[data-category="' + decodeURIComponent(category) + '"]');

            $(dom).addClass('active');
            var pdom = $(dom).parents('.collapse').addClass('in');
            pdom.prev('.category').find('span i').addClass('fa-angle-double-down');
        } else {
            var category = pathname[1];
            var dom = $('.categoryWidget .category .categoryName[data-category="' + decodeURIComponent(category) + '"]');
            $(dom).addClass('active');
            dom.parents('.category').next('.collapse').addClass('in');
            $(dom).find('i').addClass('fa-angle-double-down');
        }
    } else if (pathname[0] === 'archives') {
        // 根据网址显示活动的归档

        if (pathname.length === 3) {
            var year = pathname[1];
            var month = pathname[2];

            var dom = $('.archiveWidget .collapse .archiveName[data-archive="' + year + decodeURIComponent(month) + 'archive"]');

            $(dom).addClass('active');
            var pdom = $(dom).parents('.collapse').addClass('in');
            pdom.prev('.archive').find('span i').addClass('fa-angle-double-down');
        } else {
            var year = pathname[1];
            var dom = $('.archiveWidget .archive .archiveName[data-archive="' + decodeURIComponent(year) + 'archive"]');
            $(dom).addClass('active');
            dom.parents('.archive').next('.collapse').addClass('in');
            $(dom).find('i').addClass('fa-angle-double-down');
        }
    } else if(pathname[0] === 'tags'){
        // 根据网址显示活动的标签
        var tag =  pathname[1];

        var dom = $('.tagWidget a[data-tag="'+decodeURIComponent(tag)+'"]');
        $(dom).addClass('active');
    }


});





// 头图：异步加载 Bing 每日一图，成功后淡入覆盖渐变底图；失败/超时保持渐变
jQuery(function ($) {
    var header = document.querySelector('header.intro-header[data-bing-image]');
    if (!header) return;
    var src = header.getAttribute('data-bing-image');
    if (!src) return;

    var img = new Image();
    img.fetchPriority = 'low';
    img.decoding = 'async';
    var timer = setTimeout(function () { img.onload = null; }, 12000); // 12s 超时，放弃加载

    img.onload = function () {
        clearTimeout(timer);
        header.style.backgroundImage = 'url("' + src + '")';
        header.classList.add('bing-loaded');
    };
    img.onerror = function () {
        clearTimeout(timer); // 失败静默，保留 CSS 渐变
    };
    img.src = src;
});


// 代码块一键复制（GitHub 风格，右上角按钮）
// 只处理正文区域；样式见 css/style.css 的「代码块一键复制」一节
(function () {
    'use strict';

    var ICON_COPY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>';
    var ICON_DONE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>';

    // Hexo 的高亮输出形如 <span class="line">...</span><br>，
    // textContent 拼接不会换行，所以优先按 .line 收集再 join
    function getCodeText(pre) {
        var lines = pre.querySelectorAll('.line');
        if (lines.length) {
            return Array.prototype.map.call(lines, function (line) {
                return line.textContent;
            }).join('\n');
        }
        return pre.textContent.replace(/\n$/, '');
    }

    function fallbackCopy(text) {
        return new Promise(function (resolve, reject) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.top = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
            } catch (err) {
                reject(err);
            }
            document.body.removeChild(ta);
        });
    }

    function copyText(text) {
        // 优先用异步剪贴板 API；被拒（权限/非安全上下文）时退回 execCommand
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).catch(function () {
                return fallbackCopy(text);
            });
        }
        return fallbackCopy(text);
    }

    function enhance(block) {
        if (!block || block.parentNode.classList.contains('code-block-wrap')) return;

        var codePre = block.tagName === 'PRE' ? block : (block.querySelector('td.code pre') || block.querySelector('pre'));
        if (!codePre) return;

        var wrap = document.createElement('div');
        wrap.className = 'code-block-wrap';
        block.parentNode.insertBefore(wrap, block);
        wrap.appendChild(block);

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'code-copy-btn';
        btn.title = '复制代码';
        btn.setAttribute('aria-label', '复制代码');
        btn.innerHTML = ICON_COPY;

        var timer = null;
        btn.addEventListener('click', function () {
            copyText(getCodeText(codePre)).then(function () {
                btn.innerHTML = ICON_DONE;
                btn.classList.add('is-copied');
                btn.title = '已复制';
                btn.setAttribute('aria-label', '已复制');
                clearTimeout(timer);
                timer = setTimeout(function () {
                    btn.innerHTML = ICON_COPY;
                    btn.classList.remove('is-copied');
                    btn.title = '复制代码';
                    btn.setAttribute('aria-label', '复制代码');
                }, 1600);
            }).catch(function () {
                // 两种方式都被浏览器拒绝（如页面未聚焦）：退回「选中代码」，
                // 至少让用户知道可以自己按 Ctrl+C，而不是静默失败
                try {
                    var range = document.createRange();
                    range.selectNodeContents(codePre);
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } catch (err) { /* 忽略：老浏览器不支持 */ }
                btn.title = '已选中代码，按 Ctrl+C 复制';
                btn.setAttribute('aria-label', '已选中代码，按 Ctrl+C 复制');
            });
        });

        wrap.appendChild(btn);
    }

    function init() {
        var container = document.querySelector('.post-container');
        if (!container) return;

        var blocks = container.querySelectorAll('figure.highlight, pre');
        Array.prototype.forEach.call(blocks, function (block) {
            // 首页/归档的文章摘要里也会出现代码块，摘要不需要复制按钮
            if (block.closest('.post-preview')) return;
            // 高亮块里的 pre 由外层 figure 统一处理，跳过
            if (block.tagName === 'PRE' && block.closest('figure.highlight')) return;
            enhance(block);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


/* ---------- 每日一言：页面副标题 ----------
 * 句子池在 js/quotes.js（window.SITE_QUOTES），按本地日期固定取一句，
 * 同一天刷新多少次都一样，第二天自动换。文章自己写了 subtitle 的不会进这里。
 */
(function () {
    var nodes = document.querySelectorAll('[data-daily-quote]');
    if (!nodes.length) return;

    var first = nodes[0];
    var fallback = first.getAttribute('data-quote-fallback') || '';
    var api = (first.getAttribute('data-quote-api') || '').trim();
    var pool = (window.SITE_QUOTES || []).filter(function (s) {
        return typeof s === 'string' && s.trim();
    });

    var now = new Date();
    var dateKey = 'daily-quote:' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

    function apply(text, fromApi) {
        if (!text) return;
        Array.prototype.forEach.call(nodes, function (el) {
            el.textContent = text;
            el.classList.add('quote-on');
            if (text.length > 26) el.classList.add('quote-long');
            if (fromApi) el.title = '每日一言';
        });
    }

    // 本地日期算索引，避免用 UTC 导致早上 8 点才换句
    function pickByDate() {
        if (!pool.length) return fallback;
        var dayNo = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86400000);
        return pool[((dayNo % pool.length) + pool.length) % pool.length];
    }

    function readCache() {
        try {
            var raw = window.localStorage.getItem(dateKey);
            return raw ? JSON.parse(raw) : '';
        } catch (e) {
            return '';
        }
    }

    function writeCache(text) {
        try {
            window.localStorage.setItem(dateKey, JSON.stringify(text));
        } catch (e) { /* 隐私模式写不进去，无所谓 */ }
    }

    // 先放当天固定的句子：不联网也一定有内容
    apply(pickByDate());

    // 没配在线接口就到此为止，一次请求都不发
    if (!api || typeof window.fetch !== 'function') return;

    var cached = readCache();
    if (cached) {
        apply(cached, true);
        return;
    }

    var controller = null;
    var timer = null;
    var opts = { credentials: 'omit', referrerPolicy: 'no-referrer' };
    if (typeof window.AbortController === 'function') {
        controller = new window.AbortController();
        opts.signal = controller.signal;
        timer = setTimeout(function () { controller.abort(); }, 6000);
    }

    window.fetch(api, opts)
        .then(function (res) {
            if (!res.ok) throw new Error(res.status);
            return res.text();
        })
        .then(function (txt) {
            // 约定接口返回纯文本；返回 JSON 的不处理，免得把花括号显示出来
            var t = (txt || '').trim().replace(/\s+/g, ' ');
            if (!t || t.length > 60 || /^[\[{]/.test(t)) return;
            writeCache(t);
            apply(t, true);
        })
        .catch(function () { /* 接口挂了就用本地那句，页面上什么都不用提示 */ })
        .then(function () { if (timer) clearTimeout(timer); });
})();
