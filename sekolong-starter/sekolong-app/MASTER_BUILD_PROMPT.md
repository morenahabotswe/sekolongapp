# Sekolong.com — Master Build Specification

**Permanent instruction for all coding agents working on this repository.**

Read this document fully before making any changes.  
Do not rebuild the entire application from scratch.  
Inspect the existing repository first, preserve working functionality, and implement changes incrementally.

---

## 1. Project Identity

**Project:** Sekolong.com  
**Purpose:** An African / Lesotho-focused digital learning platform that serves:

- Students  
- Teachers / tutors  
- Parents / guardians  
- Schools  
- Administrators  
- Learning content  
- AI-assisted learning  
- Automated courses  
- Quizzes and assessments  
- Educational resources  
- Progress tracking  

The system must be designed so it can eventually scale beyond Lesotho.

---

## 2. Core Technology Stack

**Repository:** Sekolong.com (GitHub)

**Current / target stack:**

- React  
- Vite  
- TypeScript  
- Tailwind CSS  
- Supabase (Auth, Database, Storage, Realtime)  
- GitHub for source control  
- Hostinger for deployment  

**Critical architecture rules:**

1. The frontend must build into static files that can be deployed to Hostinger.  
2. Supabase handles authentication, database, storage, profiles, course data, progress, quiz results, and files.  
3. AI functionality must never expose API keys or secrets in the browser.  
4. All sensitive operations (AI generation, PDF processing, admin actions) must run through secure backend/edge functions or server-side processes.  
5. Do not hard-code curriculum content, user data, or configuration that belongs in the database.  
6. Do not commit syllabus PDFs or any secrets to GitHub.

---

## 3. Main Vision — The Learning Pipeline

Sekolong is **not** a static PDF viewer.  
It transforms educational material into an interactive learning ecosystem.

**Central pipeline:**

```
Syllabus PDF
  → Curriculum extraction
  → Subjects
  → Topics
  → Courses
  → Lessons
  → Activities
  → Questions
  → Quizzes
  → Student results
  → Progress
  → Personalised learning / remediation
```

**Example flow:**

```
Grade 8 Mathematics syllabus PDF
  → AI analyses and structures the document
  → Mathematics Grade 8
  → Algebra
  → Linear equations
  → AI-generated lessons + examples + activities
  → Quiz
  → Student completes quiz
  → Performance recorded
  → Weak areas identified
  → Targeted revision / remediation delivered
```

---

## 4. Two Types of Courses

### A. Automated AI Courses

Generated from approved syllabus / curriculum material.

The system must be able to produce:

- Course  
- Modules  
- Units  
- Topics  
- Lessons  
- Learning objectives  
- Explanations  
- Examples  
- Activities  
- Practice questions  
- Quizzes  
- Assessments  
- Revision material  

Every piece of AI-generated content must remain linked to its original syllabus source (curriculum ID, topic, page, section, version).

### B. Teacher-Facilitated Courses

Teachers can create courses entirely themselves:

- Course title & description  
- Grade & subject  
- Modules & lessons  
- Resources  
- Assignments  
- Questions & tests  
- Announcements  

Teachers are **never** forced to use AI-generated material.  
AI may assist teachers with:

- Lesson drafting  
- Question generation  
- Quiz creation  
- Summaries & explanations  
- Remedial exercises  
- Content organisation  

---

## 5. Syllabus / Curriculum Management

Administrators have a dedicated Curriculum / Syllabus Management area.

Structure example:

```
Curriculum
  Country: Lesotho
  Curriculum name
  Level: Primary / Secondary
  Grade: Grade 7
  Subject: Mathematics
  Year / version: 2026
```

Administrators upload the official syllabus PDF.  
The system stores the original file and processes it into structured data.

---

## 6. PDF Processing Requirements

When an admin uploads a syllabus PDF the system must eventually:

