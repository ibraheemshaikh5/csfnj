# Care & Share Foundation Website

A modern, responsive website for Care & Share Foundation, a New Jersey-based charity organization dedicated to serving the community through food distribution, volunteer programs, and community outreach.

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Forms**: [Formspree](https://formspree.io/) for form submissions
- **Image Optimization**: Next.js Image component
- **Fonts**: Google Fonts (Poppins, Inter)

## Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Interactive Forms**: 
  - Volunteer Registration Form (integrated with Formspree)
  - Contact Form (integrated with Formspree)
- **Dynamic Routing**: Event detail pages with dynamic slug-based routing
- **SEO Optimized**: Metadata and proper semantic HTML structure
- **Image Optimization**: Automatic image optimization with Next.js Image component
- **Donation Integration**: Zeffy donation form integration
- **Payment Methods**: Support for Venmo, Zelle, and check payments

## Pages

- **Home** (`/`) - Main landing page with carousel, donation widget, volunteer registration, and event listings
- **About** (`/about`) - Organization information, impact stories, and video gallery
- **Events** (`/events`) - List of all events
- **Event Details** (`/events/[slug]`) - Dynamic pages for individual events
- **Volunteer** (`/volunteer`) - Volunteer registration form
- **Contact** (`/contact`) - Contact form and information
- **Donate** (`/donate`) - Donation page with Zeffy form and payment options

## Form Functionality

All forms are fully functional using **Formspree** for backend form handling:

- **Volunteer Registration Form**: 
  - Form ID: `xdandver`
  - Fields: First Name, Last Name, Email, Phone, Age Verification
  - Features: Client-side validation, error handling, auto-reset after successful submission

- **Contact Form**: 
  - Form ID: `xbdrkezp`
  - Fields: First Name, Last Name, Email (optional), Phone, Message
  - Features: Client-side validation, error handling, auto-reset after successful submission

Both forms include:
- Real-time validation
- Custom error messages
- Success state with automatic form reset (5 seconds after submission)
- Smooth fade transitions
- Disabled state during submission

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd csfnj
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
csfnj/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── donate/            # Donate page
│   ├── events/            # Events pages
│   │   ├── [slug]/       # Dynamic event detail pages
│   │   └── page.tsx      # Events listing page
│   ├── volunteer/         # Volunteer page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx        # Site header/navigation
│   ├── Footer.tsx        # Site footer
│   ├── Carousel.tsx      # Image carousel
│   ├── VolunteerForm.tsx # Volunteer registration form
│   ├── ContactForm.tsx   # Contact form
│   └── ...               # Other components
├── public/               # Static assets
│   └── images/          # Image files
└── media/               # Source media files
```

## Form Configuration

The forms are pre-configured with Formspree endpoints:
- Volunteer Form: `https://formspree.io/f/xdandver`
- Contact Form: `https://formspree.io/f/xbdrkezp`

To update form endpoints, modify the form IDs in:
- `components/VolunteerForm.tsx`
- `components/ContactForm.tsx`

## Styling

The website uses Tailwind CSS with a consistent color scheme:
- Primary Blue: `#0720ff`
- Background Grey: `#f7f7f7`
- Form Input Background: `#e1e2f8`
- Form Text Color: `#1a2df3`

## Building for Production

```bash
npm run build
npm start
```

## License

© Care & Share Foundation
