import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const required = {
  API_URL: 'apiUrl',
  COGNITO_AUTHORITY: 'cognitoAuthority',
  COGNITO_CLIENT_ID: 'cognitoClientId',
  COGNITO_DOMAIN: 'cognitoDomain',
};

const missing = Object.keys(required).filter(
  (k) => !process.env[k] || process.env[k].trim() === '',
);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const values = Object.fromEntries(
  Object.entries(required).map(([envKey, field]) => [field, process.env[envKey].trim()]),
);

const dev = { production: false, ...values };
const prod = { production: true, ...values };

const formatEnv = (env) =>
  `export const environment = {\n` +
  `  production: ${env.production},\n` +
  Object.entries(env)
    .filter(([k]) => k !== 'production')
    .map(([k, v]) => `  ${k}: '${v}',`)
    .join('\n') +
  `\n};\n`;

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), '../src/environments');
mkdirSync(outDir, { recursive: true });

writeFileSync(resolve(outDir, 'environment.ts'), formatEnv(dev));
writeFileSync(resolve(outDir, 'environment.prod.ts'), formatEnv(prod));

console.log('Generated src/environments/environment.ts and environment.prod.ts');