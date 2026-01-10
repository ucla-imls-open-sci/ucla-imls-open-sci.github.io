# UX Redesign Plan: Highlighting Lesson Piloting Opportunities

**Date**: January 9, 2026
**Goal**: Improve visibility of lessons needing pilots while maintaining strong lesson showcase functionality

---

## Executive Summary

**Current Problem**: The call-to-action for piloting lessons is buried in the website design, making it difficult for potential instructors to discover that lessons need pilots.

**Solution**: Restructure the website to differentiate lessons by development stage (Pre-Alpha, Alpha, Beta) and provide clear, status-appropriate calls-to-action that guide instructors to the right next step.

---

## Understanding the Carpentries Lesson Lifecycle

Based on [Carpentries Lesson Development Training](https://carpentries.github.io/lesson-development-training/):

| Stage | Definition | Ready for External Piloting? |
|-------|------------|------------------------------|
| **Pre-Alpha** | First draft still being constructed, not yet taught | ❌ No - Still in development |
| **Alpha** | Being taught by original authors | ✅ Yes - Ready for first external pilots |
| **Beta** | Already piloted by external instructors | ✅ Yes - Seeking more pilots for broader testing |
| **Stable/Adopted** | Extensively tested, possibly formally adopted (e.g., Library Carpentry) | ✅ Optional - Mature, but feedback welcome |

**Key Insight**: Both Alpha AND Beta lessons need pilots! The difference is:
- **Alpha**: First external pilots testing in new contexts
- **Beta**: Broader piloting for refinement and validation
- **Adopted/Stable**: Ready for general teaching, but pilots/feedback still valuable

---

## Current Lesson Inventory

### Lessons Seeking Pilots (7 Alpha + 3 Beta = 10 total)

**Alpha Lessons (Ready for First External Pilots):**
1. Open and Reproducible Research Cloud Workflows
2. Collaborative Multilingual Search and Discovery Systems
3. Authoring Open Science
4. Creating Data Dashboards (R/Shiny)
5. Research Community Outreach with Open Science Team Agreements
6. A Path to Open, Inclusive, and Collaborative Science for Librarians
7. Open Qualitative Research (Taguette)

**Beta Lessons (Seeking More Pilots for Broader Testing):**
1. A Gentle Hands-On Introduction to Containers and Virtual Machines
2. Data Management and Sharing Plans for Librarians 101 *(Adopted by Library Carpentry)*
3. Open Qualitative Research (QualCoder)

**Pre-Alpha Lessons (Not Ready Yet - 5 total):**
1. Building an Open Science Community of Practice
2. Open Science Discovery Engines (NASA SciX)
3. Leveraging Open Research and Contributor IDs (ORCID)
4. Reproducible Research Workflows
5. Open Science Hardware: An Introduction for Librarians

**Mature/External Resources (7 total):**
- FOSTER Open Science, NASA TOPS, ACRL Cookbook, etc.

---

## Revised UX Strategy

### Two-Pronged Approach:

**Goal 1: Showcase Lessons** ✅ Already Strong
- Keep current design for lesson discovery
- Maintain rich metadata (authors, citations, learning objectives)
- Continue highlighting recognition and impact

**Goal 2: Recruit Pilots** ⚠️ Needs Improvement
- Make it crystal clear that **10 lessons actively need pilots**
- Differentiate messaging by lesson stage (Alpha vs. Beta)
- Create clear pathways to pilot action
- Reduce friction in pilot sign-up process

---

## Implementation Plan

### PRIORITY 1: Update Status Badge System ⚡ Quick Win

**Current State**: Status badges exist but don't clearly communicate pilot needs.

**New System**:

| Status | Badge Color | Badge Text | Meaning |
|--------|-------------|------------|---------|
| Pre-Alpha | Gray | "In Development" | Not ready for piloting |
| Alpha | Orange/Yellow | "Alpha - Seeking Pilots" | Ready for first external pilots |
| Beta | Blue | "Beta - Seeking More Pilots" | Already piloted, needs broader testing |
| Adopted | Green | "Adopted - Ready to Teach" | Library Carpentry official lesson |
| Stable | Green | "Stable" | Mature curriculum |

**Why Blue for Beta?**
- Green signals "done/complete" - but Beta lessons still need work
- Blue signals "action needed" but not urgent/warning like orange
- Creates visual distinction between Beta (still needs pilots) and Adopted (ready)

**Implementation**:
- Update `src/data/lessons.yml` with clarified statuses
- Update CSS classes for badge colors
- Add conditional logic in templates to show appropriate badges

**Estimated Effort**: 2-3 hours

---

### PRIORITY 2: Add Status-Specific Banners to Lesson Pages

**Current State**: All lessons have same layout regardless of development stage.

**New Approach**: Show contextual banner at top of lesson page based on status.

#### For Alpha Lessons:

```
┌────────────────────────────────────────────────────────────────┐
│ 🟡 This Lesson is Ready for External Piloting!                │
│                                                                 │
│ The authors have taught this lesson and refined it based on    │
│ feedback. We're now looking for instructors to test it in      │
│ new contexts and communities.                                  │
│                                                                 │
│ What's Involved:                                               │
│ • Teach all or part of the lesson to your audience            │
│ • Collect feedback from learners (we provide templates)       │
│ • Share your experience via a brief report                     │
│                                                                 │
│ What You Get:                                                  │
│ • Recognition as a contributor                                 │
│ • Early access to cutting-edge curriculum                      │
│ • Join our community of practice                              │
│ • Professional development opportunity                         │
│                                                                 │
│ [🎯 I'm Interested in Piloting] [📖 View Pilot Guide]        │
└────────────────────────────────────────────────────────────────┘
```

#### For Beta Lessons:

```
┌────────────────────────────────────────────────────────────────┐
│ 🔵 This Lesson is Seeking More Pilots!                        │
│                                                                 │
│ This lesson has been piloted by external instructors and is    │
│ working well. We're seeking additional pilots to test it in   │
│ diverse contexts and refine it further.                        │
│                                                                 │
│ [🎯 I'm Interested in Piloting] [📖 View Pilot Guide]        │
└────────────────────────────────────────────────────────────────┘
```

#### For Pre-Alpha Lessons:

```
┌────────────────────────────────────────────────────────────────┐
│ ⚪ This Lesson is in Active Development                        │
│                                                                 │
│ The authors are still developing this lesson. It's not ready   │
│ for piloting yet. Check back soon!                            │
│                                                                 │
│ [Preview Draft] [Get Notified When Ready]                     │
└────────────────────────────────────────────────────────────────┘
```

#### For Adopted/Stable Lessons:

```
┌────────────────────────────────────────────────────────────────┐
│ ✅ This Lesson is Ready to Teach!                             │
│                                                                 │
│ This lesson has been extensively tested and is ready for       │
│ general teaching. Feedback and contributions are still welcome.│
│                                                                 │
│ [Start Teaching] [Report Feedback]                            │
└────────────────────────────────────────────────────────────────┘
```

**Design Notes**:
- Banner should be prominent: colored background, top of page, above the fold
- Use emoji or icons for visual scanning
- Keep copy concise but informative
- Primary CTA button should be large and prominent
- For Alpha/Beta, make piloting the PRIMARY action

**Implementation**:
- Create banner component in Astro
- Add conditional rendering based on `lesson.status`
- Style with appropriate colors matching badge system
- Link to pilot interest form and pilot guide

**Estimated Effort**: 4-6 hours

---

### PRIORITY 3: Homepage - Highlight Lessons Needing Pilots ⚡ Quick Win

**Current State**: Homepage shows all lessons equally; no emphasis on pilot needs.

**New Approach**: Add a prominent section highlighting pilot opportunities.

#### Option A: Hero Section Banner (Recommended)

Place immediately after the hero/"Get Started" section, before pathway cards:

```
┌────────────────────────────────────────────────────────────────┐
│                   🎯 Help Shape Open Science Education         │
│                                                                 │
│            10 Lessons Are Actively Seeking Instructors         │
│                                                                 │
│     These lessons have been developed and tested by authors.   │
│     We need librarians like you to pilot them in diverse       │
│     contexts. Be among the first to teach cutting-edge         │
│     open science curriculum and get recognized for your        │
│     contribution.                                              │
│                                                                 │
│            [View Lessons Seeking Pilots]  [Learn More]         │
└────────────────────────────────────────────────────────────────┘
```

**Design**:
- Distinct background color (light yellow/orange or light blue)
- Centered, prominent text
- Large, clear CTAs
- Should be dismissible (cookie) for return visitors

#### Option B: Stats Section

Add above or beside lesson grid:

```
┌─────────────────────────────────────────┐
│ 📊 Project Status                       │
│                                         │
│ ✅ 3 Lessons Ready to Teach            │
│ 🎯 10 Lessons Seeking Pilots           │
│    • 7 Alpha (first external pilots)   │
│    • 3 Beta (broader testing)          │
│ 🔨 5 Lessons in Development            │
│                                         │
│ [Help Us Pilot!]                       │
└─────────────────────────────────────────┘
```

#### Option C: Filter Enhancement

Add quick filters to lesson grid with emphasis on pilot opportunities:

```
┌────────────────────────────────────────────────────┐
│ Show:                                              │
│ 🎯 Seeking Pilots (10) | ✅ Ready to Teach (3)    │
│ 🔨 In Development (5)  | 📚 All Lessons (18)      │
└────────────────────────────────────────────────────┘
```

Default to showing "Seeking Pilots" first.

**Recommendation**: Implement both Option A (banner) AND Option C (filter).

**Implementation**:
- Add banner section to homepage Astro template
- Implement filtering logic for lesson grid
- Add cookie/localStorage for banner dismissal
- Update lesson count dynamically from data

**Estimated Effort**: 3-4 hours

---

### PRIORITY 4: Differentiate Lesson Cards by Status

**Current State**: All lesson cards look similar regardless of status.

**New Approach**: Make pilot opportunities visually distinct on lesson grid.

#### Alpha Lesson Card:

```
┌─────────────────────────────────────────┐
│ 🎯 SEEKING FIRST PILOTS                 │
│─────────────────────────────────────────│
│ Authoring Open Science                  │
│                                         │
│ 🟡 Alpha                                │
│ Introductory | 2h 30m                   │
│                                         │
│ By: Jessica Formoso, Essi Holopainen   │
│                                         │
│ Learn to author and publish open...    │
│                                         │
│ [Pilot This Lesson →]                  │
└─────────────────────────────────────────┘
```

#### Beta Lesson Card:

```
┌─────────────────────────────────────────┐
│ 🔵 SEEKING MORE PILOTS                  │
│─────────────────────────────────────────│
│ Data Management Plans for Librarians    │
│                                         │
│ 🔵 Beta | ✅ LC Adopted                │
│ Introductory | 3h 00m                   │
│                                         │
│ By: Lena Bohman, Marla Hertz, +1       │
│                                         │
│ Learn to provide DMP services...       │
│                                         │
│ [Pilot This Lesson →]                  │
└─────────────────────────────────────────┘
```

#### Pre-Alpha Lesson Card:

```
┌─────────────────────────────────────────┐
│ Building an Open Science Community      │
│                                         │
│ ⚪ Pre-Alpha - In Development           │
│ Introductory | 90m                      │
│                                         │
│ By: Camille Thomas                      │
│                                         │
│ Explore principles of building...      │
│                                         │
│ [Preview Lesson]                       │
└─────────────────────────────────────────┘
```

#### Adopted/Stable Lesson Card:

```
┌─────────────────────────────────────────┐
│ Open Science Basics (FOSTER)            │
│                                         │
│ ✅ Stable | External Resource           │
│ Introductory | Self-paced               │
│                                         │
│ Comprehensive overview of open...      │
│                                         │
│ [Start Learning]                       │
└─────────────────────────────────────────┘
```

**Visual Design Notes**:
- Alpha/Beta cards: Add subtle colored top border or background tint
- "SEEKING PILOTS" label: Bold, prominent, at top of card
- CTA button text should match status (Pilot vs. Preview vs. Start)
- Badge placement consistent across all cards
- Consider adding small "New!" or "Hot" badges for recently added Alpha lessons

**Implementation**:
- Update LessonCard component with conditional rendering
- Add CSS for status-specific styling
- Update button text logic
- Add "seeking pilots" header for Alpha/Beta

**Estimated Effort**: 3-4 hours

---

### PRIORITY 5: Create "Pilot a Lesson" Landing Page

**Purpose**: Dedicated page explaining the pilot program and showcasing lessons needing pilots.

**URL**: `/pilot` or `/pilot-a-lesson`

**Structure**:

#### Section 1: Hero
```
# Pilot a Lesson

Help shape the future of open science education for librarians.

Our lessons need instructors to test them in diverse contexts.
Get recognized as a contributor and join our community of practice.

[View Lessons Seeking Pilots ↓]
```

#### Section 2: What is Lesson Piloting?

- Brief explanation (2-3 paragraphs)
- Link to Carpentries documentation
- Emphasize this is a collaborative development process

#### Section 3: Why Pilot?

**Grid of benefits:**

```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│ 🏆 Get Recognized   │  │ 📚 Early Access     │  │ 🤝 Join Community   │
│                     │  │                     │  │                     │
│ Acknowledged as     │  │ Be among the first  │  │ Connect with open   │
│ contributor in      │  │ to teach cutting-   │  │ science educators   │
│ lesson metadata     │  │ edge curriculum     │  │ across libraries    │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘

┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│ 💡 Shape Development│  │ 🎓 Prof. Development│  │ 🌍 Make Impact      │
│                     │  │                     │  │                     │
│ Your feedback       │  │ Expand your skills  │  │ Help librarians     │
│ directly influences │  │ teaching open       │  │ worldwide support   │
│ the final lesson    │  │ science methods     │  │ open science        │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

#### Section 4: What's Involved?

**Step-by-step process:**

1. **Choose a Lesson** - Browse Alpha or Beta lessons that match your interests and audience
2. **Review Materials** - Read through the lesson, instructor notes, and setup instructions
3. **Teach the Lesson** - Deliver all or part of the lesson to your learners
4. **Collect Feedback** - Use our templates to gather feedback from learners and observers
5. **Share Your Experience** - Submit a brief pilot report via GitHub issue or form
6. **Join Community Debrief** (optional) - Discuss your experience with other pilots and authors

**Time Commitment**:
- Preparation: 2-4 hours
- Teaching: Varies by lesson (1.5 - 4 hours typically)
- Feedback collection: 30 minutes
- Report writing: 30-60 minutes

**Support We Provide**:
- Detailed instructor guides
- Feedback collection templates
- Access to lesson authors for questions
- Community of practice connections
- Recognition and acknowledgment

#### Section 5: Lessons Seeking Pilots

**Tabbed or filtered view:**

**Tab 1: Alpha Lessons (7)** - First external pilots needed
**Tab 2: Beta Lessons (3)** - Seeking broader testing

**Table Format:**

| Lesson | Level | Duration | Topics | Status | Action |
|--------|-------|----------|--------|--------|--------|
| Authoring Open Science | Intro | 2h 30m | publishing, authoring | Alpha | [Pilot This →] |
| Data Dashboards (R) | Intermediate | 3h 36m | R, shiny, data viz | Alpha | [Pilot This →] |
| ... | ... | ... | ... | ... | ... |

**Or Card Grid** (reuse lesson cards from homepage)

#### Section 6: How to Get Started

**Clear 3-step process:**

```
┌─────────────────────────────────────────────────────────────┐
│ 1️⃣ Choose a Lesson                                          │
│    Browse the lessons above and select one that interests   │
│    you and fits your audience.                              │
│                                                              │
│ 2️⃣ Express Your Interest                                    │
│    Click "Pilot This Lesson" and fill out a brief form      │
│    or open a GitHub issue.                                  │
│                                                              │
│ 3️⃣ We'll Get in Touch                                       │
│    We'll send you the instructor guide, feedback templates, │
│    and answer any questions you have.                       │
└─────────────────────────────────────────────────────────────┘
```

**Prominent CTA**: [Express Interest in Piloting]

#### Section 7: Frequently Asked Questions

**Expandable accordion:**

- Do I need to teach the entire lesson?
- What if I'm not an expert in the topic?
- What if I find problems or errors?
- Can I modify the lesson for my audience?
- How long does the pilot process take?
- Will I get credit for piloting?
- What if I can't use GitHub?
- Can I pilot multiple lessons?

#### Section 8: Pilot Testimonials (if available)

- Quote from pilot instructor
- Photo (optional)
- Name, institution, lesson piloted

#### Section 9: Still Have Questions?

- Contact information
- Link to pilot guide documentation
- Community discussion forum/mailing list

**Implementation**:
- Create new Astro page: `src/pages/pilot.astro`
- Reuse lesson card components
- Add filtering/tabbing functionality
- Create FAQ component (accordion style)
- Add to main navigation

**Estimated Effort**: 8-12 hours (substantial page)

---

### PRIORITY 6: Update Navigation

**Current Navigation**:
```
Home | Lessons | Authors | Blog | About
```

**Recommended Addition**:
```
Home | Lessons | Pilot a Lesson | Authors | Blog | About
```

**Alternative (Dropdown)**:
```
Home | Lessons | Get Involved ▼ | Authors | Blog | About
                    └── Pilot a Lesson (Alpha)
                    └── Teach a Lesson (Beta/Stable)
                    └── Contribute Feedback
```

**Recommendation**: Start with simple "Pilot a Lesson" link, can expand to dropdown later.

**Implementation**:
- Update navigation component
- Add active state for pilot page
- Ensure mobile responsiveness

**Estimated Effort**: 1 hour

---

### PRIORITY 7: Add Pilot Interest Form/Process

**Current State**: "Express Interest" links to GitHub issue template.

**Problem**: Not everyone is comfortable with GitHub; creates friction.

**Solution**: Multi-path approach.

#### Option A: Simple GitHub Issue (Keep Current)

For tech-savvy users, maintain GitHub issue workflow.

#### Option B: Add Web Form (Recommended)

Create a simple web form that:
1. Collects basic information (name, email, institution, lesson interest)
2. Stores in a simple database or sends email notification
3. Follows up with instructor guide and GitHub issue creation instructions

**Form Fields**:
- Name*
- Email*
- Institution/Organization
- Lesson(s) Interested In* (dropdown/checkboxes)
- Approximate teaching date (optional)
- Your experience level with this topic (1-5 scale)
- Questions or comments
- Preferred contact method (email / GitHub)

**Submission Behavior**:
- Send confirmation email to user
- Notify project team
- Add to tracking spreadsheet/database
- Send follow-up with instructor guide within 48 hours

#### Option C: Hybrid Approach (Recommended)

On pilot interest page, offer both options:

```
┌────────────────────────────────────────────────────────┐
│ How would you like to express interest?               │
│                                                         │
│ [📝 Fill Out Quick Form]  or  [💻 Open GitHub Issue] │
│                                                         │
│ (Form recommended if you're new to GitHub)            │
└────────────────────────────────────────────────────────┘
```

**Implementation**:
- Create form component (if web form)
- Set up backend handling (Formspree, Netlify Forms, or custom)
- Update all "Express Interest" buttons to link to form
- Keep GitHub option for those who prefer it

**Estimated Effort**: 4-6 hours (web form) or 1 hour (GitHub only)

---

### PRIORITY 8: Create Visual Status Legend

**Purpose**: Help users quickly understand what each status means.

**Placement**:
- Top of lesson grid on homepage
- On "Pilot a Lesson" page
- Possibly in footer

**Design**:

```
┌─────────────────────────────────────────────────────────────────┐
│ Lesson Development Stages:                                      │
│                                                                  │
│ 🟡 Alpha - Ready for first external pilots                     │
│ 🔵 Beta - Seeking more pilots for broader testing              │
│ ✅ Adopted - Official Library Carpentry lesson, ready to teach │
│ ⚪ Pre-Alpha - In development, not yet ready for piloting      │
│                                                                  │
│ [Learn more about the Carpentries lesson lifecycle →]          │
└─────────────────────────────────────────────────────────────────┘
```

**Implementation**:
- Create legend component
- Add to relevant pages
- Link to Carpentries documentation

**Estimated Effort**: 1-2 hours

---

## Design Specifications

### Color Palette for Status

```css
/* Status Colors */
--pre-alpha: #6c757d;      /* Gray - Bootstrap secondary */
--alpha: #ffc107;          /* Yellow/Orange - Bootstrap warning */
--beta: #0dcaf0;           /* Blue - Bootstrap info */
--adopted: #198754;        /* Green - Bootstrap success */
--stable: #198754;         /* Green - Bootstrap success */

/* Accent Colors */
--pilot-highlight: #fff3cd; /* Light yellow background for pilot CTAs */
--pilot-border: #ffc107;    /* Orange border for pilot sections */
```

### Typography for CTAs

```css
/* Primary CTA (Pilot buttons) */
.btn-pilot {
  font-weight: 600;
  font-size: 1.1rem;
  padding: 12px 24px;
  background: #ffc107;
  color: #000;
  border: 2px solid #ffc107;
}

.btn-pilot:hover {
  background: #ffcd39;
  border-color: #ffcd39;
  transform: translateY(-2px);
}

/* Secondary CTA */
.btn-secondary-pilot {
  font-weight: 500;
  background: transparent;
  border: 2px solid #0dcaf0;
  color: #0dcaf0;
}
```

### Badge Styles

```css
.badge-status {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-pre-alpha {
  background: #6c757d;
  color: white;
}

.badge-alpha {
  background: #ffc107;
  color: #000;
}

.badge-beta {
  background: #0dcaf0;
  color: #000;
}

.badge-adopted {
  background: #198754;
  color: white;
}
```

---

## Content/Copy Guidelines

### Voice & Tone

**Overall Tone**:
- Encouraging and welcoming
- Clear and direct (avoid jargon)
- Emphasize collaboration and community
- Balance professionalism with warmth

**For Alpha Lessons**:
- Tone: Exciting, pioneering
- Emphasize: "Be among the first", "shape development"
- Example: "This lesson is ready for its first external pilots! Help us test it in your community."

**For Beta Lessons**:
- Tone: Collaborative, refinement-focused
- Emphasize: "Broaden testing", "diverse contexts"
- Example: "This lesson has been successfully piloted and is working well. We're seeking additional pilots to test it in diverse settings."

**For Pre-Alpha Lessons**:
- Tone: Patient, forward-looking
- Emphasize: "In development", "coming soon"
- Example: "This lesson is still being developed by the authors. Check back soon!"

### Call-to-Action Text

**Instead of**: "Express Interest in Piloting"
**Use**: "Pilot This Lesson" (more direct, active)

**Instead of**: "Help Improve This Curriculum"
**Use**: "This Lesson Needs Pilots!" (more urgent, clear)

**Instead of**: "Report an Issue"
**Use**: "Share Feedback" (more welcoming, less technical)

### Value Propositions

Always lead with benefits when recruiting pilots:

✅ "Get recognized as a contributor to open science education"
✅ "Be among the first to teach cutting-edge curriculum"
✅ "Join a community of practice with librarians worldwide"
✅ "Shape the future of this lesson with your feedback"

❌ "We need pilots" (focuses on our needs, not theirs)
❌ "Please help us test" (sounds like a favor)
❌ "Beta testing available" (too technical)

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1) - Quick Wins ⚡

**Goal**: Make immediate improvements with minimal effort

1. ✅ Update status badge colors and text (2-3 hours)
2. ✅ Add homepage banner "10 Lessons Seeking Pilots" (2-3 hours)
3. ✅ Add "Pilot a Lesson" to navigation (1 hour)
4. ✅ Create visual status legend component (1-2 hours)

**Total Effort**: ~8 hours
**Impact**: High - immediately visible changes

### Phase 2: Lesson Pages (Week 2) - Core Experience

**Goal**: Make lesson pages clearly communicate pilot opportunities

1. ✅ Create status-specific banner components (4-6 hours)
2. ✅ Update lesson page templates with conditional banners (2-3 hours)
3. ✅ Update lesson card component with status-specific styling (3-4 hours)
4. ✅ Add status filtering to lesson grid (2-3 hours)

**Total Effort**: ~14 hours
**Impact**: High - core user experience improvement

### Phase 3: Dedicated Pilot Page (Week 3-4) - Comprehensive Solution

**Goal**: Create comprehensive resource for potential pilots

1. ✅ Create "Pilot a Lesson" landing page (8-12 hours)
2. ✅ Design and implement pilot interest form (4-6 hours)
3. ✅ Write FAQ content (2-3 hours)
4. ✅ Set up form handling/notifications (2-3 hours)

**Total Effort**: ~20 hours
**Impact**: Medium-High - provides complete information but requires users to navigate to page

### Phase 4: Polish & Optimization (Ongoing)

**Goal**: Refine based on user feedback

1. ✅ Gather analytics on CTA click rates
2. ✅ A/B test different CTA copy
3. ✅ Collect pilot testimonials
4. ✅ Add pilot success stories to site
5. ✅ Refine based on user feedback

---

## Success Metrics

### Primary Metrics (Pilot Recruitment)

- **Pilot Interest Submissions**: Track monthly submissions via form or GitHub
- **Actual Pilots Completed**: Number of instructors who actually taught a lesson
- **Pilot Reports Submitted**: Completion rate of pilot feedback
- **Time to Pilot**: Days from lesson reaching Alpha to first external pilot

**Target Goals**:
- Increase pilot interest submissions by 200% in Q1 2026
- Achieve at least 2 external pilots per Alpha lesson
- 80%+ pilot report submission rate

### Secondary Metrics (Website Performance)

- **Clicks on "Pilot This Lesson" CTAs**: Track engagement with pilot CTAs
- **Time on Pilot Landing Page**: Measure engagement with pilot information
- **Click-through from Homepage Banner**: Measure effectiveness of homepage highlight
- **Lesson Page Views by Status**: Are people viewing Alpha/Beta lessons more?

### Qualitative Metrics

- **User Feedback**: Survey users about pilot page clarity
- **Pilot Experience**: Collect feedback from pilots about the process
- **Confusion Points**: Identify where users get stuck

---

## Risk Assessment & Mitigation

### Risk 1: Overwhelming Users

**Risk**: Too much emphasis on piloting might overwhelm casual browsers looking to learn about lessons.

**Mitigation**:
- Make homepage banner dismissible
- Keep pilot CTAs clear but not aggressive
- Maintain strong "Browse Lessons" path for learners
- Use filtering to let users choose their focus (pilot vs. teach vs. learn)

### Risk 2: GitHub Friction

**Risk**: Requiring GitHub for pilot interest creates barrier.

**Mitigation**:
- Provide web form alternative (Priority 7)
- Clearly explain GitHub is optional
- Offer to help set up GitHub if needed
- Consider email-based pilot interest for those uncomfortable with tech

### Risk 3: Status Confusion

**Risk**: Users might not understand the difference between Alpha and Beta.

**Mitigation**:
- Clear visual legend explaining each status
- Contextual help text on lesson pages
- Link to Carpentries documentation
- Use plain language in descriptions

### Risk 4: Pilot Dropout

**Risk**: Users express interest but don't follow through.

**Mitigation**:
- Set clear expectations upfront about time commitment
- Provide excellent support and resources
- Follow up promptly with interested pilots
- Make pilot reporting process as easy as possible
- Recognize and celebrate pilots publicly

---

## Next Steps

### Immediate Action Items:

1. **Review & Approve Plan**: Tim reviews this plan and provides feedback
2. **Prioritize Phases**: Decide which phases to implement first
3. **Assign Resources**: Determine who will implement (Claude Code, team members, contractors)
4. **Set Timeline**: Create realistic timeline based on available resources
5. **Design Review**: Review visual design specs and adjust to brand
6. **Content Review**: Review all copy and messaging
7. **Begin Phase 1**: Start with quick wins to see immediate impact

### Questions to Resolve:

1. **Budget**: Any budget for design/development help?
2. **Timeline**: When do you want Phase 1 complete? Phase 2?
3. **Analytics**: Do you have Google Analytics or similar set up to track metrics?
4. **Form Backend**: Preference for form handling (Formspree, Netlify, custom)?
5. **Content**: Can you provide pilot testimonials or success stories?
6. **Branding**: Any specific brand colors or styles to follow?

---

## Appendix: Competitor Analysis

### Similar Projects for Reference:

**The Carpentries Incubator**:
- Clear status badges
- Lists lessons in development
- Could improve pilot recruitment visibility

**Library Carpentry**:
- Good lesson maturity indicators
- Strong community emphasis
- Could better highlight pilot opportunities

**OpenSciency (NASA TOPS)**:
- Excellent visual design
- Clear learning pathways
- Doesn't have pilot recruitment focus (not applicable)

**Takeaways**:
- Status badges are common but often not actionable
- Few projects explicitly recruit pilots prominently
- Opportunity to be a leader in transparent lesson development

---

## Summary

This redesign plan focuses on making lesson piloting opportunities **visible, clear, and actionable** while maintaining the strong lesson showcase functionality that already exists.

**Key Principles**:
1. **Differentiate by Status**: Make it obvious what stage each lesson is at
2. **Clear CTAs**: Different actions for different statuses (Pilot vs. Teach vs. Preview)
3. **Reduce Friction**: Make it easy to express interest in piloting
4. **Value-Driven**: Lead with benefits for pilots, not just our needs
5. **Progressive Enhancement**: Start with quick wins, build to comprehensive solution

**Expected Outcome**: Increased pilot recruitment, clearer user pathways, and better alignment between lesson development needs and website messaging.

---

## Evaluation & Fixes (Jan 9, 2026)

### Verification of Phase 1 & 2
An evaluation of the implemented features against this plan confirmed the successful deployment of key components:

1.  **Homepage Enhancements**:
    *   ✅ **Pilot Banner**: Active on homepage, correctly counts "Seeking Pilot" lessons, and includes dismissal functionality.
    *   ✅ **Status Legend**: Visually explains Alpha/Beta/Adopted statuses clearly.
    *   ✅ **Filtering**: `Lessons.astro` includes a dedicated "Seeking Pilots" filter button that dynamically updates the count.

2.  **Navigation**:
    *   ✅ **"Pilot a Lesson" Link**: Added to the main navbar.
    *   🛠️ **Fix Applied**: The link initially pointed to the external GitHub `CONTRIBUTING.md`. It has been updated in `src/data/navigation.yml` to point to the new internal `/pilot` page.

3.  **Lesson Pages**:
    *   ✅ **Status Banners**: `LessonStatusBanner.astro` correctly renders context-aware calls-to-action (e.g., "Ready for External Piloting").
    *   ✅ **Visual Cues**: Lesson cards feature "SEEKING PILOTS" ribbons and distinct border colors.

4.  **New Landing Page (`/pilot`)**:
    *   ✅ **Content**: Comprehensive guide, FAQ, and lesson listing implemented in `src/pages/pilot.astro`.
    *   ⚠️ **Critical Issue**: The page currently uses a Netlify-style form submission script (`data-netlify="true"`). Since the site is deployed via **GitHub Pages**, this form **will not work**. It must be migrated to an external service like Formspree or Google Forms.

---

## Phase 2 Completion & Retrospective (Jan 9, 2026)

### Key Achievements
We have successfully transitioned the site from a static repository of links to a dynamic, pilot-recruitment platform.

1.  **Pilot Workflow Finalized**:
    *   **Decision**: Replaced the non-functional Netlify form with a **GitHub Issue Template** strategy.
    *   **Rationale**: Aligning with the open-source ethos of the project, we chose transparency over obscurity. Requiring a GitHub account is a feature, not a bug, as it onboards librarians into the ecosystem they will be teaching.
    *   **Implementation**: The `/pilot` page now features a prominent CTA that links directly to a pre-configured `pilot-interest.yml` issue template.

2.  **UCLA Dark Mode (Bonus Feature)**:
    *   **Implementation**: Built a custom dark mode engine using CSS variables and official UCLA Brand colors (`#003B5C` Darkest Blue and `#FFD100` Gold).
    *   **Technical Detail**: Added a persistent toggle in the navbar with `localStorage` memory and a script to prevent "Flash of Unstyled Content" (FOUC).
    *   **UX Impact**: Significantly improves accessibility and perceived professionalism. The site now feels like a modern application rather than a static page.

3.  **Automation Suite**:
    *   **`generate_lesson_cffs.py`**: Automatically generates CITATION.cff files for all lessons based on the central `lessons.yml` database.
    *   **`create_prs.sh`**: A robust bash script that uses the GitHub CLI to clone, branch, and PR these citation files back to the individual lesson repositories.

### Status Assessment
*   **Phase 1 (Quick Wins)**: ✅ **COMPLETE**
*   **Phase 2 (Core Experience)**: ✅ **COMPLETE**
*   **Phase 3 (Dedicated Page)**: ✅ **COMPLETE**

### Next Steps (Phase 4 & Beyond)
*   **Analytics**: Monitor click-through rates on the "Pilot This Lesson" buttons to validate the new design.
*   **Mobile Optimization**: While responsive, the large data tables (dashboard) could be optimized further for small screens (e.g., card view).
*   **Search**: Consider making the search bar "sticky" or adding more advanced filtering as the curriculum grows.

---

**Document Version**: 1.2
**Last Updated**: January 9, 2026
**Author**: Claude Code with Tim Dennis