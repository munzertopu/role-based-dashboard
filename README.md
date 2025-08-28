# Role-Based Dashboard System

A React application with role-based authentication and dashboards for Admin, Merchant, and Member users. Built with React, Redux Toolkit, Material-UI, and React Router.

## 🚀 Live Demo

https://role-based-dashboard-xi.vercel.app/

## 📋 Features

### Authentication
- **Admin Login**: Email + Password authentication
- **Merchant Login**: Store Details + Password authentication  
- **Member Login**: Phone/Email + Password or OTP simulation
- Role-based routing and access control
- Session persistence using localStorage
- Form validation for all login inputs


## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd role-based-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🔐 Demo Credentials

### Admin Login
- **Email**: admin@example.com
- **Password**: password

### Merchant Login  
- **Email**: merchant@example.com
- **Password**: password

### Member Login
- **Email**: member@example.com / **Password**: password
- **Phone**: +1234567890 / **OTP**: 123456

## 🛣️ Routes

- `/login/admin` - Admin login page
- `/login/merchant` - Merchant login page  
- `/login/member` - Member login page
- `/dashboard/admin` - Admin dashboard (protected)
- `/dashboard/merchant` - Merchant dashboard (protected)
- `/dashboard/member` - Member dashboard (protected)



## 📦 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🚢 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
vercel --prod
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `build` folder to your hosting provider

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Material Design**: Clean, modern interface following Material Design principles
- **Dark/Light Theme**: Built-in theme support (expandable)
- **Loading States**: Visual feedback during authentication
- **Error Handling**: User-friendly error messages
- **Snackbar Notifications**: Success/error feedback for actions


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Material-UI for the component library
- Redux Toolkit for state management
- React Router for navigation
- Create React App for project setup