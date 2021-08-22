import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});
    const coordinates = searchResults.map((result) => ({
        latitude: result.lat,
        longitude: result.long,
    }));

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/neigher-meister/cksj7emfd74pi17nx1gy7f4zi"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((res, i) => (
                <div key={i}>
                    <Marker
                        longitude={res.long}
                        latitude={res.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            role="img"
                            onClick={() => setSelectedLocation(res)}
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin"
                        >
                            📍
                        </p>
                    </Marker>
                    {selectedLocation.long === res.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={res.lat}
                            longitude={res.long}
                        >
                            {res.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
