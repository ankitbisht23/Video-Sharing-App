### **📺 Interactive Video Sharing Platform**  
A **MERN Stack** web application built using **React, Redux, Vite, Tailwind CSS, Node.js, Express, MongoDB, and Multer** that allows users to **upload videos, like, comment, subscribe, search, and manage playlists**.  

🚀 **Developed collaboratively by me and my friend.**  

---

## **🛠️ Tech Stack**
- **Frontend**: React (Vite) + Tailwind CSS  
- **State Management**: Redux Toolkit  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB + Mongoose  
- **File Uploads**: Multer  
- **Authentication**: JWT-based authentication  
- **Search & Filtering**: MongoDB Aggregation  

---

## **📌 Features**
✅ **User Authentication** (Login, Register, JWT)  
✅ **Video Uploading** (Using Multer for file handling)  
✅ **Like & Comment System** (Interactive user engagement)  
✅ **Subscription System** (Follow creators)  
✅ **Search & Filtering** (Find videos easily)  
✅ **User Profile Management** (View uploaded & liked videos)  
✅ **Playlists** (Create and manage playlists)  
✅ **Responsive UI** (Built with Tailwind CSS)  
✅ **Real-time Updates** (Using Redux for state management)  

---

## **🗄️ Database Schema**
### **User Schema**
- `username`, `email`, `password`, `profilePicture`, `subscribers`  
- `likedVideos`, `uploadedVideos`, `playlists`

### **Video Schema**
- `title`, `description`, `videoFile`, `thumbnail`, `likes`, `views`
- `comments[]`, `uploaderId`, `uploadDate`

### **Comment Schema**
- `userId`, `videoId`, `commentText`, `timestamp`

---

## **🛠 Backend API Endpoints (Node.js + Express)**
- **Auth Routes:** Register, Login, Logout  
- **Video Routes:** Upload, Like, View, Comment  
- **User Routes:** Profile, Subscription, Playlist Management  
- **Search & Filter Routes:** Fetch by category, trending, most liked  

---

## **🌐 Frontend (React + Vite + Redux)**
- **Video Player Component** (Displays uploaded videos)  
- **Like & Comment System** (Redux handles state updates)  
- **Search Bar & Filtering** (Fetch videos dynamically)  
- **Profile Dashboard** (Shows uploaded, liked videos, playlists)  
- **Subscription Panel** (Follow other creators)  

---

## **🚀 Running the Project**
### **1️⃣ Backend Setup**
- Install dependencies: `npm install`  
- Run server: `npm run dev`  

### **2️⃣ Frontend Setup**
- Install dependencies: `npm install`  
- Start Vite server: `npm run dev`  

---

## **📸 Screenshots**
![image](https://github.com/user-attachments/assets/7a2ea03e-888f-4f29-8734-931017b4017d)


---

## **📄 Future Enhancements**
- **Real-time Notifications**  
- **Video Recommendations (AI-based)**  
- **Live Streaming Integration**  
- **Mobile App Version**  

---

## **💡 Contributing**
1. **Fork the repository**  
2. **Create a feature branch**  
3. **Commit changes & push**  
4. **Submit a pull request** 🚀  

---

## **📜 License**
Licensed under **MIT License**.

---

## **🙌 Acknowledgments**
Built using **MERN Stack, Redux, Vite, Tailwind CSS, Multer, and MongoDB**. 🚀
