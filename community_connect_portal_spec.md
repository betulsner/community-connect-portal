# Community Connect Benches Portal — Website Specification

## 1. Project Overview

The website is a **captive portal** for the *Community Connect Benches* concept in Ladywood, Birmingham.

When a user connects to the free Wi-Fi from a Community Connect Bench, this portal opens automatically. The portal should help low-income adults living alone find local digital support, community events, device/internet help, partner cafés, and nearby services.

The website should be simple, low-pressure, accessible, and easy to understand. It should not feel like a complicated app. It should feel like a friendly local guide.

---

## 2. Main Goal of the Portal

The portal should help users answer these questions quickly:

- Where can I get free or low-cost digital help?
- Where can I charge my phone or use Wi-Fi?
- What local events or support sessions are happening near me?
- Where can I get help with devices, internet, CVs, forms, or online services?
- Where is the nearest café/community partner connected to the bench?
- What support exists in Ladywood that I may not know about?

The portal should make existing support more visible and easier to access.

---

## 3. Target Users

Primary users:

- Low-income adults living alone in Ladywood.
- People with low digital confidence.
- People who rely mainly on phones for internet access.
- People who do not know where to find local support.
- People who may feel socially isolated.
- People who need simple, trusted, local guidance.

Secondary users:

- Local cafés and community partners.
- Volunteers or digital champions.
- Community organisations.
- Residents looking for local activities.

---

## 4. Design Principles

The website should follow these principles:

1. **Simple first**
   - Use clear buttons.
   - Avoid long paragraphs.
   - Avoid technical language.

2. **Local and practical**
   - Focus on nearby places, events, and services.
   - Show opening times, distance, cost, and accessibility.

3. **Low-pressure**
   - Do not require users to create an account.
   - Do not force app downloads.
   - Do not ask for unnecessary personal data.

4. **Accessible**
   - Clear, simple English by default.
   - Large text option.
   - High contrast option.
   - Language selection.

5. **Trustworthy**
   - Show where information comes from.
   - Keep the portal focused on local support.
   - Make it clear which services are free.

6. **Human connection**
   - The portal should guide users toward real places and real people, not replace human support.

---

## 5. Website Structure

The website should have these main pages:

1. Home
2. Map
3. Events
4. Digital Help
5. Device & Internet Support
6. Café / Community Partners
7. Accessibility & Language
8. Feedback

The AI chatbot should **not** be a main page. It should be a small side feature called **Ask the City Helper**.

---

# 6. Page Requirements

## 6.1 Home Page

### Purpose

The home page should feel like a calm local public service portal and guide users to the most important actions quickly.

### Header (Implemented)

The header is a clean civic-style bar with:

- Logo/name: Community Connect (left)
- Navigation links (desktop, shown at ≥ 1400 px): Home, Connect with the City, Digital Help, Device Support, Access Data, About and Contact
- Compact accessibility controls (right): language selector (11 languages), A-/A+ text size toggle
- Stamps icon button (demo mode only) and green Dashboard/Login button (far right)
- Mobile (< 1400 px): navigation collapses into a hamburger Menu

### Hero (Implemented)

The hero uses a realistic Ladywood/Birmingham photo background with a dark navy overlay behind text only.

Heading:

> Welcome to Community Connect

Subheading:

> Find free Wi-Fi, digital help, events, and refurbished device support in Ladywood.

Primary actions (two buttons only):

1. Open the map (blue)
2. Find digital help (green)

Secondary link:

> Looking for refurbished devices? →

### “What do you need today?” cards (Implemented)

Exactly four cards are shown:

1. Find nearby services (map)
2. Join an event (events)
3. Get device support (refurbishment)
4. My dashboard (dashboard)

Each card is a simple bordered panel with a clear text button.

---

## 6.2 Map Page

### Purpose

The map helps users find nearby services and support points.

### Map (Implemented)

The map is interactive and uses Leaflet + OpenStreetMap tiles.

- Center: Ladywood, Birmingham (lat 52.476, lng -1.918)
- Default zoom: 15
- Performance: the map is lazy-loaded only when the Map page is opened

### Map Categories

The map should include filters for:

- Digital support
- Free Wi-Fi
- Partner cafés
- Community centres
- Device repair/refurbishment
- Libraries or library alternatives
- Printing/scanning help
- Job/CV help
- Local events
- Transport links
- Accessible locations

### Location Cards

When a user selects a place, show:

- Name
- Type of support
- Distance from current bench
- Opening hours
- Accessibility information
- Contact or website if available
- Button: “Get directions” (opens Google Maps directions in a new tab)
- Button: “More info” (opens a modal)

### “More info” modal (Implemented)

When “More info” is clicked, a clear modal opens above the map and the map cannot be interacted with behind it.

The modal includes:

- Provider name
- Type of support
- Short description/services
- Opening hours
- Address
- Accessibility information
- Contact details
- Social links if available
- Get directions button
- Close button

Accessibility behavior:

- Escape closes the modal
- Focus is trapped while open
- Focus returns to the button that opened it

### Example Location Card

