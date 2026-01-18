import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        author: fields.text({ label: 'Author' }),
        description: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: props => props.value }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/assets/images/blog',
            publicPath: '/assets/images/blog/',
          },
        }),
      },
    }),
    lessons: collection({
      label: 'Lessons',
      slugField: 'name',
      path: 'src/content/lessons/*',
      format: 'yaml',
      schema: {
        name: fields.slug({ name: { label: 'Lesson Name' } }),
        duration: fields.text({ label: 'Duration' }),
        authors: fields.array(fields.text({ label: 'Author' }), { label: 'Authors', itemLabel: props => props.value }),
        contributors: fields.array(fields.text({ label: 'Contributor' }), { label: 'Contributors', itemLabel: props => props.value }),
        content_contributors: fields.array(fields.text({ label: 'Content Contributor' }), { label: 'Content Contributors', itemLabel: props => props.value }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Pre-Alpha', value: 'pre-alpha' },
            { label: 'Alpha', value: 'alpha' },
            { label: 'Beta', value: 'beta' },
            { label: 'Mature', value: 'mature' },
          ],
          defaultValue: 'alpha',
        }),
        status_note: fields.text({ label: 'Status Note' }),
        educationalLevel: fields.select({
            label: 'Educational Level',
            options: [
                { label: 'Introductory', value: 'Introductory' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Advanced', value: 'Advanced' },
            ],
            defaultValue: 'Introductory'
        }),
        abstract: fields.text({ label: 'Abstract', multiline: true }),
        why_teach: fields.text({ label: 'Why Teach This?', multiline: true }),
        keywords: fields.array(fields.text({ label: 'Keyword' }), { label: 'Keywords', itemLabel: props => props.value }),
        learningResourceType: fields.select({
            label: 'Resource Type',
            options: [
                { label: 'Lesson', value: 'lesson' },
                { label: 'Course', value: 'course' },
                { label: 'Reference', value: 'reference' },
                { label: 'Framework', value: 'framework' },
            ],
            defaultValue: 'lesson'
        }),
        teaches: fields.array(fields.text({ label: 'Learning Objective' }), { label: 'Teaches', itemLabel: props => props.value }),
        url: fields.url({ label: 'Lesson URL' }),
        repo: fields.url({ label: 'Repository URL' }),
        doi: fields.text({ label: 'DOI' }),
        version: fields.text({ label: 'Version' }),
        library_carpentry_adopted: fields.checkbox({ label: 'Adopted by Library Carpentry' }),
        pilots: fields.array(
          fields.object({
            date: fields.date({ label: 'Date' }),
            location: fields.text({ label: 'Location' }),
            instructor: fields.text({ label: 'Instructor' }),
            type: fields.text({ label: 'Type' }),
            note: fields.text({ label: 'Note' }),
          }),
          { label: 'Pilots', itemLabel: props => `${props.fields.date.value} - ${props.fields.location.value}` }
        ),
        recognition: fields.array(
            fields.object({
                title: fields.text({ label: 'Title' }),
                desc: fields.text({ label: 'Description' }),
                url: fields.url({ label: 'URL' }),
            }),
            { label: 'Recognition', itemLabel: props => props.fields.title.value }
        ),
         prerequisites: fields.array(
            fields.object({
                name: fields.text({ label: 'Name' }),
                url: fields.url({ label: 'URL' }),
            }),
            { label: 'Prerequisites', itemLabel: props => props.fields.name.value }
        ),
      },
    }),
  },
});
