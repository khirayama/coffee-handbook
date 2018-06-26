import * as assert from 'power-assert';

import { HypothesisTesting, ICase, IExperiment } from 'utils/HypothesisTesting';

const sampleExperiment: IExperiment = {
  key: 'sample-experiment',
  cases: [
    {
      name: 'A',
      weight: 0.67,
    },
    {
      name: 'B',
      weight: 0.23,
    },
    {
      name: 'C',
      weight: 0.09,
    },
    {
      name: 'D',
      weight: 0.01,
    },
  ],
};

function verify(
  experiment: IExperiment,
  testing: HypothesisTesting,
  log: boolean,
): { [name: string]: { expect: number; actual: number } } {
  const num: number = 100000;
  const count: { [key: string]: { expect: number; actual: number } } = {};
  experiment.cases.forEach((experimentCase: ICase) => {
    count[experimentCase.name] = {
      expect: experimentCase.weight * num,
      actual: 0,
    };
  });
  for (let i: number = 0; i < num; i += 1) {
    const seg: string = testing.segment(experiment.key, testing.getSegId());
    count[seg].actual += 1;
  }

  if (log) {
    for (const key of Object.keys(count)) {
      // tslint:disable-next-line:no-console
      console.log(
        `${key}: ${count[key].actual} - ${(count[key].actual / num) * 100}% (${(count[key].expect / num) * 100}%)`,
      );
    }
  }

  return count;
}

describe('HypothesisTesting', () => {
  let testing: null | HypothesisTesting = null;

  beforeEach(() => {
    testing = new HypothesisTesting([sampleExperiment]);
  });

  afterEach(() => {
    testing = null;
  });

  describe('segment', () => {
    describe('run', () => {
      it('normal', () => {
        const seg1: string = testing.segment('sample-experiment', 'SEG1000000000000000');
        assert(seg1 === 'D');

        const seg2: string = testing.segment('sample-experiment', 'SEG0000000000000010');
        assert(seg2 === 'A');

        const seg3: string = testing.segment('sample-experiment', 'SEG0000010000000000');
        assert(seg3 === 'A');
      });
    });
  });

  describe('getSegId', () => {
    describe('run', () => {
      it('normal', () => {
        const segId: string = testing.getSegId();
        assert(segId.indexOf('SEG') === 0);
      });
    });
  });

  describe('verify', () => {
    describe('run', () => {
      it('normal', () => {
        const counts: { [key: string]: { expect: number; actual: number } }[] = [
          verify(sampleExperiment, testing, false),
          verify(sampleExperiment, testing, false),
          verify(sampleExperiment, testing, false),
          verify(sampleExperiment, testing, false),
          verify(sampleExperiment, testing, false),
        ];
        for (const key of Object.keys(counts[0])) {
          const result: { expect: number; actual: number } = { expect: 0, actual: 0 };
          for (const count of counts) {
            result.expect += count[key].expect;
            result.actual += count[key].actual;
          }
          result.expect = result.expect / counts.length;
          result.actual = result.actual / counts.length;
          // FYI: When the weight is small, offset get big.
          const offset: number = 0.05;
          const min: number = 1 - offset;
          const max: number = offset + 1;
          assert(result.expect * min < result.actual && result.actual < result.expect * max);
        }
      });
    });
  });
});
