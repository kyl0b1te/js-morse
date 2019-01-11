
const assert = require('assert');
const Morse = require('../morse/morse');

describe('Morse', () => {

    const morse = new Morse();

    const tests = [
        {
            text: 'A',
            code: '.-'
        },
        {
            text: 'ABCDEFGHIKLMNOPQRSTVXYZ',
            code: '.- -... -.-. -.. . ..-. --. .... .. -.- .-.. -- -. --- .--. --.- .-. ... - ...- -..- -.-- --..'
        },
        {
            text: '1234567890',
            code: '.---- ..--- ...-- ....- ..... -.... --... ---.. ----. -----'
        },
        {
            text: 'SENTENCE TEST',
            code: '... . -. - . -. -.-. . / - . ... -'
        }
    ];

    describe('#encode', () => {

        it('should be function type', () => {

            assert.equal(typeof morse.encode, 'function');
        });

        it('should return correct morse codes', () => {

            tests.map(test => {

                assert.equal(morse.encode(test.text), test.code, `"${test.text}" encoding failed`);
            });
        });
    });

    describe('#decode', () => {

        it('should be function type', () => {

            assert.equal(typeof morse.decode, 'function');
        });

        it('should return correct decoded texts', () => {

            tests.map(step => {

                assert.equal(morse.decode(step.code), step.text, `"${step.code}" decoding failed`);
            });
        });
    })
});
