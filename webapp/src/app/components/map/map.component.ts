import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  
  map: any;
  markers: any[] = []; // Array to store your markers

  constructor() { }

  ngOnInit(): void {
    this.initMap();
    this.addMarkers();
  }

  initMap() {
    this.map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  addMarkers() {
    const locationData = [
      { lat: 20.5937, lng: 78.9629, users: 100 },
      // Add more locations and user data here
    ];

    locationData.forEach(location => {
      const marker = L.circleMarker([location.lat, location.lng], {
        radius: location.users / 10,
      });
      marker.addTo(this.map);
      this.markers.push(marker);
    });
    const markerCluster = new (L as any).MarkerClusterGroup();
    markerCluster.addLayers(this.markers);
    this.map.addLayer(markerCluster);
  }
}
