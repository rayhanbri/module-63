// src/pages/CoverageMap.jsx
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom green map pin (optional)
const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
});

const CoverageMap = ({serviceCenters}) => {
  const bangladeshCenter = [23.6850, 90.3563]; // Approx center of Bangladesh

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">📍 Bangladesh Coverage Map</h1>

      <div className="rounded-xl overflow-hidden shadow-lg h-[80vh]">
        <MapContainer center={bangladeshCenter} zoom={7} className="w-full h-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            serviceCenters.map((center,index) => 
            <Marker 
            key={index}
            position={[center.latitude,center.longitude]} 
            icon={pinIcon}>
            <Popup>
              <strong>{center.district}</strong>
              <p>{center.covered_area.join(',')}</p>
            </Popup>
          </Marker>
          )
          }

         
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;
