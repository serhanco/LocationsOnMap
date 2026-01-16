# 🗺️ Acibadem Information Offices Map

This project is a web application that displays Acibadem's worldwide information offices on an interactive map. It is enhanced with modern UI features and an optional AI assistant to provide a rich user experience for patients and their relatives planning to travel to Turkey for medical services.

## ✨ Features

- **Interactive Map Interface:** A modern, pannable, and zoomable map powered by Leaflet.js.
- **Advanced Marker & Cluster Icons:** Uses the Acibadem logo for individual offices and styled, numbered clusters for dense areas.
- **Filter by Country:** A dropdown menu allows users to filter offices by country, with an animated flight to the selected region.
- **Zoom-Based Labels:** Office names automatically appear as clean, readable labels when the user zooms in, improving clarity without cluttering the map.
- **Find Nearest Office:** A button that uses the browser's Geolocation API to find and focus on the user's closest office.
- **"Home" View Button:** A dedicated control button to easily reset the map view to show all offices.
- **Layer Control:** Allows switching between a "Street Map" and a "Satellite View".
- **Modular AI Travel Assistant (Powered by Gemini):**
  - An optional feature that can be enabled/disabled.
  - When enabled, a sidebar provides AI-generated travel tips for the selected office's city, including business etiquette, local advice, and restaurant recommendations.
- **Clickable Contact Information:** Office details include a clickable phone number (`tel:` link) and a link to get directions on Google Maps.

## 🚀 Technologies Used

- **HTML5** & **CSS3**
- **JavaScript (ES6)**
- **[Leaflet.js](https://leafletjs.com/):** The leading open-source JavaScript library for interactive maps.
- **[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster):** A plugin for Leaflet to cluster markers.
- **[Gemini API](https://ai.google.dev/):** Powers the AI Travel Assistant feature.
- **[OpenStreetMap](https://www.openstreetmap.org/):** Provides the detailed basemap tile layer.

## ⚙️ Installation and Usage

This project is a static web application that runs directly in the browser without any server requirement.

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/serhanco/LocationsOnMap.git
    ```
2.  Navigate to the project folder.
3.  Open the `index.html` file in any modern web browser.

## 💾 Data Source

Office locations and phone numbers are stored in `js/data.js`. This separates the data from the application logic, making it easier to update the office list without touching the core code.
```eof
