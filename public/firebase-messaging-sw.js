importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// firebaseConfigの内容は、firebaseのコンソールから取得出来る。
const firebaseConfig = {
	apiKey: "AIzaSyCFOZEaCzT2Q-CoS64Z7tNjXxa9xVaAtJc",
	authDomain: "my-first-pwa-65a32.firebaseapp.com",
	projectId: "my-first-pwa-65a32",
	storageBucket: "my-first-pwa-65a32.appspot.com",
	messagingSenderId: "992395094427",
	appId: "1:992395094427:web:82195ff5015fb447df993e",
	measurementId: "G-QE9Q73WQTJ"  
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener('push', function (event) {

  console.log("event:push")
  let messageTitle = "MESSAGETITLE"
  let messageBody = "MESSAGEBODY"
  let messageTag = "MESSAGETAG"

  const notificationPromise = self.registration.showNotification(
    messageTitle,
    {
      body: messageBody,
      tag: messageTag
    });
  event.waitUntil(notificationPromise);

}, false)


messaging.onBackgroundMessage((payload) => {
	console.log(
	  '[firebase-messaging-sw.js] Received background message ',
	  payload
	);
	// Customize notification here
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
	  body: 'Background Message body.',
	};
  
	self.registration.showNotification(notificationTitle, notificationOptions);
  });

