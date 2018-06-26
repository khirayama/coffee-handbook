// tslint:disable:no-any
import * as assert from 'power-assert';

import { Dictionary } from 'utils/Dictionary';

const sampleDictinaryData: any = {
  Test: {
    test: {
      ja: '日本語',
      en: 'English',
    },
  },
};

describe('Dictionary', () => {
  let dic: null | Dictionary = null;

  describe('v', () => {
    describe('run', () => {
      it('normal', () => {
        dic = new Dictionary(null, sampleDictinaryData);

        const actual: any = dic.v('Test.test');
        const expected: any = {
          ja: '日本語',
          en: 'English',
        };

        assert.deepEqual(actual, expected);
      });
    });
  });

  describe('t', () => {
    describe('run', () => {
      it('with English', () => {
        dic = new Dictionary('en', sampleDictinaryData);

        const actual: any = dic.t('Test.test');
        const expected: any = 'English';

        assert.deepEqual(actual, expected);
      });

      it('with Japanese', () => {
        dic = new Dictionary('ja', sampleDictinaryData);

        const actual: any = dic.t('Test.test');
        const expected: any = '日本語';

        assert.deepEqual(actual, expected);
      });
    });
  });
});
