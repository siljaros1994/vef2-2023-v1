import { parseCSV } from './parser';

describe('parseCSV', () => {
  it('parses the CSV file and returns the expected result', async () => {
    const expectedResult = {
      "Númer": "HAG403G",
      "Heiti": "Þættir í eindahagfræði (Þættir í rekstrarhagfræði)",
      "Einingar": "6",
      "Kennslumisseri": "Vor",
      "Námstig": "Grunnnám",
      "https://ugla.hi.is/kennsluskra/?tab=nam&chapter=namskeid&id=04530620230&kennsluar=2022": ""
    };

    const filePath = './data/hagfraedi.csv';
    const result = await parseCSV(filePath);

    expect(result).toEqual(expectedResult);
  });
});
