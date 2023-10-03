import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import RoomTypes from '../Pages/room/RoomTypes';
import AllRooms from '../Pages/room/AllRooms';
import ReservedRooms from '../Pages/room/ReservedRooms';
import AllReservations from '../Pages/reservation/AllReservations';
import OccupationHistory from '../Pages/occupancy/OccupationHistory';
import OccupiedRooms from '../Pages/occupancy/OccupiedRooms';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard/>} />
          <Route path="room-types" element={<RoomTypes />} />
          <Route path="rooms" element={<AllRooms />} />
          <Route path="reserved-rooms" element={<ReservedRooms />} />
          <Route path="reservations" element={<AllReservations />} />
          <Route path="occupation-history" element={<OccupationHistory />} />
          <Route path="occupied-rooms" element={<OccupiedRooms />} />
        </Route>
    </Routes>
  );
};

export default AppContent;
