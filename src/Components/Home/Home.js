import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const SetViewToBounds = () => {
    const map = useMap();
    map.setMaxBounds([[-90, -180], [90, 180]]);
    return null;
};
const WorldMap = () => {
    const [geoJson, setGeoJson] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch GeoJSON data
        fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
            .then(response => response.json())
            .then(data => setGeoJson(data));
    }, []);
 
    const onEachCountry = (country, layer) => {
        const countryName = country.properties.name;
        layer.bindTooltip(countryName);
        layer.on('click', () => {
            navigate(`/main/location/${countryName}`);
        })
       
    };
    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            minZoom={3}
            maxBounds={[[-90, -180], [90, 180]]}
            maxBoundsViscosity={1.0}  // Locks the view to the specified bounds
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                noWrap={true}
            />
            {geoJson && <GeoJSON data={geoJson} onEachFeature={onEachCountry}  style={{ fillColor: 'transparent', weight: 0 }} />}
            <SetViewToBounds />
        </MapContainer>
    );
}; 
export default WorldMap;