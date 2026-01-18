import yaml
import sys
import re
import glob
import os

def slugify(text):
    text = str(text).lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    return re.sub(r'\-\-+', '-', text)

def load_lessons():
    lessons = []
    lessons_dir = 'src/content/lessons'
    for filepath in glob.glob(os.path.join(lessons_dir, '*.yaml')):
        with open(filepath, 'r') as f:
            data = yaml.safe_load(f)
            if data:
                lessons.append(data)
    # Optional: Sort lessons by name for consistent table order
    lessons.sort(key=lambda x: x.get('name', '').lower())
    return lessons

def generate_table():
    lessons = load_lessons()

    # Table Header
    markdown = "| Lesson | Authors | Status | Links |\n"
    markdown += "| :--- | :--- | :--- | :--- |\n"

    for lesson in lessons:
        # Skip external resources if you only want your curriculum
        if lesson.get('type') == 'external':
            continue

        name = lesson['name']
        status = lesson.get('status', 'Unknown')
        
        # Build Author Links
        authors = lesson.get('authors', [])
        author_links = []
        if authors:
            for author in authors:
                slug = slugify(author)
                link = f"[{author}](https://ucla-imls-open-sci.info/authors/{slug})"
                author_links.append(link)
        author_str = ", ".join(author_links)

        # Build Links
        links = []
        if lesson.get('url'):
            links.append(f"[Website]({lesson['url']})")
        if lesson.get('repo'):
            links.append(f"[Repo]({lesson['repo']})")
        
        link_str = " / ".join(links)
        
        # Status Badge (Optional visual flair)
        status_badge = status
        if 'beta' in status.lower():
            status_badge = f"🟢 {status}"
        elif 'alpha' in status.lower():
            status_badge = f"🟡 {status}"
        elif 'pre' in status.lower():
            status_badge = f"⚪ {status}"

        markdown += f"| {name} | {author_str} | {status_badge} | {link_str} |\n"

    return markdown

if __name__ == "__main__":
    print(generate_table())

