import React, { useRef, useCallback, useState, useEffect } from "react";
import { useGeolocateControl, useNavigationControl, useMap, useGenerateUserMarker } from "../hooks/MapHooks";
import { useSocket } from "../hooks/Sockethook";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const API_KEY = "k6U5mW2FpsveK6wUbEU7TZw7BctFVfZoKDPKcGhx";

function Mapfile({ userId, familyId }) {
    const { isLoggedIn, userFamily } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    const mapContainer = useRef(null);
    
    const [usersData, setUsersData] = useState([]);

    const map = useMap(mapContainer);
    useNavigationControl(map);
    // useGeolocateControl(map);
    useSocket(setUsersData, userId, familyId);
    useGenerateUserMarker(map, "#693ff2", usersData, userFamily);

    return (
        <div className="w-screen h-screen overflow-hidden relative">
            <div ref={mapContainer} className="w-full h-full" />
        </div>
    );
}

export default Mapfile;
