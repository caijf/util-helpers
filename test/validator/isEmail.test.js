import {
    expect
} from 'chai';

import isEmail from '../../src/validator/isEmail'


describe('isEmail', () => {
    it('非字符串 => false', () => {
        expect(isEmail(true)).to.be.equal(false);
        expect(isEmail(123)).to.be.equal(false);
    });
    it('"1232@qq.com" => true', () => {
        expect(isEmail('1232@qq.com')).to.be.equal(true);
    });
    it('"123@" => false', () => {
        expect(isEmail('123@')).to.be.equal(false);
    });
})