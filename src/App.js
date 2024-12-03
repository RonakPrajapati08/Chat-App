// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <Router basename="/Chat-App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat/:userId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import SignUp from "./components/SignUp";
// import ChatPage from "./components/ChatPage";

// function App() {
//   const [chatUser, setChatUser] = useState(null); // State to track the logged-in user

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage setChatUser={setChatUser} />} />
//         {/* <Route path="/signup" element={<SignUp />} /> */}
//         <Route path="/chat" element={<ChatPage chatUser={chatUser} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
