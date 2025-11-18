# AI Roadmap Generator - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design principles) with inspiration from Linear's clean focus and Notion's information hierarchy.

**Rationale:** This is a productivity tool requiring clear information architecture, data presentation, and workflow efficiency. Users need to quickly input data, understand complex roadmaps, and navigate structured content.

**Core Principles:**
- Clarity over decoration
- Progressive disclosure of complex information
- Scannable hierarchies
- Action-oriented interface

## Typography System

**Font Stack:**
- Primary: Inter (via Google Fonts CDN) - used for all UI elements, body text, and headings
- Monospace: JetBrains Mono - for code snippets, technical details, dates

**Hierarchy:**
- Hero Heading: text-5xl font-bold (roadmap titles)
- Section Heading: text-2xl font-semibold 
- Subsection: text-xl font-medium
- Body: text-base font-normal
- Small/Meta: text-sm
- Micro: text-xs (timestamps, labels)

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing: 2, 4 (gaps, padding within components)
- Standard spacing: 6, 8 (card padding, section gaps)
- Section spacing: 12, 16, 20, 24 (between major sections)

**Grid Structure:**
- Container: max-w-7xl mx-auto
- Two-column layout for input/output split
- Single column for generated roadmap (max-w-4xl for readability)

## Component Library

### Input Form Components
**Form Container:** Card with subtle elevation, rounded-xl, p-8
**Input Fields:**
- Label: text-sm font-medium mb-2
- Text Input: rounded-lg border px-4 py-3 focus:ring-2
- Number Input: Same styling as text input
- Grouped inputs in grid grid-cols-1 md:grid-cols-2 gap-6

**Primary CTA Button:**
- Large: px-8 py-4 rounded-lg font-semibold text-base
- Contains icon (Heroicons spark/lightning) + "Generate Roadmap" text

### Roadmap Display Components
**Section Cards:**
- Collapsible sections with chevron icons (Heroicons)
- rounded-lg border p-6 mb-4
- Header: flex justify-between items-center cursor-pointer
- Content: Animated expand/collapse (max-height transition)

**Milestone Timeline:**
- Vertical timeline with connected dots
- Each milestone: flex items-start gap-4
- Timeline dot: w-3 h-3 rounded-full with connecting line
- Content card: flex-1 rounded-lg p-4 border-l-4

**Tables:**
- Weekly schedule, resources, projects use table structure
- Striped rows with hover states
- Sticky header: sticky top-0
- Responsive: overflow-x-auto on mobile

**Resource Links:**
- Display as clickable cards in grid grid-cols-1 md:grid-cols-2 gap-4
- Icon (Heroicons link) + title + domain preview
- Subtle hover lift effect

### Navigation & Header
**Top Header:**
- Sticky: sticky top-0 z-50
- Contains logo/title + optional user menu
- Height: h-16, flex items-center justify-between px-6

### Loading & States
**Loading State:**
- Skeleton loaders for form submission
- Animated gradient pulse on cards
- Progress indicator showing "Generating roadmap..." with rotating icon

**Empty State:**
- Large icon (Heroicons document-chart-bar)
- Helpful text: "Start by filling in your career goals"
- Ghost button pointing to form

### Export Actions
**Action Bar:**
- Sticky at top of generated roadmap
- flex gap-3 with Export buttons
- Icons: Heroicons document-arrow-down (PDF), document-text (Markdown)

## Key Interaction Patterns

**Form Validation:**
- Real-time validation on blur
- Error messages: text-sm text-red-600 mt-1
- Success indicators: checkmark icon in input

**Collapsible Sections:**
- Smooth transitions (transition-all duration-300)
- Rotate chevron icon on toggle
- Preserve scroll position

**Responsive Behavior:**
- Mobile: Stack all inputs vertically, full-width buttons
- Tablet: 2-column input grid
- Desktop: Side-by-side form + preview (when applicable)

## Page Structure

**Layout Flow:**
1. **Hero Section:** 
   - Compact header with gradient text on title
   - 2-sentence description
   - Height: auto (not forced viewport)
   - py-12 md:py-20

2. **Input Section:**
   - Centered card max-w-3xl
   - All form fields in single card
   - py-8

3. **Output Section:**
   - Generated roadmap in max-w-4xl container
   - Sections in logical order: Overview → Timeline → Weekly Schedule → Projects → Resources → Interview Prep
   - Each section independently collapsible
   - py-8

4. **Footer:**
   - Minimal: Credits, API info
   - py-8 text-center

## Icons
**Library:** Heroicons (via CDN)
**Common Icons:**
- sparkles (generate)
- calendar (timeline)
- clock (hours)
- briefcase (role)
- currency-dollar (salary)
- academic-cap (learning)
- chevron-down/up (collapse/expand)
- document-arrow-down (export)

## Accessibility
- All inputs have associated labels (not placeholders as labels)
- Focus visible: focus:ring-2 focus:ring-offset-2
- Sufficient contrast ratios on all text
- ARIA labels on icon-only buttons
- Keyboard navigation: Tab order follows visual flow
- Screen reader announcements for loading states