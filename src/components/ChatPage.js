// // ChatPage.js
// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { updateDoc, doc } from "firebase/firestore";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";

// const ChatPage = () => {
//   useEffect(() => {
//     // Check if the user is logged in
//     const user = auth.currentUser;
//     if (user) {
//       ChatList(user.uid, true); // Set user status to online
//     }

//     // Set user offline on component unmount or logout
//     return () => {
//       if (auth.currentUser) {
//         ChatList(auth.currentUser.uid, false); // Set user status to offline
//       }
//     };
//   }, []);

//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const setStatusOnline = async () => {
//       await updateDoc(doc(db, "users", auth.currentUser.uid), {
//         isOnline: true,
//       });
//     };

//     const setStatusOffline = async () => {
//       await updateDoc(doc(db, "users", auth.currentUser.uid), {
//         isOnline: false,
//       });
//     };

//     setStatusOnline();
//     window.addEventListener("beforeunload", setStatusOffline);

//     return () => {
//       setStatusOffline();
//       window.removeEventListener("beforeunload", setStatusOffline);
//     };
//   }, []);

//   return (
//     <div className="chat-page">
//       <ChatList setSelectedUser={setSelectedUser} />
//       {selectedUser && <MessageArea selectedUser={selectedUser} />}
//     </div>
//   );
// };

// export default ChatPage;

//this old code that user is without login enter the chat room page that's call Error

// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { updateDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import "./ChatPage.css";
// import MessageArea from "./MessageArea";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null); // Track the current user

//   useEffect(() => {
//     // Listen to authentication state changes
//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the logged-in user
//         setStatusOnline(user.uid); // Set user status to online
//       } else {
//         setCurrentUser(null); // Reset if no user is logged in
//       }
//     });

//     // Cleanup on component unmount
//     return () => {
//       unsubscribeAuth();
//       if (currentUser) {
//         setStatusOffline(currentUser.uid); // Set user offline on unmount
//       }
//     };
//   }, [currentUser]);

//   // Helper functions for setting online/offline status
//   const setStatusOnline = async (uid) => {
//     await updateDoc(doc(db, "users", uid), {
//       isOnline: true,
//     });
//   };

//   const setStatusOffline = async (uid) => {
//     await updateDoc(doc(db, "users", uid), {
//       isOnline: false,
//     });
//   };

//   useEffect(() => {
//     // Handle setting user offline before window unload
//     const handleBeforeUnload = () => {
//       if (currentUser) {
//         setStatusOffline(currentUser.uid);
//       }
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [currentUser]);

//   return (
//     <div className="chat-page">
//       <ChatList setSelectedUser={setSelectedUser} />
//       {selectedUser && <MessageArea selectedUser={selectedUser} />}
//     </div>
//   );
// };

// export default ChatPage;

//new code this User is Anonymus enter without login error fix

// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "./ChatPage.css";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to check if the user has a complete profile
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           // Redirect to profile completion page if profile is incomplete
//           navigate("/");
//         }
//       }
//     };

//     // Listen to authentication state changes
//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the logged-in user
//         checkUserProfile(user); // Check user profile
//       } else {
//         setCurrentUser(null); // Reset if no user is logged in
//       }
//     });

//     // Cleanup on component unmount
//     return () => {
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   return (
//     <div className="chat-page">
//       {currentUser ? (
//         <>
//           <ChatList setSelectedUser={setSelectedUser} />
//           {selectedUser && <MessageArea selectedUser={selectedUser} />}
//         </>
//       ) : (
//         <p>Please log in to access the chat.</p>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "./ChatPage.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to check if the user has a complete profile
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         // Check if user data exists and has the required fields
//         if (!userData.name || !userData.email) {
//           // Redirect to profile completion page if profile is incomplete
//           navigate("/profile-completion");
//         }
//       } else {
//         // Handle case where user data is missing
//         navigate("/profile-completion");
//       }
//     };

//     // Listen to authentication state changes
//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the logged-in user
//         checkUserProfile(user); // Check user profile data in Firestore
//       } else {
//         setCurrentUser(null); // Reset if no user is logged in
//         navigate("/login"); // Redirect to login page if not authenticated
//       }
//     });

//     // Cleanup on component unmount
//     return () => {
//       unsubscribeAuth();
//     };
//   }, [navigate]);

//   return (
//     <div className="chat-page">
//       {currentUser ? (
//         <>
//           <ChatList setSelectedUser={setSelectedUser} />
//           {selectedUser && <MessageArea selectedUser={selectedUser} />}
//         </>
//       ) : (
//         // <p>Please log in to access the chat.</p>

//         <Spinner className="" animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//This Code is User Not select other user so then show Placeholder message

// ChatPage.js
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         checkUserProfile(user);
//       } else {
//         setCurrentUser(null);
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate]);

