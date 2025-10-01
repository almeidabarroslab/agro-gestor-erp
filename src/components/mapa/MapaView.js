import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapaView = ({ plantacoes }) => {
  const mapCenter = [-15.7801, -47.9292]; // Centro do Brasil

  const converterParaGeoJSON = (areaGeo) => {
    if (!areaGeo || !Array.isArray(areaGeo)) return null;
    const coordinates = areaGeo.map(p => [p.longitude, p.latitude]);
    return {
      type: "Polygon",
      coordinates: [coordinates],
    };
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Mapa da Fazenda</h2>
      <div className="bg-white rounded-xl shadow-lg p-4">
        <MapContainer center={mapCenter} zoom={4} style={{ height: '70vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {plantacoes.map(p => {
            const geoJsonData = converterParaGeoJSON(p.areaGeo);
            if (geoJsonData) {
              return (
                <GeoJSON key={p.id} data={geoJsonData}>
                  <Popup>
                    <h3 className="font-bold">{p.nome}</h3>
                    <p>Cultura: {p.cultura}</p>
                    <p>Área: {p.areaHa} Ha</p>
                    <p>Status: {p.status}</p>
                  </Popup>
                </GeoJSON>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaView;