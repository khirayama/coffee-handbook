import * as assert from 'power-assert';

import { getOpenStatus } from 'presentations/utils/getOpenStatus';

const sampleHours: string[][][] = [
  [['11:00', '20:00']],
  [['11:00', '20:00']],
  [['11:00', '16:00'], ['17:00', '22:00']],
  [],
  [['10:00', '20:00']],
  [['11:00', '20:00']],
  [['11:00', '20:00']],
];

describe('getOpenStatus', () => {
  it('run', () => {
    // 2018-8-28 Thu(2)
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 10:44'), sampleHours), {
      status: 0,
      openAt: {
        day: 2,
        time: '11:00',
      },
      closeAt: null,
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 10:45'), sampleHours), {
      status: 1,
      openAt: {
        day: 2,
        time: '11:00',
      },
      closeAt: null,
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 11:00'), sampleHours), {
      status: 2,
      openAt: null,
      closeAt: {
        day: 2,
        time: '16:00',
      },
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 15:59'), sampleHours), {
      status: 3,
      openAt: null,
      closeAt: {
        day: 2,
        time: '16:00',
      },
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 16:00'), sampleHours), {
      status: 0,
      openAt: {
        day: 2,
        time: '17:00',
      },
      closeAt: null,
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 16:01'), sampleHours), {
      status: 0,
      openAt: {
        day: 2,
        time: '17:00',
      },
      closeAt: null,
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 16:45'), sampleHours), {
      status: 1,
      openAt: {
        day: 2,
        time: '17:00',
      },
      closeAt: null,
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 17:00'), sampleHours), {
      status: 2,
      openAt: null,
      closeAt: {
        day: 2,
        time: '22:00',
      },
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 21:44'), sampleHours), {
      status: 2,
      openAt: null,
      closeAt: {
        day: 2,
        time: '22:00',
      },
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 21:45'), sampleHours), {
      status: 3,
      openAt: null,
      closeAt: {
        day: 2,
        time: '22:00',
      },
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 22:00'), sampleHours), {
      status: 0,
      openAt: {
        day: 4,
        time: '10:00',
      },
      closeAt: null,
    });
    assert.deepEqual(getOpenStatus(new Date('2018-8-28 22:01'), sampleHours), {
      status: 0,
      openAt: {
        day: 4,
        time: '10:00',
      },
      closeAt: null,
    });
  });
});
