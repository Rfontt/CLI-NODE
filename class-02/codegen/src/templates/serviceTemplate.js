import Util from '../utils/util.js';

const componentNameAnchor = "$$componentName";
const currentContextAnchor = "$$currentContext";
const repositoryNameAnchor = "$$repositoryName";

const template = `export default class $$componentName {
    constructor({ repository: $$repositoryName }) {
        $$currentContext = $$repositoryName;
    }

    create(data) {
        return $$currentContext.create(data);
    }

    read(query) {
        return $$currentContext.read(query);
    }

    update(id, data) {
        return $$currentContext.update(id, data);
    }

    delete(id) {
        return $$currentContext.delete(id);
    }
}`

export default function serviceTemplate(componentName, repositoryName) {
    const currentContext = `this.${repositoryName}`;
    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
        .replaceAll(currentContextAnchor, currentContext)
        .replaceAll(repositoryNameAnchor, repositoryName);

    return {
        fileName: componentName,
        template: txtFile,
    }
}