# Crypto Tracker – Real-Time Cryptocurrency Dashboard

A feature-rich cryptocurrency tracking web app that displays live prices, historical charts, and allows users to build a personal portfolio with Google Sign-In.

![App Screenshot](link-to-screenshot.png)

## ✨ Features

- **Live Prices** – Top 100+ cryptocurrencies with 24h changes (CoinGecko API)
- **Advanced Charts** – Price (1d/7d/30d/1y), Candlestick, Volume, and Coin Comparison
- **User Authentication** – Secure login with Google (Firebase Auth)
- **Personal Portfolio** – Add/remove coins, total value calculation (Firestore)
- **Search & Pagination** – Filter coins and load more with infinite scroll
- **Responsive Design** – Tailwind CSS ensures a smooth experience on all devices

## 🛠 Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS
- **Charts:** Recharts, Lightweight Charts (TradingView)
- **Backend & Auth:** Firebase Authentication, Cloud Firestore
- **API:** CoinGecko (free tier, no API key required)
- **HTTP Client:** Axios
- **Development:** Firebase Emulators (local testing)

## 🚀 Live Demo

[Coming Soon] – or add your deployed link here.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-app.git
   cd crypto-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable **Authentication** (Google Sign-In) and **Cloud Firestore**
   - Copy your Firebase config object
   - Create a `.env.local` file in the root and add the following (replace with your actual values):
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. (Optional) Run Firebase Emulators for local development:
   ```bash
   firebase emulators:start
   ```
   The app will automatically connect to emulators in development mode.

5. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔧 Usage

- **Home Page** – Browse top cryptocurrencies, search by name/symbol, load more.
- **Coin Details** – Click any coin to view detailed charts and description. Add/remove from portfolio.
- **Portfolio** – View your saved coins and total value (requires login).
- **Login** – Click the "Login with Google" button (use mock emails in emulator mode).

## 📸 Screenshots

| Home Page | Coin Details | Portfolio |
|-----------|--------------|-----------|
| ![Home](screenshots/home.png) | ![Details](screenshots/details.png) | ![Portfolio](screenshots/portfolio.png) |

## 🔒 Security

Firestore security rules ensure users can only read/write their own portfolio data:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🧪 Testing with Emulators

- Start emulators: `firebase emulators:start`
- Auth Emulator UI: `http://localhost:4000/auth`
- Firestore Emulator UI: `http://localhost:4000/firestore`
- Use fake emails (e.g., `test@example.com`) to log in – no real passwords needed.

## 🚢 Deployment

Build the app for production:
```bash
npm run build
```
Deploy the `dist` folder to any static hosting (Firebase Hosting, Vercel, Netlify).

To deploy to Firebase Hosting:
```bash
firebase init hosting   # (if not already done)
firebase deploy --only hosting
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](link-to-issues).

## 📄 License

This project is [MIT](LICENSE) licensed.

## 🙏 Acknowledgements

- [CoinGecko API](https://www.coingecko.com/en/api) for free cryptocurrency data
- [Firebase](https://firebase.google.com) for authentication and database
- [Lightweight Charts](https://www.tradingview.com/lightweight-charts/) for candlestick visualizations
- [Recharts](https://recharts.org) for line and bar charts
```

---

Feel free to customize the links, add actual screenshots, and adjust any details to match your project exactly. Great job building this app!