**Ladywood Digital Help Point**  
Type: Digital support  
Distance: 6 minutes walk  
Cost: Free  
Help available: Email, CVs, online forms, basic computer use  
Accessibility: Step-free entrance  
Buttons: Get directions / Opening hours / More like this

---

## 6.3 Events Page

### Purpose

The events page should reduce isolation and help users discover local activities.

### Event Categories

Include:

- Digital skills sessions
- Café meetups
- Community meals
- Repair/refurbishment events
- Job support sessions
- Volunteering opportunities
- Social groups
- Workshops
- Beginner computer sessions

### Event Card Information

Each event should show:

- Event title
- Date and time
- Location
- Distance from current bench
- Cost/free status
- Whether booking is needed
- Short description
- Accessibility information
- Button: “Add reminder”
- Button: “Get directions”

### Example Event Card

**Beginner Digital Help Hour**  
Today, 14:00–15:00  
Location: Partner Café near Ladywood  
Cost: Free  
Description: Get help with email, online forms, CVs, and basic phone/computer use.  
Buttons: Get directions / Add reminder

---

## 6.4 Digital Help Page

### Purpose

This page provides simple practical guidance for common digital tasks.

### Main Help Topics

Use large topic cards:

1. Use email
2. Make or update a CV
3. Apply for jobs
4. Use NHS or health services online
5. Access council or benefits services
6. Scan, upload, or print documents
7. Stay safe online
8. Make video calls
9. Create strong passwords
10. Understand online letters or forms

### Each Help Topic Should Include

- Very short explanation
- Step-by-step instructions
- Simple language
- Optional audio/read-aloud
- Button: “Find someone nearby who can help”
- Button: “Show related support on map”

### Example Topic

**How to upload a document**

1. Open the website or form.
2. Look for a button that says “Upload,” “Choose file,” or “Attach.”
3. Select the document from your phone or computer.
4. Check that the file name appears.
5. Press “Submit” or “Continue.”

Button: Find nearby help with scanning/uploading

---

## 6.5 Device & Internet Support Page

### Purpose

This page helps users find longer-term digital access, not only temporary Wi-Fi at the bench.

### Main Sections

1. I need a device
2. My device is broken
3. I need cheaper internet
4. I need free mobile data
5. I need help applying for support

### Content to Include

- Refurbished laptop/phone information
- Device repair events
- Device donation points
- Free or low-cost SIM/data support
- Social tariff guidance
- Where to get help applying
- Nearby support points

### Important Note

Do not make the portal promise that devices or data are always available. Use careful wording:

> Availability may depend on local organisations and current stock. Check with the support point before travelling.

---

## 6.6 Café / Community Partners Page

### Purpose

This page connects the bench to nearby human/community support.

### Partner Information

Each partner card should show:

- Name
- Type: café, community space, support centre, etc.
- Distance from bench
- Free Wi-Fi availability
- Charging availability
- Digital help hours
- Events hosted
- Accessibility information
- Cost/free information
- Button: “Get directions”

### Example Partner Card

**Community Café Partner**  
Distance: 4 minutes walk  
Offers: Free Wi-Fi, charging, weekly digital help hour  
Next session: Wednesday, 13:00  
Buttons: Get directions / See events here

### Reward Feature

If rewards are included, keep them simple:

- Attend digital help sessions.
- Collect stamps/points.
- Earn small rewards such as free coffee, print voucher, or repair discount.

This should be optional and should not require a complicated account system.

---

## 6.7 Accessibility & Language Page

### Purpose

This page lets users adapt the portal to their needs.

### Required Settings

Include:

- Language selection
- Simple English mode
- Large text
- High contrast
- Read-aloud/audio
- Show accessible locations only
- Reduce animation/motion
- Text-only mode for low data use

### Implemented Languages

The portal currently supports 11 languages, chosen to match actual Ladywood census demographics:

| Language | Demographic note | Direction |
|---|---|---|
| English | 76.6 % of Ladywood residents | LTR |
| Chinese | 4.3 % | LTR |
| Polish | 1.7 % | LTR |
| Persian / Farsi | 1.7 % | RTL |
| Arabic | 1.4 % | RTL |
| French | 1.0 % | LTR |
| Somali | 0.9 % | LTR |
| Punjabi | 0.7 % | LTR |
| Spanish | 0.7 % | LTR |
| Kurdish (Sorani) | 0.6 % | RTL |
| Dutch | Community addition | LTR |

All 11 languages have complete translations for every UI string. RTL languages (Persian, Arabic, Kurdish) flip the document direction and mirror the hero overlay gradient automatically.

### Accessibility Note

Accessibility settings should also be available from every page through a small top-right button.

---

## 6.8 Feedback Page

### Purpose

Collect simple anonymous feedback about the bench and portal.

### Feedback Questions

Use simple options:

1. Was this portal useful?
   - Yes
   - A little
   - No

2. What were you looking for?
   - Wi-Fi
   - Charging
   - Events
   - Digital help
   - Device/internet support
   - Other

3. Is this bench location useful?
   - Yes
   - Not sure
   - No

