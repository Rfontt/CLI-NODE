export default class Util {
    static #transform({ str: [first, ...rest], opperCase = true }) {
        if (!first) return '';

        const firstLetter = opperCase ?
            first.toUpperCase() : 
            first.toLowerCase();

        return [firstLetter, ...rest].join('');
    }

    static upperCaseFirstLetter(str) {
        return this.#transform({ str });
    }

    static lowerCaseFirstLetter(str) {
        return this.#transform({ str, opperCase: false });
    }
}