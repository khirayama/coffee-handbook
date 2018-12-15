import * as assert from 'power-assert';

import { Resource, TResource } from 'utils/Resource';

interface ISample {
  key: string;
  data: {
    category: string;
  };
}

const samples: ISample[] = [
  {
    key: 'sample-1',
    data: {
      category: 'sample-category-1',
    },
  },
  {
    key: 'sample-2',
    data: {
      category: 'sample-category-2',
    },
  },
  {
    key: 'sample-3',
    data: {
      category: 'sample-category-3',
    },
  },
];

// tslint:disable-next-line:variable-name
const SampleResouce: TResource<ISample, ISample> = (locale: string): Resource<ISample, ISample> => {
  return new Resource(samples, locale);
};

describe('Resource', () => {
  describe('where', () => {
    it('normal', () => {
      const sample2: ISample = SampleResouce('')
        .where({
          key: 'sample-2',
        })
        .findOne();
      assert.deepEqual(sample2, {
        key: 'sample-2',
        data: {
          category: 'sample-category-2',
        },
      });
    });

    it('nested condition', () => {
      const sample2: ISample = SampleResouce('')
        .where({
          data: {
            category: 'sample-category-2',
          },
        })
        .findOne();
      assert.deepEqual(sample2, {
        key: 'sample-2',
        data: {
          category: 'sample-category-2',
        },
      });
    });

    it('nested no matched condition', () => {
      const sample2: ISample = SampleResouce('')
        .where({
          key: 'sample2',
          data: {
            category: 'sample-category-1',
          },
        })
        .findOne();
      assert.deepEqual(sample2, null);
    });
  });
});