1. Store the original PDF securely.  
2. Extract text.  
3. Detect headings, sections, grades, subjects, topics.  
4. Detect learning outcomes and objectives.  
5. Detect assessment requirements and terminology.  
6. Preserve page references.  
7. Store structured curriculum data.  
8. Support OCR for scanned pages (future).  

Never commit the PDF files themselves to the GitHub repository.

---

## 7. AI Curriculum Engine — Staged Pipeline

AI must **not** attempt to generate an entire course from a full PDF in a single request.

Use this staged approach:

| Stage | Input → Output |
|-------|----------------|
| 1. Analyse | PDF → extracted text |
| 2. Structure | Extracted text → structured curriculum tree |
| 3. Generate structure | Structured curriculum → course / module / unit / topic hierarchy |
| 4. Generate lessons | Topics → lessons (explanations, examples, activities) |
| 5. Generate assessment | Lessons / topics → questions & quizzes |
| 6. Review | AI-generated content → DRAFT status |
| 7. Approval | Administrator / teacher reviews → APPROVED |
| 8. Publish | Approved content → PUBLISHED (visible to students) |

---

## 8. Content Approval Workflow

AI-generated educational content must never become public automatically.

Use these statuses:

```
DRAFT
PROCESSING
AI_GENERATED
UNDER_REVIEW
APPROVED
PUBLISHED
ARCHIVED
```

Only content with status `PUBLISHED` is visible to students.

---

## 9. Source Traceability

Every AI-generated lesson, activity, or question should retain:

- Curriculum ID  
- Syllabus ID / document ID  
- Subject  
- Grade  
- Topic  
- Source page  
- Source section  
- Curriculum version  

Example metadata on a question:

```
Question: Solve 2x + 4 = 10
Source: Grade 8 Mathematics → Algebra → Syllabus PDF → Page 17
```

This is mandatory for educational integrity.

---

## 10. Languages

Architecture must support:

- English (`en`)  
- Sesotho (`st`)  

Language is a first-class property of content and user preference, never hard-coded in components.  
The system must be ready for additional languages later.

---

## 11. User Roles & Permissions

### Student
- Register / login  
- Browse and enrol in courses  
- Study lessons  
- Take quizzes & submit assignments  
- View results, progress, achievements  
- Receive personalised recommendations  
- Access learning resources  

### Teacher
- Create and manage own courses  
- Create lessons, quizzes, assignments  
- View authorised students & results  
- Monitor progress & provide feedback  
- Use AI assistance tools  
- Upload resources  
- Manage classes  

### Parent / Guardian
- View linked child / student  
- Monitor progress and results  
- View course participation  
- Receive relevant notifications  

### Administrator
Full control over:
- Users, schools, teachers, students  
- Courses, subjects, curricula, syllabuses  
- AI-generated content and approvals  
- Reports and system settings  

**Security rules:**
- Strict role-based access control.  
- Supabase Row Level Security (RLS) on every table.  
- Students cannot see other students’ private data.  
- Teachers can only access students / classes they are authorised for.  
- Admin pages and teacher pages must be properly protected.

---

## 12. Student Dashboard (Target Experience)

- Personalised greeting  
- “Continue Learning” with progress  
- My Courses (cards with progress, next lesson, completion status)  
- Upcoming quizzes / assignments / tests  
- Performance overview (average score, completed lessons/quizzes, weak & strong topics)  
- AI-powered recommendations  

---

## 13. Course Hierarchy

```
COURSE
 ├── Module
 │    ├── Unit
 │    │    ├── Topic
 │    │    │    ├── Lesson
 │    │    │    ├── Activity
 │    │    │    └── Quiz
 │    │    └── ...
 │    └── Unit
 └── Module
```

Not every course requires every level. The data model must remain flexible.

---

## 14. Lesson Structure

A lesson may contain any combination of:

- Title  
- Introduction  
- Learning objectives  
- Explanation  
- Examples  
- Images / videos / tables  
- Activities  
- Practice questions  
- Key terms  
- Summary  
- Quiz  
- Further resources  

