import fs from 'fs';
import csv from 'csv-parser';
import {
    parseCSV
} from './parser';
describe('parseCSV', () => {
    it('should parse a CSV file and return the data', (done) => {
        const filePath = './test.csv';
        const expectedData = [{
            "Númer": "HAG403G",
            "Heiti": "Þættir í eindahagfræði (Þættir í rekstrarhagfræði)",
            "Einingar": "6",
            "Kennslumisseri": "Vor",
            "Námstig": "Grunnnám",
            "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=04530620230&kennsluar=2022": ""
        }, {
            "Númer": "HAG104M",
            "Heiti": "Hagnýttar hagmælingar",
            "Einingar": "6",
            "Kennslumisseri": "Haust",
            "Námstig": "Grunnnám / Framhaldsnám",
            "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=70754420226&kennsluar=2022": ""
        }, {
            "Númer": "HAG515M",
            "Heiti": "Hagfræði stjórnmálanna",
            "Einingar": "6",
            "Kennslumisseri": "Haust",
            "Námstig": "Grunnnám / Framhaldsnám",
            "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=70985920226&kennsluar=2022": ""
        }];
        fs.writeFileSync(filePath, 'Númer,Heiti,Einingar,Kennslumisseri,Námstig,https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=04530620230&kennsluar=2022\nHAG403G,Þættir í eindahagfræði (Þættir í rekstrarhagfræði),6,Vor,Grunnnám\nHAG104M,Hagnýttar hagmælingar,6,Haust,Grunnnám / Framhaldsnám\nHAG515M,Hagfræði stjórnmálanna,6,Haust,Grunnnám / Framhaldsnám\n');
        const data = [];
        parseCSV(filePath).on('data', (row) => {
            data.push(row);
        }).on('end', () => {
            expect(data).toEqual(expectedData);
            done();
        });
    });
});
async function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(filePath).pipe(csv()).on('data', (row) => {
            data.push(row);
        }).on('end', () => {
            resolve(data);
        }).on('error', (err) => {
            reject(err);
        });
    });
}