import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './pages/index';
import Stopwatch from './pages/stopwatch';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";

function App() {
	const firebaseConfig = {
		apiKey: "AIzaSyCFOZEaCzT2Q-CoS64Z7tNjXxa9xVaAtJc",
		authDomain: "my-first-pwa-65a32.firebaseapp.com",
		projectId: "my-first-pwa-65a32",
		storageBucket: "my-first-pwa-65a32.appspot.com",
		messagingSenderId: "992395094427",
		appId: "1:992395094427:web:82195ff5015fb447df993e",
		measurementId: "G-QE9Q73WQTJ"  
	};
	
	const fapp = initializeApp(firebaseConfig);
	const messaging = getMessaging(fapp);
	

	if ('serviceWorker' in navigator) {
		getToken(messaging, {
			vapidKey:
				"BMi1mXmz3Ov-0ipAGru0Z59fnG8_g4ChhjmSf7yREfMIHJKkuGqITVzwb6J9xCUn8x3vgaZuY5IO69-j1HswODE",
		})
		.then((currentToken) => {
			if (currentToken) {
				console.log("Firebase Token", currentToken);
				window.addEventListener('load', function () {
			
					navigator.serviceWorker.register('/firebase-messaging-sw.js')
					.then(registration => {
			
					//通知の許可をユーザに確認
					Notification.requestPermission()
						.then((permission) => {
							if (currentToken) {
								navigator.serviceWorker.ready.then(p => {
				
									p.pushManager.getSubscription().then(subscription => {
					
										if (subscription === null) {
					
										//通知の購読が存在しない場合は登録する。
										let re = p.pushManager.subscribe({
											userVisibleOnly: true
										})
										}
									})
				
								})
							} else {
								//通知が許可されなかった場合  
								console.log(permission)
							}
						})
					})
				})
			} else {
				// Show permission request UI
				console.log(
					"No registration token available. Request permission to generate one."
				);
				// ...
			}
		})
		.catch((err) => {
			console.log("An error occurred while retrieving token. ", err);
			// ...
		});
	}
	
	return (
		<div className="App">				
			
		<BrowserRouter>
			<Routes>
				<Route path={`/`} element={<Index />} />
				<Route path={`/stopwatch`} element={<Stopwatch />} />
			</Routes>
		</BrowserRouter>
		</div>
	);
}

export default App;

