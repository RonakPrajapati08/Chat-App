// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyCpR8pjfUxza301B5zqQVqDr1XrIe8j1XQ",
  authDomain: "chat-app-d18c2.firebaseapp.com",
  databaseURL: "https://chat-app-d18c2-default-rtdb.firebaseio.com",
  projectId: "chat-app-d18c2",
  storageBucket: "chat-app-d18c2.firebasestorage.app",
  messagingSenderId: "409837506937",
  appId: "1:409837506937:web:12768c8b363932946f1fa8",
  measurementId: "G-FKKPXQJF9Q",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Add any additional background message handlers
messaging.onBackgroundMessage(function (payload) {
  console.log("Background message received: ", payload);
  // Customize your notification here
});
