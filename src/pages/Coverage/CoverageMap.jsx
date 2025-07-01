// src/pages/CoverageMap.jsx
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';

// Custom green map pin (optional)
const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
});

// move map view 
function FlyToDistrict({ coords }) {
  const map = useMap();

  if (coords) {
    map.flyTo(coords, 14, { duration: 1.5 });
  }

  return null;
}

// use this on the top map serviceCenters 

const CoverageMap = ({ serviceCenters }) => {
  const [searchText, setSearchText] = useState('');
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);


  const bangladeshCenter = [23.6850, 90.3563]; // Approx center of Bangladesh

  const handleSearch = (e) => {
    e.preventDefault();

    const district = serviceCenters.find((d) =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (district) {
      setActiveCoords([district.latitude, district.longitude]);
      setActiveDistrict(district.district);
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">📍 Bangladesh Coverage Map</h1>
      <div className="rounded-xl overflow-hidden shadow-lg h-[100vh]">
        <form
          onSubmit={handleSearch}
          className="absolute top-53 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-sm flex justify-center"
        >
          <input
            type="text"
            placeholder="Search district..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input px-4 py-2 border rounded-md outline-none w-full"
          />
        </form>

        <MapContainer center={bangladeshCenter} zoom={8} className="w-full h-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToDistrict coords={activeCoords}></FlyToDistrict>
          {/* now go to poop up  */}
          {
            serviceCenters.map((center, index) =>
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
                icon={pinIcon}>
                <Popup autoOpen={center.district === activeDistrict} >
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
