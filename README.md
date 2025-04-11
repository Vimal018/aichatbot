# 🤖 AI Chatbot – Smart Healthcare Assistant

An AI-powered chatbot that helps users manage their health with quick symptom checking, medication reminders, and home remedies — all in one conversation. Built with TypeScript, Express.js, MongoDB, JWT, and OpenRouter API.

🌐 **Live Demo:** [aichatbot-eight-indol.vercel.app](https://aichatbot-eight-indol.vercel.app/)

---

## 🚀 Features

- 💬 Chat with a healthcare AI assistant
- 🔐 User authentication using JWT
- 🧠 AI replies powered by OpenRouter (GPT-3.5-Turbo)
- 📦 Stores chat history in MongoDB
- 🧹 Delete chat history
- ☁️ Fully deployed on Render & Vercel

---

## ⚙️ Tech Stack

- 🟦 TypeScript + Node.js + Express
- 🧪 MongoDB + Mongoose
- 🔐 JWT Authentication
- 🧠 OpenRouter API (ChatGPT compatible)
- 🌐 Deployed on Render (backend) & Vercel (frontend)

---

## 📁 Project Structure

```
aichatbot/
├── controllers/
│   └── chat-controllers.ts
├── models/
│   └── User.ts
├── routes/
│   └── chat-routes.ts
├── utils/
│   ├── token-manager.ts
│   └── validators.ts
├── app.ts
├── index.ts
```

---

## 🔐 Environment Variables

Create a `.env` file locally or set the following variables in your Render Dashboard:

```
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

✅ Ensure that `OPENROUTER_API_KEY` is correctly set in the Render environment settings.

---

## 📬 API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/api/v1/chat/new`      | Send message to chatbot         |
| GET    | `/api/v1/chat/all-chats`| Retrieve user's chat history    |
| DELETE | `/api/v1/chat/delete`   | Delete all chat messages        |

---

## 🧠 How It Works

1. User logs in (JWT used for authentication).
2. Messages are sent to OpenRouter API via POST `/chat/new`.
3. OpenRouter returns AI-generated response.
4. Both user and AI messages are saved in MongoDB.
5. Chat history can be fetched or cleared by user.

---

## 🧪 Testing

Use tools like **Postman** or your **frontend app** to test the API.

Make sure to include the JWT token in the request headers like this:

```
Authorization: Bearer <your_token>
```

---

## 🌐 Deployment

- 🖥️ Frontend deployed on: [Vercel](https://aichatbot-eight-indol.vercel.app/)
- ⚙️ Backend deployed on: [Render](https://render.com)
- Add environment variables in both platforms as needed

---

## ❤️ Acknowledgements

- [OpenRouter.ai](https://openrouter.ai) – GPT-3.5 Turbo AI magic ✨  
- [Render](https://render.com) – Fast and simple cloud deployment  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) – Cloud DB hosting  
- [Vercel](https://vercel.com) – Frontend hosting made easy  

---

