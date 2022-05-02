import Util from '../utils/util.js';

const instanceRepositoryNameAnchor = "$$importRepositoryName";
const instanceServiceNameAnchor = "$$importServiceName";

const componentNameAnchor = "$$componentName";
const repositoryNameAnchor = "$$repositoryName";
const serviceNameAnchor = "$$serviceName";

const template = `
import $$importRepositoryName from '../repository/$$repositoryName.js';
import $$importServiceName from '../service/$$serviceName.js';

export default class $$componentName {
    static getInstance() {
        const repository = new $$importRepositoryName();
        const service = new $$importServiceName({ repository });

        return service;
    }
}`

export default function factoryTemplate(componentName, repositoryName, serviceName) {
    const componentNameFirstLetterUpperCase = Util.upperCaseFirstLetter(componentName);
    const importRepositoryNameFirstLetterUpperCase = Util.upperCaseFirstLetter(repositoryName);
    const importServiceNameFirstLetterUpperCase = Util.upperCaseFirstLetter(serviceName);

    const repositoryNameFirstLetterLowerCase = Util.lowerCaseFirstLetter(repositoryName);
    const serviceNameFirstLetterLowerCase = Util.lowerCaseFirstLetter(serviceName);

    const txtFile = template
        .replaceAll(componentNameAnchor, componentNameFirstLetterUpperCase)
        .replaceAll(instanceRepositoryNameAnchor, importRepositoryNameFirstLetterUpperCase)
        .replaceAll(instanceServiceNameAnchor, importServiceNameFirstLetterUpperCase)
        .replaceAll(repositoryNameAnchor, repositoryNameFirstLetterLowerCase)
        .replaceAll(serviceNameAnchor, serviceNameFirstLetterLowerCase);

    return {
        fileName: componentName,
        template: txtFile,
    }
}