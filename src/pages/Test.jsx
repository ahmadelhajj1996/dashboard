// // import useNotifications from "../hooks/useNotifications";

// export default function AdminNotifications() {


//     const token = localStorage.getItem("token");

//     // const {
//     //     notifications,
//     //     unreadCount,
//     //     loading,
//     //     markAllAsRead,
//     // } = useNotifications(1, token);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="max-w-2xl mx-auto p-5">
         

//             <div className="flex items-center justify-between mb-5">
//                 <h1 className="text-2xl font-bold">
//                     Notifications
//                 </h1>

//                 <div className="flex items-center gap-3">
//                     <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
//                         {unreadCount} unread
//                     </span>

//                     <button
//                         onClick={markAllAsRead}
//                         className="bg-black text-white px-4 py-2 rounded-lg"
//                     >
//                         Mark all as read
//                     </button>
//                 </div>
//             </div>

//             <div className="space-y-3">
//                 {notifications.map((notification) => (
//                     <div
//                         key={notification.id}
//                         className={`border rounded-xl p-4 shadow-sm ${
//                             !notification.read_at
//                                 ? "bg-blue-50 border-blue-300"
//                                 : "bg-white"
//                         }`}
//                     >
//                         <h2 className="font-semibold">
//                             {notification.data?.title}
//                         </h2>

//                         <p className="text-gray-600 mt-1">
//                             {notification.data?.message}
//                         </p>

//                         <div className="text-sm text-gray-500 mt-2">
//                             Order ID:
//                             {" "}
//                             {notification.data?.order_id}
//                         </div>

//                         <div className="text-sm text-gray-500">
//                             Total:
//                             {" "}
//                             {notification.data?.total}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }




 import React from 'react'
 
 function Test() {
   return (
     <div>
       test
     </div>
   )
 }
 
 export default Test
 