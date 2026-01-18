import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const lessonsFile = 'src/data/lessons.yml';
const outputDir = 'src/content/lessons';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const fileContent = fs.readFileSync(lessonsFile, 'utf8');
const data = yaml.load(fileContent);

if (data.lessons && Array.isArray(data.lessons)) {
    data.lessons.forEach(lesson => {
        // Create a slug from the name
        const slug = lesson.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const outputPath = path.join(outputDir, `${slug}.yaml`);
        const content = yaml.dump(lesson);

        fs.writeFileSync(outputPath, content);
        console.log(`Created ${outputPath}`);
    });
} else {
    console.error('No lessons found in src/data/lessons.yml');
}
