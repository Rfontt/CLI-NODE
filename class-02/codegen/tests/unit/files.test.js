import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from '@jest/globals';
import { createFiles } from '../../src/structure/createFiles.js';
import fsPromises from 'fs/promises';
import fs from 'fs';
import templates from '../../src/templates/index.js';

describe('#Files - Files Structure', () => {
    const defaultLayers = ['service', 'factory', 'repository']; 
    const config = {
        mainPath: './', 
        defaultMainFolder: 'src',
        layers: defaultLayers,
        componentName: 'heroes'
    };
    const repositoryLayer = `${config.componentName}Repository`;
    const serviceLayer = `${config.componentName}Service` 

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test('Should not create file structure an inexistent templates', async () => {
        const myConfig = {
            ...config,
            layers: ['inexistent']
        }
        const expected = { error: 'the chosen layer doesnt have a template' }
        const result = await createFiles(myConfig);

        expect(result).toStrictEqual(expected);
    });

    test('Repository should not add any additional dependencies', async () => {
        jest
            .spyOn(fsPromises, fsPromises.writeFile.name)
            .mockResolvedValue();
        jest
            .spyOn(templates, templates.repositoryTemplate.name)
            .mockReturnValue({ fileName: '', template: '' })

        const myConfig = {
            ...config,
            layers: ['repository']
        }
        const expected = { success: true };
        const result = await createFiles(myConfig);

        expect(result).toStrictEqual(expected);
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
        expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName);
    });

    test('Service should have repository as dependency', async () => {
        jest
            .spyOn(fsPromises, fsPromises.writeFile.name)
            .mockResolvedValue();
        jest
            .spyOn(templates, templates.serviceTemplate.name)
            .mockReturnValue({ fileName: '', template: '' })

        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        }
        const expected = { success: true };
        const result = await createFiles(myConfig);

        expect(result).toStrictEqual(expected);
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
        expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer);
    });

    test('Factory should have repository and service as dependencies', async () => {
        jest
            .spyOn(fsPromises, fsPromises.writeFile.name)
            .mockResolvedValue();

        jest
            .spyOn(templates, templates.factoryTemplate.name)
            .mockReturnValue({ fileName: '', templates: '' });
    

        const expected = { success: true };
        const result = await createFiles(config);

        expect(result).toStrictEqual(expected);
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(3);
        expect(templates.factoryTemplate).toHaveBeenCalledWith(config.componentName, repositoryLayer, serviceLayer);
    });
});
