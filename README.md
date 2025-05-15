# ServiceTrek  

**ServiceTrek** is a dynamic service review platform where users can browse and filter services, add reviews, and manage their personal service listings. It integrates a responsive design, JWT authentication, and Firebase for seamless functionality.  

---
### Live Demo  
**[ServiceTrek Live Demo](https://servicetrek-ff5f1.web.app/)**  

## Features  

### Authentication  
- **Firebase Authentication** for secure login/signup.  
- JWT-based authentication with HTTP-only cookies for secure API access.  

### Services Management  
- **Browse Services:** View paginated services with top picks highlighted.  
- **Search & Filter:** Find services by category, company, or title.  
- **My Services:** View, update, or delete your own services.  
- **Add New Services:** Add services to the platform.  

### Reviews Management  
- **Add Reviews:** Submit reviews for services.  
- **Update/Delete Reviews:** Modify or remove your reviews.  
- **My Reviews:** View all reviews submitted by you.  

### Responsive Design  
- Fully optimized for desktop and mobile devices.  

---

## Tech Stack  

### Frontend  
- **React**: UI development.  
- **React Router Dom**: Navigation and routing.  
- **Material-UI (MUI)**: Modern, responsive UI components.  
- **Axios**: HTTP client for API requests.  
- **React Toastify**: Notifications for a smooth user experience.  
- **Swiper**: Interactive carousels.  
- **React Hook Form**: Efficient and user-friendly form handling.  
- **React Helmet Async**: Manage meta tags dynamically.  
- **React Stars**: Simple and elegant star rating system.  
- **React Countup**: Animated counters for stats.  
- **Framer Motion**: Animations for a modern touch.  
- **Lottie React**: Lottie animations for a lively interface.  
- **React Icons**: Consistent and modern icons.  

### Backend  
- **Express.js**: Backend framework.  
- **MongoDB**: Database for storing services and reviews.  
- **JWT**: Authentication and secure API access.  

### Other Tools  
- **Firebase**: User authentication and hosting.  
- **Dotenv**: Environment variable management.  
- **Cookie Parser**: Handle cookies for secure JWT storage.  

Here’s a professional and clean `README.md` setup section for your **ServiceTrek** project, based on your `package.json` and project stack:

## 🛠️ Setup Instructions

### ✅ Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (v18 or higher) – [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

Check installed versions:

```bash
node -v
npm -v
````

---

### 📦 Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/servicetrek-client.git
cd servicetrek-client
npm install
```

---

### 🚧 Development Server

To run the project in development mode with hot reload:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

### ⚙️ Build for Production

To build the app for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

### 🧹 Linting

To run ESLint:

```bash
npm run lint
```

## 📄 License

This project is licensed under the MIT License. Feel free to fork and improve!

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---