4. Is anything broken?
   - Wi-Fi
   - Charging
   - Bench
   - QR code/signage
   - Website
   - Nothing

5. What support is missing?
   - Short text box

### Privacy

State:

> Feedback is anonymous. Please do not enter private information.

---

# 7. Side Feature: Ask the City Helper

## 7.1 Role

The AI chatbot is a **side feature**, not a main feature.

It should appear as a small floating button on every page:

> Ask the City Helper

The chatbot helps users find information inside the portal when they do not know where to look.

---

## 7.2 Chatbot Scope

The chatbot can only answer questions about:

- Ladywood/Birmingham local support
- Local events
- Digital support points
- Device/internet support
- Partner cafés
- Community services
- Opening hours
- Directions to nearby places
- Free Wi-Fi or charging locations
- Help with using the portal

The chatbot should not answer general questions.

---

## 7.3 Out-of-Scope Response

If a user asks something outside the allowed topic, the chatbot should say:

> I can only help with local Ladywood and Birmingham support, events, digital access, and community services.

---

## 7.4 Chatbot Example Questions

Users might ask:

- Where can I get help with my CV?
- Where is the nearest free Wi-Fi?
- What events are happening today?
- Where can I get a refurbished laptop?
- Where can I get help applying for benefits?
- Where can I print or scan documents?
- What cafés near me offer digital help?
- Is there free internet support near me?
- What places are open now?
- How do I get to the nearest support centre?

---

## 7.5 Chatbot Example Answer

User:

> Where can I get help with a CV?

City Helper:

> The nearest place for CV help is Community Café Partner, about 5 minutes away. They offer free job and CV support on Wednesdays from 13:00 to 15:00. Would you like directions or other nearby options?

Buttons:

- Get directions
- Show other options
- See opening hours
- Show on map

---

## 7.6 Chatbot Safety and Trust

The chatbot should:

- Use only approved local data.
- Avoid giving legal, medical, financial, or emergency advice.
- Redirect users to official services where appropriate.
- Show the source or organisation name when possible.
- Encourage users to speak to a real support worker for complex issues.
- Never ask for private information like passwords, bank details, or full addresses.

---

# 8. Navigation Design

Use a simple top navigation plus large clear primary buttons on the Home page.

Recommended navigation:

- Home
- Map
- Events
- Help
- Support

The City Helper button should float at the bottom-right corner.

The accessibility/language controls should be visible in the header on desktop and within the mobile menu on small screens.

---

# 9. Visual Style

The website should look:

- friendly
- local
- calm
- clear
- accessible
- not corporate
- not too technical

Suggested style:

- Large clear buttons (minimum 44px height)
- Simple line icons only where they improve clarity
- High contrast text
- Plenty of spacing
- Minimal pages
- Warm neutral background
- Clear headings
- Avoid clutter

Do not use too many colours or too much text.

---

# 10. Prototype Scope

For the first prototype, build only the essential version.

## MVP Pages

1. Home
2. Map
3. Events
4. Digital Help
5. Device & Internet Support

## Side Feature

- Ask the City Helper chatbot button

## Optional Later Pages

- Café/community partners
- Rewards
- Request a bench
- Full feedback system
- Advanced accessibility settings

---

# 11. Example User Journey

## Scenario: A low-income adult living alone needs help finding digital support

1. User sits on the Community Connect Bench.
2. User charges their phone.
3. User connects to free Wi-Fi.
4. Portal opens automatically.
5. User taps “Find nearby support.”
6. Map shows the nearest café offering digital help.
7. User sees that a free digital help hour is happening tomorrow.
8. User taps “Get directions.”
9. User attends the session and receives help with email/CV/forms.

---

# 12. Website Content Tone

Use short, simple sentences.

Prefer:

> Get help with email, forms, CVs, and online services.

Avoid:

> Access a comprehensive range of digital inclusion resources through multi-stakeholder service pathways.

Prefer:

> Free support near you.

Avoid:

> Location-based service ecosystem.

---

# 13. Data Needed for the Website

The website will need placeholder or real data for:

- Bench locations
- Partner cafés
- Digital support centres
- Community centres
- Events
- Device repair/refurbishment points
- Free Wi-Fi locations
- Opening hours
- Accessibility details
- Contact links
- Supported languages

For the prototype, use fictional but realistic sample data.

---

# 14. Privacy Requirements

The portal should:

- Not require login.
- Not collect unnecessary personal data.
- Keep feedback anonymous.
- Not store chatbot conversations unless clearly explained.
- Never ask for passwords, bank details, or private documents.
- Warn users not to enter private information into the chatbot.

Suggested message:

> Please do not share passwords, bank details, or private documents in this portal.

---

# 15. Final Concept Summary for the Website

Community Connect is a local portal connected to smart benches around Ladywood. It helps residents access free Wi-Fi, charging, local events, digital support, device/internet help, and nearby community partners.

The portal is designed for people who may feel excluded from digital services because they lack confidence, affordable data, suitable devices, or someone nearby to help them. The website should act as a simple bridge between public space and existing community support.

The AI City Helper is only a small side feature. The main experience should stay simple: clear buttons, map, events, and practical support.
