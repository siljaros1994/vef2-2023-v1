import fs from 'fs';
import csv from 'csv-parser';

export function parseCSV(filePath) {
  const data = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      console.log(data);
    });
}
