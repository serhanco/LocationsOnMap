/**
 * MAIN APPLICATION LOGIC
 * Handles map initialization, events, and UI interactions.
 */

(function () {
    'use strict';

    // --- SETTINGS ---
    const USE_SIDEBAR = 1;
    const USE_AI_ASSISTANT = 0;
    const TOOLTIP_ZOOM_THRESHOLD = 7;

    // --- GLOBAL VARIABLES (Scoped to IIFE) ---
    let allOffices = [];
    let map;
    let markers;
    let customIcon;

    // --- DOM ELEMENTS ---
    const mapElement = document.getElementById('map');
    const countryFilter = document.getElementById('country-filter');
    const findNearestBtn = document.getElementById('find-nearest-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarContent = document.getElementById('sidebar-content');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');

    // --- MAIN FUNCTION ---
    function initializeApp() {
        try {
            // officeList and getCityCoordinates are defined in data.js (global scope)
            if (typeof officeList === 'undefined' || typeof getCityCoordinates === 'undefined') {
                throw new Error('Data source not found. Make sure data.js is loaded.');
            }

            allOffices = officeList.map(office => ({ ...office, ...getCityCoordinates(office.name, office.country) }));
            setupMap();
            setupFilters();
            setupEventListeners();
            displayMarkers(allOffices);
            if (markers.getLayers().length > 0) {
                map.fitBounds(markers.getBounds(), { padding: [50, 50] });
            }
        } catch (error) {
            console.error('Application failed to initialize:', error);
            if (mapElement) mapElement.innerHTML = 'Could not load the map. Please try again later.';
        }
    }

    // --- SETUP FUNCTIONS ---
    function setupMap() {
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri'
        });
        const baseMaps = { "Street Map": osmLayer, "Satellite View": satelliteLayer };

        map = L.map('map', { layers: [osmLayer] });
        L.control.layers(baseMaps).addTo(map);

        customIcon = L.divIcon({
            className: 'custom-div-icon', html: `<img src="https://www.acibadem.com.tr/assets/images/acibadem-saglik-grubu-76x76.png">`,
            iconSize: [38, 38], iconAnchor: [19, 38], popupAnchor: [0, -38]
        });

        markers = L.markerClusterGroup();

        L.Control.Home = L.Control.extend({
            onAdd: function (map) {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                const btn = L.DomUtil.create('a', 'leaflet-control-home', container);
                btn.title = 'Show All Offices';
                btn.href = '#';
                btn.setAttribute('role', 'button');

                L.DomEvent.on(btn, 'click', L.DomEvent.stop).on(btn, 'click', function (ev) {
                    countryFilter.value = 'All Countries';
                    if (markers.getLayers().length > 0) {
                        map.flyToBounds(markers.getBounds(), { padding: [50, 50], duration: 1 });
                    }
                }, this);

                return container;
            },
        });
        L.control.home = function (opts) { return new L.Control.Home(opts); }
        L.control.home({ position: 'topleft' }).addTo(map);

        // Initialize lastZoom
        let lastZoom = map.getZoom();

        map.on('zoomend', function () {
            const currentZoom = map.getZoom();

            // Zoom-out detected
            if (currentZoom < lastZoom) {
                // 1. Close Sidebar
                sidebar.classList.remove('open');

                // 2. Reset Filter if active
                if (countryFilter.value !== 'All Countries') {
                    countryFilter.value = 'All Countries';
                    // Show all markers but DO NOT flyTo/change bounds
                    displayMarkers(allOffices);
                }
            }

            if (currentZoom >= TOOLTIP_ZOOM_THRESHOLD) {
                map.getContainer().classList.add('show-tooltips');
            } else {
                map.getContainer().classList.remove('show-tooltips');
            }

            // Update lastZoom
            lastZoom = currentZoom;
        });
    }

    function setupFilters() {
        const uniqueCountries = [...new Set(allOffices.map(o => o.country))].sort();
        const countries = ['All Countries', ...uniqueCountries];
        countryFilter.innerHTML = '';
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countryFilter.appendChild(option);
        });
    }

    function setupEventListeners() {
        countryFilter.addEventListener('change', () => {
            const selected = countryFilter.value;
            const filtered = selected === 'All Countries' ? allOffices : allOffices.filter(o => o.country === selected);
            displayMarkers(filtered);
            if (markers.getLayers().length > 0) {
                map.flyToBounds(markers.getBounds(), { padding: [50, 50], duration: 1 });
            }
        });
        findNearestBtn.addEventListener('click', findNearestOffice);
        closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('open'));
        map.on('click', () => sidebar.classList.remove('open'));
        sidebar.addEventListener('click', (e) => e.stopPropagation());
    }

    // --- FUNCTIONAL LOGIC ---
    function displayMarkers(officesToDisplay) {
        markers.clearLayers();
        const officesWithCoords = officesToDisplay.filter(o => o.lat && o.lng);

        officesWithCoords.forEach(office => {
            const marker = L.marker([office.lat, office.lng], { icon: customIcon });

            marker.bindTooltip(getShortOfficeName(office.name), {
                permanent: true,
                direction: 'bottom',
                offset: [0, 5],
                className: 'office-label'
            });

            if (USE_SIDEBAR) {
                marker.on('click', () => {
                    updateSidebar(office);
                    sidebar.classList.add('open');
                });
            } else {
                const cleanPhone = office.phone.replace(/[^0-9+]/g, '');
                const popupContent = `<b>${office.name}</b><br>Country: ${office.country}<br>Phone: <a href="tel:${cleanPhone}">${office.phone}</a>`;
                marker.bindPopup(popupContent);
            }
            markers.addLayer(marker);
        });
        map.addLayer(markers);
    }

    function findNearestOffice() {
        if (!navigator.geolocation) {
            alert('Your browser does not support geolocation.');
            return;
        }
        findNearestBtn.textContent = 'Searching for location...';
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            let nearestOffice = null;
            let minDistance = Infinity;

            allOffices.filter(o => o.lat && o.lng).forEach(office => {
                const distance = getDistance(latitude, longitude, office.lat, office.lng);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestOffice = office;
                }
            });

            if (nearestOffice) {
                map.flyTo([nearestOffice.lat, nearestOffice.lng], 13, { duration: 1.5 });
                if (USE_SIDEBAR) {
                    updateSidebar(nearestOffice);
                    sidebar.classList.add('open');
                } else {
                    alert(`The nearest office is: ${nearestOffice.name} (${minDistance.toFixed(1)} km)`);
                }
            }
            findNearestBtn.textContent = '📍 Find Nearest Office';
        }, () => {
            alert('Could not get location. Please check your browser permissions.');
            findNearestBtn.textContent = '📍 Find Nearest Office';
        });
    }

    function updateSidebar(office) {
        const cleanPhone = office.phone.replace(/[^0-9+]/g, '');
        let sidebarHTML = `
            <h2>${office.name}</h2>
            <p><strong>Country:</strong> ${office.country}</p>
            <p><strong>Phone:</strong> <a href="tel:${cleanPhone}">${office.phone}</a></p>
            <p><a href="https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}" target="_blank">Get Directions</a></p>
        `;

        if (USE_AI_ASSISTANT) {
            sidebarHTML += `
                <button id="ai-travel-btn" class="ai-button">✨ Get AI Travel Tips</button>
                <div id="ai-results"></div>
            `;
        }
        sidebarContent.innerHTML = sidebarHTML;
        if (USE_AI_ASSISTANT) {
            document.getElementById('ai-travel-btn').addEventListener('click', () => getTravelTips(office));
        }
    }

    async function getTravelTips(office) {
        const btn = document.getElementById('ai-travel-btn');
        const resultsDiv = document.getElementById('ai-results');
        btn.disabled = true;
        btn.textContent = 'Thinking...';
        resultsDiv.innerHTML = '<div class="loader"></div>';

        const city = getShortOfficeName(office.name);
        const country = office.country;

        const prompt = `You are a friendly and concise travel assistant. A business professional is visiting their company's office in ${city}, ${country}. Provide a short and helpful guide with the following sections:
- A brief, welcoming sentence about the city.
- Two essential business etiquette tips for ${country}.
- One recommendation for a good restaurant suitable for a business lunch near the city center.
Format the entire response using basic HTML tags like <h3>, <p>, and <ul><li>. Do not include <html> or <body> tags.`;

        try {
            const apiKey = "";
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { contents: [{ parts: [{ text: prompt }] }] };
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) { throw new Error(`API call failed with status: ${response.status}`); }
            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;
            resultsDiv.innerHTML = text;
        } catch (error) {
            console.error('Error fetching AI tips:', error);
            resultsDiv.innerHTML = '<p>Sorry, I could not fetch travel tips at the moment. Please try again later.</p>';
        } finally {
            btn.style.display = 'none';
        }
    }

    // --- HELPER FUNCTIONS ---
    function getShortOfficeName(fullName) {
        const city = fullName.split(',')[0].replace(/Acibadem Information Office/g, '').replace(/Acıbadem Information Office/g, '').replace(/Official Representative -/g, '').replace(/#/g, '').replace(/-/g, '').trim();
        if (city.includes('Sistina Hospital')) return 'Skopje';
        return city;
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // --- INITIALIZE APP ---
    document.addEventListener('DOMContentLoaded', initializeApp);

})();
