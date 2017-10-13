!function(){if(!window.moment)throw new Error("moment.js not found; please place it in the global scope.");if(!window.jQuery&&!window.$)throw new Error("jQuery not found; please place it in the global scope.");var e=function(e){var a;switch(e){case"sv":case"se":a={OPEN_PICKER_SINGLE:"Välj vecka...",OPEN_PICKER:"Välj veckor...",CLEAR:"Rensa",NUM_SELECTED:"$num_selected veckor valda",WEEK_SELECTED:"Vecka $weeknum, $year"};break;case"en":default:a={OPEN_PICKER_SINGLE:"Choose a week...",OPEN_PICKER:"Open picker...",CLEAR:"Clear",NUM_SELECTED:"$num_selected weeks selected",WEEK_SELECTED:"Week $weeknum, $year"}}return a},a=window.jQuery||window.$,t=window.moment;a.fn.weekPicker=function(i){var n=this,r=arguments,s={init:function(){var i=this,n=a(this);n.empty();var r=this.weekPicker.mode=n.data("mode")||"multi",s=e(n.data("locale"));n.append("<div class='_week-picker'><input readonly placeholder='"+("single"==r?s.OPEN_PICKER_SINGLE:s.OPEN_PICKER)+"' /><div class='_middle'><div class='_popup' style='display:none'><div class='_oh'><a href='javascript:void(0)' class='_arrow _left'>&lt;</a><p class='_yeardisp' /><a href='javascript:void(0)' class='_arrow _right'>&gt;</a></div><table class='_weekTable' /><div class='_uh'><a class='_clear' href='javascript:void(0)'>"+s.CLEAR+"</a></div></div></div></div>");var c=n.find("._popup");if(n.weekPicker("changeYear",(new Date).getFullYear()),n.find("input").on("change input",function(e){e.target.value=""}),n.find("._clear").on("click",function(){i.weekPicker.chosen=[],n.weekPicker("updateSelection")}),"single"!=this.weekPicker.mode){var o,d,k,l=n.children("div"),h=!1;l.on("mousedown","td",function(){h=!0;var e=a(this).data("week"),i=n.data("year");o=t().year(i).isoWeek(e).startOf("isoWeek"),k=!a(this).hasClass("_active")}),l.on("mousemove","td",function(){if(h){var e=a(this).data("week"),i=n.data("year");d=t().year(i).isoWeek(e).startOf("isoWeek"),n.weekPicker("setSelectedRange",o,d,k)}}),l.on("mouseup","td",function(){if(h=!1,o){var e=a(this).data("week"),i=n.data("year"),r=o,s=t().year(i).isoWeek(e).startOf("isoWeek"),c=s.isAfter(r),d=c?r:s,l=c?s:r;n.weekPicker("setRange",d,l,k)}}),l.on("touchstart","td",function(){h=!0;var e=a(this).data("week"),i=n.data("year");o=t().year(i).isoWeek(e).startOf("isoWeek"),k=!a(this).hasClass("_active")}),l.on("touchmove","td",function(e){if(h){var i=e.originalEvent.changedTouches[0],r=a(document.elementFromPoint(i.clientX,i.clientY)).data("week"),s=n.data("year");d=t().year(s).isoWeek(r).startOf("isoWeek"),n.weekPicker("setSelectedRange",o,d,k)}}),l.on("touchend","td",function(e){if(h=!1,o){var i=e.originalEvent.changedTouches[0],r=a(document.elementFromPoint(i.clientX,i.clientY)).data("week"),s=n.data("year"),c=o,d=t().year(s).isoWeek(r).startOf("isoWeek"),l=d.isAfter(c),u=l?c:d,f=l?d:c;n.weekPicker("setRange",u,f,k)}})}else n.children("div").on("click","td",function(){var e=a(this),t=e.hasClass("_active");n.find("._active").removeClass("_active"),t||e.addClass("_active"),n.weekPicker("toggleWeek",e.data("week"),n.data("year"))});n.on("dragstart","td",function(){return!1}),n.find("._oh").on("click","._arrow",function(e){var t=a(e.target).hasClass("_right"),i=Number(n.data("year"));n.weekPicker("changeYear",i+(t?1:-1))}),n.children().children().on("click focus",function(){c.show()}),a(document).on("click",function(e){var a=n.children().children();0!==a.find(e.target).length||a.is(e.target)||c.hide()}),n.on("keypress",function(e){"Enter"==e.code&&e.target})},clear:function(){this.weekPicker.chosen=[],a(this).weekPicker("updateSelection")},value:function(){return this.weekPicker.chosen},addDate:function(e){-1===this.weekPicker.chosen.indexOf(e)&&this.weekPicker.chosen.push(e)},setRange:function(e,t,i){for(var n=a(this);e<=t;)n.weekPicker(i?"addDate":"removeDate",e.format("YYYY-MM-DD")),e.add(1,"week");n.weekPicker("updateSelection")},setSelectedRange:function(e,t,i){var n=e.isoWeek(),r=t.isoWeek(),s=Math.min(n,r),c=Math.max(n,r),o=a(this).find("._weekTable td");o.removeClass("_rangeAdd _rangeDel"),o.slice(s-1,c).each(function(){a(this).addClass(i?"_rangeAdd":"_rangeDel")})},removeDate:function(e){var a=this.weekPicker.chosen.indexOf(e);-1!==a&&this.weekPicker.chosen.splice(a,1)},toggleWeek:function(e,i){var n=t().year(i).isoWeek(e).startOf("isoWeek").format("YYYY-MM-DD"),r=this.weekPicker.chosen.indexOf(n);-1!==r?this.weekPicker.chosen.splice(r,1):"single"==this.weekPicker.mode?this.weekPicker.chosen=[n]:this.weekPicker.chosen.push(n),a(this).weekPicker("updateInputVal")},updateSelection:function(){var e=a(this),i=e.find("table");i.empty();var n=e.data("year"),r=t().year(n).isoWeeksInYear();e.find("._yeardisp").text(n);for(var s,c=1;c<r+1;c++){c%7==1&&(i.append("<tr />"),s=i.find("tr").last());var o=-1!==this.weekPicker.chosen.indexOf(t().year(n).isoWeek(c).startOf("isoWeek").format("YYYY-MM-DD")),d=n==(new Date).getFullYear()&&c==t().isoWeek();s.append("<td class='"+(o?"_active ":"")+(d?"_current":"")+"' data-week='"+c+"'>"+c+"</td>")}e.weekPicker("updateInputVal")},changeYear:function(e){if(!e)throw new Error("need year");"string"==typeof e&&(e=Number(e));var t=a(this);t.data("year",e),t.weekPicker("updateSelection")},updateInputVal:function(){var i=a(this),n=e(i.data("locale")),r=i.find("input");if(0!==this.weekPicker.chosen.length)if("single"==this.weekPicker.mode){var s=t(this.weekPicker.chosen[0]);r.val(n.WEEK_SELECTED.replace("$weeknum",s.isoWeek()).replace("$year",s.year()))}else r.val(n.NUM_SELECTED.replace("$num_selected",this.weekPicker.chosen.length));else r.val("")}};return this.each(function(){this.weekPicker||(this.weekPicker={chosen:[],disabled:[]}),s[i]&&(n=s[i].apply(this,Array.prototype.slice.call(r,1)))}),n},a(document).ready(function(){a(".week-picker").each(function(){a(this).weekPicker("init")})})}();