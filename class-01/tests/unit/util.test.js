import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from '@jest/globals';
import templates from '../../src/templates/repositoryTemplate.js';
import Util from '../../src/utils/util.js';

const {
    repositoryTemplate
} = templates;

import {
    repositoryTemplateMock
} from './mocks/index.js';

describe('#Util - Strings', () => {
    const componentName = 'product';
    const repositoryName = `${componentName}Repository`

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('#upperCaseFirtsLetter should transform the first letter in upperCase', () => {
        const data = 'hello';
        const expected = 'Hello';
        const result = Util.upperCaseFirstLetter(data);

        expect(result).toStrictEqual(expected);
    });

    test('#lowerCaseFirstLetter should transform the first letter in lowerCase', () => {
        const data = 'Hello';
        const expected = 'hello';
        const result = Util.lowerCaseFirstLetter(data);

        expect(result).toStrictEqual(expected);
    });

    test('#upperCaseFirtsLetter given an empty string it should return empty', () => {
        const data = '';
        const expected = '';
        const result = Util.upperCaseFirstLetter(data);

        expect(result).toStrictEqual(expected);
    });

    test('#lowerCaseFirstLetter given an empty string it should return empty', () => {
        const data = '';
        const expected = '';
        const result = Util.lowerCaseFirstLetter(data);

        expect(result).toStrictEqual(expected);
    });
});