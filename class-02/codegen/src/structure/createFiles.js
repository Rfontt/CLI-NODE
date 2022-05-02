import fsPromises from 'fs/promises';
import fs from 'fs';
import templates from '../templates/index.js';
import Util from '../utils/util.js';

const defaultDependencies = (layer, componentName) => {
    const dependencies = {
        repository: [],
        service: [
            `${componentName}Repository`
        ],
        factory: [
            `${componentName}Repository`,
            `${componentName}Service`
        ]
    }

    return dependencies[layer]
        // Pode ser que venha: Product
        // Quero que retorne: product
        .map(item => Util.lowerCaseFirstLetter(item));
}

async function executeWrites(pendingFilesToWrite) {
    return Promise.all(
        pendingFilesToWrite
            .map(
                ({ fileNameForArchive, textFile }) => {
                    fsPromises.writeFile(fileNameForArchive,textFile); 
                }
        )
    )
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
    const keys = Object.keys(templates);
    const pendingFilesToWrite = [];

    for (const layer of layers) {
        /* 
            factoryTemplate,
            serviceTemplate,
            repositoryTemplate

            layers = ['inexistent']
        */
        const chosenTemplate = keys.find(key => key.includes(layer));

        if (!chosenTemplate) {
            return { error: 'the chosen layer doesnt have a template' };
        }

        const template = templates[chosenTemplate];
        // /Users/Document/jsexpert/codegen/src/factory
        const targetFile = `${mainPath}/${defaultMainFolder}/${layer}`;
        const dependencies = defaultDependencies(layer, componentName);
        const { fileName, template: textFile } = template(componentName, ...dependencies);
        const fileNameForArchive = `${targetFile}/${Util.lowerCaseFirstLetter(fileName)}.js`;

        pendingFilesToWrite.push({ fileNameForArchive, textFile });
    }

    await executeWrites(pendingFilesToWrite);

    return { success: true };
}