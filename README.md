# 🌟 Averis – AI Creator Platform  
*by Team Achievr*

Averis is an **AI-powered content creation platform** that helps creators **write, publish, and grow** effortlessly.  
It combines **AI assistance**, **analytics**, and **beautiful UI** — empowering every user to turn their ideas into engaging content.

---
🔗 Live Demo: https://averis-blue.vercel.app/
---

## 🚀 Features

### 🧠 AI-Powered Creation
Generate, edit, and optimize your content using advanced AI models.

### 🎨 Modern, Interactive UI
- Dynamic gradient visuals  
- Animated mouse-follow effects  
- Fully responsive layout built with **Next.js 15** and **TailwindCSS**

### 👥 Authentication
- Secure sign-in and sign-up with **Clerk Authentication**
- Seamless user sessions and profile handling
- Custom redirect logic for personalized flows

### 🖼️ Media Uploads
- Integrated with **ImageKit** for smooth and fast image uploads  
- Auto-organized under the `blog_images` folder in ImageKit dashboard

### 🧩 Dashboard & Feed
- Personalized user dashboard  
- Explore other creators’ content on the Feed  
- AI-suggested improvements and insights for each post

### 🔮 Smart Suggestions (Gemini Integrated)
- Uses Google Gemini API to generate content ideas and insights in real time.

---

## ⚙️ Tech Stack

| Layer | Tools / Libraries |
|-------|--------------------|
| **Frontend** | Next.js 15, React 18, TailwindCSS, ShadCN UI |
| **Auth** | Clerk |
| **AI** | Google Gemini API |
| **Media** | ImageKit.io |
| **Hosting** | Vercel |
| **Data Handling** | Convex Cloud Functions |

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Deepanshi-05/Averis.git
cd Averis
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment variables  
Create a file named `.env.local` in the root directory and add:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ Make sure these match your **Clerk**, **ImageKit**, and **Gemini** project credentials.

### 4️⃣ Run the app locally
```bash
npm run dev
```

### 5️⃣ Open in browser
```
http://localhost:3000
```

---

## 🧑‍💻 Team Achievr

| Name | Role | Focus Area |
|------|------|-------------|
| **Team Achievr** | Core Team | Design, Dev & Product Vision |

---

## 🌈 Future Enhancements
- 🧩 AI voice assistant for content creation  
- 📊 Deeper analytics for creator insights  
- 🎯 Personalized topic recommendations  
- 💬 Community interaction features  


---

## 🖋️ License
This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute with attribution.

---

### 💜 Built with passion by **Team Achievr**
“Create. Publish. Grow.”