//   return (
//     <div className="chat-page">
//       {currentUser ? (
//         <>
//           <ChatList setSelectedUser={setSelectedUser} />
//           {selectedUser ? (
//             <MessageArea selectedUser={selectedUser} />
//           ) : (
//             <div className="message-area">
//               <div
//                 className="placeholder-message"
//                 style={{ textAlign: "center", paddingTop: "20%" }}
//               >
//                 <h2>WhatsApp for Web</h2>
//                 <p>
//                   Send and receive messages without keeping your phone online.
//                 </p>
//                 <p>
//                   Use WhatsApp on up to 4 linked devices and 1 phone at the same
//                   time.
//                 </p>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//If i refresh page navigate to Chatlist not stay in messageArea
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Prevent page refresh
//     const handleBeforeUnload = (event) => {
//       event.preventDefault();
//       event.returnValue = ""; // This is required for some browsers to display the warning
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         checkUserProfile(user);
//       } else {
//         setCurrentUser(null);
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate]);

//   return (
//     <div className="chat-page d-flex flex-column">
//       {currentUser ? (
//         <>
//           {/* Chat List */}
//           <div
//             className="chat-list-container"
//             style={{
//               display: selectedUser ? "none" : "block", // Hide ChatList when MessageArea is shown
//               width: "100%",
//             }}
//           >
//             <ChatList setSelectedUser={setSelectedUser} />
//           </div>

//           {/* Message Area */}
//           <div
//             className="message-area-container"
//             style={{
//               display: selectedUser ? "block" : "none", // Show MessageArea only when a user is selected
//               width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//               />
//             ) : null}
//           </div>
//         </>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//This code is Refresh page so refreshing after stay in user messageArea dahsboard
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(
//     JSON.parse(localStorage.getItem("selectedUser")) || null
//   );
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         checkUserProfile(user);
//       } else {
//         setCurrentUser(null);
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate]);

//   // Persist selectedUser to localStorage whenever it changes
//   useEffect(() => {
//     if (selectedUser) {
//       localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
//     } else {
//       localStorage.removeItem("selectedUser");
//     }
//   }, [selectedUser]);

//   return (
//     <div className="chat-page d-flex flex-column">
//       {currentUser ? (
//         <>
//           {/* Chat List */}
//           <div
//             className="chat-list-container"
//             style={{
//               display: selectedUser ? "none" : "block", // Hide ChatList when MessageArea is shown
//               width: "100%",
//             }}
//           >
//             <ChatList setSelectedUser={setSelectedUser} />
//           </div>

//           {/* Message Area */}
//           <div
//             className="message-area-container"
//             style={{
//               display: selectedUser ? "block" : "none", // Show MessageArea only when a user is selected
//               width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//               />
//             ) : null}
//           </div>
//         </>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const { userId } = useParams(); // Use URL parameter for userId
//   const [selectedUser, setSelectedUser] = useState(
//     JSON.parse(localStorage.getItem("selectedUser")) || null
//   );
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser")) || null // Retrieve currentUser from localStorage
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Function to check user profile
//     const checkUserProfile = async (user) => {
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         const userData = docSnap.data();
//         if (!userData.name || !userData.email) {
//           navigate("/profile-completion");
//         }
//       } else {
//         navigate("/profile-completion");
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//         localStorage.setItem("currentUser", JSON.stringify(user)); // Save user to localStorage
//         checkUserProfile(user);
//         if (!userId || userId !== user.uid) {
//           navigate(`/chat/${user.uid}`); // Redirect to correct userId if the URL doesn't match
//         }
//       } else {
//         setCurrentUser(null);
//         localStorage.removeItem("currentUser"); // Remove user from localStorage
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth(); // Clean up the auth listener on unmount
//   }, [navigate, userId]);

//   // Persist selectedUser to localStorage whenever it changes
//   useEffect(() => {
//     if (selectedUser) {
//       localStorage.setItem("selectedUser", JSON.stringify(selectedUser)); // Save selectedUser to localStorage
//     } else {
//       localStorage.removeItem("selectedUser"); // Remove selectedUser from localStorage
//     }
//   }, [selectedUser]);

