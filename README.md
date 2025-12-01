# PineTech Mobile App

React Native mobile app for PineTech.pk, built with Expo and matching the core features of the web application.

## Features

- **Home Screen** - Hero section, quick actions, stats
- **Services** - Skills and tech stack showcase
- **Projects** - Portfolio of production projects
- **User Journey** - Multi-step form for developers, investors, and entrepreneurs
- **Booking** - Consultation booking wizard
- **Admin Dashboard** - View submissions and manage bookings (protected)
- **Real-time Chat** - Chat rooms with Pusher integration (planned)

## Tech Stack

- **Framework**: Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **State Management**: Zustand
- **Icons**: Lucide React Native
- **API**: REST API matching web app contracts

## Project Structure

```
pinetech-pk-mobile/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── services.tsx   # Services/Skills
│   │   ├── projects.tsx   # Portfolio
│   │   └── profile.tsx    # About/Profile
│   ├── (auth)/            # Auth screens
│   ├── journey/           # User journey flow
│   ├── booking/           # Booking wizard
│   ├── admin/             # Admin dashboard
│   └── _layout.tsx        # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   └── shared/            # Shared components
├── services/              # API layer
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
├── lib/                   # Constants & utilities
└── types/                 # TypeScript definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

### Configuration

1. Update `lib/constants.ts` with your API base URL
2. Configure environment variables for production

## API Endpoints

The mobile app connects to the same backend as the web app:

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/user-submissions` | POST | Public | Submit inquiry |
| `/api/user-submissions` | GET | Admin | List submissions |
| `/api/bookings` | POST | Public | Create booking |
| `/api/bookings/slots` | GET | Public | Available slots |
| `/api/bookings` | GET | Admin | List bookings |
| `/api/chat/rooms` | GET/POST | Admin | Chat rooms |

## Screens Implementation Status

| Screen | Status | Notes |
|--------|--------|-------|
| Home | ✅ Complete | Hero, actions, stats |
| Services | ✅ Complete | Skills showcase |
| Projects | ✅ Complete | Portfolio cards |
| Profile | ✅ Complete | About & links |
| Journey | ✅ Complete | Multi-step form |
| Booking | ✅ Complete | Booking wizard |
| Admin Login | ✅ Complete | Auth screen |
| Admin Dashboard | ✅ Complete | Stats & submissions |
| Chat | 🔄 Planned | Real-time messaging |

## Development Notes

### Adding New Screens

1. Create a new file in `app/` directory
2. Export a default React component
3. The route is automatically created based on file path

### State Management

- Use Zustand stores for global state
- Keep component-level state local with useState
- Use custom hooks for complex logic

### Styling

- NativeWind uses Tailwind CSS classes
- Custom colors defined in `tailwind.config.js`
- Fallback to StyleSheet for complex styles

## Related

- [PineTech Web App](https://github.com/pinetech-pk/pinetech-pk)
- [pinetech.pk](https://pinetech.pk)

## License

Private - PineTech.pk
