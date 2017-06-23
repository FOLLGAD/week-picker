(function () {
	if (!window.moment) throw new Error("moment.js not found; required");
	if (!window.jQuery) throw new Error("jQuery not found; required");

	var $ = window.jQuery;
	var moment = window.moment;

	$.fn.weekPicker = function (method) {
		var ret = this;
		var args = arguments;

		var methods = {
			init: function () {
				var $this = $(this);
				var headthis = this;
				var mode = this.weekPicker.mode;

				this.weekPicker.mode = $this.data("mode") || "multi";

				var locale;
				switch ($this.data("locale")) {
					case "sv":
						locale = {
							OPEN_PICKER: "Välj veckor...",
							CLEAR: "Rensa"
						}
						break;
					default:
						locale = {
							OPEN_PICKER: "Open picker...",
							CLEAR: "Clear"
						}
				}

				$this.append("<input placeholder='" + locale.OPEN_PICKER + "' /><div class='_middle'><div class='_popup' style='display:none'><div class='_oh'><a href='javascript:void(0)' class='_arrow _left'>&lt;</a><p class='_yeardisp' /><a href='javascript:void(0)' class='_arrow _right'>&gt;</a></div><table class='_weekTable' /><div class='_uh'><a class='_clear' href='javascript:void(0)'>" + locale.CLEAR + "</a></div></div></div>");
				var popup = $this.find("._popup");

				$this.weekPicker("changeYear", new Date().getFullYear());

				$this.find("input").on("change input", function (e) {
					e.target.value = "";
				});

				$this.children("div").on("click", "td", function () {
					if (mode == "single") {
						var isActive = $(this).hasClass("_active");
						$this.find("._active").toggleClass("_active");
						if (!isActive) $(this).toggleClass("_active");
					} else {
						$(this).toggleClass("_active");
					}
					$this.weekPicker("toggleWeek", $(this).data("week"), $this.data("year"));
				});

				$this.find("._clear").on("click", function () {
					headthis.weekPicker.chosen = [];
					$this.weekPicker("updateSelection");
				})
				if (this.weekPicker.mode != "single") {
					$this.children("div").on("mousedown touchstart", "td", function () {
						var wk = $(this).data("week");
						var yr = $this.data("year");
						headthis.weekPicker.rangestart = moment().year(yr).isoWeek(wk).startOf("isoWeek");
						headthis.weekPicker.rangestartActive = $(this).hasClass("_active");
					});
					$this.children("div").on("mouseup touchend", "td", function () {
						if (!headthis.weekPicker.rangestart) return;

						var wk = $(this).data("week");
						var yr = $this.data("year");
						var stop = moment().year(yr).isoWeek(wk).startOf("isoWeek");

						var current;
						if (headthis.weekPicker.rangestartActive) {
							current = headthis.weekPicker.rangestart;
							if (current < stop) {
								while (current <= stop) {
									$this.weekPicker("removeDate", current.format("YYYY-MM-DD"));
									current.add(1, "week");
								}
							} else {
								while (stop <= current) {
									$this.weekPicker("removeDate", stop.format("YYYY-MM-DD"));
									stop.add(1, "week");
								}
							}
						} else {
							current = headthis.weekPicker.rangestart;
							if (current < stop) {
								while (current <= stop) {
									$this.weekPicker("addDate", current.format("YYYY-MM-DD"));
									current.add(1, "week");
								}
							} else {
								while (stop <= current) {
									$this.weekPicker("addDate", stop.format("YYYY-MM-DD"));
									stop.add(1, "week");
								}
							}
						}
						$this.weekPicker("updateSelection");
					});
				}

				$this.on("dragstart", "td", function () {
					return false;
				});
				$this.find("._oh").on("click", "._arrow", function (e) {
					var r = $(e.target).hasClass("_right");
					var yr = Number($this.data("year"));
					$this.weekPicker("changeYear", yr + (r ? 1 : -1))
				});
				$this.children().on("click focus", function (e) {
					e.stopPropagation();
					popup.show();
				});

				$(document).on("click", function () {
					popup.hide();
				});
			},
			value: function () {
				return this.weekPicker.chosen;
			},
			addDate: function (date) {
				var ind = this.weekPicker.chosen.indexOf(date);
				if (ind === -1) {
					this.weekPicker.chosen.push(date);
				}
			},
			removeDate: function (date) {
				var ind = this.weekPicker.chosen.indexOf(date);
				if (ind !== -1) {
					this.weekPicker.chosen.splice(ind, 1);
				}
			},
			toggleWeek: function (week, year) {
				var date = moment().year(year).isoWeek(week).startOf("isoWeek").format("YYYY-MM-DD");
				var ind = this.weekPicker.chosen.indexOf(date);
				if (ind !== -1) {
					this.weekPicker.chosen.splice(ind, 1);
				} else if (this.weekPicker.mode == "single") {
					this.weekPicker.chosen = [date];
				} else {
					this.weekPicker.chosen.push(date);
				}
			},
			updateSelection: function () {
				var $this = $(this);

				var table = $this.find("table");
				table.empty();

				var year = $this.data("year");

				var totalWeeks = moment().year(year).isoWeeksInYear();

				$this.find("._yeardisp").text(year);

				var row;
				for (var i = 1; i < totalWeeks + 1; i++) {
					if (i % 7 == 1) {
						table.append("<tr />");
						row = table.find("tr").last();
					}
					var occupied = this.weekPicker.chosen.indexOf(moment().year(year).isoWeek(i).startOf("isoWeek").format("YYYY-MM-DD")) !== -1;
					var today = year == new Date().getFullYear() && i == moment().isoWeek();
					row.append("<td class='" + (occupied ? "_active " : "") + (today ? "_current" : "") + "' data-week='" + i + "'><a>" + i + "</a></td>");
				}
			},
			changeYear: function (year) {
				if (!year) throw new Error("need year");
				if (typeof year == "string") year = Number(year);

				var $this = $(this);
				$this.data("year", year);
				$this.weekPicker("updateSelection");
			}
		}

		this.each(function () {
			if (!this.weekPicker) {
				this.weekPicker = {
					chosen: [],
					disabled: []
				}
			}
			if (methods[method]) {
				ret = methods[method].apply(this, Array.prototype.slice.call(args, 1))
			}
		})
		return ret;
	}
	$(document).ready(function () {
		$(".week-picker").weekPicker("init");
	});
})();
