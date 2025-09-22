Acibadem Information Offices Map
This project is a web application that displays Acibadem's worldwide information offices on an interactive map. It allows users to filter offices by country, find the nearest office, and get AI-powered travel insights for each location.

Preview
(It is recommended to update the screenshot to reflect the new UI features like the Home button, layer control, and AI assistant panel.)

Features
Interactive Map Interface: A modern, pannable, and zoomable map powered by Leaflet.js.

AI-Powered Travel Assistant: Utilizes the Gemini API to generate travel tips, including business etiquette, local customs, and restaurant recommendations for the selected office's city. This feature is modular and can be toggled.

Marker Clustering: Offices in close proximity are grouped into a single cluster, enhancing readability in dense regions.

Filter by Country: An intuitive dropdown menu to filter offices by country, with an animated flyToBounds transition to the selected region.

Find Nearest Office: Uses the browser's Geolocation API to find and focus on the office closest to the user's current location.

Map Controls:

Layer Control: Allows switching between "Street Map" and "Satellite View".

Reset View (Home) Button: A convenient button to reset the map view to show all offices.

Clickable Contact Info: The sidebar displays office details with a clickable phone number (tel: link) and a "Get Directions" link that opens Google Maps.

Custom Icons: Uses the Acibadem logo for a consistent and branded look on all markers.

Technologies Used
HTML5 & CSS3

JavaScript (ES6)

Leaflet.js: The leading open-source JavaScript library for interactive maps.

Leaflet.markercluster: A plugin for Leaflet to cluster markers.

Gemini API: For generating AI-powered travel recommendations.

Configuration
The application includes modular feature flags at the top of the <script> tag in office_map.html:

USE_SIDEBAR: Set to 1 to use the sidebar for office details, or 0 to use classic popups.

USE_AI_ASSISTANT: Set to 1 to enable the "Get AI Travel Tips" feature. Requires USE_SIDEBAR to be active.

Installation and Usage
This project consists of a single, self-contained HTML file that requires no server or special installation.

Clone the repository to your local machine:

git clone [https://github.com/serhanco/LocationsOnMap.git](https://github.com/serhanco/LocationsOnMap.git)

Navigate to the project folder.

Open the office_map.html file in any modern web browser.

Data Source
Office locations and details are statically stored in the officeList JavaScript array within the office_map.html file to ensure maximum compatibility and avoid potential CORS issues when running locally.
