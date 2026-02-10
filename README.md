# UMarket

A modern, minimal marketplace web app for college students.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui components**
- **Lucide React** (icons)

## Features

### Core Functionality
- **.edu Email Verification**: Only college students with verified .edu emails can sign up
- **Peer-to-Peer Marketplace**: Buy and sell items within your college community
- **Mobile-First Design**: Responsive design that works beautifully on all devices
- **Dark Mode**: Toggle between light and dark themes with system preference detection

### Pages
- **Landing Page**: Clean hero layout with brand slogan and call-to-action buttons
- **Authentication**: Sign up and login pages with .edu email validation
- **Marketplace Feed**: Grid view of item cards with search and filtering
- **Item Detail**: Detailed view of individual items with seller information
- **Create Listing**: Form to create new marketplace listings

### UI Components
- Modern, minimalist design with strong typography
- Smooth animations and transitions
- Accessible color contrast ratios
- Hover and focus states for better UX

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd umarket
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
src/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── marketplace/        # Marketplace pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Landing page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   └── theme-toggle.tsx  # Dark mode toggle
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── ...
```

## Design System

### Colors
- **Primary**: Slate blue/indigo for primary actions
- **Secondary**: Subtle highlights and accents
- **Background**: Soft off-white (light) / Deep charcoal (dark)
- **Text**: Dark slate (light) / Soft gray (dark)

### Typography
- Clean, modern font stack using Inter
- Strong hierarchy with consistent spacing
- Readable font sizes for all screen sizes

### Components
All UI components are built with shadcn/ui and styled using Tailwind utilities:
- Buttons with multiple variants
- Form inputs with validation states
- Cards for content organization
- Responsive grid layouts

## Mock Data

The application currently uses mock data for demonstration purposes:
- Sample marketplace items
- Mock user profiles
- Simulated authentication

## Future Enhancements

### Backend Integration
- Real authentication system
- Database integration (PostgreSQL/MongoDB)
- File upload for images
- Real-time messaging

### Advanced Features
- Payment processing integration
- Advanced search and filtering
- User profiles and ratings
- Notifications system
- Mobile app development

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Brand

**Slogan**: "Be the seller, be the buyer, be the learner."

UMarket is designed to be a trusted marketplace exclusively for college students, fostering a safe and productive environment for peer-to-peer transactions within academic communities.
