import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

//   map!:L.Map;

//   ngAfterViewInit(): void {
//     this.loadMap();
//   }
// loadMap() {
//     const iconDefault = L.icon({
//         iconUrl: 'assets/marker-icon.png',
//         shadowUrl: '',
//         iconSize: [25, 41],
//         iconAnchor: [12, 41]
//     });
//     L.Marker.prototype.options.icon = iconDefault;
//     this.map = L.map('map').setView([11.0168, 76.9558], 14);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: 'OpenStreetMap'
//     }).addTo(this.map);

//     // Now try to update to user location
//     navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         this.map.setView([latitude, longitude], 14);
        
//         L.marker([latitude, longitude]).addTo(this.map).bindPopup("Your Location");
        
//         // Add your mechanic markers here...
//     }, (err) => {
//         console.error("Location access denied or unavailable", err);
//     });
// }
//   // loadMap(){

//   //   navigator.geolocation.getCurrentPosition((position)=>{

//   //     const lat = position.coords.latitude;
//   //     const lng = position.coords.longitude;

//   //     this.map = L.map('map').setView([lat,lng],14);

//   //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//   //       attribution:'OpenStreetMap'
//   //     }).addTo(this.map);

//   //     // Customer Marker
//   //     L.marker([lat,lng])
//   //     .addTo(this.map)
//   //     .bindPopup("Your Location");

//   //     // Mechanic 1
//   //     L.marker([lat+0.005,lng+0.005])
//   //     .addTo(this.map)
//   //     .bindPopup(`
//   //     <b>ABC Mechanic</b><br>
//   //     Phone : 9876543210<br>
//   //     ₹20 / KM <br><br>
//   //     <button onclick="alert('Book Button Clicked')">
//   //     Book
//   //     </button>
//   //     `);

//   //     // Mechanic 2
//   //     L.marker([lat-0.003,lng+0.004])
//   //     .addTo(this.map)
//   //     .bindPopup(`
//   //     <b>XYZ Mechanic</b><br>
//   //     Phone : 9999999999<br>
//   //     ₹25 / KM
//   //     `);

//   //   });

//   // }

// }
map!: L.Map;
  userLat!: number;
  userLng!: number;
  routingControl: any = null; // Holds the route line

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    const iconDefault = L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
    
    this.map = L.map('map').setView([11.0168, 76.9558], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);

    // 1. Get automatic current location
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLat = position.coords.latitude;
      this.userLng = position.coords.longitude;
      
      // Center map on user and drop a marker
      this.map.setView([this.userLat, this.userLng], 14);
      L.marker([this.userLat, this.userLng]).addTo(this.map).bindPopup("You are Here").openPopup();
    }, (err) => {
      console.error("Location access denied", err);
    });
  }

  // 2. Triggered when user clicks 'Go'
  findRoute(destination: string) {
    if (!destination || !this.userLat) {
      alert("Please ensure your location has loaded and you entered a destination.");
      return;
    }

    // Use free OpenStreetMap Nominatim API to convert text to coordinates
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          // Extract the first result's coordinates
          const destLat = parseFloat(data[0].lat);
          const destLng = parseFloat(data[0].lon);

          this.drawRoute(destLat, destLng);
        } else {
          alert("Destination not found on the map!");
        }
      })
      .catch(err => console.error("Geocoding failed", err));
  }

  // 3. Draw the actual road route
  drawRoute(destLat: number, destLng: number) {
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    // 1. Define the small bike icon for the starting point
    const bikeIcon = L.icon({
      iconUrl: 'assets/bike.png', // MUST be relative, and match the exact extension!
      iconSize: [30, 40], 
      iconAnchor: [17, 17], 
    });

    // 2. Define the slightly larger red marker for the destination
    const destIcon = L.icon({
      iconUrl: 'assets/desg.png', // The path you provided
      iconSize: [45, 50], // Slightly larger size
      iconAnchor: [22, 50], // Anchor at the bottom tip of the marker
    });

    // @ts-ignore
    this.routingControl = L.Routing.control({
      waypoints: [
        L.latLng(this.userLat, this.userLng), 
        L.latLng(destLat, destLng)            
      ],
      routeWhileDragging: false,
      addWaypoints: false, 
      showAlternatives: false,
      fitSelectedRoutes: true,
      show: false,
      
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.7, weight: 6 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },

      // NEW: Tell the routing machine to use your custom markers
      createMarker: function(i: number, waypoint: any, n: number) {
        // 'i' is the index. 0 is the start, 1 is the destination.
        const customIcon = (i === 0) ? bikeIcon : destIcon;
        
        return L.marker(waypoint.latLng, {
          icon: customIcon
        });
      }

    }).addTo(this.map);
  }
}