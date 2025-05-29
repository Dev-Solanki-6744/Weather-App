# 🌦️ Weather App

A sleek and responsive Weather Application built using **HTML**, **CSS**, and **JavaScript** that fetches real-time weather data from the **OpenWeatherMap API**. Users can search for city-specific weather or get weather updates for their current location using browser geolocation.

## 🚀 Features

- 🌍 **Geolocation-based weather**: Get weather updates based on your current location.
- 🏙️ **City-based search**: Enter any city name to view current weather.
- 📡 **Live weather data**: Uses OpenWeatherMap API for accurate and real-time information.
- 📊 **Detailed stats**: Displays temperature, humidity, wind speed, and cloud coverage.
- 🎯 **User-friendly interface**: Tab-based navigation for quick switching between "Your Weather" and "Search Weather".
- 🎨 **Responsive design**: Built with custom CSS for a clean, mobile-friendly layout.

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **API**: [OpenWeatherMap](https://openweathermap.org/api)
- **Deployment**: Netlify / GitHub Pages *(Add your actual deployment link if available)*

## 📂 Project Structure

📁 Weather-App/
├── index.html # Main HTML file
├── style.css # Styling file
├── script.js # Main JavaScript logic
└── assets/ # Weather icons, loading gif, etc.

vbnet
Copy
Edit

## 🔑 API Key

This project uses the OpenWeatherMap API. Replace the demo key in `script.js` with your own API key if rate-limiting occurs.

```js
const Api_key = "YOUR_API_KEY_HERE";