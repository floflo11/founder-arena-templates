import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, 'templates');
const catalogPath = path.join(__dirname, 'catalog.json');

interface Template {
  id: string;
  name: string;
  source_url: string;
  description: string;
  use_cases: string[];
  features: string[];
  author: string;
  screenshot: string;
  path: string;
  tech_stack: string[];
  clone_command: string;
  collected_at: string;
}

interface Catalog {
  version: string;
  collected_at: string;
  source: string;
  usage_notes: string[];
  templates: Template[];
}

// Get existing templates on disk
const existingTemplates = fs.readdirSync(templatesDir).filter(f =>
  fs.statSync(path.join(templatesDir, f)).isDirectory()
);

console.log(`Found ${existingTemplates.length} templates on disk`);

// Load existing catalog
const oldCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

// Build new catalog with enriched data
const templates: Template[] = existingTemplates.map(id => {
  const existing = oldCatalog.templates?.find((t: any) => t.id === id) || {};

  // Detect tech stack from package.json
  const pkgPath = path.join(templatesDir, id, 'package.json');
  let tech_stack: string[] = [];
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['next']) tech_stack.push('nextjs');
      if (deps['react']) tech_stack.push('react');
      if (deps['tailwindcss']) tech_stack.push('tailwind');
      if (deps['@radix-ui/react-slot'] || deps['@radix-ui/react-dialog']) tech_stack.push('shadcn');
      if (deps['framer-motion']) tech_stack.push('framer-motion');
      if (deps['lucide-react']) tech_stack.push('lucide-icons');
    } catch {}
  }

  // Detect features from file structure
  const features: string[] = [];
  const files = fs.readdirSync(path.join(templatesDir, id), { recursive: true }) as string[];
  const fileStr = files.join(' ').toLowerCase();

  if (fileStr.includes('hero')) features.push('hero-section');
  if (fileStr.includes('pricing')) features.push('pricing');
  if (fileStr.includes('testimonial')) features.push('testimonials');
  if (fileStr.includes('faq')) features.push('faq');
  if (fileStr.includes('footer')) features.push('footer');
  if (fileStr.includes('navbar') || fileStr.includes('header')) features.push('navigation');
  if (fileStr.includes('dashboard')) features.push('dashboard');
  if (fileStr.includes('chart') || fileStr.includes('analytics')) features.push('charts');
  if (fileStr.includes('auth') || fileStr.includes('login')) features.push('authentication');
  if (fileStr.includes('cart') || fileStr.includes('checkout')) features.push('ecommerce');
  if (fileStr.includes('blog') || fileStr.includes('article')) features.push('blog');
  if (fileStr.includes('portfolio') || fileStr.includes('gallery')) features.push('portfolio');

  // Infer use cases from features
  const use_cases: string[] = [];
  if (features.includes('hero-section') || features.includes('pricing')) {
    use_cases.push('landing-page');
  }
  if (features.includes('dashboard') || features.includes('charts')) {
    use_cases.push('saas-dashboard');
  }
  if (features.includes('ecommerce')) {
    use_cases.push('ecommerce');
  }
  if (features.includes('blog')) {
    use_cases.push('blog');
  }
  if (features.includes('portfolio')) {
    use_cases.push('portfolio');
  }
  if (use_cases.length === 0) {
    use_cases.push('web-app');
  }

  return {
    id,
    name: existing.name || id,
    source_url: existing.source_url || `https://v0.app/templates/${id}`,
    description: existing.description || `A ${use_cases[0]} template with ${features.slice(0, 3).join(', ')}`,
    use_cases,
    features,
    author: existing.author || 'unknown',
    screenshot: `screenshots/${id}.png`,
    path: `templates/${id}`,
    tech_stack,
    clone_command: `npx degit floflo11/founder-arena-templates/templates/${id} my-project`,
    collected_at: existing.collected_at || new Date().toISOString(),
  };
});

const catalog: Catalog = {
  version: '2.0',
  collected_at: new Date().toISOString(),
  source: 'v0.app',
  usage_notes: [
    'After cloning, run: pnpm install && pnpm dev',
    'IMPORTANT: Replace favicon.ico with your product logo',
    'IMPORTANT: Update metadata in app/layout.tsx (title, description, og:image)',
    'IMPORTANT: Replace placeholder logos and brand colors'
  ],
  templates,
};

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log(`Enriched catalog with ${templates.length} templates`);
