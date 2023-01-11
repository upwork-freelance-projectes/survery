!(function (t) {
	var o = {
			reloadbox: " ",
			loadBox: "",
			ctbTriggerBox: "",
			ctbTrigger: "a.ajax",
			loadErrorMessage: "THE PAGE YOU WERE LOOKING FOR COULD NOT BE FOUND.",
			loadErrorBacklinkText: "Back to the last page",
			bouncingBoxes: "",
			topToBottom: !1,
			leftToRight: !1,
			inEasing: "easeInQuint",
			outEasing: "easeInQuint",
			inDuration: 700,
			outDuration: 500,
			preloadImages: !1,
			direction: "",
			positionType: "absolute",
		},
		e = function (o, e) {
			t(window)
				.off("popstate")
				.on("popstate", function (t) {
					var n;
					switch (o.direction) {
						case "left-to-right":
							n = "ks-ctb-box-in-l-pushstate";
							break;
						case "right-to-left":
							n = "ks-ctb-box-in-r-pushstate";
							break;
						case "top-to-bottom":
							n = "ks-ctb-box-in-t-pushstate";
							break;
						case "bottom-to-top":
							n = "ks-ctb-box-in-b-pushstate";
							break;
						case "":
							n = "ks-ctb-box-in-pushstate";
							break;
						default:
							return (
								alert(
									"Kool ctb Error: \n The defined direction " +
										o.direction +
										" does not exist."
								),
								!1
							);
					}
					i.ctbHistoryPage(o, e, n), t.stopPropagation();
				});
		},
		i = {
			defaults: function (e, i) {
				return (
					(psSettings = e.data("kool-ctb-window")),
					"undefined" == typeof psSettings
						? ((psSettings = t.extend({}, o, i)),
						  e.data("kool-ctb-window", psSettings))
						: (psSettings = t.extend(psSettings, i)),
					psSettings
				);
			},
			init: function (o) {
				var n = window.history && history.pushState;
				return this.each(function () {
					i.defaults(t(this), o);
					t(psSettings.reloadbox);
					var a = psSettings.ctbTriggerBox,
						r = psSettings.ctbTrigger;
					n &&
						t("html").not("[data-ks-initialised]") &&
						(t("html").attr("data-ks-initialised", "true"),
						e(psSettings, t(a + " " + r))),
						s.trigger(psSettings, n, a, r, !0);
				});
			},
			ctbHistoryPage: function (o, e, i) {
				if (t("html").is("[data-ks-history-pushed]")) {
					var n = location.pathname;
					s.ksLoadPage(o, e, n, i);
				}
			},
			destroy: function (o) {
				return (
					t(document).off(
						"click",
						psSettings.ctbTriggerBox + " " + psSettings.ctbTrigger
					),
					t(this).each(function () {
						t(this).removeData("kool-ctb-window");
					})
				);
			},
		},
		n = {
			defaults: function (e, i) {
				return (
					(settings = e.data("kool-ctb")),
					"undefined" == typeof settings
						? ((settings = t.extend({}, o, i)), e.data("kool-ctb", settings))
						: (settings = t.extend(settings, i)),
					settings
				);
			},
			init: function (o) {
				return this.each(function () {
					n.defaults(t(this), o), (settings.reloadbox = t(this));
					var e = settings.ctbTriggerBox,
						i = settings.ctbTrigger;
					s.trigger(settings, !0, e, i, !1);
				});
			},
			destroy: function (o) {
				return (
					t(document).off(
						"click",
						settings.ctbTriggerBox + " " + settings.ctbTrigger
					),
					t(this).each(function () {
						t(this).removeData("kool-ctb");
					})
				);
			},
		},
		s = {
			trigger: function (o, e, i, n, a) {
				if (e) {
					(r = document.createElement("div")).setAttribute(
						"ongesturestart",
						"return;"
					),
						"function" == typeof r.ongesturestart
							? t(document)
									.on("touchstart", ".abl", function () {
										window.history.back();
									})
									.off("touchstart", i + " " + n)
									.on("touchstart", i + " " + n, function (i) {
										i.preventDefault();
										var n = t(this);
										s.ksDefinereloadboxIn(o, n, e, a);
									})
							: t(document)
									.on("click", ".abl", function () {
										window.history.back();
									})
									.off("click", i + " " + n)
									.on("click", i + " " + n, function (i) {
										i.preventDefault();
										var n = t(this);
										s.ksDefinereloadboxIn(o, n, e, a);
									});
				}
				var r;
			},
			ksDefinereloadboxIn: function (o, e, i, n) {
				switch (o.direction) {
					case "left-to-right":
					case "right-to-left":
					case "top-to-bottom":
					case "bottom-to-top":
					case "":
						if ((($reloadboxIn = "ks-ctb-box-in"), t(".ks-ctb-box-in").length))
							return !1;
						t(this);
						s.ksCollectLoadPageInfo(o, e, i, $reloadboxIn, n);
						break;
					default:
						return (
							alert(
								"Kool ctb Error: \n The defined direction " +
									o.direction +
									" does not exist."
							),
							!1
						);
				}
			},
			ksCollectLoadPageInfo: function (o, e, i, n, a) {
				var r = e.attr("href");
				switch (o.direction) {
					case "left-to-right":
						n = "ks-ctb-box-in-l";
						break;
					case "right-to-left":
						n = "ks-ctb-box-in-r";
						break;
					case "top-to-bottom":
						n = "ks-ctb-box-in-t";
						break;
					case "bottom-to-top":
						n = "ks-ctb-box-in-b";
						break;
					case "":
						n = "ks-ctb-box-in";
						break;
					default:
						return (
							alert(
								"Kool ctb Error: \n The defined direction " +
									o.direction +
									" does not exist."
							),
							!1
						);
				}
				s.ksLoadPage(o, e, r, n, a),
					a &&
						(history.pushState({ url: r }, null, r),
						t("html").attr("data-ks-history-pushed", "true"));
			},
			ksLoadPage: function (o, e, i, n, a) {
				t(o.reloadbox);
				"" != i
					? (s.ksAddreloadboxIn(o, n),
					  t.ajax({
							type: "GET",
							url: i,
							data: {},
							beforeSend: function () {
								s.ksCreateLoadBox();
							},
							error: function (t, o, e) {
								window.location.replace("404.html");
							},
							success: function (t) {
								o.bouncingBoxes
									? s.ksFadeSiblings(o, e, t, n, a)
									: s.ksPositionAndPrepare(o, e, t, n, a);
							},
							dataType: "html",
					  }))
					: alert(
							"There is no target defined! Please check the references (i.e. normally href) of the ctbTriggers."
					  );
			},
			ksAddreloadboxIn: function (o, e) {
				var i = t(o.reloadbox),
					n = i.attr("class"),
					s = i.prop("tagName");
				t(document).find(".ks-ctb-box-in").remove(),
					o.movereloadboxClasses
						? i.after(
								"<" +
									s.toLowerCase() +
									' class="ks-ctb-box-in ' +
									(void 0 !== n ? n : "") +
									'" id="' +
									e +
									'"></' +
									s.toLowerCase() +
									">"
						  )
						: i.after(
								"<" +
									s.toLowerCase() +
									' class="ks-ctb-box-in" id="' +
									e +
									'"></' +
									s.toLowerCase() +
									">"
						  ),
					i.siblings(".ks-ctb-box-in").hide();
			},
			ksFadeSiblings: function (o, e, i, n, a) {
				t(document)
					.find(o.bouncingBoxes)
					.animate({ opacity: 0 }, 50, function () {
						s.ksPositionAndPrepare(o, e, i, n);
					});
			},
			ksPositionAndPrepare: function (o, e, i, n, a) {
				var r = t(o.reloadbox),
					c = r.attr("id"),
					l = r.position(),
					d = r.width(),
					b = r.css("margin-left"),
					u = r.css("margin-left"),
					f = l.left + parseFloat(b);
				if (
					((reloadboxRightAbsolute =
						l.left + parseFloat(b) + d - parseFloat(u)),
					($reloadboxIn = t("#" + n)),
					(loadSelector = e.attr("data-ks-load-selector")),
					a)
				)
					var h = i.match(/<\/*html\s+.*id="([^"].*)".*>/),
						g = i.match(/<\/*body\s+.*id="([^"].*)".*>/),
						p = i.match(/<\/*html\s+.*class="([^"].*)".*>/),
						k = i.match(/<\/*body\s+.*class="([^"].*)".*>/),
						m = i.match(/<\/*title>(.*)<\/title>/);
				if (
					(r
						.addClass("ks-ctb-box-out")
						.css({
							position: "absolute",
							top: l.top,
							left: f,
							marginLeft: 0,
							width: d,
						}),
					(reloadboxInContents =
						void 0 !=
						t(i)
							.filter("#" + c)
							.html()))
				) {
					if (o.loadBox) var x = t(i).filter(o.loadBox);
					else if (loadSelector) x = t(i).filter(loadSelector);
					else x = t(i).filter("#" + c);
					reloadboxInContents = x.html();
					var y = x.attr("class");
				} else {
					if (o.loadBox) x = t(i).find(o.loadBox);
					else if (loadSelector) x = t(i).find(loadSelector);
					else x = t(i).find("#" + c);
					reloadboxInContents = x.html();
					y = x.attr("class");
				}
				$reloadboxIn
					.addClass(y)
					.css({ position: o.positionType, marginLeft: 0, top: l.top, left: f })
					.html(reloadboxInContents);
				var w = $reloadboxIn.find("img"),
					v = 0;
				w.length && 1 == o.preloadImages
					? w.on("load", function () {
							++v == w.length &&
								(t(document).trigger("ksLoadCallback"),
								s.ksctbContent(o, n, e, l, f, d, h, g, p, k, m, a));
					  })
					: (t(document).trigger("ksLoadCallback"),
					  s.ksctbContent(o, n, e, l, f, d, h, g, p, k, m, a));
			},
			ksctbContent: function (o, e, i, n, a, r, c, l, d, b, u, f) {
				var h = t(o.reloadbox),
					g = h.attr("id"),
					p = t("#" + e),
					k = p.outerHeight(),
					m = (p.outerWidth(), h.outerHeight()),
					x = t(window).outerHeight(),
					y = t(window).outerWidth(),
					w = i.prop("hash");
				if ((clearTimeout(loadTimer), s.ksRemoveLoadBox(), o.direction)) {
					p.css({ width: r });
					var v,
						C = {},
						T = {};
					switch (e) {
						case "ks-ctb-box-in-b-pushstate":
						case "ks-ctb-box-in-t":
							p.css("top", 2 * -k), (v = 3 * x);
							break;
						case "ks-ctb-box-in-t-pushstate":
						case "ks-ctb-box-in-b":
							p.css("top", 1.5 * m), (v = 1.5 * -m);
							break;
						case "ks-ctb-box-in-r-pushstate":
						case "ks-ctb-box-in-l":
							p.css("left", -y), (v = y);
							break;
						case "ks-ctb-box-in-l-pushstate":
						case "ks-ctb-box-in-r":
							p.css("left", y), (v = -y);
							break;
						default:
							return (
								alert(
									"Kool ctb Error: \n The reloadboxIn class is in an undefined format: " +
										e +
										"."
								),
								!1
							);
					}
					switch (o.direction) {
						case "left-to-right":
						case "right-to-left":
							var S = o.inDuration,
								B = o.outDuration;
							(C = { left: v }),
								(T = { left: a }),
								p.css("top", n.top),
								t("body").css({ overflowX: "hidden", overflowY: "scroll" });
							break;
						case "top-to-bottom":
						case "bottom-to-top":
							var I = (m * o.inDuration) / 1e3 / 100;
							(S = o.inDuration + I), (B = o.outDuration);
							(T = { top: n.top }),
								(C = { top: v }),
								t("body").css("overflow-y", "scroll");
					}
					h
						.stop()
						.show()
						.animate(C, B, o.outEasing, function () {
							t(this).remove(), f && s.ksSwitchClasses(c, l, d, b, u);
						}),
						p
							.stop()
							.show()
							.animate(T, S, o.inEasing, function () {
								t(this)
									.css({
										display: "",
										left: "",
										marginLeft: "",
										position: "",
										top: "",
										width: "",
									})
									.attr("id", g)
									.removeClass("ks-ctb-box-in"),
									s.animationCallback(w),
									s.ksCheckForSiblings(o);
							});
				} else
					contentAnimShow(),
						h.delay(100).animate({ opacity: 0 }, o.outDuration, function () {
							t(this).remove(),
								f && s.ksSwitchClasses(c, l, d, b, u),
								p
									.css({
										display: "",
										left: "",
										marginLeft: "",
										opacity: 0,
										position: "",
										top: "",
										width: "",
									})
									.animate({ opacity: 1 }, o.inDuration, function () {
										s.animationCallback(w), s.ksCheckForSiblings(o);
										var t = window.location.href.split("#")[1];
										contentAnimHide(),
											t &&
												$("#" + t).length &&
												setTimeout(function () {
													$("html,body").animate(
														{ scrollTop: $("#" + t).offset().top - ah },
														{
															queue: !1,
															duration: 800,
															easing: "easeInOutExpo",
														}
													);
												}, 1450);
									})
									.attr("id", g)
									.removeClass("ks-ctb-box-in");
						});
			},
			animationCallback: function (o) {
				o &&
					t("html:not(:animated),body:not(:animated)").animate(
						{ scrollTop: t(o).position() },
						"normal"
					);
			},
			ksCheckForSiblings: function (o) {
				o.bouncingBoxes
					? t(document)
							.find(o.bouncingBoxes)
							.animate({ opacity: 1 }, 1400, function () {
								s.ksctbCallback();
							})
					: s.ksctbCallback();
			},
			ksSwitchClasses: function (o, e, i, n, s) {
				t("html, body").attr({ class: "", id: "" }),
					o && t("html").attr("id", o[1]),
					e && t("body").attr("id", e[1]),
					i && t("html").addClass(i[1]),
					n && t("body").addClass(n[1]),
					s && t("title").text(s[1]);
			},
			ksCreateLoadBox: function () {
				t("#ks-loading-box").length
					? (s.ksRemoveLoadBox(), s.ksCreateLoadBox())
					: (loadTimer = setTimeout(function () {}, 10));
			},
			ksRemoveLoadBox: function () {
				t("#ks-loading-box").fadeOut("1000").remove();
			},
			ksctbCallback: function () {
				t(document).trigger("ksctbCallback");
			},
		};
	(t.coretemp = function (o) {
		return i[o]
			? i[o].apply(t(window), Array.prototype.slice.call(arguments, 1))
			: "object" != typeof o && o
			? void t.error("Method " + o + " does not exist on jQuery.coretemp")
			: i.init.apply(t(window), arguments, !1);
	}),
		(t.fn.coretemp = function (o) {
			return n[o]
				? n[o].apply(this, Array.prototype.slice.call(arguments, 1))
				: "object" != typeof o && o
				? void t.error("Method " + o + " does not exist on jQuery.coretemp")
				: n.init.apply(this, arguments);
		});
})(jQuery);
