# Digital Lebanon 🇱🇧 | لبنان الرقمي

> **⚠️ DISCLAIMER: This is a demo project for learning, testing, and simulation purposes only. This is NOT a real or official government portal. All content, services, and functionality are completely fictional and for educational/demonstration purposes.**

A futuristic government services portal that reimagines Lebanon's public sector as a fully digital, user-centric experience. This project showcases how digital transformation could eliminate paperwork, long queues, and inefficiency in Lebanese government services.

## 🎓 Purpose

This project is designed for:

- **Learning** modern web development techniques
- **Testing** UI/UX concepts for government portals
- **Demonstrating** digital transformation possibilities
- **Educational** purposes and portfolio showcasing

**This is NOT affiliated with any real Lebanese government entity or official institution.**

## 🌟 Features

### 🏛️ Government Services

- **Civil Registry**: National ID renewal, birth certificates, marriage certificates
- **Ministry of Finance**: Tax returns, tax clearance certificates
- **Electricité du Liban (EDL)**: Electricity bill payments
- **NSSF**: Social security registration, medical reimbursements
- **Transportation**: Vehicle registration, driving license renewal

### 🎨 Modern UI/UX

- Clean, intuitive interface designed for Lebanese citizens
- Responsive design that works on all devices
- Lebanon flag-inspired color scheme and branding
- Modern animations and smooth transitions

### 🌐 Multilingual Support

- Full Arabic and English support
- Right-to-left (RTL) layout for Arabic
- Culturally appropriate fonts (Tajawal for Arabic, Inter for English)
- Context-aware language switching

### 🔐 Authentication & Security

- Secure login system with form validation
- Demo mode for easy testing
- User profile management
- Session persistence

### 📊 Comprehensive Dashboard

- Real-time application tracking
- Progress indicators for multi-step processes
- Notification system
- Quick actions for popular services
- Statistics and analytics

### 🏗️ Modular Architecture

- Service-based architecture for easy ministry addition
- Reusable UI components
- TypeScript for type safety
- Zustand for state management

### 😅 Realistic Pain Points

- Simulated service outages ("temporarily unavailable")
- Maintenance mode for certain services
- Document requirement notifications
- Processing delays to feel authentic

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd online-lebanon
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Demo Credentials

For quick testing, you can use:

- **Email**: Any valid email address
- **Password**: Any password with 6+ characters
- **Quick Demo**: Click "Quick Demo Login" for instant access

## 📱 Screenshots

### Homepage

- Modern landing page with Lebanon flag colors
- Service overview and ministry listings
- Multilingual navigation

### Dashboard

- Personalized welcome with Arabic/English names
- Application tracking with progress bars
- Quick actions for popular services
- Recent notifications panel

### Services

- Comprehensive service catalog
- Status indicators (Online, Maintenance, Limited, Offline)
- Ministry categorization
- Fee and processing time information

## 🏛️ Government Entities

The portal simulates these Lebanese institutions:

1. **Ministry of Interior and Municipalities** 🏛️

   - Civil Registry services
   - Municipal permits

2. **Ministry of Finance** 💰

   - Tax collection and returns
   - Financial clearances

3. **Electricité du Liban (EDL)** ⚡

   - Electricity bill payments
   - Service connections

4. **National Social Security Fund (NSSF)** 🛡️

   - Health insurance
   - Social benefits

5. **Ministry of Public Works and Transport** 🚗
   - Vehicle registration
   - Driving licenses

## 🛠️ Technical Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Heroicons** - Icon system
- **React Hot Toast** - Notifications

### State Management

- **Zustand** - Lightweight state management
- **Local Storage** - Session persistence

### UI/UX

- **Custom components** - Reusable UI elements
- **Animation** - Smooth transitions
- **Accessibility** - WCAG compliant
- **Mobile-first** - Responsive design

## 📂 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── services/          # Service pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── data/                 # Mock data and APIs
├── lib/                  # Utilities and helpers
│   ├── store.ts          # Zustand store
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
```

## 🎨 Design System

### Colors

- **Lebanon Red**: `#E4002B` (Lebanese flag)
- **Lebanon Green**: `#009A17` (Lebanese flag)
- **Cedar Brown**: `#8B4513` (Cedar tree reference)
- **Primary Blue**: `#3b82f6` (Modern accent)

### Typography

- **Arabic**: Tajawal (Google Fonts)
- **English**: Inter (Google Fonts)

## 🌍 Internationalization

The application supports:

- **English** (LTR layout)
- **Arabic** (RTL layout)
- Automatic direction switching
- Localized date/time formatting
- Currency formatting (USD/LBP)

## 🔧 Environment Setup

### Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Customization

The modular architecture allows easy addition of:

- New government services
- Additional ministries
- Custom workflows
- Integration with real APIs

## 🤝 Contributing

This project demonstrates the potential for digital government transformation in Lebanon. Contributions that enhance the realistic simulation are welcome.

## ⚠️ Important Notice

**This is a fictional demonstration project created for learning and testing purposes only:**

- ❌ **NOT a real government portal**
- ❌ **NOT officially endorsed by any Lebanese institution**
- ❌ **NO real government services provided**
- ❌ **NO real data collection or processing**
- ✅ **Educational and demonstration purposes only**
- ✅ **Learning modern web development**
- ✅ **Testing UI/UX concepts**
- ✅ **Portfolio showcase project**

## 📄 License

This project is for demonstration, learning, and testing purposes only, showcasing modern web development techniques applied to government service digitalization simulation.

## 🙏 Acknowledgments

- Lebanese citizens who deserve better digital services
- The vision of a more efficient, transparent government
- Modern web development practices and tooling

---

**Digital Lebanon** - Towards a better digital future for government services in Lebanon
**لبنان الرقمي** - نحو مستقبل رقمي أفضل للخدمات الحكومية في لبنان
