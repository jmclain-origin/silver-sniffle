import path from 'path';
import childProcess from 'node:child_process';

export const ROOT_DIR = path.resolve(__dirname, '../../../');
export const SRC_DIR = path.resolve(ROOT_DIR, 'src');
export const LOGS_DIR = path.resolve(ROOT_DIR, 'logs');

/**
 * Spawns a child process to execute the 'pwd' command and returns the result.
 * @returns {ChildProcess} - The child process object.
 */
export const pwd = (_arr?: string[]): null | undefined | string | Error => {
  const child = childProcess
    .spawn('pwd')
    .stdout.once('data', (error: unknown, stdout: any) => {
      if (error) throw error;
      console.log(stdout.toString());
    });
  const result = child.toString();
  return result;
};

export default {
  ROOT_DIR,
  SRC_DIR,
  LOGS_DIR,
  pwd,
};
