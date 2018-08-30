import * as assert from 'power-assert';

import { getOpenStatusMessage } from 'presentations/utils/getOpenStatusMessage';

const sampleHours: string[][][] = [
  [['11:00', '20:00']],
  [['11:00', '20:00']],
  [['11:00', '16:00'], ['17:00', '22:00']],
  [],
  [['10:00', '20:00']],
  [['11:00', '20:00']],
  [['11:00', '20:00']],
];

describe('getOpenStatusMessage', () => {
  it('run', () => {
    // 2018-8-28 Thu(2)
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 10:29'), sampleHours), {
      openStatus: 0,
      nextOpen: {
        day: 2,
        time: '11:00',
      },
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 10:30'), sampleHours), {
      openStatus: 1,
      nextOpen: {
        day: 2,
        time: '11:00',
      },
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 11:00'), sampleHours), {
      openStatus: 2,
      nextOpen: null,
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 15:59'), sampleHours), {
      openStatus: 3,
      nextOpen: null,
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 16:00'), sampleHours), {
      openStatus: 0,
      nextOpen: {
        day: 2,
        time: '17:00',
      },
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 16:01'), sampleHours), {
      openStatus: 0,
      nextOpen: {
        day: 2,
        time: '17:00',
      },
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 16:30'), sampleHours), {
      openStatus: 1,
      nextOpen: {
        day: 2,
        time: '17:00',
      },
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 17:00'), sampleHours), {
      openStatus: 2,
      nextOpen: null,
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 21:29'), sampleHours), {
      openStatus: 2,
      nextOpen: null,
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 21:30'), sampleHours), {
      openStatus: 3,
      nextOpen: null,
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 22:00'), sampleHours), {
      openStatus: 0,
      nextOpen: {
        day: 4,
        time: '10:00',
      },
    });
    assert.deepEqual(getOpenStatusMessage(new Date('2018-8-28 22:01'), sampleHours), {
      openStatus: 0,
      nextOpen: {
        day: 4,
        time: '10:00',
      },
    });
  });
});
