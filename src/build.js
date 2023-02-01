import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { indexTemplate, statsTemplate } from '../lib/html.js';
import { direxists, readFile } from '../lib/file.js';
//import { parse } from '../lib/parser.js';
import { parseCSV } from '../lib/parser.js';

const folderPath = 'C:/Users/silja/Documents/GitHub/vef2-2023-v1/data';
const csvFiles = [
  'hagfraedi.csv',
  'islenska.csv',
  'ivt.csv',
  'laeknadeild.csv',
  'ologlegt.csv',
  'salfraedideild.csv',
  'stjornmalafraedi.csv',
  'tomt.csv',
  'vidskiptafraedi.csv',
];

csvFiles.forEach((file) => {
  const filePath = `${folderPath}/${file}`;
  parseCSV(filePath);
});

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const jsonData = await readFile('./data/index.json', 'utf-8');
  const parse = JSON.parse(jsonData);

  const results = [];

  for (const file of parse) {
    const title = Object.values(file)[1];
    const description = Object.values(file)[0];
    const csv = Object.values(file)[3];

    if (file) {
      const filename = `${title}.html`;
      const content = await readFile(join(DATA_DIR, title), {
        encoding: 'utf-8',
      });
      const afangar = await JSON.parse(content);

      if (afangar) {
        const result = {
          title,
          afangar,
          description,
          csv,
        };

        results.push(result);
        const filepath = join(OUTPUT_DIR, filename);
        const template = statsTemplate(result);
        await writeFile(filepath, template, { flag: 'w+' });
      }
    }
  }

  const filepath = join(OUTPUT_DIR, 'index.html');
  const template = indexTemplate(results);
  fs.writeFile(
    path.join(__dirname, '..', 'public', 'index.html'),
    await indexTemplate(results),
    (err) => {
      if (err) throw err;
      console.log('index.html written');
    }
  );
}
