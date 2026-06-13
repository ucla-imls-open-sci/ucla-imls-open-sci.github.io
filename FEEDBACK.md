# Lesson Feedback

Each lesson detail page shows a "Leave Feedback" button that opens a pre-filled GitHub issue.
No backend, no third-party service, no configuration needed.

## How it works

1. Visitor clicks "Leave Feedback" on a lesson page.
2. GitHub opens in a new tab with the issue title pre-filled (`Feedback: <Lesson Name>`).
3. Visitor completes the form and submits — requires a free GitHub account.
4. The issue lands in this repo with the `feedback` label, assigned to `jt14den`.

## Form fields

The `lesson-feedback.yml` template collects:

| Field | Type | Notes |
|---|---|---|
| Did this lesson meet your needs? | Dropdown | Yes / Partly / No — required |
| Biggest issue | Checkboxes | 8 options, select all that apply — optional |
| I am a | Dropdown | Role — optional |
| Anything else? | Textarea | Free text — optional |

The lesson name is captured in the issue title, pre-filled from the page URL.

## Reviewing feedback

- Filter open issues by the `feedback` label.
- The issue title identifies the lesson.
- Close issues after reviewing — or leave open for author follow-up.
- To export: use the GitHub API or a CSV export tool like [github-issue-exporter](https://github.com/gavinr/github-csv-tools).

## Files involved

| File | Role |
|---|---|
| `.github/ISSUE_TEMPLATE/lesson-feedback.yml` | The GitHub issue form |
| `src/components/LessonFeedback.astro` | The button and link on lesson pages |
| `src/pages/lessons/[slug].astro` | Renders the component |

## Limitations

- Requires a GitHub account. For this audience (librarians, instructors, researchers), that's a reasonable bar.
- Anonymous feedback is not possible.
- No aggregate counts — issues must be reviewed manually or exported.
- If volume grows, add a `feedback` project board or export to a spreadsheet periodically.
