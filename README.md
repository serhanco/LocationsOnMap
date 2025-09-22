# Acibadem Information Offices Map

This project is a web application that displays Acibadem's worldwide information offices on an interactive map. It allows users to filter offices by country and view offices in dense areas as clusters.


## Features

- **Interactive Map Interface:** A modern, pannable, and zoomable map.
- **Custom Icons:** Uses the Acibadem logo instead of standard map pins.
- **Marker Clustering:** When zoomed out, nearby offices are grouped into a single cluster with a number, which significantly improves readability.
- **Filter by Country:** Selecting a country from the dropdown menu automatically zooms the map to show the offices in that specific country.
- **Clickable Contact Information:** The phone numbers in the pop-up for each office are clickable, allowing users to initiate a call directly from mobile devices.
- **Minimalist Map Style:** Uses a clean and professional CARTO Positron basemap to keep the focus on the data.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **[Leaflet.js](https://leafletjs.com/):** The leading open-source JavaScript library for interactive maps.
- **[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster):** A plugin for Leaflet to cluster markers.
- **[CARTO](https://carto.com/):** Service provider for the map basemap (tile layer).

## Installation and Usage

This project consists of a single HTML file that requires no server or special installation.

1.  Clone the repository to your local machine:
    ```bash
    git clone [https://github.com/serhanco/LocationsOnMap](https://github.com/serhanco/LocationsOnMap.git)
    ```
2.  Navigate to the project folder.
3.  Open the `index.html` file in any modern web browser (Google Chrome, Firefox, etc.).

## Data Source

Office locations, phone numbers, and other information are statically stored in a JavaScript array named `officeList` within the `index.html` file. The coordinates are approximate and based on city centers.
