import assert from 'node:assert/strict';
import fs from 'node:fs';
import { activeSectionWeek } from '../src/lib/lecture-payload.ts';

const weeks = JSON.parse(fs.readFileSync(new URL('../src/lib/course-data.json', import.meta.url), 'utf8'));
const week = weeks.find((item) => item.week === 6);
const active = week.sections.find((item) => item.routeSlug === '06-extra');
const payload = activeSectionWeek(week, active.routeSlug);

assert.ok(payload.sections.find((item) => item.routeSlug === active.routeSlug).content.length > 0, 'active section content must be present');
assert.equal(payload.sections.filter((item) => item.routeSlug !== active.routeSlug).some((item) => item.content.length > 0), false, 'inactive section content must not be shipped');
assert.deepEqual(payload.worksheet, [], 'worksheets must not be shipped with a lecture section');
assert.deepEqual(payload.activity, [], 'activities must not be shipped with a lecture section');
console.log('PASS: lecture payload contains only the requested section body');