---

## 15. Quiz Engine

### Supported question types (target)
- Multiple choice  
- Multiple answer  
- True / False  
- Fill in the blank  
- Short answer  
- Matching  
- Ordering  
- Numerical answer  

Future: essay, diagram-based, image questions.

### Question metadata
- Question text  
- Options (where applicable)  
- Correct answer(s)  
- Explanation  
- Marks  
- Difficulty  
- Topic  
- Learning objective  
- Source / curriculum reference  

---

## 16. AI Quiz Generation

AI can generate questions from:

- Subject + Grade + Topic + Lesson + Learning objective  
- Desired difficulty mix  
- Number of questions  
- Question types  

Difficulty distribution must be configurable (e.g. 5 Easy / 3 Medium / 2 Hard).

---

## 17. Assessment & Feedback Flow

```
Student submits quiz
  → Answers evaluated
  → Score calculated
  → Incorrect answers identified
  → Weak topics identified
  → Progress updated
  → Useful feedback generated (not just “6/10”)
  → Recommendations produced
```

Feedback example:  
“You understand solving simple equations but need more practice with equations that contain brackets.”

---

## 18. Personalised Learning / Remediation

Performance data drives:

- Identification of strong areas and weak areas  
- Automatic recommendation of revision material  
- Generation or selection of targeted explanations, examples, practice, and mini-quizzes  

---

## 19. Mosuoe — AI Learning Assistant

**Name:** Mosuoe (digital teacher concept)

Capabilities (curriculum-grounded where possible):

- Explain concepts  
- Answer student questions  
- Give examples and simplified explanations  
- Translate where appropriate  
- Provide practice questions  
- Explain why an answer was incorrect  
- Help with revision  
- Recommend lessons  
- Deliver remedial exercises  

Mosuoe must prefer Sekolong’s approved educational content over unrestricted open-ended chat.

---

## 20. Search

Global search across:

- Courses  
- Lessons  
- Topics  
- Resources  
- Teachers  
- (Later) Schools  

---

## 21. Resource Library

Supported resource types:

- PDFs, documents, images, videos, worksheets, notes, past papers, study guides  

Metadata for every resource:

- Title, Subject, Grade, Topic, Language, Type, Uploaded by, Date, Curriculum link  

---

## 22. Schools & Classes (Future)

**School** contains: Administrators, Teachers, Students, Classes, Courses, Reports.

**Class** example: Grade 8A, Grade 8B  
A class has: Students, Teacher(s), Courses, Assignments, Tests, Announcements, Performance reports.

---

## 23. Notifications (Future)

- New course / lesson / quiz  
- Assignment due  
- Results available  
- Teacher announcement  
- System announcement  

---

## 24. Gamification (Future, non-interfering)

- Points, badges, streaks  
- Course completion & quiz achievements  
- Learning milestones  

Must not interfere with the core educational experience.

---

## 25. Database Entities (Target Model)

Core tables / collections (PostgreSQL via Supabase):

```
users / profiles / roles
schools / classes
subjects / grades
curricula / curriculum_versions
syllabuses / syllabus_documents
curriculum_topics / learning_outcomes

courses / course_modules / course_units / course_topics
lessons / activities

quizzes / quiz_questions / quiz_options
quiz_attempts / quiz_answers

enrolments / student_progress
assignments / assignment_submissions

resources / notifications

ai_jobs / ai_generations / content_reviews
```

Build these incrementally. Do not create every table on day one.

---

## 26. AI Generation Jobs

AI work is asynchronous and job-based:

```
pending → processing → completed / failed
```

Example:

```
Admin requests “Generate Grade 8 Mathematics course”
  → AI job created (status: pending)
  → Worker processes job
  → Content saved with status AI_GENERATED
  → Admin notified for review
```

Never design the UI so a user waits indefinitely for a long-running AI request in the browser.

