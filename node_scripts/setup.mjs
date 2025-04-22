import { execSync } from 'child_process';

const env = {
  ...process.env,
  npm_config_platform: 'darwin',
  npm_config_arch: 'x64',
};

try {
  execSync('yarn install --ignore-optional', {
    stdio: 'inherit',
    env
  });
  execSync('yarn add sharp --force', {
    stdio: 'inherit',
    env
  });
} catch (err) {
  console.error('❌ Error durante el setup:', err.message);
  process.exit(1);
}
