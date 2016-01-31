window.Morse = (function () {

    'use strict';

    var source = {
        A: 13, B: 47, C: 43, D: 23, E: 7, F: 59,
        G: 19, H: 63, I: 15, J: 49, K: 21, L: 55,
        M: 9, N: 11, O: 17, P: 51, Q: 37, R: 27,
        S: 31, T: 5, U: 29, V: 61, W: 25, X: 45,
        Y: 41, Z: 39, 1: 97, 2: 113, 3: 121, 4: 125,
        5: 127, 6: 95, 7: 79, 8: 71, 9: 67, 0: 65, " ": 0
    };

    var markup = {
        dot: '.',
        dash: '-',
        space: ' '
    };

    function times(symbol, number)
    {
        return Array.apply(null, {length: number}).map(el => symbol).join('')
    }

    function byWord()
    {
        return times(markup.space, 7)
    }

    function byLetter()
    {
        return times(markup.space, 3)
    }

    function getMarkup(letter)
    {
        return (letter.toString(2) + '').split('').slice(1, -1)
    }

    function getLetter(markup_code)
    {
        return Object.keys(source)
                .filter(letter => source[letter].toString(2) == '1' + markup_code + '1')
                .shift()
    }

    function letterToMarkup(letter)
    {
        return !letter ? [byWord()] : getMarkup(letter)
            .map(point => point == 1 ? markup.dot : times(markup.dash, 3))
    }

    function letterFromMarkup(letter_markup)
    {
        return getLetter(
            letter_markup.split(markup.space)
                .map(symbol => symbol == markup.dot ? 1 : 0)
                .join('')
        )
    }

    return {
        encode: function (text) {
            return text.toUpperCase().split('')
                .filter(letter => source.hasOwnProperty(letter))
                .map(letter => letterToMarkup(source[letter]).join(markup.space))
                .join(byLetter())
        },
        decode: function (source) {
            return source
                .split(byWord())
                .map(word => word.split(byLetter()).filter(Boolean).map(letterFromMarkup).join(''))
                .join(byWord())
        }
    };

})();