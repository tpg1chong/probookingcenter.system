/*! =========================================================
          .o88
          "888
 .oooo.    888  .oo.    ..o88.     ooo. .oo.    .oooo`88
d88' `8b   88bP"Y88b   888P"Y88b  "888P"Y88b   888' `88b 
888        88b   888   888   888   888   888   888   888
888. .88   888   888   888   888   888   888   888. .880
 8`bo8P'  o888o o888o   8`bod8P'  o888o o888o   .oooo88o
                                                     088`
                                                    .o88
============================================================ */
"function" != typeof Object.create && (Object.create = function(e) {
        function t() {}
        return t.prototype = e, new t
    }),
    function(e, t, a, n) {
        var i = {
            init: function(t, a) {
                function n() {
                    s = setTimeout(function() {
                        i()
                    }, 50)
                }

                function i() {
                    if (d >= p) return !1;
                    if (r++, l.css({
                            width: p,
                            left: -1 * r
                        }), r + d === p) {
                        var t = l.find("li"),
                            a = e(t[c]),
                            i = a.clone();
                        c++, p += a.width(), l.append(i)
                    }
                    n()
                }
                var s, o = e(a),
                    l = o.find("ul"),
                    r = 0,
                    d = o.parent().width(),
                    c = 0;
                o.css({
                    width: d,
                    overflow: "hidden"
                }), l.css({
                    overflow: "hidden",
                    position: "relative",
                    width: o.find("ul").width(),
                    left: 0
                });
                var p = 0;
                e.each(l.find("li"), function() {
                    p += e(this).width() + 1
                }), i(), o.mouseenter(function() {
                    clearTimeout(s)
                }).mouseleave(function() {
                    i()
                })
            }
        };
        e.fn.textslide = function(t) {
            return this.each(function() {
                var a = Object.create(i);
                a.init(t, this), e.data(this, "textslide", a)
            })
        };
        var s;
        s = t.attachEvent ? function(e, t, a) {
            e.attachEvent("on" + t, a)
        } : function(e, t, a) {
            e.addEventListener(t, a, !1)
        };
        var o = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), n.options = e.extend({}, e.fn.starsRatable.options, t), n.rating = parseInt(n.$elem.val()) || 0, n.$box = e("<div/>", {
                    "class": "uiStarsRatable"
                }), n.$elem.before(n.$box), e.each(n.options.level, function(t, a) {
                    var i = e("<a/>", {
                        "class": "icon-star",
                        rating: a.rating
                    });
                    n.options.showlabel && Event.setPlugin(i, "tooltip", {
                        text: a.text,
                        reload: 0,
                        overflow: {
                            Y: "Above",
                            X: "Left"
                        }
                    }), n.$box.append(i)
                }), n.$box.find("a").mouseenter(function() {
                    for (var t = e(this), a = t.attr("rating"), i = a; i > 0; i--) n.$box.find("[rating=" + i + "]").addClass("has-hover")
                }).mouseleave(function() {
                    n.$box.find(".has-hover").removeClass("has-hover")
                }).click(function() {
                    var t = e(this);
                    n.rating = t.attr("rating"), n.active()
                }), n.active()
            },
            active: function(e) {
                var t = this;
                t.$box.find(".has-active").removeClass("has-active"), t.$elem.val(t.rating);
                for (var a = t.rating; a > 0; a--) t.$box.find("[rating=" + a + "]").addClass("has-active")
            }
        };
        e.fn.starsRatable = function(t) {
            return this.each(function() {
                var a = Object.create(o);
                a.init(t, this), e.data(this, "starsRatable", a)
            })
        }, e.fn.starsRatable.options = {
            rating: 0,
            level: {
                1: {
                    rating: 1,
                    text: "แย่"
                },
                2: {
                    rating: 2,
                    text: "พอใช้"
                },
                3: {
                    rating: 3,
                    text: "ดี"
                },
                4: {
                    rating: 4,
                    text: "ดีมาก"
                },
                5: {
                    rating: 5,
                    text: "ยอดเยี่ยม"
                }
            },
            showlabel: !1
        };
        var l = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a);
                n.$elem.val();
                n.$elem.attr("maxlength", 12).keydown(function(t) {
                    var a = e(this).val();
                    console.log(t.keyCode, a.length, e.inArray(a.length, [3, 6])), t.keyCode >= 48 && t.keyCode <= 57 || t.keyCode >= 96 && t.keyCode <= 105 ? e.inArray(a.length, [3, 7]) >= 0 && e(this).val(a + "-") : 8 == t.keyCode ? e.inArray(a.length, [5, 9]) >= 0 && e(this).val(a.substr(0, a.length - 1)) : 189 == t.keyCode && e.inArray(a.length, [3, 7]) >= 0 || t.preventDefault()
                })
            }
        };
        e.fn.phone_number = function(t) {
            return this.each(function() {
                var a = Object.create(l);
                a.init(t, this), e.data(this, "starsRatable", a)
            })
        };
        var r = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), n.options = e.extend({}, e.fn.selectbox.options, t), n.setSlecte(), n.setElem(), n.getSlected(), n.options.setitem, n.active = !1, n.setMenu(), "function" == typeof n.options.onComplete && n.options.onComplete.apply(n, arguments), n.initEvent()
            },
            initEvent: function() {
                var t = this;
                t.$btn.not(".disabled").click(function(a) {
                    e("body").find(".uiPopover").find("a.btn-toggle.active").removeClass("active"), t.menu.hasClass("open") ? t.close() : (t.$btn.addClass("active"), t.display(), t.open()), a.stopPropagation()
                }), e("a", t.menu).click(function() {
                    t.change(e(this).parent().index())
                }), e("html").on("click", function() {
                    t.active && t.menu.hasClass("open") && (t.$btn.removeClass("active"), t.close())
                })
            },
            setElem: function() {
                var t = this;
                t.selectedInput = e("<input>", {
                    "class": "hiddenInput",
                    type: "hidden",
                    name: t.$elem.attr("name")
                }), t.selectedText = e("<span>", {
                    "class": "btn-text"
                }), t.original = t.$elem;
                var a = e("<div/>", {
                    "class": "uiPopover"
                });
                t.$elem.replaceWith(a), t.$elem = a, t.$btn = e("<a>", {
                    "class": "btn btn-box btn-toggle"
                }).append(t.selectedText), t.options.display || t.$btn.addClass("disabled"), t.options.icon || t.$btn.append(e("<i/>", {
                    "class": "img mls icon-angle-down"
                })), t.$elem.append(t.$btn, t.selectedInput)
            },
            setSlecte: function() {
                var t = this;
                t.select = [], t.$elem.find("optgroup,option").each(function(a, n) {
                    var i = e(this),
                        s = "";
                    if ("option" == i.context.nodeName.toLowerCase() ? s = "default" : "optgroup" == i.context.nodeName.toLowerCase() && (s = "header"), i.attr("type") && (s = i.attr("type")), s) {
                        var o = {
                            type: s,
                            text: e.trim(i.text()),
                            value: e.trim(i.val()),
                            href: i.attr("href") ? i.attr("href") : "",
                            selected: i.is(":selected"),
                            image: e.trim(i.attr("image-url")),
                            label: i.attr("label") ? i.attr("label") : "",
                            icon: i.attr("icon") ? i.attr("icon") : ""
                        };
                        i.is(":selected") && (t.selected = o), t.select.push(o)
                    }
                })
            },
            change: function(e) {
                var t = this,
                    a = t.menu.find("li").eq(e);
                a.parent().find(".selected").removeClass("selected"), a.addClass("selected"), t.setSlected(e), t.getSlected()
            },
            setSlected: function(e) {
                var t = this;
                t.selected = t.select[e]
            },
            getSlected: function() {
                var e = this;
                "function" == typeof e.options.onSelected && e.options.onSelected.apply(e, arguments), e.selectedText.text(e.selected.text), e.selectedInput.val(e.selected.value)
            },
            open: function() {
                var e = this;
                e.active = !0, e.getOffset(), e.menu.addClass("open")
            },
            close: function() {
                var e = this;
                e.active = !1, e.menu.removeClass("open")
            },
            display: function() {
                var t = this;
                e("body").append(t.menu), e("body").find(".open.uiContextualPositioner").length > 0 && e("body").find(".open.uiContextualPositioner").removeClass("open"), e("body").find(".openToggler.uiToggle").length > 0 && e("body").find(".openToggler.uiToggle").removeClass("openToggler")
            },
            setMenu: function() {
                var t = this,
                    a = e("<ul>", {
                        "class": "uiMenu"
                    });
                e.each(t.select, function(e, n) {
                    a.append(t._item[n.type || "default"](n))
                });
                var n = "";
                if (t.options.add_item_url) {
                    var i = e("<input>", {
                            "class": "inputtext",
                            autocomplete: "off",
                            placeholder: "เพิ่มใหม่..."
                        }),
                        s = e("<a />", {
                            "class": "btn rfloat",
                            text: "บันทึก"
                        }),
                        n = e("<div>", {
                            "class": "box-input"
                        }).append(i, s);
                    i.click(function(e) {
                        e.stopPropagation()
                    }).keydown(function(e) {
                        13 == e.keyCode && (t.addItem(i), e.preventDefault())
                    }), s.click(function(e) {
                        e.stopPropagation(), t.addItem(i)
                    })
                }
                t.menu = e("<div>", {
                    "class": "uiContextualPositioner"
                }).addClass().append(e("<div>", {
                    "class": "toggleFlyout selectBoxFlyout"
                }).append(n, a)), t.options.max_width && t.menu.find(".toggleFlyout").css("width", t.options.max_width)
            },
            addItem: function(t) {
                var a = this,
                    n = new FormData;
                n.append(a.options.add_item_name, t.val()), n.append("get_insert_select", !0), t.attr("disabled", !0), e.ajax({
                    type: "POST",
                    url: a.options.add_item_url,
                    data: n,
                    dataType: "json",
                    processData: !1,
                    contentType: !1
                }).done(function(t) {
                    a.selected = t.select;
                    var n = [];
                    n.push(a.selected), e.each(a.select, function(e, t) {
                        n.push(t)
                    }), a.select = n, a.close(), a.setMenu(), a.getSlected(), a.menu.find(".selected").removeClass("selected"), a.menu.find("li").first().addClass("selected")
                }).fail(function() {}).always(function() {
                    t.removeClass("disabled")
                })
            },
            _item: {
                "default": function(t) {
                    var a = e("<li/>"),
                        n = e("<a/>", {
                            "class": "itemAnchor"
                        }),
                        i = e("<span/>", {
                            "class": "itemLabel",
                            text: t.text
                        });
                    return a.addClass(t.selected ? "selected" : "").append(n), t.icon && (a.addClass("has-icon"), n.append(e("<i/>", {
                        "class": "mrs img icon-" + t.icon
                    }))), n.append(i), t.label && (t.icon && i.addClass("fwb"), a.addClass("has-des"), n.append(e("<div/>", {
                        "class": "itemDes"
                    }).html(t.label))), a
                },
                header: function(t) {
                    return e("<li/>", {
                        "class": "header"
                    }).html(e("<span/>", {
                        "class": "itemLabel"
                    }).html(t.label))
                },
                separator: function() {
                    return e("<li/>", {
                        "class": "separator"
                    })
                },
                user: function(t) {
                    return e("<li/>", {
                        "class": "user"
                    }).addClass(t.selected ? "selected" : "").html(e("<a/>").addClass("anchor anchor32").html(e("<div/>").addClass("clearfix").append(e("<div/>").addClass("avatar lfloat size32 mrs").html(e("<img/>", {
                        "class": "img",
                        src: t.image
                    }))).append(e("<div/>").addClass("content").append(e("<div/>", {
                        "class": "spacer"
                    }), e("<div/>", {
                        "class": "massages clearfix",
                        text: t.text
                    })))))
                }
            },
            getOffset: function() {
                var n = this;
                n.menu.hasClass("uiContextualAbove") && n.menu.removeClass("uiContextualAbove");
                var i = {
                    height: "",
                    overflowY: "",
                    overflowX: ""
                };
                n.menu.find(".uiMenu").css(i);
                var s = e(e(a).height() < e(t).height() ? t : a),
                    o = n.$elem.offset(),
                    l = n.$elem.offset(),
                    r = e(t).width(),
                    d = s.height();
                l.top += n.$elem.outerHeight();
                var c = l.left + n.menu.outerWidth();
                e("html").hasClass("sidebarMode") && (c += 301), c > r && (l.left = l.left - n.menu.outerWidth() + n.$elem.outerWidth());
                var p = l.top + n.menu.outerHeight();
                if (p > d)
                    if (l.top = l.top - n.menu.outerHeight() - n.$elem.outerHeight(), l.top < 0) {
                        var u = d - o.top + n.$elem.outerHeight();
                        u > o.top ? (l.top = o.top, l.top += n.$elem.outerHeight(), i.height = d - l.top - 15) : (l.top = -1 * l.top, l.top = e("html").hasClass("hasModal") ? 15 : 65, i.height = o.top - 7 - l.top, n.menu.addClass("uiContextualAbove")), i.overflowY = "auto", i.overflowX = "hidden", n.menu.find(".uiMenu").css(i)
                    } else l.top += 2, n.menu.addClass("uiContextualAbove");
                n.menu.css(l)
            }
        };
        e.fn.selectbox = function(t) {
            return this.each(function() {
                var a = Object.create(r);
                a.init(t, this), e.data(this, "selectbox", a)
            })
        }, e.fn.selectbox.options = {
            display: !0,
            onSelected: function() {},
            onComplete: function() {}
        };
        var c = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), n.settings = e.extend({}, e.fn.selectbox2.settings, t), n.searchData = [], n.searchCurrent = "", n.is_loading = !1, n.is_show = !1, n.is_focus = !1, n.is_time = null, n.is_keycodes = [37, 38, 39, 40, 13], "function" == typeof n.settings.onComplete && n.settings.onComplete.apply(n, arguments), n.$input = e("<input>", {
                    "class": "inputtext select-box-input",
                    placeholder: "",
                    autocomplete: "off"
                }), n.$preview = e("<ul>"), n.$elem.addClass("select-box").append(e("<div>", {
                    "class": "select-box-preview"
                }).html(n.$preview), n.$input, e("<div>", {
                    "class": "select-box-loader loader-spin-wrap"
                }).html(e("<div>", {
                    "class": "loader-spin"
                }))), n.setMenu(), n.hide(), n.is_active = 0, e.each(n.settings.options, function(e, t) {
                    t.checked && n.connect(t)
                }), n.active(), n.events()
            },
            setMenu: function() {
                var a = this,
                    n = e("<div/>", {
                        "class": "uiTypeaheadView selectbox-selectview"
                    });
                a.$menu = e("<ul/>", {
                    "class": "search has-loading",
                    role: "listbox"
                }), n.html(e("<div/>", {
                    "class": "bucketed"
                }).append(a.$menu));
                var i = a.$input.offset();
                i.top += a.$input.outerHeight(), uiLayer.get(i, n), a.$layer = a.$menu.parents(".uiLayer"), a.$menu.mouseenter(function() {
                    a.is_focus = !0
                }).mouseleave(function() {
                    a.is_focus = !1
                }), a.resizeMenu(), e(t).resize(function() {
                    a.resizeMenu()
                })
            },
            resizeMenu: function() {
                var a = this;
                a.$menu.width(a.$input.outerWidth() - 2);
                var n = a.$input.offset();
                n.top += a.$input.outerHeight(), n.top -= 1, a.$menu.css({
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: e(t).height() - n.top
                }), a.$menu.parents(".uiContextualLayerPositioner").css(n)
            },
            show: function() {
                var e = this;
                e.resizeMenu(), e.$layer.removeClass("hidden_elem")
            },
            hide: function() {
                this.$layer.addClass("hidden_elem")
            },
            addOp: function(e) {},
            setItemMenu: function(t) {
                var a = e("<li/>").html(e("<a>", {
                    "class": "clearfix"
                }).append(e("<span>", {
                    "class": "text",
                    text: t.text
                })));
                return t.image_url && a.addClass("picThumb"), "new" == t.activity && a.addClass("new").find(".text").before(e("<div>", {
                    "class": "box-icon"
                }).append(e("<i>", {
                    "class": "icon-plus"
                }))), a.data(t), a
            },
            events: function() {
                var t = this;
                t.$input.keyup(function(e) {
                    -1 == t.is_keycodes.indexOf(e.which) && t.search()
                }).keydown(function(e) {
                    var a = e.which;
                    (40 == a || 38 == a) && (t.changeUpDown(40 == a ? "donw" : "up"), e.preventDefault()), 13 == a && (t.connect(), e.preventDefault(), e.stopPropagation())
                }).focus(function() {}).blur(function() {}).click(function(e) {
                    t.search(), e.stopPropagation()
                }), t.$menu.delegate("li", "mouseenter", function() {
                    t.is_active = e(this).index(), e(this).addClass("selected").siblings().removeClass("selected")
                }), t.$layer.mouseenter(function() {
                    t.focus = !0
                }).mouseleave(function() {
                    t.focus = !1
                }), t.$menu.delegate("li", "click", function(e) {
                    t.connect(), e.preventDefault()
                }), t.$preview.delegate(".js-remove-preview", "click", function(a) {
                    var n = e(this).parent();
                    a.stopPropagation();
                    var i = n.data();
                    t.updateOp(i, !1), n.remove(), 0 == t.$preview.find("li").length && (t.$elem.hasClass("has-preview") && t.$elem.removeClass("has-preview"), t.$elem.hasClass("not-multiple") && (t.$elem.removeClass("not-multiple"), t.$input.focus(), t.search())), t.settings.multiple && (t.$input.focus(), t.search())
                }), t.$preview.delegate("li", "click", function(e) {
                    t.settings.multiple || (t.search(), e.stopPropagation())
                }), e("html").on("click", function() {
                    t.open && (t.hide(), t.open = !1)
                })
            },
            search: function() {
                var t = this,
                    a = e.trim(t.$input.val()),
                    n = [];
                t.open = !0, "" == a ? n = t.settings.options : e.each(t.settings.options, function(e, t) {
                    var i = t.text || t.name || "";
                    i = i.toString(), i.search(a) >= 0 ? n.push(t) : i.toUpperCase().search(a) >= 0 ? n.push(t) : i.toLowerCase().search(a) >= 0 && n.push(t)
                }), 0 == n.length && t.settings.insert_url ? (t.$menu.empty(), n.push({
                    text: a,
                    activity: "new"
                })) : t.$menu.empty();
                var i = 0;
                e.each(n, function(e, a) {
                    a.checked || (t.$menu.append(t.setItemMenu(a)), i++)
                }), 0 == i ? t.hide() : (t.is_active = 0, t.active(), t.show())
            },
            active: function() {
                var e = this;
                e.$menu.find("li").eq(e.is_active).addClass("selected").siblings().removeClass("selected")
            },
            changeUpDown: function(e) {
                var t = this;
                if (!t.$menu) return !1;
                var a = t.$menu.find("li").length,
                    n = t.$menu.find("li.selected").index();
                "up" == e ? n-- : n++, 0 > n && (n = 0), n >= a && (n = a - 1), t.is_active = n, t.active()
            },
            connect: function(t) {
                var a = this;
                if (!t) var n = a.$menu.find("li").eq(a.is_active),
                    t = n.data();
                return "new" == t.activity ? (a.insertItem(t.text), !1) : (a.updateOp(t, !0), a.settings.multiple || (e.each(a.$preview.find("li"), function(t, n) {
                    a.updateOp(e(n).data(), !1)
                }), a.$preview.empty()), a.$preview.append(a.setItemPreview(t)), a.$input.val(""), a.hide(), a.$elem.addClass("has-preview"), void(a.settings.multiple || a.$elem.addClass("not-multiple")))
            },
            updateOp: function(t, a) {
                var n = this;
                e.each(n.settings.options, function(e, i) {
                    var s = t.text || t.name,
                        o = t.value || t.id,
                        l = i.text || i.name,
                        r = i.value || i.id;
                    s == l && o == r && (n.settings.options[e].checked = a)
                })
            },
            setItemPreview: function(t) {
                var a = this,
                    n = e("<li>").append(e("<span>", {
                        "class": "text",
                        text: t.text || t.name
                    }), e("<input>", {
                        type: "hidden",
                        "class": "hiddenInput",
                        value: t.value || t.id,
                        name: a.settings.name,
                        autocomplete: "off"
                    }), e("<button>", {
                        type: "button",
                        "class": "remove-preview js-remove-preview",
                        title: "Remove"
                    }).html(e("<i>", {
                        "class": "icon-remove"
                    })));
                return n.data(t), n
            },
            insertItem: function(a) {
                var n = this;
                Dialog.load(n.settings.insert_url, {
                    callback: "selectbox",
                    text: n.$input.val()
                }, {
                    onSubmit: function(e) {
                        var t = e.$pop.find("form");
                        Event.inlineSubmit(t).done(function(e) {
                            e.url = "", e.message = "", Event.processForm(t, e);
                            var a = {
                                text: e.text,
                                value: e.value
                            };
                            n.settings.options.push(a), n.connect(a)
                        })
                    },
                    onClose: function() {
                        n.$input.focus(), n.search()
                    },
                    onOpen: function() {
                        n.$input.val(""), n.hide(), e(t).keydown(function(e) {
                            27 == e.keyCode && Dialog.close()
                        })
                    }
                })
            }
        };
        e.fn.selectbox2 = function(t) {
            return this.each(function() {
                var a = Object.create(c);
                a.init(t, this), e.data(this, "selectbox", a)
            })
        }, e.fn.selectbox2.settings = {
            name: "",
            options: [],
            onComplete: function() {},
            insert_url: !1,
            multiple: !1
        };
        var p = {
            init: function(t, a) {
                var n = this;
                n.$elem = e(a), n.options = e.extend({}, e.fn.datepicker.options, t), n.setElem(), n.setData(), n.Events(), n.display(), "function" == typeof n.options.onComplete && n.options.onComplete(n.calendar.selectedDate)
            },
            setElem: function() {
                var t = this;
                t.$input = e("<input>", {
                    "class": "hiddenInput",
                    type: "hidden",
                    name: t.$elem.attr("name")
                }), t.$display = e("<span>", {
                    "class": "btn-text"
                }), t.original = t.$elem;
                var a = e("<div/>", {
                    "class": "uiPopover"
                });
                t.$elem.replaceWith(a), t.$elem = a, t.$btn = e("<a>", {
                    "class": "btn btn-box btn-toggle"
                }).append(t.$display), t.options.icon || t.$btn.append(e("<i/>", {
                    "class": "img mls icon-angle-down"
                })), t.$elem.append(t.$btn, t.$input)
            },
            setData: function() {
                var t = this;
                if (t.is_focus = !1, "" != t.original.val()) {
                    var a = t.original.val(),
                        n = a.split("-");
                    3 == n.length && (t.options.selectedDate = new Date(parseInt(n[0]), parseInt(n[1]) - 1, parseInt(n[2])), t.options.selectedDate.setHours(0, 0, 0, 0))
                }
                t.options.selectedDate.setHours(0, 0, 0, 0), t.is_open = !1;
                var i = new Date;
                i.setHours(0, 0, 0, 0), t.calendar = {
                    $elem: e("<div>", {
                        "class": "uiContextualPositioner"
                    }),
                    theDate: new Date(i),
                    selectedDate: new Date(t.options.selectedDate),
                    lists: []
                }, t.$calendar = e("<div>", {
                    "class": "toggleFlyout calendarGridTableSmall"
                }), t.calendar.$elem.html(t.$calendar)
            },
            Events: function() {
                var t = this;
                t.$btn.click(function(e) {
                    t.is_open ? t.hide() : (t.updateCalendar(), t.show(), e.stopPropagation())
                }), e("html").on("click", function() {
                    !t.is_focus && t.is_open && t.hide()
                }), t.calendar.$elem.mouseenter(function() {
                    t.is_focus = !0
                }).mouseleave(function() {
                    t.is_focus = !1
                }), t.calendar.$elem.delegate(".prev,.next", "click", function(a) {
                    var n = e(this).hasClass("prev") ? -1 : 1,
                        i = new Date(t.calendar.theDate);
                    i.setMonth(i.getMonth() + n), t.calendar.theDate = i, t.updateCalendar(), a.stopPropagation()
                }), t.calendar.$elem.delegate("td[data-date]", "click", function(a) {
                    t.selected(e(this).attr("data-date")), t.display(), t.hide()
                }), t.calendar.$elem.bind("mousewheel", function(e) {
                    if (t.is_loading) return !1;
                    var a = e.originalEvent.wheelDelta / 120 > 0 ? -1 : 1,
                        n = new Date(t.calendar.theDate);
                    n.setMonth(n.getMonth() + a), t.calendar.theDate = n, t.updateCalendar()
                })
            },
            setCalendar: function() {
                var e = this,
                    t = new Date;
                t.setHours(0, 0, 0, 0);
                var a = new Date(e.calendar.theDate);
                a.setDate(1);
                var n = (a.getTime(), new Date(a));
                n.setMonth(n.getMonth() + 1), n.setDate(0);
                var i = (n.getTime(), n.getDate()),
                    s = new Date(a);
                s.setDate(0);
                var o = s.getDay(),
                    l = s.getDate(),
                    r = e.options.weekDayStart;
                r = r > o ? 7 - r : o - r, e.calendar.lists = [];
                for (var d = 0, c = 0; 7 > d; d++) {
                    for (var p = [], u = !1, h = 0; 7 > h; h++, c++) {
                        var f = l - r + c,
                            m = {},
                            v = f - l;
                        m.date = new Date(e.calendar.theDate), m.date.setHours(0, 0, 0, 0), m.date.setDate(v), v >= 1 && i >= v ? (u = !0, t.getTime() == m.date.getTime() && (m.today = !0), e.calendar.selectedDate.getTime() == m.date.getTime() && (m.selected = !0)) : m.noday = !0, p.push(m)
                    }
                    p.length > 0 && u && e.calendar.lists.push(p)
                }
                e.calendar.header = [];
                for (var h = 0, c = e.options.weekDayStart; 7 > h; h++, c++) 7 == c && (c = 0), e.calendar.header.push({
                    key: c,
                    text: Datelang.day(c, "short", e.options.lang)
                })
            },
            updateCalendar: function() {
                var t = this;
                t.is_loading = !0, t.setCalendar();
                var a = t.calendar.theDate.getFullYear();
                "th" == t.options.lang && (a += 543);
                var n = Datelang.month(t.calendar.theDate.getMonth(), t.options.format, t.options.lang),
                    i = e("<thead>").html(e("<tr>", {
                        "class": "title"
                    }).append(e("<td>", {
                        "class": "title",
                        colspan: 5,
                        text: n + " " + a
                    }), e("<td>", {
                        "class": "prev"
                    }).append(e("<i/>", {
                        "class": "icon-angle-left"
                    })), e("<td>", {
                        "class": "next"
                    }).append(e("<i/>", {
                        "class": "icon-angle-right"
                    })))),
                    s = e("<tr>", {
                        "class": "header"
                    });
                e.each(t.calendar.header, function(t, a) {
                    s.append(e("<th>", {
                        text: a.text
                    }))
                }), $thead = e("<thead/>").html(s);
                var o = e("<tbody>");
                e.each(t.calendar.lists, function(a, n) {
                    $tr = e("<tr>"), e.each(n, function(a, n) {
                        n.cls = "";
                        var i = n.date.getMonth() + 1;
                        i = 10 > i ? "0" + i : i;
                        var s = n.date.getDate();
                        s = 10 > s ? "0" + s : s;
                        var o = n.date.getFullYear() + "-" + i + "-" + s;
                        t.options.start && (t.options.start.getTime() == n.date.getTime() && (n.cls += " select-start"), t.options.start.getTime() > n.date.getTime() && (n.overtime = !0)), t.options.end && (t.options.end.getTime() == n.date.getTime() && (n.cls += " select-end"), t.options.end.getTime() < n.date.getTime() && (n.overtime = !0)), $tr.append(e("<td>", {
                            "data-date": o
                        }).addClass(n.empty ? "empty" : "").addClass(n.today ? "today" : "").addClass(n.selected ? "selected" : "").addClass(n.noday ? "noday" : "").addClass(n.overtime ? "overtime" : "").addClass(n.cls).html(e("<span>", {
                            text: n.date.getDate()
                        })))
                    }), o.append($tr)
                }), t.$calendar.empty().html(e("<table/>", {
                    "class": "calendarGridTable",
                    cellspacing: 0,
                    cellpadding: 0
                }).addClass(t.options.theme).append(i, $thead, o)), t.is_loading = !1
            },
            hide: function() {
                var e = this;
                e.is_focus = !1, e.is_open = !1, e.calendar.$elem.removeClass("open"), e.calendar.theDate = new Date(e.calendar.selectedDate)
            },
            show: function() {
                var t = this;
                t.is_open = !0, e("body").append(t.calendar.$elem), t.getOffset(), t.calendar.$elem.addClass("open")
            },
            getOffset: function() {
                var n = this,
                    i = n.calendar.$elem;
                i.hasClass("uiContextualAbove") && i.removeClass("uiContextualAbove");
                var s = e(e(a).height() < e(t).height() ? t : a),
                    o = n.$elem.offset(),
                    l = e(t).width(),
                    r = s.height(),
                    d = o;
                d.top += n.$elem.outerHeight();
                var c = d.left + i.outerWidth();
                e("html").hasClass("sidebarMode") && (c += 301), c > l && (d.left = o.left - i.outerWidth() + n.$elem.outerWidth());
                var p = d.top + i.outerHeight();
                p > r && (d.top = o.top - i.outerHeight() - n.$elem.outerHeight(), i.addClass("uiContextualAbove")), i.css(d)
            },
            selected: function(e) {
                var t = this,
                    a = e.split("-");
                t.calendar.selectedDate = new Date(a[0], a[1] - 1, a[2]), t.calendar.selectedDate.setHours(0, 0, 0, 0), "function" == typeof t.options.onSelected && t.options.onSelected(t.calendar.selectedDate), "function" == typeof t.options.onChange && t.options.onChange(t.calendar.selectedDate)
            },
            display: function() {
                var e = this;
                e.$display.text(Datelang.fulldate(e.calendar.selectedDate, e.options.format, e.options.lang, e.options.displayFullYear)), e.$input.val(PHP.dateJStoPHP(e.calendar.selectedDate))
            }
        };
        e.fn.datepicker = function(t) {
            return this.each(function() {
                var a = Object.create(p);
                a.init(t, this), e.data(this, "datepicker", a)
            })
        }, e.fn.datepicker.options = {
            lang: "th",
            selectedDate: new Date,
            start: null,
            end: null,
            weekDayStart: 0,
            format: "normal",
            theme: "",
            onSelected: function() {},
            displayFullYear: !0
        };
        var u = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), n.options = e.extend({}, e.fn.toggleLink.options, t), n.setElem(), n.active = !1, n.initEvent()
            },
            setElem: function() {
                var e = this;
                e.$elem.addClass("btn-toggleLink").removeAttr("rel"), e.$elem = e.$elem.parents(".uitoggleLink"), e.$btn = e.$elem.find("a.btn-toggleLink"), e.$menu = e.$elem.find(".uitoggleLinkFlyout"), e.setOffset()
            },
            setElem: function() {
                var e = this;
                e.$elem.addClass("btn-toggle").removeAttr("rel"), e.$elem = e.$elem.parents(".uiToggle"), e.$btn = e.$elem.find("a.btn-toggle"), e.$menu = e.$elem.find(".uiToggleFlyout"), e.setOffset()
            },
            initEvent: function() {
                var t = this;
                t.$btn.click(function(a) {
                    e("body").find(".uiPopover, .uiToggle").find("a.btn-toggle.active").removeClass("active"), t.$elem.hasClass("openToggler") ? t.close() : (t.$btn.addClass("active"), t.display(), t.open()), a.preventDefault(), a.stopPropagation()
                }), t.$menu.find("a").click(function() {
                    t.selected = e(this).parent().index(), "function" == typeof t.options.onSelected && t.options.onSelected.apply(t, arguments)
                }), e("html").on("click", function() {
                    t.active && t.$elem.hasClass("openToggler") && (t.$btn.removeClass("active"), t.close())
                })
            },
            display: function() {
                e("body").find(".open.uiContextualPositioner").length > 0 && e("body").find(".open.uiContextualPositioner").removeClass("open"), e("body").find(".openToggler.uiToggle").length > 0 && e("body").find(".openToggler.uiToggle").removeClass("openToggler")
            },
            open: function() {
                var e = this;
                e.active = !0, e.$elem.addClass("openToggler"), e.getOffset()
            },
            close: function() {
                var e = this;
                e.active = !1, e.$elem.removeClass("openToggler")
            },
            setOffset: function() {
                var n = this,
                    i = e(e(a).height() < e(t).height() ? t : a);
                n.$menu.find(".uiMenu").css({
                    overflowY: "",
                    overflowX: "",
                    height: "",
                    minHeight: "",
                    minWidth: ""
                });
                var s = n.$elem.offset(),
                    o = e(t).width(),
                    l = i.height(),
                    r = s;
                r.top += n.$elem.outerHeight();
                var d = r.left + n.$menu.outerWidth();
                e("html").hasClass("sidebarMode") && (d += 301), d >= o || n.options.right ? n.$menu.addClass("uiToggleFlyoutRight") : n.$menu.hasClass("uiToggleFlyoutRight") && n.$menu.removeClass("uiToggleFlyoutRight");
                var c = r.top + n.$menu.outerHeight();
                c += 30, c > l || n.options.above ? n.$menu.addClass("uiToggleFlyoutAbove") : n.$menu.hasClass("uiToggleFlyoutAbove") && n.$menu.removeClass("uiToggleFlyoutAbove")
            },
            getOffset: function() {
                var n = this;
                n.setOffset();
                var i = e(e(a).height() < e(t).height() ? t : a),
                    s = n.$elem.offset(),
                    o = (e(t).width(), i.height());
                n.$menu.hasClass("fixedMenu") && (o = e(t).height(), s.top -= e(t).scrollTop());
                var l = o - s.top;
                l > s.top && n.$menu.hasClass("uiToggleFlyoutAbove") && n.$menu.removeClass("uiToggleFlyoutAbove"), l = s.top + n.$menu.outerHeight() + n.$elem.outerHeight(), l > o && !n.$menu.hasClass("uiToggleFlyoutAbove") && n.$menu.find(".uiMenu").css({
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: o - (s.top + n.$elem.outerHeight() + 15),
                    minHeight: 180,
                    minWidth: 180
                })
            }
        };
        e.fn.toggleLink = function(t) {
            return this.each(function() {
                var a = Object.create(u);
                a.init(t, this), e.data(this, "toggleLink", a)
            })
        }, e.fn.toggleLink.options = {
            right: !1,
            above: !1,
            onSelected: function() {}
        };
        var h = {
            init: function(t, a) {
                var n = this;
                return n.$elem = e(a), n.options = e.extend({}, e.fn.dropdown.options, t), n.options.select ? (n.is_open = !1, n._focus = !1, n.$elem.mouseenter(function() {
                    n._focus = !0
                }).mouseleave(function() {
                    n._focus = !1
                }), n.$elem.click(function(e) {
                    n.$elem.hasClass("active") ? n.close() : n.open(), e.preventDefault()
                }), void e("html").on("click", function() {
                    n.is_open && n.$elem.hasClass("active") && !n._focus && n.close()
                })) : !1
            },
            setMenu: function() {
                var t = this;
                t.$model = e("<div/>", {
                    "class": "uiTypeaheadView"
                }), t.$menu = e("<ul/>", {
                    "class": "uiMenu",
                    role: "listbox"
                }), e.each(t.options.select, function(e, a) {
                    t.$menu.append(t._item[a.type || "default"](a))
                }), t.$model.html(t.$menu);
                var a = t.$elem.offset();
                if (t.options.settings.parent) {
                    a.$parent = t.$elem.closest(t.options.settings.parent);
                    var n = a.$parent.offset(),
                        i = a.$parent.css("position");
                    "undefined" != i && i || a.$parent.css("position", "relative"), a.left -= n.left, a.top += e(t.options.settings.parent).scrollTop()
                }
                var s = e.extend({}, t.options.settings, a);
                s.top += t.$elem.outerHeight(), s.$elem = t.$elem, uiLayer.get(s, t.$model), t.$model = t.$menu.parents(".uiContextualLayer"), t.$model.addClass("uiContextualPositioner"), t.$layer = t.$menu.parents(".uiLayer")
            },
            resizeMenu: function() {
                var e = this,
                    t = e.$input.offset();
                t.top += e.$input.outerHeight(), t.top -= 1, e.$menu.parents(".uiContextualLayerPositioner").css(t)
            },
            open: function() {
                var t = this;
                t.setMenu(), Event.plugins(t.$layer), t.is_open = !0, t.$elem.addClass("active"), t.$model.addClass("open"), t.$model.find(".itemAnchor").click(function(a) {
                    "function" == typeof t.options.onChange && t.options.onChange(e(this))
                })
            },
            close: function() {
                var e = this;
                e.is_open = !1, e.$layer.remove(), e.$elem.removeClass("active")
            },
            _item: {
                "default": function(t) {
                    var a = e("<li/>"),
                        n = e("<a/>", {
                            "class": "itemAnchor"
                        }),
                        i = e("<span/>", {
                            "class": "itemLabel",
                            text: t.text
                        });
                    return a.addClass(t.selected ? "selected" : "").append(n), t.icon && (a.addClass("has-icon"), n.append(e("<i/>", {
                        "class": "mrs img icon-" + t.icon
                    }))), n.append(i), t.label && (t.icon && i.addClass("fwb"), a.addClass("has-des"), n.append(e("<div/>", {
                        "class": "itemDes"
                    }).html(t.label))), t.href && n.attr("href", t.href), t.attr && n.attr(t.attr), t.addClass && n.addClass(t.addClass), a
                },
                header: function(t) {
                    return e("<li/>", {
                        "class": "header"
                    }).html(e("<span/>", {
                        "class": "itemLabel"
                    }).html(t.label))
                },
                separator: function() {
                    return e("<li/>", {
                        "class": "separator"
                    })
                },
                user: function(t) {
                    return e("<li/>", {
                        "class": "user"
                    }).addClass(t.selected ? "selected" : "").html(e("<a/>").addClass("anchor anchor32").html(e("<div/>").addClass("clearfix").append(e("<div/>").addClass("avatar lfloat size32 mrs").html(e("<img/>", {
                        "class": "img",
                        src: t.image
                    }))).append(e("<div/>").addClass("content").append(e("<div/>", {
                        "class": "spacer"
                    }), e("<div/>", {
                        "class": "massages clearfix",
                        text: t.text
                    })))))
                }
            }
        };
        e.fn.dropdown = function(t) {
            return this.each(function() {
                var a = Object.create(h);
                a.init(t, this), e.data(this, "dropdown", a)
            })
        }, e.fn.dropdown.options = {
            settings: {}
        };
        var f = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), n.options = t, n.$name = n.$elem.find("[data-name]"), n.defaultName = n.$name.attr("data-name"), n.$name.removeAttr("data-name"), n.$remove = n.$elem.find("[data-remove]"), n.$remove.removeAttr("data-remove"), n.$file = n.$elem.find("input[type=file]"), n._event(), n._change()
            },
            _event: function() {
                var e = this;
                e.$file.change(function(t) {
                    e.files = this.files, e._change()
                }), e.$remove.click(function() {
                    e.files = null, e._change()
                })
            },
            _change: function() {
                var e = this;
                e.files ? (e.$name.text(e.files[0].name), e.$remove.removeClass("hidden_elem")) : (e.$file.val(""), e.$name.text(e.defaultName), e.$remove.addClass("hidden_elem"))
            }
        };
        e.fn.chooseFile = function(t) {
            return this.each(function() {
                var a = Object.create(f);
                a.init(t, this), e.data(this, "chooseFile", a)
            })
        };
        var v = {
            init: function(t, a) {
                var n = this;
                n.$elem = e(a), n.theDate = new Date, n.options = e.extend({}, e.fn.oclock.options, t), n.refresh(1)
            },
            refresh: function(t) {
                var a = this;
                a.t = setTimeout(function() {
                    var t = "AM";
                    a.theDate = new Date;
                    var n = a.theDate.getHours();
                    "th" == a.options.lang ? t = "" : (n > 12 && (n -= 12, t = "PM"), 0 == n && (n = 12));
                    var i = a.theDate.getMinutes();
                    i = 10 > i ? "0" + i : i;
                    var s = a.theDate.getSeconds();
                    s = 10 > s ? "0" + s : s;
                    var o = e.trim(n + ":" + i + ":" + s + " " + t),
                        l = Datelang.day(a.theDate.getDay(), a.options.type, a.options.lang) + ", " + a.theDate.getDate() + " " + Datelang.month(a.theDate.getMonth(), a.options.type, a.options.lang) + ", " + a.theDate.getFullYear();
                    a.$elem.find("[ref=time]").html(o), a.$elem.find("[ref=date]").html(l), a.refresh()
                }, t || a.options.refresh)
            }
        };
        e.fn.oclock = function(t) {
            return this.each(function() {
                var a = Object.create(v);
                a.init(t, this), e.data(this, "oclock", a)
            })
        }, e.fn.oclock.options = {
            lang: "th",
            type: "normal",
            refresh: 1e3
        };
        var g = {
            init: function(t, a) {
                var n = this;
                if (n.elem = a, n.$elem = e(a), n.options = e.extend({}, e.fn.liveclock.options, t), n.$clock = n.$elem.find("[data-clock-text]"), n.$date = n.$elem.find("[data-date-text]"), n.refresh(1), n.$elem.find("[data-timezone]")) {
                    new Date
                }
            },
            refresh: function(e) {
                var t = this;
                setTimeout(function() {
                    var e = new Date,
                        a = e.getMinutes();
                    a = 10 > a ? "0" + a : a;
                    var n = e.getSeconds();
                    n = 10 > n ? "0" + n : n;
                    var i = e.getHours(),
                        s = '<span class="hour n' + e.getHours() + '">' + i + '</span>:<span class="minute">' + a + "</span>:" + n;
                    t.$clock.html(s), t.$date && ("th" == t.options.lang ? t.$date.html(Datelang.day(e.getDay(), t.options.type, t.options.lang) + "ที่ " + e.getDate() + " " + Datelang.month(e.getMonth(), t.options.type, t.options.lang)) : t.$date.html(Datelang.day(e.getDay(), t.options.type, t.options.lang) + ", " + e.getDate() + " " + Datelang.month(e.getMonth(), t.options.type, t.options.lang))), t.options.refresh && t.refresh()
                }, e || t.options.refresh)
            }
        };
        e.fn.liveclock = function(t) {
            return this.each(function() {
                var a = Object.create(g);
                a.init(t, this), e.data(this, "liveclock", a)
            })
        }, e.fn.liveclock.options = {
            lang: "th",
            type: "normal",
            refresh: 1e3
        };
        var $ = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), n.options = e.extend({}, e.fn.clock.options, t), n.$clock = n.$elem.find(".plugin-clock"), n.$date = n.$elem.find(".plugin-date");
                var i = Object.create(Datelang);
                i.init(n.options), n.string = i, n.refresh(1)
            },
            refresh: function(e) {
                var t = this;
                setTimeout(function() {
                    var e = new Date,
                        a = e.getMinutes();
                    a = 10 > a ? "0" + a : a;
                    var n = e.getHours() + "<span>:</span>" + a,
                        i = t.string.day(e.getDay());
                    i += "ที่ " + e.getDate(), i += " " + t.string.month(e.getMonth()), i += " " + e.getFullYear(), t.$clock.html(n), t.$date.html(i), t.options.refresh && t.refresh()
                }, e || t.options.refresh)
            }
        };
        e.fn.clock = function(t) {
            return this.each(function() {
                var a = Object.create($);
                a.init(t, this), e.data(this, "Clock", a)
            })
        }, e.fn.clock.options = {
            lang: "th",
            type: "normal",
            refresh: 1e3
        };
        var b = {
            init: function(t) {
                var a = this;
                a.elem = t, a.$elem = e(t), a.$btnSubmit = a.$elem.find(".btn.btn-submit"), a.setDefault(), a.initEvent()
            },
            setDefault: function() {
                var t = this;
                e.each(t.$elem.find(":input"), function() {
                    var a = e(this).attr("type"),
                        n = e(this).val();
                    if ("radio" == a) {
                        var i = e(this).attr("name");
                        this.default_value = t.$elem.find("input[name=" + i + "]:checked").val()
                    }
                    this.defaultValue = n
                })
            },
            initEvent: function() {
                var e = this;
                e.$elem.find(":input").change(function() {
                    e.update()
                }), e.$elem.find("input[type=text],input[type=password],input[type=email],textarea").keyup(function() {
                    e.update()
                })
            },
            update: function(t) {
                var a = this,
                    n = !1;
                e.each(a.$elem.find(":input"), function() {
                    var t = e(this),
                        i = this.defaultValue,
                        s = t.val();
                    return "radio" == t.attr("type") && (i = this.default_value, s = a.$elem.find("input[name=" + t.attr("name") + "]:checked").val()), i != s ? (n = !0, !1) : void 0
                }), a.$btnSubmit.hasClass("disabled") && 1 == n ? a.$btnSubmit.removeClass("disabled") : a.$btnSubmit.hasClass("disabled") || 0 != n || a.$btnSubmit.addClass("disabled")
            }
        };
        e.fn.changeForm = function() {
            return this.each(function() {
                var t = Object.create(b);
                t.init(this), e.data(this, "clock", t)
            })
        };
        var y = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), n.$input = n.$elem.find("input[type=file]"), n.options = e.extend({}, e.fn.save_as_picture.options, t), n.form = n.options.form, n.$input.change(function() {
                    n.file = this.files[0], n.$image = e("<img/>", {
                        "class": "img img-preveiw",
                        alt: ""
                    }), n.setImage(), e(this).val("")
                })
            },
            setImage: function() {
                var e = this,
                    t = new FileReader;
                t.onload = function(t) {
                    var a = new Image;
                    a.src = t.target.result, a.onload = function() {
                        e.$image.attr("src", t.target.result), Event.showMsg({
                            load: !0
                        }), e.display()
                    }
                }, t.readAsDataURL(e.file)
            },
            display: function() {
                var t = this;
                Dialog.open({
                    form: t.form,
                    title: "ปรับขนาดรูปภาพ",
                    body: '<div class="img-preveiw"></div>',
                    onOpen: function(a) {
                        a.$dialog.find(".img-preveiw").html(t.setCropimage()), t.preveiw(), a.$dialog.find("form").submit(function(a) {
                            a.preventDefault();
                            var n = e(this),
                                i = new FormData;
                            e.each(n.serializeArray(), function(e, t) {
                                i.append(t.name, t.value)
                            }), i.append("file1", t.file), Event.inlineSubmit(n, i).done(function(e) {
                                Event.processForm(n, e), Dialog.close()
                            }).fail(function() {}).always(function() {});
                        })
                    },
                    button: '<button class="btn btn-blue btn-submit" type="submit" ><span class="btn-text">บันทึก</span></button><a role="dialog-close" class="btn js-close-dialog btn-white"><span class="btn-text">ยกเลิก</span></a>'
                })
            },
            preveiw: function() {
                var t = this;
                "undefined" != typeof e.fn.cropper ? (t.$image.cropper(t.options), Event.hideMsg()) : Event.getPlugin("cropper").done(function() {
                    t.$image.cropper(t.options), Event.hideMsg()
                }).fail(function() {
                    console.log("Is not connect plugin:"), Event.hideMsg()
                })
            },
            setCropimage: function() {
                var t = this,
                    a = e("<div>", {
                        "class": "image-preveiw"
                    }),
                    n = e("<input/>", {
                        type: "hidden",
                        autocomplete: "off",
                        name: "cropimage[X]"
                    }),
                    i = e("<input/>", {
                        type: "hidden",
                        autocomplete: "off",
                        name: "cropimage[Y]"
                    }),
                    s = e("<input/>", {
                        type: "hidden",
                        autocomplete: "off",
                        name: "cropimage[height]"
                    }),
                    o = e("<input/>", {
                        type: "hidden",
                        autocomplete: "off",
                        name: "cropimage[width]"
                    });
                e("#dataWidth");
                var l = e("<input/>", {
                        type: "hidden",
                        autocomplete: "off",
                        name: "cropimage[rotate]"
                    }),
                    r = e("<input/>", {
                        type: "hidden",
                        autocomplete: "off",
                        name: "cropimage[scaleX]"
                    }),
                    d = e("<input/>", {
                        type: "hidden",
                        autocomplete: "off",
                        name: "cropimage[scaleY]"
                    });
                return t.options.crop = function(e) {
                    n.val(Math.round(e.x)), i.val(Math.round(e.y)), s.val(Math.round(e.height)), o.val(Math.round(e.width)), l.val(e.rotate), r.val(e.scaleX), d.val(e.scaleY)
                }, a.css({
                    height: 460,
                    width: 460
                }).append(n, i, o, s, l, r, d, t.$image)
            }
        };
        e.fn.save_as_picture = function(t) {
            return this.each(function() {
                var a = Object.create(y);
                a.init(t, this), e.data(this, "save_as_picture", a)
            })
        }, e.fn.save_as_picture.options = {
            aspectRatio: 1,
            autoCropArea: 1,
            strict: !0,
            guides: !0,
            highlight: !1,
            dragCrop: !1,
            cropBoxMovable: !0,
            cropBoxResizable: !1,
            onCallback: function() {}
        };
        var x = {
            init: function(t, a) {
                var n = this;
                return n.elem = a, n.$elem = e(a), t.url || (t.URL = n.$elem.attr("data-url")), t.max_width = n.$elem.width(), t.URL ? (t.onReady = function() {
                    console.log("onReady")
                }, t.onError = function() {
                    console.log("Error")
                }, void uiElem.iframePlayer.youtube.init(t, n.elem)) : !1
            }
        };
        e.fn.playYoutube = function(t) {
            return this.each(function() {
                var a = Object.create(x);
                a.init(t, this), e.data(this, "playYoutube", a)
            })
        };
        var C = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), t = e.extend({}, n.$elem.data(), t), n.options = e.extend({}, e.fn.tooltip.options, t), n.options.text || "" == n.$elem.attr("title") || (n.options.text = n.$elem.attr("title"), n.$elem.removeAttr("title")), n.is_show = !1, n.timeout = 0, n.Event()
            },
            Event: function() {
                var e = this;
                e.$elem.mouseenter(function() {
                    e.show()
                }).mouseleave(function() {
                    clearTimeout(e.timeout), e.hide()
                }), e.$elem.on("click", function(t) {
                    clearTimeout(e.timeout), e.hide()
                })
            },
            show: function(e) {
                var t = this;
                return t.options.text && "" != t.options.text ? void(t.timeout = setTimeout(function() {
                    t.is_show = !0, t.get()
                }, e || t.options.reload)) : !1
            },
            hide: function() {
                var e = this;
                return e.is_show ? (e.$positioner.remove(), void(e.is_show = !1)) : !1
            },
            get: function() {
                var a = this;
                a.$span = e("<span/>").html(a.options.text), a.$text = e("<div/>", {
                    "class": "tooltipText"
                }).html(a.$span), a.$content = e("<div/>", {
                    "class": "tooltipContent"
                }).html(a.$text), a.$container = e("<div/>", {
                    "class": "uiTooltipX"
                }).html(a.$content), a.$layer = e("<div/>", {
                    "class": "uiContextualLayer"
                }).html(a.$container), a.$positioner = e("<div/>", {
                    "class": "uiContextualLayerPositioner uiLayer"
                }).html(a.$layer);
                var n = a.$elem.offset();
                e("body").append(a.$positioner), a.$span.outerWidth() > a.$text.outerWidth() + 1 && a.$text.css("width", a.$text.outerWidth()).addClass("tooltipWrap"), n.top += a.$elem.outerHeight();
                var i = a.options.overflow;
                if (!i) {
                    i = {
                        Y: "Below",
                        X: "Left"
                    };
                    var s = e(t),
                        o = {
                            height: s.height() - (n.top + a.$container.outerHeight()),
                            width: s.width() - (n.left + a.$container.outerWidth())
                        };
                    o.height < 0 && (i.Y = "Above"), o.width < 0 && (i.X = "Right")
                }
                "Right" == i.X && (a.$layer.css("right", 0), n.left += a.$elem.outerWidth()), "Above" == i.Y && (a.$layer.css("bottom", 0), n.top -= a.$elem.outerHeight()), a.$layer.addClass("uiContextualLayer" + i.Y + i.X), a.$positioner.css(n)
            }
        };
        e.fn.tooltip = function(t) {
            return this.each(function() {
                var a = e.data(this);
                if (a.tooltip) a.tooltip.options = e.extend({}, a.tooltip.options, t);
                else {
                    var n = Object.create(C);
                    n.init(t, this), e.data(this, "tooltip", n)
                }
            })
        }, e.fn.tooltip.options = {
            reload: 800,
            pointer: !0,
            text: ""
        };
        var D = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(n.elem), n.options = e.extend({}, e.fn.checkedlists.options, t), n.dataSelect = [], n.$elem.find("[role=item]").not(".disabled").click(function(t) {
                    t.preventDefault(), n.selected(e(this).index())
                })
            },
            selected: function(t) {
                var a = this,
                    n = a.$elem.find("[role=item]").eq(t);
                if (n.toggleClass("checked", !n.hasClass("checked")), n.hasClass("checked")) {
                    if (n.find("[type=checkbox]").prop("checked", !0), a.dataSelect.push({
                            index: t,
                            elem: n
                        }), a.options.max) {
                        var i = a.dataSelect.length;
                        i > a.options.max && e.each(a.dataSelect, function(e, t) {
                            0 == e && (t.elem.removeClass("checked").find("[type=checkbox]").prop("checked", !1), a.dataSelect.splice(e, 1))
                        })
                    }
                } else e.each(a.dataSelect, function(e, n) {
                    n && n.index == t && (n.elem.find("[type=checkbox]").prop("checked", !1), a.dataSelect.splice(e, 1))
                });
                "function" == typeof a.options.onSelected && a.options.onSelected(a.dataSelect)
            }
        };
        e.fn.checkedlists = function(t) {
            return this.each(function() {
                var a = e.data(this);
                if (a.checkedlists) a.checkedlists.options = e.extend({}, a.checkedlists.options, t);
                else {
                    var n = Object.create(D);
                    n.init(t, this), e.data(this, "checkedlists", n)
                }
            })
        }, e.fn.checkedlists.options = {
            max: 1,
            onSelected: function() {}
        };
        var w = {
            init: function(t) {
                var a = this;
                a.$elem = e(t), a.$parent = a.$elem.parent(), a.$elem.click(function() {
                    a.$parent.hasClass("active") || "block" == a.$parent.find(">.content, [rel]").css("display") ? a.$parent.find(">.content, [rel]").slideUp(200, function() {
                        a.$parent.removeClass("active")
                    }) : a.$parent.find(">.content, [rel]").slideDown(200, function() {
                        a.$parent.addClass("active")
                    })
                })
            }
        };
        e.fn.openParent = function(t) {
            return this.each(function() {
                var t = Object.create(w);
                t.init(this), e.data(this, "openParent", t)
            })
        };
        var k = {
            init: function(t, a) {
                var n = this;
                n.$elem = e(a), n.options = e.extend({}, e.fn.editor_tags.options, t), n.$elem.addClass("ui-tags tag-input-wrapper"), n.$input = e("<input>", {
                    "class": "tag-input",
                    placeholder: n.options.placeholder
                }), n.$elem.append(n.$input), n.data = [], n.is_loading = !1, n.is_show = !1, n.is_focus = !1, n.is_time = null, n.is_keycodes = [37, 38, 39, 40, 13], n.url = URL + "tags/search/", n.setMenu(), n.$menu.mouseenter(function() {
                    n.is_focus = !0
                }).mouseleave(function() {
                    n.is_focus = !1
                }), n.$input.keyup(function(t) {
                    var a = e(this),
                        i = e.trim(a.val());
                    if (-1 == n.is_keycodes.indexOf(t.which)) {
                        if ("" == i) return !1;
                        n.search()
                    }
                }).keydown(function(t) {
                    var a = t.which,
                        i = e(this),
                        s = e.trim(i.val());
                    console.log(), (40 == a || 38 == a) && t.preventDefault(), 13 == a && "" != s && (n.addtag(s), i.val(""), t.preventDefault()), 8 == a && "" == s && n.$elem.find(".tag").length > 0 && n.remove(n.$elem.find(".tag").last().index())
                }).focus(function() {
                    n.resizeMenu()
                }).blur(function() {
                    var t = e(this),
                        a = e.trim(t.val());
                    "" != a && (n.addtag(a), t.val(""))
                }), n.$elem.click(function() {
                    n.$input.focus()
                }), n.$elem.delegate(".js-remove", "click", function() {
                    n.remove(e(this).closest(".tag").index())
                }), e.each(n.options.data, function(e, t) {
                    n.addtag(t.name)
                })
            },
            setMenu: function() {
                var a = this,
                    n = e("<div/>", {
                        "class": "uiTypeaheadView"
                    });
                a.$menu = e("<ul/>", {
                    "class": "has-loading ",
                    role: "listbox"
                }), n.html(e("<div/>", {
                    "class": "bucketed"
                }).append(a.$menu));
                var i = a.$input.offset();
                i.top += a.$input.outerHeight(), i.left -= 1, uiLayer.get(i, n), a.$layer = a.$menu.parents(".uiLayer"), a.$layer.addClass("hidden_elem"), e(t).resize(function() {
                    a.resizeMenu()
                })
            },
            resizeMenu: function() {
                var e = this,
                    t = e.$input.offset();
                t.top += e.$input.outerHeight(), t.top -= 1, e.$menu.parents(".uiContextualLayerPositioner").css(t)
            },
            search: function(t) {
                var a = this;
                a.is_time = setTimeout(function() {
                    return a.q = e.trim(a.$input.val()), "" == a.q ? !1 : void a.fetch().done(function(e) {})
                }, t || 800)
            },
            fetch: function() {
                var t = this;
                return e.ajax({
                    url: t.url,
                    data: {
                        q: t.q
                    },
                    dataType: "json"
                }).fail(function() {}).always(function() {})
            },
            buildFrag: function() {},
            addtag: function(t) {
                var a = this;
                t = t.toString();
                var n = !1;
                e.each(a.data, function(e, i) {
                    (i == t || i.toUpperCase() == t || i.toLowerCase() == t || a.capitalizeFirstLetter(i) == t) && (n = !0)
                }), n || (a.data.push(t), a.$input.before(a.getTag(t)))
            },
            capitalizeFirstLetter: function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            },
            getTag: function(t) {
                var a = this,
                    n = e("<div>", {
                        "class": "tag"
                    }).append(e("<span>", {
                        "class": "text"
                    }).text(t), e("<input>", {
                        type: "hidden",
                        name: a.options.name,
                        autocomplete: "off",
                        "class": "hiddenInput"
                    }).val(t), e("<button>", {
                        type: "button",
                        "class": "js-remove"
                    }).html(e("<i>", {
                        "class": "icon-remove"
                    })));
                return n.data("text", t), n
            },
            remove: function(t) {
                var a = this,
                    n = a.$elem.find(".tag").eq(t),
                    i = n.data("text"),
                    s = [];
                e.each(a.data, function(e, t) {
                    t == i || t.toUpperCase() == i || t.toLowerCase() == i || a.capitalizeFirstLetter(t) == i || s.push(t)
                }), a.data = s, n.remove()
            }
        };
        e.fn.editor_tags = function(t) {
            return this.each(function() {
                var a = Object.create(k);
                a.init(t, this), e.data(this, "editor_tags", a)
            })
        }, e.fn.editor_tags.options = {
            placeholder: "",
            name: "tags[]",
            data: []
        };
        var _ = {
            init: function(t, a) {
                var n = this;
                n.$elem = e(a), n.options = e.extend({}, e.fn.editor_tags.options, t), n.$ul = e("<ul>", {
                    "class": ""
                }), n.$add = e("<a>", {
                    "class": "fcg mts fsm",
                    text: "+ add"
                }), n.$elem.addClass("select-many"), n.$elem.append(n.$ul, n.$add), n.$add.click(function() {
                    n["new"]()
                });
                var i = !1;
                e.each(n.options.lists, function(e, t) {
                    t.checked && (i = !0, n["new"](t.id || t.value))
                }), i || n["new"](), n.$ul.delegate(".js-remove", "click", function() {
                    return 1 == n.$ul.find("li").length ? (n.$ul.find("li").first().find(":input").val(""), !1) : void e(this).closest("li").remove()
                })
            },
            "new": function(e) {
                var t = this;
                t.$ul.append(t.setItem(e))
            },
            setItem: function(t) {
                var a = this,
                    n = e("<li>");
                return n.append(a.setSelect(t), e("<a>", {
                    "class": "js-remove"
                }).html(e("<i>", {
                    "class": "icon-remove"
                })))
            },
            setSelect: function(t) {
                var a = this,
                    n = e("<select>", {
                        "class": a.options["class"],
                        name: a.options.name
                    });
                return n.append(e("<option>", {
                    value: "",
                    text: "-"
                })), e.each(a.options.lists, function(a, i) {
                    var s = i.id || i.value;
                    n.append(e("<option>", {
                        value: s,
                        text: i.name || i.text,
                        selected: t == s ? !0 : !1
                    }))
                }), n
            }
        };
        e.fn.selectmany = function(t) {
            return this.each(function() {
                var a = Object.create(_);
                a.init(t, this), e.data(this, "selectmany", a)
            })
        }, e.fn.selectmany.options = {
            placeholder: "",
            name: "",
            "class": ""
        };
        var M = {
            init: function(t, a) {
                var n = this;
                n.$elem = e(a), n.options = e.extend({}, e.fn.upload1.options, t), n.$input = n.$elem.find("input[type=file]"), n.$image = n.$elem.find(".ProfileImageComponent_image"), n.$input.change(function() {
                    n.file = this.files[0], n.setImage(n.file), e(this).val("")
                }), n.$elem.find(".js-remove").click(function() {
                    if (n.$image.html(""), n.$elem.removeClass("has-image"), n.options.autosize) {
                        var e = {
                            width: n.options.max_width,
                            height: n.options.max_height
                        };
                        n.$elem.find(".ProfileImageComponent").css(e)
                    }
                })
            },
            setImage: function() {
                var t = this,
                    a = e("<img>", {
                        "class": "img",
                        alt: ""
                    }),
                    n = new FileReader;
                n.onload = function(n) {
                    var i = new Image;
                    i.src = n.target.result, i.onload = function() {
                        a.attr("src", n.target.result);
                        var i = new FormData;
                        e.each(t.options.data, function(e, t) {
                            i.append(e, t)
                        }), i.append("file1", t.file);
                        var s = this.width,
                            o = this.height;
                        t.$elem.addClass("has-loading"), e.ajax({
                            type: "POST",
                            url: t.options.url,
                            data: i,
                            dataType: "json",
                            processData: !1,
                            contentType: !1
                        }).done(function(e) {
                            return e.message && Event.showMsg({
                                text: e.message,
                                auto: !0
                            }), e.error ? !1 : (t.resize(s, o), void t.display(a))
                        }).always(function() {
                            t.$elem.removeClass("has-loading")
                        }).fail(function() {})
                    }
                }, n.readAsDataURL(t.file)
            },
            resize: function(e, t) {
                var a = this;
                if (a.options.autosize) {
                    var n = {
                        width: a.options.max_width,
                        height: a.options.max_height
                    };
                    a.$image.removeClass("hauto").removeClass("wauto"), e > t && (a.$image.addClass("hauto"), n.height = t * n.width / e), t > e && (a.$image.addClass("wauto"), n.width = e * n.height / t), a.$elem.find(".ProfileImageComponent").css(n)
                }
            },
            display: function(e) {
                var t = this;
                t.$elem.addClass("has-image"), t.$image.html(e)
            },
            preveiw: function() {
                var t = this;
                "undefined" != typeof e.fn.cropper ? (t.$image.cropper(t.options), Event.hideMsg()) : Event.getPlugin("cropper").done(function() {
                    t.$image.cropper(t.options), Event.hideMsg()
                }).fail(function() {
                    console.log("Is not connect plugin:"), Event.hideMsg()
                })
            }
        };
        e.fn.upload1 = function(t) {
            return this.each(function() {
                var a = Object.create(M);
                a.init(t, this), e.data(this, "upload1", a)
            })
        }, e.fn.upload1.options = {
            autosize: !1,
            max_width: 128,
            max_height: 128
        };
        var T = {
            init: function(t, a) {
                var n = this;
                n.$elem = e(a), n.options = e.extend({}, e.fn.upload.options, t), n.$outInput = n.$elem.find("input[type=file]"), n.url = URL + "uploadx/set/", "this" == n.options.preview && (n.$upload = n.setBox(), n.$listsbox = n.$upload.find("#listsbox"), n.$main = n.$upload.find("#main"), n.$elem.html(n.$upload), n.$main.height(n.options.main_height || n.$main.parent().height()), n.$input = n.$upload.find(".js-add"), n.$input.click(function() {
                    var t = e('<input type="file" />');
                    t.attr("accept", n.options.accept), t.attr("multiple", n.options.multiple), t.trigger("click"), t.change(function() {
                        n.buildFragFiles(this.files), e(this).val("")
                    })
                })), n.$outInput.change(function() {
                    "dialog" == n.options.preview && n.open(), n.buildFragFiles(this.files), e(this).val("")
                })
            },
            buildFragFiles: function(t) {
                var a = this;
                e.each(t, function(e, t) {
                    a.setImage(t)
                })
            },
            open: function() {
                var e = this;
                e.$upload = e.setBox(), e.$listsbox = e.$upload.find("#listsbox"), Dialog.open({
                    onClose: function() {},
                    title: e.options.title,
                    width: 750,
                    body: e.$upload[0],
                    form: '<div class="model-upload-wrapper">'
                })
            },
            setBox: function() {
                var t = this,
                    a = e("<div>", {
                        "class": "upload-wrapper"
                    }),
                    n = e("<div>", {
                        "class": "upload-wrapper-header"
                    }),
                    i = e("<ul>", {
                        "class": "clearfix"
                    });
                t.options.tabs && i.append(e("<li>").append(e("<button>", {
                    "class": "active",
                    type: "button",
                    text: "My Images"
                }))), i.append(e("<li>", {
                    "class": "rfloat"
                }).append(e("<a>", {
                    "class": "mtm mrm btn btn-blue js-add",
                    text: "Upload Images"
                })));
                var s = e("<div>", {
                    "class": "tabs clearfix"
                });
                s.append(i);
                var o = e("<div>", {
                    "class": "meta clearfix"
                });
                $actions = e("<ul>", {
                    "class": "group-actions clearfix hidden_elem"
                }), $actions.append(e("<li>", {
                    "class": "delete"
                }).append(e("<button>", {
                    "class": "btn",
                    type: "button",
                    text: "Delete"
                }))), o.append($actions, "" == t.options.message ? "" : e("<div>", {
                    "class": "upload-message fsm pam uiBoxYellow mas"
                }).text(t.options.message)), n.append(s, o);
                var l = e("<div>", {
                    "class": "upload-wrapper-body"
                });
                if (t.options.sidebar) {
                    var r = e("<div>", {
                        "class": "sidebar"
                    });
                    r.append(e("<div>", {
                        "class": "sidebar-content"
                    }).append(e("<ul>").append(e("<li>").append(e("<a>").text("All Media")), e("<li>").append(e("<a>").text("My Media")))), e("<div>", {
                        "class": "sidebar-footer"
                    }).append(e("<ul>").append(e("<li>").append(e("<a>").append('<i class="icon-plus mrs"></i>', "Add New Folder"))))), l.append(r)
                }
                var d = e("<div>", {
                    "class": "upload-wrapper-main clearfix has-empty",
                    id: "main"
                });
                if (d.append(e("<div>", {
                        "class": "breadcrumbs"
                    }).html("<span>All Media</span>"), e("<div>", {
                        "class": "clearfix",
                        id: "listsbox"
                    }), e("<div>", {
                        "class": "empty no-entities-placeholder"
                    }).html('<div class="no-entities no-picture"><div class="empty-icon-image"><i class="icon-image"></i></div><a class="js-add">Upload Images</a></div></div>')), l.append(d), a.append(n, l), t.options.footer) {
                    var c = e("<div>", {
                        "class": "upload-wrapper-footer clearfix"
                    });
                    c.append(e("<div>", {
                        "class": "lfloat upload-status hidden_elem"
                    }).append(e("<i>", {
                        "class": "icon-check mrs"
                    }), e("<div>", {
                        "class": "title"
                    }).append("Uploaded&nbsp;", e("<span>", {
                        "class": "numbers"
                    }).text("(9/9 Files)")), e("<div>", {
                        "class": "progress-bar medium"
                    }).append(e("<span>", {
                        "class": "progress blue"
                    })), e("<div>", {
                        "class": "fails"
                    }).append("fails")), e("<div>", {
                        "class": "rfloat"
                    }).append(e("<a>", {
                        "class": "btn btn-blue"
                    }).text("Done"))), a.append(c)
                }
                return a
            },
            setImage: function(e) {
                var t = this,
                    a = t.editablePhoto();
                e.$elem = a, t.display(a, !0), t.saveFile(e)
            },
            editablePhoto: function() {
                var t = this;
                return e("<div/>", {
                    "class": "uiEditablePhoto has-loading"
                }).css({
                    width: t.options.max_width,
                    height: t.options.max_height,
                    margin: t.options.margin
                }).append(e("<div/>", {
                    "class": "photoWrap"
                }).css({
                    width: t.options.max_width,
                    height: t.options.max_height
                }).append(t.editablePhotoProgress(), t.editablePhotoError(), e("<div/>", {
                    "class": "scaledImageContainer scaledImage"
                })), t.options.caption ? t.editablePhotoCaption() : "", t.editablePhotoControls())
            },
            editablePhotoError: function() {
                return e("<div/>").addClass("empty-error").append(e("<span/>").addClass("empty-title").append(e("<span/>"))).append(e("<div/>").addClass("empty-message"))
            },
            editablePhotoProgress: function() {
                return e("<div/>").addClass("progress-bar medium").append(e("<span/>").addClass("bar blue").append(e("<span/>"))).append(e("<div/>").addClass("text").append(uiElem.loader()))
            },
            editablePhotoCaption: function() {
                return e("<div/>", {
                    "class": "inputs"
                }).append(e("<div/>").addClass("captionArea").append(e("<div/>").addClass("uiTypeahead").append(e("<textarea/>").addClass("uiTextareaNoResize textInput textCaption").attr({
                    title: "เขียนคำบรรยายรูปภาพ...",
                    name: "caption_text",
                    placeholder: "เขียนคำบรรยายรูปภาพ"
                }))))
            },
            editablePhotoControls: function() {
                return e("<div/>").addClass("controls").append(e("<a/>", {
                    "class": "control remove"
                }).html(e("<i/>", {
                    "class": "icon-remove",
                    title: "ยกเลิก"
                })), e("<a/>", {
                    "class": "control checked"
                }).html(e("<i/>", {
                    "class": "icon-check",
                    title: "เลือก"
                })))
            },
            saveFile: function(a) {
                var n = this,
                    i = a.$elem.find(".progress-bar"),
                    s = (a.$elem.find(".scaledImage"), new FormData);
                s.append("file1", a), e.ajax({
                    xhr: function() {
                        var e = new t.XMLHttpRequest;
                        return e.upload.addEventListener("progress", function(e) {
                            if (e.lengthComputable) {
                                var t = parseInt(e.loaded / e.total * 100, 10);
                                i.find(".bar").width(t + "%")
                            }
                        }, !1), e
                    },
                    url: n.url,
                    type: "POST",
                    data: s,
                    dataType: "json",
                    processData: !1,
                    contentType: !1
                }).done(function(e) {
                    return e.error ? (a.$elem.removeClass("has-loading").addClass("has-error"), a.$elem.find(".textCaption").attr("disabled", !0), a.$elem.find(".empty-message").text(e.error_message), a.$elem.find(".empty-error").css("margin-top", a.$elem.find(".empty-error").height() / 2 * -1), !1) : void(e.url && (n.loadImageUrl(a.$elem, e.url, e.photo_id), n.options.caption && a.$elem.addClass("has-caption")))
                }).always(function() {
                    n.getFiles()
                }).fail(function() {})
            },
            getFiles: function() {},
            loadImageUrl: function(t, a, n) {
                var i = this,
                    s = new Image;
                s.onload = function() {
                    var a = this,
                        n = t.find(".photoWrap").height() || i.options.max_height,
                        s = t.find(".photoWrap").width() || i.options.max_width,
                        o = i.resizeImage({
                            width: s,
                            height: n
                        }, {
                            width: a.width,
                            height: a.height
                        }),
                        l = o.width > o.height ? !1 : !0;
                    t.find(".scaledImage").html(a), e(a).addClass(l ? "scaledImageFitHeight" : "scaledImageFitWidth"), t.removeClass("has-loading").addClass("has-file").find(".photoWrap").addClass(l ? "" : "fitWidth").css({
                        width: s,
                        height: n,
                        lineHeight: n + "px"
                    }).find(".scaledImage").css({
                        width: o.width,
                        height: o.height
                    })
                }, s.onerror = function(e) {
                    t.find(".empty-message").text("ไม่สามารถดูรูปภาพได้หรือไฟล์รูปภาพถูกลบไปแล้ว"), t.find(".textCaption").attr("disabled", !0), t.removeClass("has-loading").addClass("has-error")
                }, s.src = a
            },
            resizeImage: function(e, t) {
                return t.width == t.height ? e : t.width > t.height ? {
                    width: e.width.toFixed(),
                    height: (t.height * e.height / t.width).toFixed(),
                    org: t,
                    fitHeight: !0
                } : {
                    width: (t.width * e.width / t.height).toFixed(),
                    height: e.height.toFixed(),
                    org: t,
                    fitHeight: !1
                }
            },
            display: function(e, t) {
                var a = this;
                t && 0 != a.$listsbox.find(".uiEditablePhoto").length ? a.$listsbox.find(".uiEditablePhoto").first().before(e) : a.$listsbox.append(e), a.$upload.find("#main").hasClass("has-empty") && a.$upload.find("#main").removeClass("has-empty")
            }
        };
        e.fn.upload = function(t) {
            return this.each(function() {
                var a = Object.create(T);
                a.init(t, this), e.data(this, "upload", a)
            })
        }, e.fn.upload.options = {
            autosize: !1,
            margin: 10,
            max_width: 128,
            max_height: 128,
            title: "Upload",
            multiple: "",
            accept: "image/*",
            name: "file",
            main_height: 350,
            message: "",
            tabs: "",
            caption: !1,
            header: !0,
            sidebar: !1,
            footer: !0
        };
        var F = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.options = e.extend({}, e.fn.imageCover2.options, t), n.url = URL + "uploadx/image_cover", n.initElem(), n.initEvent()
            },
            initElem: function() {
                var t = this;
                t.$elem = e(t.elem);
                var a = t.$elem.width(),
                    n = t.options.scaledY * a / t.options.scaledX;
                t.$elem.css({
                    width: a,
                    height: n
                }), t.options.image_url && t.displayImage()
            },
            initEvent: function() {
                var e = this;
                e.$elem.find("[type=file]").change(function() {
                    e.setImage(this.files[0])
                })
            },
            setImage: function(t) {
                var a = this;
                a.$elem.addClass("has-loading");
                a.$elem.find(".progress-bar");
                $remove.click(function(e) {
                    e.preventDefault(), a.clear()
                });
                var n = e("<div/>", {
                    "class": "image-crop"
                });
                a.$elem.find(".preview").append(n);
                var i = (a.$elem.width(), new FileReader);
                i.onload = function(i) {
                    var s = new Image;
                    s.src = i.target.result, $image = e(s).addClass("img img-crop"), s.onload = function() {
                        var e = a.$elem.width() || a.options.scaledX,
                            i = this.height * e / this.width;
                        n.css({
                            width: e,
                            height: i
                        }), a.$elem.css({
                            width: e,
                            height: i
                        }), setTimeout(function() {
                            a.fetch(t).done(function(e) {
                                a.$elem.addClass("has-file"), n.html($image), a.setControl()
                            })
                        }, 1)
                    }
                }, i.readAsDataURL(t)
            },
            fetch: function(a) {
                var n = this,
                    i = n.$elem.find(".progress-bar"),
                    s = new FormData;
                return s.append("file1", a), e.each(n.options.data_post, function(e, t) {
                    s.append(e, t)
                }), e.ajax({
                    xhr: function() {
                        var e = new t.XMLHttpRequest;
                        return e.upload.addEventListener("progress", function(e) {
                            if (e.lengthComputable) {
                                var t = parseInt(e.loaded / e.total * 100, 10);
                                i.find(".bar").width(t + "%")
                            }
                        }, !1), e
                    },
                    url: n.url,
                    type: "POST",
                    data: s,
                    dataType: "json",
                    processData: !1,
                    contentType: !1
                }).always(function() {
                    n.$elem.removeClass("has-loading")
                }).fail(function() {
                    n.alert({
                        title: "เกิดข้อผิดพลาด!",
                        text: "ไม่สามารถเชื่อมกับลิงก์ได้"
                    })
                })
            },
            alert: function(e) {
                alert(e.text)
            },
            clear: function() {
                var e = this;
                e.$elem.find("[type=file]").val(""), e.$elem.find(".preview").empty(), e.$elem.removeClass("has-file")
            },
            displayImage: function() {
                var t = this;
                t.setControl();
                var a = e("<div/>", {
                    "class": "image-crop"
                });
                t.$elem.find(".preview").append(a), $image = e("<img>", {
                    "class": "img img-crop",
                    src: t.options.image_url,
                    alt: ""
                }), a.html($image), t.$elem.addClass("has-file")
            },
            setControl: function() {
                var t = this,
                    a = e("<div/>", {
                        "class": "image-cover-edit",
                        text: "เปลี่ยนรูป"
                    });
                e("<div/>", {
                    "class": "image-cover-edit",
                    text: "ลบ"
                });
                t.$elem.find(".preview").append(a), a.click(function() {
                    Media.open({
                        title: "เปลี่ยนรูป"
                    }, {
                        obj_id: t.options.data_post.id,
                        obj_type: t.options.data_post.type,
                        load: URL + "products/get_images/" + t.options.data_post.id,
                        max: 1,
                        type: "select"
                    })
                })
            }
        };
        e.fn.imageCover2 = function(t) {
            return this.each(function() {
                var a = Object.create(F);
                a.init(t, this), e.data(this, "imageCover2", a)
            })
        }, e.fn.imageCover2.options = {
            scaledX: 640,
            scaledY: 360,
            data_post: {}
        };
        var I = {
            init: function(t, a) {
                var n = this;
                return n.$elem = e(a), n.options = t, n.options.url ? void n.$elem.change(function() {
                    var t = n.$elem.val();
                    "checkbox" == n.$elem.attr("type") && (t = n.$elem.prop("checked") ? 1 : 0), Event.showMsg({
                        text: "บันทึกแล้ว",
                        load: !0,
                        auto: !0
                    }), e.post(n.options.url, {
                        value: t
                    }, function() {}, "json")
                }) : !1
            }
        };
        e.fn._update = function(t) {
            return this.each(function() {
                var a = Object.create(I);
                a.init(t, this), e.data(this, "_update", a)
            })
        };
        var P = {
            init: function(t, a) {
                var n = this;
                n.elem = a, n.$elem = e(a), n.options = e.extend({}, e.fn.closedate.options, t), n.config(), n.setElem(), n.setMenu(), n.hideMenu(), n.display(), n.activeIndex = n.options.activeIndex || 0, n._activeIndex();
                var i = n.$menu.find("li").eq(n.activeIndex).data();
                n.selectMenu(i), n.events(), "function" == typeof n.options.onComplete && n.options.onComplete(n)
            },
            config: function() {
                var e = this;
                e.today = new Date, e.today.setHours(0, 0, 0, 0), e.startDate = new Date(e.options.start || e.today), null == e.options.start && e.startDate.setDate(1), e.endDate = new Date(e.options.end || e.today);
                var t = Object.create(Datelang);
                t.init({
                    lang: e.options.lang,
                    type: e.options.type
                }), e.string = t, e.options.firstDate && (e.options.firstDate = new Date(e.options.firstDate), e.options.firstYear = e.options.firstDate.getFullYear())
            },
            setElem: function() {
                var t = this;
                t.$startInput = e("<input>", {
                    "class": "hiddenInput",
                    type: "hidden",
                    name: "start_date"
                }), t.$endInput = e("<input>", {
                    "class": "hiddenInput",
                    type: "hidden",
                    name: "end_date"
                }), t.$text = e("<span>", {
                    "class": "btn-text"
                }), t.original = t.$elem;
                var a = e("<div/>", {
                    "class": "uiPopover"
                });
                t.$elem.replaceWith(a), t.$elem = a, t.$btn = e("<a>", {
                    "class": "btn btn-box btn-toggle"
                }).append(t.$text), t.options.icon || t.$btn.append(e("<i/>", {
                    "class": "img mls icon-angle-down"
                })), t.$elem.append(t.$btn, t.$startInput, t.$endInput), t.$calendar = e("<div>", {
                    "class": "uiContextualPositioner"
                }), t.$calendar.append(e("<div>", {
                    "class": "toggleFlyout calendarGridTableSmall"
                })), t.options.max_width && t.menu.find(".toggleFlyout").css("width", t.options.max_width), t.$start = e("<td>", {
                    "class": "start"
                }), t.$end = e("<td>", {
                    "class": "end"
                }), t.$preveiw = e("<span>", {
                    "class": "preveiw lfloat"
                });
                var n = e("<table/>", {
                    "class": "calendarCloseDateGridTable"
                }).append(e("<tr>").append(t.$start, e("<td>", {
                    "class": "to",
                    text: "to"
                }), t.$end), e("<tr>").append(e("<td>", {
                    colspan: 3,
                    "class": "tar ptm"
                }).append(t.$preveiw, e("<a>", {
                    "class": "btn btn-cancel",
                    text: "ยกเลิก"
                }), e("<a>", {
                    "class": "btn btn-blue btn-submit",
                    text: "นำไปใช้"
                }))));
                t.$calendar.find(".toggleFlyout").append(n)
            },
            setMenu: function() {
                var a = this;
                a.$menu = e("<ul/>", {
                    "class": "uiContextualMenu",
                    role: "listbox"
                });
                var n = a.$btn.offset();
                n.top += a.$btn.outerHeight(), uiLayer.get(n, a.$menu), a.$layer = a.$menu.parents(".uiLayer"), a.$menu.mouseenter(function() {
                    a.is_focus = !0
                }).mouseleave(function() {
                    a.is_focus = !1
                }), a.resizeMenu(), e(t).resize(function() {
                    a.resizeMenu()
                }), e.each(a.options.options, function(e, t) {
                    a.$menu.append(a.setItemMenu(t))
                }), a.$menu.find("li").mouseenter(function() {
                    e(this).addClass("active").siblings().removeClass("active")
                }), a.$menu.mouseleave(function() {
                    a._activeIndex()
                })
            },
            resizeMenu: function() {
                var a = this;
                a.$menu.width(a.$btn.outerWidth() - 2);
                var n = a.$btn.offset();
                n.top += a.$btn.outerHeight(), n.top -= 1, a.$menu.css({
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: e(t).height() - n.top
                }), a.$menu.parents(".uiContextualLayerPositioner").css(n)
            },
            setItemMenu: function(t) {
                var a = e("<li/>");
                return t.divider ? a.addClass("divider") : a.html(e("<a>", {
                    "class": "clearfix"
                }).append(e("<span>", {
                    "class": "text",
                    text: t.text
                }))), t.image_url && a.addClass("picThumb"), "new" == t.activity && a.addClass("new").find(".text").before(e("<div>", {
                    "class": "box-icon"
                }).append(e("<i>", {
                    "class": "icon-plus"
                }))), a.data(t), a
            },
            updateCalendar: function(t, a) {
                var n = this;
                n.setDataStr();
                var i = n.setCalendar(t || n.startDate);
                i.addClass("start"), i.find("[data-date=" + n.startDateStr + "]").addClass("select-start"), i.find("[data-date=" + n.endDateStr + "]").addClass("select-end"), n.$start.html(i);
                var s = n.setCalendar(a || n.endDate);
                s.addClass("end"), s.find("[data-date=" + n.startDateStr + "]").addClass("select-start"), s.find("[data-date=" + n.endDateStr + "]").addClass("select-end"), n.$end.html(s), n.$preveiw.text(n.setTextCalendar()), e("td[data-date]", i).click(function(t) {
                    t.stopPropagation();
                    var a = new Date(e(this).attr("data-date"));
                    return a.setHours(0, 0, 0, 0), a.getTime() > n.endDate.getTime() ? !1 : (n.startDate = a, void n.updateCalendar(a, s.data("date")))
                }), e("td.prev, td.next", i).click(function(t) {
                    var a = e(this).hasClass("prev") ? -1 : 1,
                        o = new Date(i.data("date"));
                    o.setMonth(o.getMonth() + a), n.updateCalendar(o, s.data("date")), t.stopPropagation()
                }), e(".selectMonth", i).change(function(t) {
                    var a = new Date(i.data("date"));
                    a.setMonth(e(this).val()), n.updateCalendar(a, s.data("date"))
                }).click(function(e) {
                    e.stopPropagation()
                }), e(".selectYear", i).change(function(t) {
                    var a = new Date(i.data("date"));
                    a.setYear(e(this).val()), n.updateCalendar(a, s.data("date"))
                }).click(function(e) {
                    e.stopPropagation()
                }), e("td[data-date]", s).click(function(t) {
                    t.stopPropagation();
                    var a = new Date(e(this).attr("data-date"));
                    return a.setHours(0, 0, 0, 0), a.getTime() < n.startDate.getTime() ? !1 : (n.endDate = a, void n.updateCalendar(i.data("date"), a))
                }), e("td.prev, td.next", s).click(function(t) {
                    var a = e(this).hasClass("prev") ? -1 : 1,
                        o = new Date(s.data("date"));
                    o.setMonth(o.getMonth() + a), n.updateCalendar(i.data("date"), o), t.stopPropagation()
                }), e(".selectMonth", s).change(function(t) {
                    var a = new Date(s.data("date"));
                    a.setMonth(e(this).val()), n.updateCalendar(i.data("date"), a)
                }).click(function(e) {
                    e.stopPropagation()
                }), e(".selectYear", s).change(function(t) {
                    var a = new Date(s.data("date"));
                    a.setYear(e(this).val()), n.updateCalendar(i.data("date"), a)
                }).click(function(e) {
                    e.stopPropagation()
                })
            },
            setDataStr: function() {
                var e = this;
                e.startDateStr = e.startDate.getFullYear(), m = e.startDate.getMonth() + 1, e.startDateStr += "-" + (m < 10 ? "0" + m : m), d = e.startDate.getDate(), e.startDateStr += "-" + (d < 10 ? "0" + d : d), e.endDateStr = e.endDate.getFullYear(), m = e.endDate.getMonth() + 1, e.endDateStr += "-" + (m < 10 ? "0" + m : m), d = e.endDate.getDate(), e.endDateStr += "-" + (d < 10 ? "0" + d : d)
            },
            updateData: function(e) {
                var t = this;
                t.setDataStr(), e || (e = t.setTextCalendar()), t.$text.text(e), t.$startInput.val(t.startDateStr), t.$endInput.val(t.endDateStr), "function" == typeof t.options.onChange && t.options.onChange(t)
            },
            setTextCalendar: function() {
                var t = this,
                    a = "-",
                    n = e("<span>");
                return t.startDate.getDate() == t.endDate.getDate() && t.startDate.getMonth() == t.endDate.getMonth() && t.startDate.getFullYear() == t.endDate.getFullYear() ? n.append(t.endDate.getDate(), " ", t.string.month(t.startDate.getMonth(), "normal", t.options.lang), " ", t.string.year(t.startDate.getFullYear(), "normal", t.options.lang)) : t.startDate.getMonth() == t.endDate.getMonth() && t.startDate.getFullYear() == t.endDate.getFullYear() ? n.append(t.startDate.getDate(), a, t.endDate.getDate(), " ", t.string.month(t.startDate.getMonth(), "normal", t.options.lang), " ", t.string.year(t.startDate.getFullYear(), "normal", t.options.lang)) : t.startDate.getFullYear() == t.endDate.getFullYear() ? n.append(t.startDate.getDate(), " ", t.string.month(t.startDate.getMonth(), "normal", t.options.lang), a, t.endDate.getDate(), " ", t.string.month(t.endDate.getMonth(), "normal", t.options.lang), " ", t.string.year(t.startDate.getFullYear(), "normal", t.options.lang)) : n.append(t.startDate.getDate(), " ", t.string.month(t.startDate.getMonth(), "normal", t.options.lang), " ", t.string.year(t.startDate.getFullYear(), "normal", t.options.lang), a, t.endDate.getDate(), " ", t.string.month(t.endDate.getMonth(), "normal", t.options.lang), " ", t.string.year(t.endDate.getFullYear(), "normal", t.options.lang)), n.text()
            },
            setCalendar: function(t) {
                var a = this,
                    n = new Date(t),
                    i = new Date(n.getFullYear(), n.getMonth(), 1);
                i = new Date(n), i.setDate(1);
                var s = (i.getTime(), new Date(i));
                s.setMonth(s.getMonth() + 1), s.setDate(0);
                var o = (s.getTime(), s.getDate()),
                    l = new Date(i);
                l.setDate(0);
                var r = l.getDay(),
                    c = l.getDate(),
                    p = a.options.weekDayStart;
                p = p > r ? 7 - p : r - p;
                for (var u = e("<tbody>"), h = [], f = 0, v = 0; 7 > f; f++) {
                    for (var g = e("<tr>"), $ = [], b = !1, y = 0; 7 > y; y++, v++) {
                        var x = c - p + v,
                            C = {},
                            D = x - c;
                        C.date = new Date(n), C.date.setHours(0, 0, 0, 0), C.date.setDate(D), C.date_str = C.date.getFullYear(), m = C.date.getMonth() + 1, C.date_str += "-" + (m < 10 ? "0" + m : m), d = C.date.getDate(), C.date_str += "-" + (d < 10 ? "0" + d : d), $td = e("<td>"), (a.startDate.getTime() > C.date.getTime() || a.endDate.getTime() < C.date.getTime()) && $td.addClass("overtime"), D >= 1 && o >= D ? (b = !0, $td.attr("data-date", C.date_str), $td.append(e("<span>", {
                            text: D
                        })), a.today.getTime() == C.date.getTime() && ($td.addClass("today"), C.today = !0), n.getTime() == C.date.getTime() && ($td.addClass("selected"), C.selected = !0)) : C.noday = !0, g.append($td), $.push(C)
                    }
                    $.length > 0 && b && (u.append(g), h.push($))
                }
                for (var w = e("<select>", {
                        "class": "selectMonth"
                    }), v = 0; 12 > v; v++) option = e("<option>", {
                    text: a.string.month(v, "normal"),
                    value: v
                }), n.getMonth() == v && option.attr("selected", !0), w.append(option);
                for (var k = a.options.firstYear || a.today.getFullYear() - 5, _ = e("<select>", {
                        "class": "selectYear"
                    }), v = a.today.getFullYear(); v >= k; v--) option = e("<option>", {
                    text: v,
                    value: v
                }), n.getFullYear() == v && option.attr("selected", !0), _.append(option);
                for (var M = e("<thead>").html(e("<tr>", {
                        "class": "title"
                    }).append(e("<td>", {
                        "class": "prev"
                    }).append(e("<i/>", {
                        "class": "icon-angle-left"
                    }))).append(e("<td>", {
                        "class": "title",
                        colspan: 5
                    }).append(w, _)).append(e("<td>", {
                        "class": "next"
                    }).append(e("<i/>", {
                        "class": "icon-angle-right"
                    })))), T = e("<tr>", {
                        "class": "header"
                    }), y = 0, v = a.options.weekDayStart; 7 > y; y++, v++) T.append(e("<th>", {
                    text: a.string.day(v)
                })), v >= 6 && (v = -1);
                return $thead = e("<thead/>").html(T), e("<table/>", {
                    "class": "calendarGridTable range",
                    cellspacing: 0,
                    cellpadding: 0
                }).data("date", n).append(M, $thead, u)
            },
            display: function() {
                var t = this;
                e("body").append(t.$calendar)
            },
            events: function() {
                var a = this;
                a.$menu.find("li").click(function() {
                    var t = e(this).data();
                    return a.activeIndex = e(this).index(), a._activeIndex(), "custom" == t.value ? (a.hideMenu(), a.openCalendar(), !1) : void a.selectMenu(t)
                }), a.$btn.click(function(t) {
                    e("body").find(".uiPopover").find("a.btn-toggle.active").removeClass("active"), a.openMenu(), a.resizeMenu(), a.$calendar.hasClass("open") && a.$calendar.removeClass("open"), t.stopPropagation()
                }), e(t).resize(function() {
                    a.getOffset()
                }), e("html").on("click", function() {
                    a.hideMenu(), a.hideCalendar()
                }), e(".btn-submit", a.$calendar).click(function(e) {
                    a.updateData()
                })
            },
            selectMenu: function(e) {
                var t = this;
                t.endDate = new Date(t.today), t.startDate = new Date(t.endDate);
                var a = "",
                    n = 0;
                if ("last7days" == e.value) n = 7;
                else if ("last14days" == e.value) n = 14;
                else if ("last28days" == e.value) n = 28;
                else if ("last90days" == e.value) n = 90;
                else if ("yesterday" == e.value) t.endDate.setDate(t.endDate.getDate() - 1), t.startDate = new Date(t.endDate);
                else if ("daily" == e.value) a = " | " + t.today.getDate() + " " + t.string.month(t.today.getMonth()) + " " + t.today.getFullYear(), t.startDate.setDate(t.today.getDate()), t.endDate.setDate(t.today.getDate());
                else if ("weekly" == e.value) {
                    var i = t.today.getDate() - t.today.getDay();
                    i += 1;
                    var s = i + 6;
                    t.startDate.setDate(i), t.endDate.setDate(s), a = " | " + t.startDate.getDate() + " - " + t.endDate.getDate() + " " + t.string.month(t.startDate.getMonth()) + " " + t.endDate.getFullYear()
                } else if ("last1week" == e.value) {
                    var i = t.today.getDate() - t.today.getDay();
                    i -= 6;
                    var s = i + 6;
                    t.startDate.setDate(i), t.endDate.setDate(s)
                } else if ("monthly" == e.value) {
                    t.startDate.setDate(1);
                    var o = new Date(t.startDate);
                    o.setMonth(o.getMonth() + 1), o.setDate(0), a = " | 1 - " + o.getDate() + " " + t.string.month(t.startDate.getMonth()) + " " + t.endDate.getFullYear()
                } else "latest" == e.value && (t.startDate = new Date("1989-01-01"), t.endDate.setDate(t.today.getDate()));
                n > 0 && t.startDate.setDate(t.startDate.getDate() - n), t.updateData(e.text + a)
            },
            _activeIndex: function() {
                var e = this;
                "undefined" == e.activeIndex ? e.$menu.find("li.active").removeClass("active") : e.$menu.find("li").eq(e.activeIndex).addClass("active").siblings().removeClass("active")
            },
            openMenu: function() {
                var e = this;
                e.$layer.removeClass("hidden_elem")
            },
            hideMenu: function() {
                var e = this;
                e.$layer.addClass("hidden_elem")
            },
            openCalendar: function() {
                var e = this;
                e.updateCalendar(), e.getOffset(), e.$calendar.addClass("open")
            },
            hideCalendar: function() {
                var e = this;
                e.$calendar.removeClass("open")
            },
            getOffset: function() {
                var n = this;
                n.$calendar.hasClass("uiContextualAbove") && n.$calendar.removeClass("uiContextualAbove");
                var i = e(e(a).height() < e(t).height() ? t : a),
                    s = n.$elem.offset(),
                    o = e(t).width(),
                    l = i.height(),
                    r = s;
                r.top += n.$elem.outerHeight();
                var d = r.left + n.$calendar.outerWidth();
                e("html").hasClass("sidebarMode") && (d += 301), d > o && (r.left = s.left - n.$calendar.outerWidth() + n.$elem.outerWidth());
                var c = r.top + n.$calendar.outerHeight();
                c > l && (r.top = s.top - n.$calendar.outerHeight() - n.$elem.outerHeight(), n.$calendar.addClass("uiContextualAbove")), n.$calendar.css(r)
            }
        };
        e.fn.closedate = function(t) {
            return this.each(function() {
                var a = Object.create(P);
                a.init(t, this), e.data(this, "closedate", a)
            })
        }, e.fn.closedate.options = {
            lang: "th",
            selectedDate: null,
            firstDate: null,
            start: null,
            end: null,
            weekDayStart: 1,
            type: "short",
            format: "",
            options: [{
                text: "Today",
                value: "daily"
            }, {
                text: "Yesterday",
                value: "yesterday"
            }, {
                text: "This week",
                value: "weekly"
            }, {
                text: "Last week",
                value: "last1week"
            }, {
                text: "This month",
                value: "monthly"
            }, {
                text: "Last 7 days",
                value: "last7days"
            }, {
                text: "Last 14 days",
                value: "last14days"
            }, {
                text: "Last 28 days28",
                value: "last28days"
            }, {
                text: "Last 90 days",
                value: "last90days"
            }, {
                text: "Custom",
                value: "custom"
            }],
            onSelected: function() {}
        };
        var S = {
            init: function(t, a) {
                var n = this;
                if (n.$elem = e(a), n.$elem.find(".js-clone").click(function() {
                        var e = n.$elem.find(".control-group").first(),
                            t = e.clone();
                        if (t.find("input, textarea").val(""), 0 == t.find("select.labelselect").length) {
                            var a = e.find(".labelselect").closest(".wrap"),
                                i = a.data("select");
                            t.find(".wrap").replaceWith(i), i.find("option").first().prop("selected", !0)
                        }
                        n.$elem.find("[ref=listsbox]").append(t)
                    }), n.$elem.delegate("select.labelselect", "change", function() {
                        if ("custom" == e(this).val()) {
                            var t = e("<div>", {
                                    "class": "wrap"
                                }),
                                a = e("<input/>", {
                                    type: "text",
                                    "class": "inputtext labelselect",
                                    name: e(this).attr("name")
                                });
                            $remove = e("<button/>", {
                                type: "button",
                                "class": "icon-remove js-remove-label"
                            }), t.data("select", e(this)).append(a, $remove), e(this).replaceWith(t), a.focus()
                        }
                    }), n.$elem.delegate(".js-remove-label", "click", function() {
                        var t = e(this).closest(".wrap"),
                            a = t.data("select");
                        t.replaceWith(a.clone()), a.find("option").first().prop("selected", !0)
                    }), n.$elem.delegate(".js-remove-field", "click", function() {
                        var t = e(this).closest(".control-group");
                        1 == t.parent().find(".control-group").length ? t.find("input, textarea").val("") : t.remove()
                    }), t.data) {
                    var i = n.$elem.find(".control-group").first(),
                        s = 0;
                    e.each(t.data, function(t, a) {
                        s++;
                        var o = i.clone();
                        o.find("input, textarea").val(a.value), o.find(".labelselect").val(a.name);
                        var l = !1;
                        if (e.each(o.find(".labelselect option"), function() {
                                e(this).val() == a.name && (l = !0)
                            }), !l) {
                            var r = o.find(".labelselect"),
                                d = e("<div>", {
                                    "class": "wrap"
                                }),
                                c = e("<input/>", {
                                    type: "text",
                                    "class": "inputtext labelselect",
                                    name: r.attr("name")
                                }).val(a.name);
                            $remove = e("<button/>", {
                                type: "button",
                                "class": "icon-remove js-remove-label"
                            }), d.data("select", r).append(c, $remove), r.replaceWith(d), c.focus()
                        }
                        n.$elem.find("[ref=listsbox]").append(o)
                    }), s > 0 && i.remove()
                }
            },
            fieldset: function(e, t) {}
        };
        e.fn.input_label = function(t) {
            return this.each(function() {
                var a = Object.create(S);
                a.init(t, this), e.data(this, "input_label", a)
            })
        };
        var j = {
            init: function(t, a) {
                var n = this;
                n.theDate = t.theDate || e(a).attr("data-time"), n.original = a, n.$elem = e("<span>", {
                    "class": "timestamp"
                }), e(a).replaceWith(n.$elem)
            }
        };
        e.fn.timestamp = function(t) {
            return this.each(function() {
                var a = Object.create(j);
                a.init(t, this), e.data(this, "timestamp", a)
            })
        };
        var O = {
            init: function(t, a) {
                var n = this;
                n.$elem = e(a), n.$elem.delegate(".js-add-field", "click", function() {
                    var t = e(this).closest(".control-group"),
                        a = t.find(":input.js-input").first();
                    if ("" == a.val()) return a.focus(), !1;
                    var n = t.next();
                    if (0 != n.length && (a = n.find(":input.js-input").first(), "" == a.val())) return a.focus(), !1;
                    var i = t.clone();
                    i.find(":input").val(""), i.find("select > option:first").prop("selected", !0), t.after(i), i.find(":input.js-input").first().focus();
                    var s = t.find(".labelselect").find("option:checked").index() + 1;
                    t.find(".labelselect").find("option").length <= s && s--, i.find(".labelselect").val(i.find(".labelselect").find("option").eq(s).val())
                }), n.$elem.delegate(".js-remove-field", "click", function() {
                    var t = e(this).closest(".form-field"),
                        a = t.find(".control-group");
                    1 == a.length ? (a = a.first(), a.find(":input").val(""), a.find("select").val(a.find("select").find("option").eq(0).val()), a.find(":input.js-input").first().focus()) : e(this).closest(".control-group").remove()
                })
            }
        };
        e.fn.formcontacts = function(t) {
            return this.each(function() {
                var a = Object.create(O);
                a.init(t, this), e.data(this, "formcontacts", a)
            })
        };
        var L = {
            init: function(t, a) {
                var n = this;
                n.$elem = e(a), n.$elem.find(".tab-action [data-action]").click(function() {
                    return n.url = e(this).data("href"), 
                    	   n.current = e(this).data("action"), 
                    	   n.$content = n.$elem.find(".tab-content[data-content=" + n.current + "]"), 

                    	   e(this).addClass("active").siblings().removeClass("active"), 

                    	   0 == n.$content.length ? !1 : void(n.url ? n.load() : n.display())
                })
            },
            load: function() {},
            display: function() {
                var e = this;
                e.$content.addClass("active").siblings().removeClass("active")
            }
        };
        e.fn.tab = function(t) {
            return this.each(function() {
                var a = Object.create(L);
                a.init(t, this), e.data(this, "tab", a)
            })
        }
    }(jQuery, window, document);