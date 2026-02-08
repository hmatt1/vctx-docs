import fs from 'node:fs';
import path from 'node:path';
import { sidebar } from '../sidebar.mjs'; // <--- Import shared config

const DOCS_DIR = 'src/content/docs';
const OUTPUT_FILE = 'public/vctx-documentation.md';

// Recursively extract slugs from the sidebar structure
function extractSlugs(items) {
    let slugs = [];
    for (const item of items) {
        // If it's a group, recurse into its items
        if (item.items) {
            slugs = slugs.concat(extractSlugs(item.items));
        }
        // If it's a page, grab the slug
        if (item.slug) {
            slugs.push(item.slug);
        }
    }
    return slugs;
}

function getFileContent(slug) {
    const extensions = ['.md', '.mdx'];
    
    // Check direct file
    for (const ext of extensions) {
        const filePath = path.join(DOCS_DIR, `${slug}${ext}`);
        if (fs.existsSync(filePath)) return { path: filePath, content: fs.readFileSync(filePath, 'utf-8') };
    }
    
    // Check nested index
    for (const ext of extensions) {
        const filePath = path.join(DOCS_DIR, slug, `index${ext}`);
        if (fs.existsSync(filePath)) return { path: filePath, content: fs.readFileSync(filePath, 'utf-8') };
    }

    console.warn(`⚠️  Warning: Could not find file for slug: ${slug}`);
    return null;
}

function stripFrontmatter(content) {
    return content.replace(/^---[\s\S]+?---\s*/, '');
}

async function main() {
    console.log('📚 Generating concatenated documentation...');
    
    // Dynamically get the order from the sidebar config
    const slugs = extractSlugs(sidebar);
    
    let fullContent = `# vctx Language Documentation\n`;
    fullContent += `*Generated on: ${new Date().toLocaleDateString()}*\n---\n`;

    const processed = new Set();

    for (const slug of slugs) {
        if (processed.has(slug)) continue;
        
        const fileData = getFileContent(slug);
        
        if (fileData) {
            const cleanContent = stripFrontmatter(fileData.content);
            fullContent += `\n\n\n\n`;
            fullContent += cleanContent;
            fullContent += `\n\n---\n`;
            processed.add(slug);
        }
    }

    // Ensure public dir exists
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, fullContent);
    console.log(`✅ Successfully wrote ${slugs.length} pages to ${OUTPUT_FILE}`);
}

main();