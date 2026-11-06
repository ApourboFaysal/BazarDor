# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — Daily essential grocery prices of Bangladesh, in one place.

**Live Demo:** `<add-your-vercel-link-here>`  
**GitHub Repo:** `<add-your-github-repo-link-here>`

---

## 📖 About the Project

**বাজার দর (BazarDor)** is a responsive web app that helps people in Bangladesh check the daily price of everyday items such as rice, lentils, oil, vegetables, fish, meat, eggs and spices.

Users can see which prices went up or down today, browse products by category, sort them by price, and open a product to compare its minimum, maximum and average price across different bazars. Everything is shown in Bangla with Bengali digits.

---

## ✨ Key Features

1. **Live price ticker** — an infinite scrolling strip under the navbar showing emoji, product name, price per unit and a ▲ / ▼ percentage change.
2. **Daily price movers** — separate sections for **"আজ দাম বেড়েছে ▲"** and **"আজ দাম কমেছে ▼"** showing the top 6 risers and fallers.
3. **Category pages with sorting** — browse products by category and sort by **default**, **price: low to high** or **price: high to low**. Sorting works on real numeric values, not Bengali text.
4. **Product details with market-wise prices** — minimum, maximum and average price summary plus a table of prices for each bazar and division. This page is a **protected route** (login required).
5. **Secure authentication** — email/password, **Google** and **GitHub** login powered by Better Auth, with toast messages for success, errors and protected-route redirects.
6. **My Profile and update name** — logged-in users can view their profile, update their name and sign out.
7. **Great user experience** — skeleton loaders while data loads, a friendly 404 page, and a fully responsive layout for mobile, tablet and desktop.

---

## 🛠️ Technologies Used

| Category | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Library | [React 19](https://react.dev/) |
| UI Components | [HeroUI v3](https://www.heroui.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Authentication | [Better Auth](https://www.better-auth.com/) (Email/Password, Google, GitHub) |
| Database | [MongoDB](https://www.mongodb.com/) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Price ticker | [react-fast-marquee](https://www.npmjs.com/package/react-fast-marquee) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Language | TypeScript |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🔌 Data Source

Product and category data comes from the BazarDor API:

| Endpoint | Description |
| --- | --- |
| `/products` | All products |
| `/products?category=chal` | Products filtered by category |
| `/products/:slug` | Single product with market-wise prices |
| `/categories` | All categories |
| `/categories/:slug` | Single category |

---

## 📁 Project Structure

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd bazardor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env` file in the project root:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google login
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub login
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

For social login, set these callback URLs in the Google and GitHub developer consoles:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

The app is deployed on **Vercel**. Before deploying:

1. Add all the environment variables above in the Vercel project settings.
2. Change `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your live domain.
3. Add your live callback URLs (`https://your-domain/api/auth/callback/google` and `/github`) in the Google and GitHub consoles.
4. In MongoDB Atlas, allow network access from Vercel (for example `0.0.0.0/0`).

---

## 📱 Responsive Design

The layout adapts to every screen size:

- **Mobile:** hero stacks vertically, product grid becomes one column, and the category row scrolls sideways.
- **Tablet:** two-column product grid.
- **Desktop:** three-column product grid inside a `max-w-6xl` container.

---

## 🙌 Acknowledgements

- Price data provided by the Programming Hero BazarDor API.
- UI components by [HeroUI](https://www.heroui.com/).

---

<p align="center">Made with ❤️ for Bangladesh's bazar</p>
