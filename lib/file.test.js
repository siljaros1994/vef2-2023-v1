const file = require('./file');

describe('direxists function', () => {
  it('should return true for a directory that exists', () => {
    expect(file.direxists('/path/to/existing/directory')).resolves.toBe(true);
  });

  it('should return false for a directory that does not exist', () => {
    expect(file.direxists('/path/to/nonexistent/directory')).resolves.toBe(false);
  });
});

describe('readFilesFromDir function', () => {
  it('should return an array of files for a directory that exists and has files', () => {
    expect(file.readFilesFromDir('/path/to/existing/directory')).resolves.toEqual(['/path/to/existing/directory/file1.txt', '/path/to/existing/directory/file2.txt']);
  });

  it('should return an empty array for a directory that does not exist', () => {
    expect(file.readFilesFromDir('/path/to/nonexistent/directory')).resolves.toEqual([]);
  });

  it('should return an empty array for a directory that exists but has no files', () => {
    expect(file.readFilesFromDir('/path/to/empty/directory')).resolves.toEqual([]);
  });
});

describe('readFile function', () => {
  it('should return the content of a file that exists', () => {
    expect(file.readFile('/path/to/existing/file.txt')).resolves.toEqual('This is the content of the file');
  });

  it('should return null for a file that does not exist', () => {
    expect(file.readFile('/path/to/nonexistent/file.txt')).resolves.toEqual(null);
  });
});