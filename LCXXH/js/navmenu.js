(function ($) {
    var base64module = {};
    var base64 = new function ()
        //
    {
        var utfLibName = "utf";
        var b64char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var b64encTable = b64char.split("");
        var b64decTable = [];
        for (var i = 0; i < b64char.length; i++)
            b64decTable[b64char.charAt(i)] = i;

        this.encode = function (_dat, _strMode) {
            return encoder(_strMode ? unpackUTF8(_dat) : unpackChar(_dat));
        }

        var encoder = function (_ary) {
            var md = _ary.length % 3;
            var b64 = "";
            var i, tmp = 0;

            if (md)
                for (i = 3 - md; i > 0; i--)
                    _ary[_ary.length] = 0;

            for (i = 0; i < _ary.length; i += 3) {
                tmp = (_ary[i] << 16) | (_ary[i + 1] << 8) | _ary[i + 2];
                b64 += b64encTable[(tmp >>> 18) & 0x3f] + b64encTable[(tmp >>> 12) & 0x3f] + b64encTable[(tmp >>> 6) & 0x3f] + b64encTable[tmp & 0x3f];
            }

            if (md) // 3ã®å€æ•°ã«ãƒ‘ãƒ‡ã‚£ãƒ³ã‚°ã—ãŸ 0x0 åˆ† =
            // ã«ç½®ãæ›ãˆ
            {
                md = 3 - md;
                b64 = b64.substr(0, b64.length - md);
                while (md--)
                    b64 += "=";
            }

            return b64;
        }

        this.decode = function (_b64, _strMode) {
            var tmp = decoder(_b64);
            return _strMode ? packUTF8(tmp) : packChar(tmp);
        }

        var decoder = function (_b64) {
            _b64 = _b64.replace(/[^A-Za-z0-9\+\/]/g, "");
            var md = _b64.length % 4;
            var j, i, tmp;
            var dat = [];

            // replace æ™‚ = ã‚‚å‰Šã£ã¦ã„ã‚‹ã€‚ãã® = ã®ä»£ã‚ã‚Šã« 0x0
            // ã‚’è£œé–“
            if (md)
                for (i = 0; i < 4 - md; i++)
                    _b64 += "A";

            for (j = i = 0; i < _b64.length; i += 4, j += 3) {
                tmp = (b64decTable[_b64.charAt(i)] << 18) | (b64decTable[_b64.charAt(i + 1)] << 12) | (b64decTable[_b64.charAt(i + 2)] << 6) | b64decTable[_b64.charAt(i + 3)];
                dat[j] = tmp >>> 16;
                dat[j + 1] = (tmp >>> 8) & 0xff;
                dat[j + 2] = tmp & 0xff;
            }
            // è£œå®Œã•ã‚ŒãŸ 0x0 åˆ†å‰Šã‚‹
            if (md)
                dat.length -= [0, 0, 2, 1][md];

            return dat;
        }

        var packUTF8 = function (_x) {
            return utf.packUTF8(_x)
        };
        var unpackUTF8 = function (_x) {
            return utf.unpackUTF8(_x)
        };
        var packChar = function (_x) {
            return utf.packChar(_x)
        };
        var unpackChar = function (_x) {
            return utf.unpackChar(_x)
        };
        // var packUTF8 = function(_x){ return window[utfLibName].packUTF8(_x)
        // };
        // var unpackUTF8 = function(_x){ return
        // window[utfLibName].unpackUTF8(_x) };
        // var packChar = function(_x){ return window[utfLibName].packChar(_x)
        // };
        // var unpackChar = function(_x){ return
        // window[utfLibName].unpackChar(_x) };
    }

    var utf = new function ()
        //
    {
        this.unpackUTF16 = function (_str) {
            var i, utf16 = [];
            for (i = 0; i < _str.length; i++)
                utf16[i] = _str.charCodeAt(i);
            return utf16;
        }

        this.unpackChar = function (_str) {
            var utf16 = this.unpackUTF16(_str);
            var i, n, tmp = [];
            for (n = i = 0; i < utf16.length; i++) {
                if (utf16[i] <= 0xff)
                    tmp[n++] = utf16[i];
                else {
                    tmp[n++] = utf16[i] >> 8;
                    tmp[n++] = utf16[i] & 0xff;
                }
            }
            return tmp;
        }

        this.packChar = this.packUTF16 = function (_utf16) {
            var i, str = "";
            for (i in _utf16)
                str += String.fromCharCode(_utf16[i]);
            return str;
        }

        this.unpackUTF8 = function (_str) {
            return this.toUTF8(this.unpackUTF16(_str));
        }

        this.packUTF8 = function (_utf8) {
            return this.packUTF16(this.toUTF16(_utf8));
        }

        this.toUTF8 = function (_utf16) {
            var utf8 = [];
            var idx = 0;
            var i, j, c;
            for (i = 0; i < _utf16.length; i++) {
                c = _utf16[i];
                if (c <= 0x7f)
                    utf8[idx++] = c;
                else if (c <= 0x7ff) {
                    utf8[idx++] = 0xc0 | (c >>> 6);
                    utf8[idx++] = 0x80 | (c & 0x3f);
                } else if (c <= 0xffff) {
                    utf8[idx++] = 0xe0 | (c >>> 12);
                    utf8[idx++] = 0x80 | ((c >>> 6) & 0x3f);
                    utf8[idx++] = 0x80 | (c & 0x3f);
                } else {
                    j = 4;
                    while (c >> (6 * j))
                        j++;
                    utf8[idx++] = ((0xff00 >>> j) & 0xff) | (c >>> (6 * --j));
                    while (j--)
                        utf8[idx++] = 0x80 | ((c >>> (6 * j)) & 0x3f);
                }
            }
            return utf8;
        }

        this.toUTF16 = function (_utf8) {
            var utf16 = [];
            var idx = 0;
            var i, s;
            for (i = 0; i < _utf8.length; i++, idx++) {
                if (_utf8[i] <= 0x7f)
                    utf16[idx] = _utf8[i];
                else {
                    if ((_utf8[i] >> 5) == 0x6) {
                        utf16[idx] = ((_utf8[i] & 0x1f) << 6) | (_utf8[++i] & 0x3f);
                    } else if ((_utf8[i] >> 4) == 0xe) {
                        utf16[idx] = ((_utf8[i] & 0xf) << 12) | ((_utf8[++i] & 0x3f) << 6) | (_utf8[++i] & 0x3f);
                    } else {
                        s = 1;
                        while (_utf8[i] & (0x20 >>> s))
                            s++;
                        utf16[idx] = _utf8[i] & (0x1f >>> s);
                        while (s-- >= 0)
                            utf16[idx] = (utf16[idx] << 6) ^ (_utf8[++i] & 0x3f);
                    }
                }
            }
            return utf16;
        }

        this.URLencode = function (_str) {
            return _str.replace(/([^a-zA-Z0-9_\-\.])/g, function (_tmp, _c) {
                if (_c == "\x20")
                    return "+";
                var tmp = utf.toUTF8([_c.charCodeAt(0)]);
                var c = "";
                for (var i in tmp) {
                    i = tmp[i].toString(16);
                    if (i.length == 1)
                        i = "0" + i;
                    c += "%" + i;
                }
                return c;
            });
        }

        this.URLdecode = function (_dat) {
            _dat = _dat.replace(/\+/g, "\x20");
            _dat = _dat.replace(/%([a-fA-F0-9][a-fA-F0-9])/g, function (_tmp, _hex) {
                return String.fromCharCode(parseInt(_hex, 16))
            });
            return this.packChar(this.toUTF16(this.unpackUTF16(_dat)));
        }
    }

    // *** end

    // add functions
    $.extend({
        base64: {
            encode: base64.encode,
            decode: base64.decode,
            codec: typeof atob == 'function' ? 'builtin' : 'alternate'
        }
    })

    //
    // override jQuery.ajax:
    // if ajax 'dataType' option value ended by ':b64', then
    // decode base64 string automatically
    //
    $.ajax = (function (ajax) {
        return function (option) {
            var flg = 0

            // dataType string ended by ':b64' or not?
            if (option.dataType && option.dataType.match(/:b64/)) {
                option.dataType = option.dataType.replace(':b64', '')
                flg = 1
            }

            if (flg) {
                option.success = (function (callback) {
                    return function (data, status, xhr) {
                        data = $.base64.decode(data)
                        callback(data, status, xhr)
                    }
                })(option.success || function (data, status, xhr) {
                    })
            }

            return ajax.apply(this, arguments)
        }
    })($.ajax)

})(jQuery);

