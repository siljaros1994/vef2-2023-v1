import { readFile } from './file.js';

function template(title, content) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" type="text/css" href="public/styles.css">
    </head>
    <body>
      <header>
        <h1>${title}</h1>
      </header>
      ${content}
      <footer>
        <p>University of Iceland</p>
      </footer>
    </body>
    </html>
  `;
}

function index(results) {
  return `
    <nav>
      <ul>
        ${results.map(result => `
          <li>
            <a href="${result.file}">${result.title}</a>
            <table>
              <tr>
                <th>Númer</th>
                <th>Heiti </th>
                <th>Einingar</th>
                <th>Námsmisseri</th>
                <th>Námstig</th>
              </tr>
              ${result.afangar.map(afangi => `
                <tr>
                  <td>${afangi.Númer}</td>
                  <td>${afangi.Heiti}</td>
                  <td>${afangi.Einingar}</td>
                  <td>${afangi.Námsmisseri}</td>
                  <td>${afangi.Námstig}</td>
                </tr>
              `).join('')}
            </table>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
}

export async function indexTemplate(results) {
  const processedData = [];

  for (const result of results) {
    const csv = await readFile(result.file, { encoding: 'utf8' });
    const afangar = csv.split('\n').map(row => {
      const [Númer, Heiti, Einingar, Námsmisseri, Námstig] = row.split(',');
      return { Númer, Heiti, Einingar, Námsmisseri, Námstig };
    });

    processedData.push({ ...result, afangar });
  }

  return template('Gögn', index(processedData));
}

export async function statsTemplate(title, result) {
  const csv = await readFile(result.file, { encoding: 'utf8' });
  const afangar = csv.split('\n').map(row => {
    const [Númer, Heiti, Einingar, Námsmisseri, Námstig] = row.split(',');
    return { Númer, Heiti, Einingar, Námsmisseri, Námstig };
  });

  return template(title, subResults(result, afangar));
}
