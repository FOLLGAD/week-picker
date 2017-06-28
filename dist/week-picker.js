!function(){if(!window.moment)throw new Error("moment.js not found; required");if(!window.jQuery)throw new Error("jQuery not found; required");var e=window.jQuery,i=window.moment;e.fn.weekPicker=function(t){var a=this,r=arguments,n={init:function(){var t=e(this),a=this;t.empty();var r,n=this.weekPicker.mode=t.data("mode")||"multi";switch(t.data("locale")){case"sv":r={OPEN_PICKER:"single"==n?"Välj vecka...":"Välj veckor...",CLEAR:"Rensa"};break;default:r={OPEN_PICKER:"single"==n?"Choose a week...":"Open picker...",CLEAR:"Clear"}}t.append("<div class='_week-picker'><input placeholder='"+r.OPEN_PICKER+"' /><div class='_middle'><div class='_popup' style='display:none'><div class='_oh'><a href='javascript:void(0)' class='_arrow _left'>&lt;</a><p class='_yeardisp' /><a href='javascript:void(0)' class='_arrow _right'>&gt;</a></div><table class='_weekTable' /><div class='_uh'><a class='_clear' href='javascript:void(0)'>"+r.CLEAR+"</a></div></div></div></div>");var c=t.find("._popup");t.weekPicker("changeYear",(new Date).getFullYear()),t.find("input").on("change input",function(e){e.target.value=""}),t.children("div").on("click","td",function(){if("single"==n){var i=e(this).hasClass("_active");t.find("._active").toggleClass("_active"),i||e(this).toggleClass("_active")}else e(this).toggleClass("_active");t.weekPicker("toggleWeek",e(this).data("week"),t.data("year"))}),t.find("._clear").on("click",function(){a.weekPicker.chosen=[],t.weekPicker("updateSelection")}),"single"!=this.weekPicker.mode&&(t.children("div").on("mousedown touchstart","td",function(){var r=e(this).data("week"),n=t.data("year");a.weekPicker.rangestart=i().year(n).isoWeek(r).startOf("isoWeek"),a.weekPicker.rangestartActive=e(this).hasClass("_active")}),t.children("div").on("mouseup touchend","td",function(){if(a.weekPicker.rangestart){var r,n=e(this).data("week"),c=t.data("year"),s=i().year(c).isoWeek(n).startOf("isoWeek");if(a.weekPicker.rangestartActive)if((r=a.weekPicker.rangestart)<s)for(;r<=s;)t.weekPicker("removeDate",r.format("YYYY-MM-DD")),r.add(1,"week");else for(;s<=r;)t.weekPicker("removeDate",s.format("YYYY-MM-DD")),s.add(1,"week");else if((r=a.weekPicker.rangestart)<s)for(;r<=s;)t.weekPicker("addDate",r.format("YYYY-MM-DD")),r.add(1,"week");else for(;s<=r;)t.weekPicker("addDate",s.format("YYYY-MM-DD")),s.add(1,"week");t.weekPicker("updateSelection")}})),t.on("dragstart","td",function(){return!1}),t.find("._oh").on("click","._arrow",function(i){var a=e(i.target).hasClass("_right"),r=Number(t.data("year"));t.weekPicker("changeYear",r+(a?1:-1))}),t.children().on("click focus",function(e){e.stopPropagation(),c.show()}),e(document).on("click",function(){c.hide()})},clear:function(){this.weekPicker.chosen=[],e(this).weekPicker("updateSelection")},value:function(){return this.weekPicker.chosen},addDate:function(e){-1===this.weekPicker.chosen.indexOf(e)&&this.weekPicker.chosen.push(e)},removeDate:function(e){var i=this.weekPicker.chosen.indexOf(e);-1!==i&&this.weekPicker.chosen.splice(i,1)},toggleWeek:function(e,t){var a=i().year(t).isoWeek(e).startOf("isoWeek").format("YYYY-MM-DD"),r=this.weekPicker.chosen.indexOf(a);-1!==r?this.weekPicker.chosen.splice(r,1):"single"==this.weekPicker.mode?this.weekPicker.chosen=[a]:this.weekPicker.chosen.push(a)},updateSelection:function(){var t=e(this),a=t.find("table");a.empty();var r=t.data("year"),n=i().year(r).isoWeeksInYear();t.find("._yeardisp").text(r);for(var c,s=1;s<n+1;s++){s%7==1&&(a.append("<tr />"),c=a.find("tr").last());var o=-1!==this.weekPicker.chosen.indexOf(i().year(r).isoWeek(s).startOf("isoWeek").format("YYYY-MM-DD")),k=r==(new Date).getFullYear()&&s==i().isoWeek();c.append("<td class='"+(o?"_active ":"")+(k?"_current":"")+"' data-week='"+s+"'><a>"+s+"</a></td>")}},changeYear:function(i){if(!i)throw new Error("need year");"string"==typeof i&&(i=Number(i));var t=e(this);t.data("year",i),t.weekPicker("updateSelection")}};return this.each(function(){this.weekPicker||(this.weekPicker={chosen:[],disabled:[]}),n[t]&&(a=n[t].apply(this,Array.prototype.slice.call(r,1)))}),a},e(document).ready(function(){e(".week-picker").weekPicker("init")})}();