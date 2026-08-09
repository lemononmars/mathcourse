import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const contentRoot = path.resolve(projectRoot, 'content', 'courses', 'math-for-designer');

function safeContentFile(file: string) {
  const absolute = path.resolve(projectRoot, file);
  const relative = path.relative(contentRoot, absolute);
  if (relative.startsWith('..') || path.isAbsolute(relative) || path.extname(absolute) !== '.md') throw new Error('Invalid content path');
  return absolute;
}

const markdownEditor = {
  name: 'math-course-markdown-editor',
  configureServer(server: any) {
    server.middlewares.use('/__dev/course-content', async (request: any, response: any) => {
      try {
        const url = new URL(request.url ?? '/', 'http://localhost');
        if (request.method === 'GET') {
          const file = url.searchParams.get('file');
          if (!file) throw new Error('Missing file');
          response.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          response.end(await readFile(safeContentFile(file), 'utf8'));
          return;
        }
        if (request.method === 'POST') {
          let body = '';
          for await (const chunk of request) body += chunk;
          const payload = JSON.parse(body);
          const absolute = safeContentFile(payload.file);
          await writeFile(absolute, payload.content, 'utf8');
          const dataFile = path.resolve(projectRoot, 'src', 'lib', 'course-data.json');
          const courseData = JSON.parse(await readFile(dataFile, 'utf8'));
          for (const week of courseData) {
            const section = week.sections.find((item: any) => item.file === payload.file);
            if (section) section.content = payload.content.replace(/^---[\s\S]*?---\s*/, '');
          }
          await writeFile(dataFile, JSON.stringify(courseData, null, 2) + '\n', 'utf8');
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify({ ok: true }));
          return;
        }
        response.statusCode = 405; response.end('Method not allowed');
      } catch (error) {
        response.statusCode = 400;
        response.end(error instanceof Error ? error.message : 'Unable to edit content');
      }
    });
  }
};

export default defineConfig({ plugins: [markdownEditor, sveltekit()] });
