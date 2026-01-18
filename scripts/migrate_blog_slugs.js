import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = 'src/content/blog';

// Get all markdown files
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    
    // Get slug from filename (remove extension)
    const slug = file.replace('.md', '');
    
    // Check if slug field already exists
    if (!parsed.data.slug) {
        console.log(`Adding slug '${slug}' to ${file}`);
        
        // Add slug to data
        parsed.data.slug = slug;
        
        // Reconstruct file content
        const newContent = matter.stringify(parsed.content, parsed.data);
        
        fs.writeFileSync(filePath, newContent);
    } else {
        console.log(`Skipping ${file} (slug already exists)`);
    }
});
