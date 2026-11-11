import fs from 'node:fs';
import path from 'node:path';

const PROJECTS_DIR = './src/content/projects';

async function downloadReadme(gitlabUrl) {
  const branches = ['main', 'master'];
  for (const branch of branches) {
    const url = `${gitlabUrl}/-/raw/${branch}/README.md`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.text();
      }
    } catch {
      // try next branch
    }
  }
  return null;
}

async function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const gitlabMatch = content.match(/gitlab:\s*(.+)/i);
  const useReadmeMatch = content.match(/useReadme:\s*(.+)/i);

  const gitlabUrl = gitlabMatch ? gitlabMatch[1].trim().replace(/['"]/g, '') : null;
  const useReadme = useReadmeMatch ? useReadmeMatch[1].trim().toLowerCase() === 'true' : false;

  if (useReadme && gitlabUrl) {
    console.log(`Fetching README for ${filePath} from ${gitlabUrl}`);
    const readme = await downloadReadme(gitlabUrl);
    if (!readme) {
      console.warn(`Could not find README for ${filePath}`);
      return;
    }
    const anchor = '[//]: # (anchor)';
    const anchorIdx = content.indexOf(anchor);
    if (anchorIdx !== -1) {
      const before = content.slice(0, anchorIdx + anchor.length);
      fs.writeFileSync(filePath, `${before}\n\n${readme.trim()}\n`);
      console.log(`Updated ${filePath}`);
    }
  }
}

async function main() {
  if (!fs.existsSync(PROJECTS_DIR)) return;
  const files = fs.readdirSync(PROJECTS_DIR);
  for (const f of files) {
    if (f.endsWith('.md')) {
      await processFile(path.join(PROJECTS_DIR, f));
    }
  }
}

main().catch(console.error);
