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

let dic: null | Dictionary = null;

before(() => {
  dic = new Dictionary(sampleDictinaryData);
});

describe('Dictionary', () => {
  describe('v', () => {
    describe('run', () => {
      it('normal', () => {
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
        const actual: any = dic.t('Test.test', 'en');
        const expected: any = 'English';

        assert.deepEqual(actual, expected);
      });

      it('with Japanese', () => {
        const actual: any = dic.t('Test.test', 'ja');
        const expected: any = '日本語';

        assert.deepEqual(actual, expected);
      });
    });
  });
});
