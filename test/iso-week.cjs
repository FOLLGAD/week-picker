const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const { JSDOM } = require("jsdom");
const jquery = require("jquery");
const moment = require("moment");

for (const file of ["src/week-picker.js", "dist/week-picker.js"]) {
  for (const scenario of [
    { now: [2021, 0, 1], year: 2020, week: 1, monday: "2019-12-30" },
    { now: [2024, 11, 31], year: 2024, week: 1, monday: "2024-01-01" },
  ]) {
    test(`${file}: ISO ${scenario.year}-W${scenario.week}`, () => {
      const { window } = new JSDOM('<div id="picker" data-mode="single"></div>', { runScripts: "outside-only" });
      const previousNow = moment.now;
      const $ = jquery(window);
      try {
        moment.now = () => new Date(...scenario.now, 12).valueOf();
        window.$ = window.jQuery = $;
        window.moment = moment;
        window.eval(readFileSync(file, "utf8"));
        const picker = $("#picker");
        picker.weekPicker("init");
        picker.weekPicker("changeYear", scenario.year);
        const events = [];
        picker[0].addEventListener("change", (event) => events.push(Array.from(event.detail.range)));
        picker.find(`[data-week="${scenario.week}"]`).trigger("click");
        assert.deepEqual(Array.from(picker.weekPicker("value")), [scenario.monday]);
        assert.deepEqual(events, [[scenario.monday]]);
        assert.equal(picker.find("input").val(), `Week ${scenario.week}, ${scenario.year}`);
      } finally {
        moment.now = previousNow;
        window.close();
      }
    });
  }
}