---

## 27. Security Requirements

- Authentication via Supabase Auth  
- Role-based access control  
- Row Level Security on every table  
- Protected routes for admin and teacher areas  
- Secure file access (signed URLs or equivalent)  
- Environment variables / secrets never exposed to the client  
- No student can access another student’s private data  
- Teachers restricted to their authorised students / classes  

---

## 28. Responsive Design

Must work excellently on:

- Desktop / laptop  
- Tablet  
- Android phones  
- iPhones  

Mobile experience is especially important.

---

## 29. UI / UX Direction

- Modern, educational, clean, friendly, professional, fast, accessible  
- Avoid generic corporate dashboard aesthetics  
- Feel like a real learning platform  

---

## 30. Mandatory Coding Agent Rules

1. **Inspect first.** Always examine the existing repository structure, components, services, types, and database schema before writing new code.  
2. **Incremental only.** Do not rebuild the entire application. Preserve working functionality.  
3. **Extend, don’t duplicate.** Before creating a new file, check whether an existing component, service, hook, or type can be extended.  
4. **No hard-coded data.** Curriculum, courses, users, configuration, etc. belong in the database.  
5. **No secrets in code.** API keys, database URLs, service-role keys never appear in frontend code or in commits.  
6. **No PDFs in Git.** Syllabus PDFs are stored in Supabase Storage (or equivalent), never in the repository.  
7. **No fake AI.** Do not implement “AI” that merely returns static hard-coded responses.  
8. **Role awareness.** Never assume every user is a student or that every course is AI-generated.  
9. **Commit hygiene.** Prefer small, focused commits with conventional messages (e.g. `feat: add curriculum management`).  
10. **Hostinger-ready.** The production build must remain deployable as static assets to Hostinger.

---

## 31. Development Workflow

```
GitHub repository
  → Code changes (AI or manual)
  → Commit
  → Test locally
  → Build production version
  → Deploy to Hostinger
  → Test live site
```

---

## 32. What the Coding Agent Must Never Do

- Delete existing working functionality without clear reason.  
- Replace the entire project structure unnecessarily.  
- Put passwords, API keys, or secrets in source code.  
- Commit syllabus PDFs or large binary assets to GitHub.  
- Generate thousands of unnecessary files.  
- Hard-code curriculum content into React components.  
- Build inaccessible or unprotected admin functions.  
- Assume a single AI provider forever.  
- Couple the application so tightly that it cannot later support additional languages, countries, or school systems.

---

## 33. Recommended Development Phases

Work in phases. Do not attempt everything at once.

| Phase | Focus |
|-------|--------|
| 1 | Foundation — Auth, roles, layout, navigation, basic dashboards |
| 2 | Education structure — Grades, subjects, curricula, courses, modules, units, topics, lessons |
| 3 | Syllabus engine — PDF upload, storage, text extraction, structured curriculum, source references |
| 4 | AI engine — Jobs, curriculum analysis, course/lesson/quiz generation, review workflow |
| 5 | Student learning — Enrolment, course player, lessons, activities, quizzes, results, progress |
| 6 | Teacher system — Teacher dashboard, course creation, classes, assignments, AI assistance |
| 7 | Mosuoe — Curriculum-grounded AI tutor, remediation, recommendations |
| 8 | Schools & parents — School accounts, parent linking, reports |
| 9 | Advanced — Gamification, notifications, analytics, more languages, PWA, monetisation |

---

## 34. How to Use This Document

This file is the **permanent master specification**.

When starting any new feature:

1. Re-read the relevant sections of this document.  
2. Inspect the current repository state.  
3. Implement only the next logical increment.  
4. Keep changes focused and reversible.  
5. Update types, RLS policies, and documentation as needed.

Subsequent implementation prompts will reference specific sections of this master specification.

---

*Last updated: 2026-09-25*  
*This document is the single source of truth for Sekolong.com architecture and product direction.*
