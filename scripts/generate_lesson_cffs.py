import yaml
import os
import re
from datetime import date

# Configuration
LESSONS_FILE = 'src/data/lessons.yml'
OUTPUT_DIR = 'generated_citations'

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def load_lessons():
    with open(LESSONS_FILE, 'r') as f:
        data = yaml.safe_load(f)
    return data.get('lessons', [])

def generate_cff(lesson):
    # Extract data
    title = lesson.get('name', 'Untitled Lesson')
    abstract = lesson.get('abstract', '')
    version = lesson.get('version', '1.0.0')
    date_released = date.today().isoformat()
    repository_code = lesson.get('repo', '')
    url = lesson.get('url', '')
    keywords = lesson.get('keywords', [])
    license_name = "CC-BY-4.0" # Defaulting to CC-BY-4.0 as per project norm

    # Authors
    authors = []
    if 'authors' in lesson:
        for author_name in lesson['authors']:
            # diverse formats handling (simple string vs dict if expanded later)
            if isinstance(author_name, str):
                parts = author_name.split()
                if len(parts) > 1:
                    family_names = parts[-1]
                    given_names = " ".join(parts[:-1])
                else:
                    family_names = author_name
                    given_names = ""
                authors.append({
                    'family-names': family_names,
                    'given-names': given_names
                })
            # Add ORCID lookup here if we had the author map available easily
            # For now, simplistic name splitting

    cff_data = {
        'cff-version': '1.2.0',
        'message': 'If you use this software, please cite it as below.',
        'type': 'software', # 'dataset' or 'software' are common for lessons
        'title': title,
        'abstract': abstract,
        'version': version,
        'date-released': date_released,
        'license': license_name,
        'repository-code': repository_code,
        'url': url,
        'keywords': keywords,
        'authors': authors
    }

    # Filter empty fields
    cff_data = {k: v for k, v in cff_data.items() if v}

    return cff_data

def save_cff(cff_data, filename):
    with open(filename, 'w') as f:
        yaml.dump(cff_data, f, sort_keys=False, allow_unicode=True)

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    lessons = load_lessons()
    count = 0

    for lesson in lessons:
        # Only generate for internal lessons (skip external resources)
        if lesson.get('type') == 'external':
            continue
            
        # We need a way to map lesson to repo name to name the file correctly
        # for the bash script to pick up.
        # Strategy: Use the repo name from the 'repo' URL if available.
        repo_url = lesson.get('repo', '')
        if repo_url:
            repo_name = repo_url.rstrip('/').split('/')[-1]
        else:
            # Fallback to slugified name if no repo (though these likely won't get PR'd)
            repo_name = slugify(lesson.get('name', 'unknown'))

        cff_data = generate_cff(lesson)
        
        # Filename format: CITATION-<repo_name>.cff
        filename = os.path.join(OUTPUT_DIR, f"CITATION-{repo_name}.cff")
        
        save_cff(cff_data, filename)
        print(f"Generated {filename}")
        count += 1

    print(f"Successfully generated {count} CITATION.cff files.")

if __name__ == "__main__":
    main()