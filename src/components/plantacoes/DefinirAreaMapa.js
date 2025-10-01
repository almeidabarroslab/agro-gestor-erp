import React, { useMemo } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import area from '@turf/area';
import centerOfMass from '@turf/center-of-mass';

// Workaround for a known issue with leaflet-draw icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DefinirAreaMapa = ({ onAreaDefined, onAreaCalculated, areaInicial }) => {

  const onFeatureGroupReady = (reactFGref) => {
    if (reactFGref && areaInicial) {
      const leafletGeoJSON = new L.GeoJSON(areaInicial);
      const leafletFG = reactFGref;
      leafletGeoJSON.eachLayer((layer) => {
        leafletFG.addLayer(layer);
      });
    }
  };

  const handleCreate = (e) => {
    const { layer } = e;
    const geojson = layer.toGeoJSON();
    onAreaDefined(geojson);

    const areaEmMetros = area(geojson);
    const areaEmHa = areaEmMetros / 10000;
    onAreaCalculated(areaEmHa.toFixed(2));
  };

  const handleEdit = (e) => {
    e.layers.eachLayer(layer => {
      const geojson = layer.toGeoJSON();
      onAreaDefined(geojson);
      const areaEmMetros = area(geojson);
      const areaEmHa = areaEmMetros / 10000;
      onAreaCalculated(areaEmHa.toFixed(2));
    });
  };

  const mapCenter = useMemo(() => {
    if (areaInicial) {
      const center = centerOfMass(areaInicial);
      return [center.geometry.coordinates[1], center.geometry.coordinates[0]];
    }
    return [-15.7801, -47.9292]; // Centro do Brasil
  }, [areaInicial]);

  const mapZoom = areaInicial ? 15 : 4;

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-2">Definir Área no Mapa</h3>
      <p className="text-sm text-gray-500 mb-4">Use a ferramenta de polígono para desenhar ou editar a área da sua plantação. A área em Hectares será calculada automaticamente.</p>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FeatureGroup ref={onFeatureGroupReady}>
          <EditControl
            position="topright"
            onCreated={handleCreate}
            onEdited={handleEdit}
            onDeleted={() => onAreaDefined(null)}
            draw={{
              rectangle: false, circle: false, circlemarker: false, marker: false, polyline: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default DefinirAreaMapa;