//   return (
//     <div className="chat-page d-flex flex-column">
//       {currentUser ? (
//         <>
//           {/* Chat List */}
//           <div
//             className="chat-list-container"
//             style={{
//               display: selectedUser ? "none" : "block", // Hide ChatList when MessageArea is shown
//               width: "100%",
//             }}
//           >
//             <ChatList setSelectedUser={setSelectedUser} />
//           </div>

//           {/* Message Area */}
//           <div
//             className="message-area-container"
//             style={{
//               display: selectedUser ? "block" : "none", // Show MessageArea only when a user is selected
//               width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//               />
//             ) : null}
//           </div>
//         </>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;

//Notifation Add

import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  getDoc,
  doc,
  onSnapshot,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ChatList from "./UserList";
import MessageArea from "./MessageArea";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

const ChatPage = () => {
  const { userId } = useParams(); // Use URL parameter for userId
  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedUser")) || null
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserProfile = async (user) => {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (!userData.name || !userData.email) {
          navigate("/profile-completion");
        }
      } else {
        navigate("/profile-completion");
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        checkUserProfile(user);
        if (!userId || userId !== user.uid) {
          navigate(`/chat/${user.uid}`);
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        navigate("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate, userId]);

  useEffect(() => {
    if (currentUser) {
      const notificationRef = doc(db, "notifications", currentUser.uid);

      const unsubscribe = onSnapshot(notificationRef, (docSnap) => {
        if (docSnap.exists()) {
          const notifications = docSnap.data().messages || [];

          if (notifications.length > 0) {
            const latestNotification = notifications[notifications.length - 1];
            alert(
              `New message from ${latestNotification.senderName}: ${latestNotification.text}`
            );

            // Remove the displayed notification
            updateDoc(notificationRef, {
              messages: arrayRemove(latestNotification),
            });
          }
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem("selectedUser");
    }
  }, [selectedUser]);

  return (
    <div className="chat-page ">
      {currentUser ? (
        <>
          <div
            className="chat-list-container"
            style={{
              display: selectedUser ? "none" : "block",
              width: "100%",
            }}
          >
            <ChatList setSelectedUser={setSelectedUser} />
          </div>

          <div
            className="message-area-container"
            style={{
              display: selectedUser ? "block" : "none",
              width: "100%",
            }}
          >
            {selectedUser ? (
              <MessageArea
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            ) : null}
          </div>
        </>
      ) : (
        <div className="loading-spinner text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

// import React, { useState, useEffect } from "react";
// import { auth, db } from "../firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import ChatList from "./UserList";
// import MessageArea from "./MessageArea";
// import { useNavigate, useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Spinner from "react-bootstrap/Spinner";

// const ChatPage = () => {
//   const { userId } = useParams(); // Get userId from the URL
//   const [selectedUser, setSelectedUser] = useState(
//     JSON.parse(localStorage.getItem("selectedUser")) || null
//   );
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser")) || null
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUserProfile = async (user) => {
//       try {
//         const userDocRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(userDocRef);

//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           if (!userData.name || !userData.email) {
//             navigate("/profile-completion");
//           }
//         } else {
//           navigate("/profile-completion");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser({ uid: user.uid });
//         localStorage.setItem("currentUser", JSON.stringify({ uid: user.uid }));

//         checkUserProfile(user);

//         // If the URL doesn't match the current user's ID, update it
//         if (!userId || userId !== user.uid) {
//           navigate(`/chat/${user.uid}`);
//         }
//       } else {
//         setCurrentUser(null);
//         localStorage.removeItem("currentUser");
//         navigate("/login");
//       }
//     });

//     return () => unsubscribeAuth();
//   }, [navigate, userId]);

//   // Persist selectedUser to localStorage whenever it changes
//   useEffect(() => {
//     if (selectedUser) {
//       localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
//     } else {
//       localStorage.removeItem("selectedUser");
//     }
//   }, [selectedUser]);

//   return (
//     <div className="chat-page d-flex flex-column">
//       {currentUser ? (
//         <>
//           <div
//             className="chat-list-container"
//             style={{
//               display: selectedUser ? "none" : "block",
//               width: "100%",
//             }}
//           >
//             <ChatList setSelectedUser={setSelectedUser} />
//           </div>

//           <div
//             className="message-area-container"
//             style={{
//               display: selectedUser ? "block" : "none",
//               width: "100%",
//             }}
//           >
//             {selectedUser ? (
//               <MessageArea
//                 selectedUser={selectedUser}
//                 setSelectedUser={setSelectedUser}
//               />
//             ) : (
//               <p className="text-center">
//                 Please select a user to start chatting!
//               </p>
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="loading-spinner text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;
