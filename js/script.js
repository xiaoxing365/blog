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

    var $body = document.body;
    var $toggle = document.querySelector('.navbar-toggle');
    var $navbar = document.querySelector('#huxblog_navbar');
    var $collapse = document.querySelector('.navbar-collapse');

    $toggle.addEventListener('click', handleMagic)
    function handleMagic(e) {
        if ($navbar.className.indexOf('in') > 0) {
            // CLOSE
            $navbar.className = " ";
            // wait until animation end.
            setTimeout(function () {
                // prevent frequently toggle
                if ($navbar.className.indexOf('in') < 0) {
                    $collapse.style.height = "0px"
                }
            }, 400)
        } else {
            // OPEN
            $collapse.style.height = "auto"
            $navbar.className += " in";
        }
    }

});


// toc 目录生成
!function (a) {
    "use strict";
    a(function () {
        // 生成二级菜单
        var $header = a('.post-container').find('h2,h3');
        var _tagLevel = 2;                  // 最初的level
        var _$wrap = a('.bs-docs-sidenav');    // 最初的wrap
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
