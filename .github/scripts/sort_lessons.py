import yaml

# Define preferred sort order for lesson status
STATUS_ORDER = ["Beta", "Alpha", "pre-Alpha"]

# Load the YAML
with open("_data/ui-text.yml", "r") as f:
    data = yaml.safe_load(f)

# Pull all lessons across years
all_lessons = []
for year in data["en"]["lessontab"]["years"]:
    for lesson in year["lessons"]:
        lesson["year"] = year["year"]
        all_lessons.append(lesson)

# Sorting function
def lesson_sort_key(lesson):
    status = lesson.get("status", "pre-Alpha")
    return (STATUS_ORDER.index(status), lesson.get("lesson-title", ""))

# Sort the lessons
sorted_lessons = sorted(all_lessons, key=lesson_sort_key)

# Save sorted list under a new key
data["en"]["lessontab"]["lessons_sorted"] = sorted_lessons

# Output to a new file (optional: overwrite original if you prefer)
with open("_data/ui-text-sorted.yml", "w") as f:
    yaml.dump(data, f, sort_keys=False, allow_unicode=True)
