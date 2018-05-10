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
var __ui = {
    anchorBucketed: function(e) {
        var t = $("<div>", {
                "class": "anchor ui-bucketed clearfix"
            }),
            a = $("<div>", {
                "class": "avatar lfloat no-avatar mrm"
            }),
            s = $("<div>", {
                "class": "content"
            }),
            i = "";
        e.image_url && "" != e.image_url ? i = $("<img>", {
            "class": "img",
            src: e.image_url,
            alt: e.text
        }) : (i = "user", i = e.icon ? '<i class="icon-' + e.icon + '"></i>' : e.icon_text ? '<div class="initials">' + e.icon_text + "</div>" : '<i class="icon-user"></i>', i = '<div class="initials">' + i + "</div>"), a.append(i);
        var n = $("<div>", {
            "class": "massages"
        });
        return e.text && n.append($("<div>", {
            "class": "text fwb u-ellipsis"
        }).html(e.text)), e.category && n.append($("<div>", {
            "class": "category"
        }).html(e.category)), e.subtext && n.append($("<div>", {
            "class": "subtext"
        }).html(e.subtext)), s.append($("<div>", {
            "class": "spacer"
        }), n), t.append(a, s), t
    },
    anchorFile: function(e) {
        "jpg" == e.type ? icon = '<div class="initials"><i class="icon-file-image-o"></i></div>' : icon = '<div class="initials"><i class="icon-file-text-o"></i></div>';
        var t = $("<div>", {
                "class": "anchor clearfix"
            }),
            a = $("<div>", {
                "class": "avatar lfloat no-avatar mrm"
            }),
            s = $("<div>", {
                "class": "content"
            }),
            i = $("<div>", {
                "class": "subname fsm fcg"
            });
        if (e.emp && i.append("Added by ", $("<span>", {
                "class": "mrs"
            }).text(e.emp.fullname)), e.created) {
            var n = new Date(e.created);
            i.append("on ", $("<span>", {
                "class": "mrs"
            }).text(n.getDate() + "/" + (n.getMonth() + 1) + "/" + n.getFullYear()))
        }
        return a.append(icon), s.append($("<div>", {
            "class": "spacer"
        }), $("<div>", {
            "class": "massages"
        }).append($("<div>", {
            "class": "fullname u-ellipsis"
        }).text(e.name), i)), t.append(a, s), t
    }
},
Calendar = {
    init: function(e) {
        var t = this,
            a = {
                selectedDate: -1,
                startDate: -1,
                endDate: -1
            };
        t.options = $.extend({}, a, e);
        var s = Object.create(Datelang);
        s.init(t.options.lang), t.string = s, t.render()
    },
    render: function() {
        var e = this,
            t = e.options,
            a = t.startDate; - 1 == t.startDate && (a = new Date, a.setDate(1)), a.setHours(0, 0, 0, 0);
        var s = (a.getTime(), new Date(0)); - 1 != t.endDate && (s = new Date(t.endDate), /^\d+$/.test(t.endDate) && (s = new Date(a), s.setDate(s.getDate() + t.endDate))), s.setHours(0, 0, 0, 0);
        var i = (s.getTime(), t.theDate);
        i = -1 == i || "undefined" == typeof i ? a : i;
        var n = t.selectedDate;
        n = -1 == n || "undefined" == typeof n ? i : n, n.setHours(0, 0, 0, 0);
        var o = n.getTime();
        firstDate = new Date(i), firstDate.setDate(1);
        var r = (firstDate.getTime(), new Date(firstDate));
        r.setMonth(r.getMonth() + 1), r.setDate(0);
        var l = (r.getTime(), r.getDate()),
            d = new Date(firstDate);
        d.setDate(0), d = d.getDate();
        var c = new Date;
        c.setHours(0, 0, 0, 0);
        var u = c.getTime();
        e.options = $.extend({}, {
            theDate: i,
            startDate: a,
            selectedDate: n
        }, e.options), e.header = [];
        for (var m = 0; 7 > m; m++) e.header.push({
            text: e.string.day(m)
        });
        for (var p = [], g = 0, m = 0; 6 > g; g++) {
            for (var h = [], f = !0, v = 0; 7 > v; v++, m++) {
                var y = d - firstDate.getDay() + m + 1,
                    b = y - d,
                    w = 0 == v ? "sun" : 6 == v ? "sat" : "day",
                    x = new Date(i);
                if (x.setHours(0, 0, 0, 0), x.setDate(b), b >= 1 && l >= b) {
                    var D = x.getTime();
                    u == D && (w += " today"), o == D && (w += " selected")
                } else w = "noday", b = 0 >= b ? y : y - l - d, g > 0 && 0 == v && (f = !1);
                h.push({
                    text: b,
                    date: x,
                    active: w
                })
            }
            f && h && p.push({
                data: h
            })
        }
        e.lists = p
    }
},
Datelang = {
    init: function(e) {
        var t = this;
        t.type = e.type || "short", t.lang = e.lang || "en"
    },
    display: function(e) {
        var t = "th" == self.lang ? e.getFullYear() - 543 : e.getFullYear();
        return this.day(e.getDay()) + " " + e.getDate() + " " + this.month(e.getMonth()) + " " + t
    },
    fulldate: function(e, t, a, s) {
        a = a || this.lang || "th";
        var i = [", ", ", "];
        if ("th" == a) var i = ["ที่ ", " "];
        var n = "";
        return s && (n = i[1] + this.year(e.getFullYear(), t, a)), this.day(e.getDay(), t, a) + i[0] + e.getDate() + " " + this.month(e.getMonth(), t, a) + n
    },
    day: function(e, t, a) {
        return this._day[t || this.type || "short"][a || this.lang || "th"][e]
    },
    month: function(e, t, a) {
        return this._month[t || this.type || "short"][a || this.lang || "th"][e]
    },
    year: function(e, t, a) {
        return a = a || this.lang || "th", "th" == a && (e += 543), t = t || this.type || "short", "short" == t && (e = e.toString().substr(2, 2)), e
    },
    _day: {
        normal: {
            en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            th: ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"]
        },
        "short": {
            en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            th: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."]
        }
    },
    _month: {
        normal: {
            en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            th: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
        },
        "short": {
            en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            th: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
        }
    }
},
uiLayer = {
    set: function(e, t) {
        var a = this;
        a.$container = $(t), a.$layer = $("<div/>", {
            "class": "uiContextualLayer"
        }).html(a.$container), a.$positioner = $("<div/>", {
            "class": "uiContextualLayerPositioner uiLayer"
        }).html(a.$layer), $(e.parent || "body").append(a.$positioner)
    },
    get: function(e, t) {
        var a = this;
        a.$content = $(t), a.$elem = $("<div/>", {
            "class": "uiContextualLayerPositioner uiLayer"
        }), a.$layer = $("<div/>", {
            "class": "uiContextualLayer"
        }).html(a.$content), a.$parent = e.$parent || $(window), a.options = e, a.is_open = !1, "undefined" == typeof a.options.is_auto_position && (a.options.is_auto_position = !0), a.$elem.html(a.$layer), a.initEvent(), a.is_open = !0, a.$body = $(e.parent || "body"), a.$body.append(a.$elem), a.config(), a.options.is_auto_position && (a.searchPosition(), $(window).resize(function() {
            a.config(), a.searchPosition(), a.resize()
        })), a.resize()
    },
    config: function() {
        var e = this;
        e.top = e.options.top, e.left = e.options.left, e.options.pointer && (e.$layer.addClass("uiToggleFlyoutPointer"), e.top += 12, e.left -= 22)
    },
    initEvent: function() {},
    resize: function() {
        var e = this;
        e.parent, e.$elem.css({
            top: e.top,
            left: e.left
        })
    },
    searchPosition: function() {
        var e = this,
            t = e.$parent.width(),
            a = e.left + e.$layer.outerWidth();
        "left" == e.options.axisX || "right" == e.options.axisX ? "right" == e.options.axisX && (e.$layer.addClass("uiToggleFlyoutRight"), e.options.$elem && (e.left += e.options.$elem.outerWidth())) : a > t ? (e.$layer.addClass("uiToggleFlyoutRight"), e.options.$elem && (e.left += e.options.$elem.outerWidth()), e.options.pointer && (e.left += 44)) : e.$layer.hasClass("uiToggleFlyoutRight") && e.$layer.removeClass("uiToggleFlyoutRight");
        var s = e.$parent.height(),
            i = e.top + e.$content.height();
        i > s ? (e.$layer.addClass("uiToggleFlyoutAbove"), e.options.pointer ? e.top -= 24 : e.options.$elem && (e.top -= e.options.$elem.outerHeight())) : e.$layer.hasClass("uiToggleFlyoutAbove") && e.$layer.removeClass("uiToggleFlyoutAbove")
    }
},
Event = {
    URL: window.location.origin + "/probooking/",
    mobilecheck: function() {
        var e = !1;
        return function(t) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
        }(navigator.userAgent || navigator.vendor || window.opera), e
    },
    getCaret: function(e) {
        if (e.selectionStart) return e.selectionStart;
        if (document.selection) {
            e.focus();
            var t = document.selection.createRange();
            if (null == t) return 0;
            var a = e.createTextRange(),
                s = a.duplicate();
            return a.moveToBookmark(t.getBookmark()), s.setEndPoint("EndToStart", a), s.text.length
        }
        return 0
    },
    inlineSubmit: function(e, t, a) {
        var s = this,
            a = a || "json",
            i = e.find(".btn.btn-submit");
        if (i.hasClass("btn-error") && i.removeClass("btn-error"), !t) {
            var t = new FormData;
            $.each(s.formData(e), function(e, a) {
                t.append(a.name, a.value)
            }), $.each(e.find("input[type=file]"), function(e, a) {
                var s = $(this)[0].files;
                $.each( $(this)[0].files, function(i, file) {
                    t.append(a.name, file);
                });
                // s.length > 0 && t.append(a.name, this.files[0])
            })
        }
        return e.hasClass("loading") ? !1 : (i.addClass("disabled"), s.showMsg({
            load: !0
        }), e.find(":input").not(".disabled").attr("disabled", !0), $.ajax({
            type: "POST",
            url: e.attr("action"),
            data: t,
            dataType: a,
            processData: !1,
            contentType: !1
        }).always(function() {
            s.hideMsg(), i.removeClass("disabled"), e.find(":input").not(".disabled").removeAttr("disabled", !1)
        }).fail(function() {
            i.removeClass("disabled"), s.showMsg({
                text: "เกิดข้อผิดพลาด...",
                load: !0,
                auto: !0
            })
        }))
    },
    formData: function(e) {
        return e.serializeArray()
    },
    processForm: function(e, t) {
        var a = this;
        if (!t) return a.showMsg({
            text: "เกิดข้อผิดพลาด...",
            load: !0,
            auto: !0
        }), !1;
        t.form_reset && e.trigger("reset");
        var s = e.find(".btn-submit");
        if (s.hasClass("btn-error") && s.removeClass("btn-error"), e.find(".control-group").hasClass("has-error") && e.find(".control-group").removeClass("has-error"), e.find(".notification").empty(), !t || t.error) return $.each(t.error, function(t, a) {
            var s = e.find("#" + t + "_fieldset"),
                i = s.find(".notification");
            s.addClass("has-error"), i.html(a)
        }), t.message && ("string" == typeof t.message ? Event.showMsg({
            text: t.message,
            load: !0,
            auto: !0
        }) : Event.showMsg(t.message)), a.emptyForm(e), s.addClass("btn-error"), !1;
        if (t.callback) {
            var i = t.callback.split(",");
            $.each(i, function(e, a) {
                __Callback[a](t)
            })
        }
        return 1 == t.onDialog || Dialog.close(), t.link ? (a.showMsg({
            link: t.link,
            text: t.message,
            bg: "yellow",
            sleep: t.link.sleep
        }), !1) : ("refresh" == t.url && (t.url = window.location.href), void(t.message ? ("string" == typeof t.message ? Event.showMsg({
            text: t.message,
            load: !0,
            auto: !0
        }) : Event.showMsg(t.message), t.url && setTimeout(function() {
            window.location = t.url
        }, 2e3)) : t.url && (window.location = t.url)))
    },
    emptyForm: function(e) {
        var t = e.find("fieldset.has-error"),
            a = e.find(".btn-submit");
        t.find(":input").blur(function() {
            "" != $(this).val() && ($(this).parents(".has-error").removeClass("has-error").find(".notification").empty(), a.hasClass("btn-error") && a.removeClass("btn-error"))
        }), t.find("select, [type=radio], [type=textbox]").change(function() {
            "" != $(this).val() && ($(this).parents(".has-error").removeClass("has-error").find(".notification").empty(), a.hasClass("btn-error") && a.removeClass("btn-error"))
        })
    },
    showMsg: function(e) {
        var t = this,
            a = e || {};
        if (0 == $("#alert-messages").length) {
            var s = $("<span/>", {
                    "class": "btn-icon icon-remove dismiss"
                }),
                i = $("<div/>", {
                    "class": "alert-messages",
                    id: "alert-messages"
                }).html($("<div/>", {
                    "class": "message"
                }).html($("<div/>", {
                    "class": "message-inside"
                }).append($("<div/>", {
                    "class": "message-text"
                }), s)));
            $("body").append(i)
        } else {
            var i = $("#alert-messages");
            i.removeAttr("class").addClass("alert-messages");
            var s = $("#alert-messages").find(".dismiss")
        }
        a.load ? (i.addClass("load"), i.find(".message-text").html("กำลังโหลด...")) : i.removeClass("load"), 0 == a.dismiss ? s.addClass("hidden_elem") : s.hasClass("hidden_elem") && s.removeClass("hidden_elem"), a.bg ? i.addClass(a.bg) : i.hasClass("yellow") && i.removeClass("yellow"), a.text && i.find(".message-text").html(a.text), a.align && i.addClass(a.align), a.link && i.find(".message-text").append($("<a/>").attr({
            href: a.link.url
        }).html(a.link.text)), (a.auto || i.hasClass("auto")) && setTimeout(function() {
            t.hideMsg()
        }, 3e3), a.sleep && setTimeout(function() {
            t.hideMsg()
        }, a.sleep), s.click(function(e) {
            e.preventDefault(), t.hideMsg(300)
        }), i.stop(!0, !0).fadeIn(300)
    },
    hideMsg: function(e) {
        $("#alert-messages").stop(!0, !0).fadeOut(e || 0, function() {
            $(this).remove()
        })
    },
    getPlugin: function(e, t) {
        var a = Event.URL + "public/js/plugins/";
        return $.getScript(t || a + e + ".js")
    },
    setPlugin: function(e, t, a, s) {
        var i = this;
        "undefined" != typeof $.fn[t] ? e[t](a) : i.getPlugin(t, s).done(function() {
            e[t](a)
        }).fail(function() {
            console.log("Is not connect plugin:" + t)
        })
    },
    plugins: function(e) {
        var t = this;
        $elem = e || $("html"), $.each($elem.find("[data-plugins]"), function() {
            var e = $(this),
                a = e.attr("data-plugins"),
                s = {};
            e.removeAttr("data-plugins"), e.attr("data-options") && (s = $.parseJSON(e.attr("data-options")), e.removeAttr("data-options")), t.setPlugin(e, a, s)
        })
    },
    scroll: function() {
        $(window).height()
    },
    log: function(e) {
        var t = this;
        if (0 == $("#alert-messages-log").length) {
            var a = $("<div/>", {
                "class": "alert-messages-log",
                id: "alert-messages-log"
            });
            $("body").append(a)
        } else var a = $("#alert-messages-log");
        return $item = $("<div/>", {
            "class": "message"
        }).css("display", "none"), e.loading || e.loader ? $item.addClass("loader").append('<div class="loader-spin-wrap mrm"><div class="loader-spin"></div></div>', '<div class="loader-spin-text">loading...</div>') : e.text && $item.text(e.text), a.append($item), $item.slideToggle(200), e.auto ? (t.logHide($item), !1) : $item
    },
    logHide: function(e, t, a) {
        var s = this,
            i = $("#alert-messages-log");
        if (e || (e = i.find(".message").first()), !e) return !1;
        var n = setTimeout(function() {
            e.animate({
                left: "-=240"
            }, 250, function() {
                e.hide(100), setTimeout(function() {
                    e.remove(), "function" == typeof a && a(1), 0 == i.find(".message").length && i.remove()
                }, 200)
            })
        }, t || 5e3);
        e.mouseenter(function() {
            clearTimeout(n)
        }).mouseleave(function() {
            s.logHide(e, 2400)
        })
    }
},
PHP = {
    number_format: function(e, t, a, s) {
        e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
        var i = isFinite(+e) ? +e : 0,
            n = isFinite(+t) ? Math.abs(t) : 0,
            o = "undefined" == typeof s ? "," : s,
            r = "undefined" == typeof a ? "." : a,
            l = "",
            d = function(e, t) {
                var a = Math.pow(10, t);
                return "" + Math.round(e * a) / a
            };
        return l = (n ? d(i, n) : "" + Math.round(i)).split("."), l[0].length > 3 && (l[0] = l[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, o)), (l[1] || "").length < n && (l[1] = l[1] || "", l[1] += new Array(n - l[1].length + 1).join("0")), l.join(r)
    },
    dateJStoPHP: function(e) {
        return m = e.getMonth() + 1, m = m < 10 ? "0" + m : m, d = e.getDate(), d = d < 10 ? "0" + d : d, e.getFullYear() + "-" + m + "-" + d
    }
},
__Callback = {};
$(function() {
Event.plugins(), $("body").delegate("form.js-submit-form", "submit", function(e) {
    var t = $(this);
    e.preventDefault(), Event.inlineSubmit(t).done(function(e) {
        Event.processForm(t, e)
    })
}), Event.scroll(), $(window).scroll(function() {
    Event.scroll()
}), $("#primary-menu-toggle").click(function() {
    $("body").toggleClass("has-menu", $("body").hasClass("has-menu") ? !1 : !0)
})
});