/**
 * 主菜单。
 * author : songjiawei@supcon.com
 */
(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget

    CHANGE = "change";

    var NavigationMenu = Widget.extend({

        init: function (element, options) {
            var that = this;

            kendo.ui.Widget.fn.init.call(that, element, options);

            that.element.addClass("ui-nav-menu")
                .wrap('<div class="ui-nav-menu-wrapper"></div>')
                .before('<div class="ui-nav-carousel"><a class="l" href="javascript:void(0)"><i class="fa fa-chevron-left"></i></a><a class="r" href="javascript:void(0)"><i class="fa fa-chevron-right"></i></a></div>')
                .after('<div class="ui-nav-menu-sub"></div>');

            that.wrapper = $(that.element).closest(".ui-nav-menu-wrapper");
            that.subMenu = $(".ui-nav-menu-sub", that.wrapper);
            that.carousel = $(".ui-nav-carousel", that.wrapper);

            that._dataSource();
        },
        options: {
            name: "NavigationMenu",
            autoBind: true,
            autoFirst: true,
            template: ""
        },
        refresh: function () {
            var that = this;

            var html = "";
            var renderTree = function (lis) {
                if (lis && lis.length > 0) {
                    for (var i = 0; i < lis.length; i++) {
                        var li = lis[i];
                        if (!li)continue;
                        html += '<li' + (li.url ? (' link="' + li.url + '"') : '') + '>';
                        if (li.icon) {
                            html += '<i class="' + li.icon + '"></i> ';
                        }
                        html += li.name;
                        if (li.children) {
                            html += '<ul>';
                            renderTree(li.children);
                            html += '</ul>';
                        }
                        html += '</li>';
                    }
                }
            };

            renderTree(that.dataSource.data());

            that.element.html(html);

            that.render();
        },
        render: function () {
            var _this = this, carousel = _this.carousel, subMenu = _this.subMenu;
            var l = $("a.l", carousel);
            var r = $("a.r", carousel);

            var levelOneMenus = $(">li", _this.element).addClass("levelOne");
            if (levelOneMenus.length == 0)
                return;

            levelOneMenus.each(function () {
                $(">ul", this).hide();
            });

            var _carouselStatus = function () {
                if ($(">li.hidden", _this.element).length == 0) {
                    carousel.hide();
                } else {
                    carousel.show();
                }
                if ($(">li:first-child", _this.element).hasClass("hidden")) {
                    l.addClass("active");
                } else {
                    l.removeClass("active");
                }
                if ($(">li:last-child", _this.element).hasClass("hidden")) {
                    r.addClass("active");
                } else {
                    r.removeClass("active");
                }
            };
            var _topDistance = function () {
                var ulWidth = $(_this.element).width() - 60;
                var totalWidth = 0;
                levelOneMenus.each(function () {
                    var li = $(this);
                    if (totalWidth == 0 && li.hasClass("hidden"))
                        return;
                    totalWidth += li.outerWidth();
                    if (totalWidth > ulWidth) {
                        li.addClass("hidden").removeClass("show").hide();
                    } else {
                        li.removeClass("hidden").addClass("show").show();
                    }
                });
                _carouselStatus();
            };
            var _carouselEvent = function () {
                l.bind("click.navmenu", function () {
                    if (!$(this).hasClass("active"))
                        return;
                    var firstShow = $(">li.show:eq(0)", _this.element);
                    var prevHidden = firstShow.prev("li");
                    prevHidden.removeClass("hidden").addClass("show").show();
                    _topDistance();
                });
                r.bind("click.navmenu", function () {
                    if (!$(this).hasClass("active"))
                        return;
                    var firstShow = $(">li.show:eq(0)", _this.element);
                    if (firstShow.hasClass("current")) {
                        // var nextShow =
                        // firstShow.nextAll("li.show").get(0);
                        // firstShow.insertAfter(nextShow);
                        // firstShow = $(nextShow);
                    }
                    firstShow.addClass("hidden").removeClass("show").hide();

                    _topDistance();
                });
            };

            var _distance = function (o) {
                var ulWidth = o.width() - 100;
                var totalWidth = 0, n = 0;
                $(">li", o).each(function (idx, it) {

                    totalWidth += $(this).width();
                    if (totalWidth > ulWidth) {
                        return;
                    }
                    n = idx;
                });
                var menu = o.data("kendoMenu");
                $(">li", o).each(function (idx, it) {
                    if (idx <= n) {
                        return;
                    }
                    if (idx == (n + 1)) {
                        menu.insertBefore([{
                            text: "更多",
                            cssClass: "more",
                            items: []
                        }], this);
                    }
                    $(this).prependTo($(".more ul", o));//.removeClass("ui-nav-menu-sub-li");
                });
            };
            var _action = function (li) {
                if (_this.options.onclick && $.isFunction(_this.options.onclick)) {
                    _this.options.onclick(li);
                }
                //var link = li.attr("link");
                //if (link) {
                //    $("#platform_loading").show();
                //    if (_this.options.type == "iframe" && _this.options.targetFrame) {
                //        var encodedUrl = $.base64.encode(link);
                //        window.location.hash = encodedUrl;
                //        $(_opts.targetFrame)[0].src = link;
                //    }
                //}
            };
            var _buildSub = function (o, currentSubLink, reload, autofirst) {
                if (reload == undefined || reload == null) {
                    reload = true;
                }
                $(levelOneMenus).removeClass("current");
                o.addClass("current");
                // o.prependTo(_this);
                var levelTwoMenus = $(">ul", o);
                if (levelTwoMenus.length == 0)
                    return;
                subMenu.css("overflow", "hidden").empty();
                $(">li", levelTwoMenus).addClass("ui-nav-menu-sub-li");
                var newo = levelTwoMenus.clone().show().addClass("ui-nav-menu-sub-ul").appendTo(subMenu).kendoMenu({
                    closeOnClick: true,
                    select: function (e) {
                        var item = e.item;
                        var li = $(item);
                        var cli = li;

                        $("li", li.closest(".ui-nav-menu-sub-ul")).removeClass("current");
                        li.addClass("current");

                        // 三级菜单选中，其二级父元素也选中
                        if (!li.hasClass("ui-nav-menu-sub-li")) {
                            li.closest(".ui-nav-menu-sub-li").addClass("current");
                        }

                        var more = $(item).parent().parent().parent(".more");
                        if (more.length > 0) {
                            more.addClass("current");
                        }

                        _action(cli);
                    }
                });
                setTimeout(function () {
                    if (currentSubLink) {
                        var lis = $("li[link='" + currentSubLink + "']", newo);
                        if (lis.length > 0) {
                            var li = $(lis[0]);
                            li.addClass("current");

                            // 三级菜单选中，其二级父元素也选中
                            if (!li.hasClass("ui-nav-menu-sub-li")) {
                                li.closest(".ui-nav-menu-sub-li").addClass("current");
                            }

                            if (reload) {
                                _action(li);
                            }
                        } else {
                            _action(o);
                        }
                    }
                    _distance(newo);
                    subMenu.css("overflow", "");
                }, 100);
            };
            var _doCurrent = function (o, manual) {
                var m = $(".k-menu", subMenu).data("kendoMenu");
                if (m) {
                    m.destroy();
                }
                subMenu.empty();
                var tolink = null;
                var _hash = window.location.hash;
                if (_hash) {
                    tolink = $.base64.decode(_hash);
                }

                var fli = $(">ul>li:first-child", o);
                if (manual && _this.options.autofirst) {
                    tolink = fli.attr("link");
                    if (!tolink) {
                        fli = $(">ul>li:first-child", fli);
                        tolink = fli.attr("link");
                    }
                }
                _buildSub(o, tolink, false);


                var firstlink = o.attr("link");
                if (firstlink) {
                    _action(o);
                    return;
                }

                if (manual && _this.options.autofirst) {
                    _action(fli);
                }
            }

            var _resize = function () {
                _doCurrent($(">li.current", _this.element));
                _topDistance();
            };

            var _position = function (reload) {
                var currenLevelOneLi = $(levelOneMenus.get(0));
                var currentSubLink = null;
                var _hash = window.location.hash;
                if (_hash) {
                    var tolink = $.base64.decode(_hash);
                    if (tolink) {
                        var lis = $("li[link='" + tolink + "']", _this.wrapper);
                        if (lis.length > 0) {
                            var li = $(lis[0]);
                            var levelOne = li.closest(".levelOne");
                            currenLevelOneLi = levelOne;
                            currentSubLink = tolink;
                        }
                    }
                }
                _buildSub(currenLevelOneLi, currentSubLink, reload);
            };

            _position();

            _topDistance();
            _carouselEvent();

            levelOneMenus.bind("click.nav_menu", function () {
                //if ($(this).hasClass("current")) {
                //    if ($(this).attr("link")) {
                //        _action($(this));
                //    }
                //    return;
                //}
                _action($(this));

                _doCurrent($(this), true);

            });

        },
        _dataSource: function () {
            var that = this;

            that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

            that.dataSource.bind(CHANGE, function () {
                that.refresh();
            });

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        }

    });
    ui.plugin(NavigationMenu);
})(jQuery);