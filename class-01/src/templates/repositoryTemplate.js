import Util from '../utils/util.js';

const componentNameAnchor = "$$componentName";

const template = `
export default class $$componentName {
    constructor() {}

    create(data) {
        return Promise.reject('Method not implemented!');
    }

    read(query) {
        return Promise.reject('Method not implemented!');
    }

    update(id, data) {
        return Promise.reject('Method not implemented!');
    }

    delete(id) {
        return Promise.reject('Method not implemented!');
    }
}
`

export default function repositoryTemplate(componentName) {
    const componentNameFistLetterUpperCase = Util.upperCaseFirstLetter(componentName);
    const componentNameToTemplate = `${componentNameFistLetterUpperCase}Repository`;

    return {
        fileName: `${componentName}Repository`,
        template: template.replaceAll(componentNameAnchor, componentNameToTemplate),
    }
}