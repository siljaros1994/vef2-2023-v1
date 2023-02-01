import fs from 'fs/promises';
import { existsSync } from 'fs';

async function readCSV(fp){
    if (Path.extname(fp) != '.csv') return 'ekki csv :(';
    const temp = await fs.readFile(fp, {encoding : "binary"});
    let output = temp.split('\n').map((row) => row.split(';'));
    const header = output.shift();

    output = output.map((col) => {
        return {
            nr: col[0],
            Nafn: col[1],
            einingar: Number (col[2]),
            misseri: col[3],
            stig: col[4],
            link: col[5],
        };
    });
    return output;
}
