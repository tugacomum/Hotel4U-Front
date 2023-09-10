import "./App.css";
import Navbar from "./components/Navbar";
import Adminscreen from "./screens/Adminscreen";
import Bookingscreen from "./screens/Bookingscreen";
import Homescreen from "./screens/Homescreen";
import Landingcreen from "./screens/Landingcreen";
import Loginscreen from "./screens/Loginscreen";
import ProfileScreen from "./screens/ProfileScreen";
import Registerscreen from "./screens/Registerscreen";
import EditRoomscreen from './screens/EditRoomscreen';
import EditUsercreen from "./screens/EditUserscreen";
import EditHotelscreen from './screens/EditHotelscreen';
import EditBookingscreen from './screens/EditBookingscreen';
import Hotelscreen from './screens/HotelListScreen';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home/:id" element={<Homescreen />} />
        <Route path="/hotels" element={<Hotelscreen />} />
        <Route path="/book/:roomid/:fromDate/:toDate" element={<Bookingscreen />} />
        <Route path="/edituser/:id" element={<EditUsercreen />} />
        <Route path="/editroom/:id" element={<EditRoomscreen />} />
        <Route path="/edithotel/:id" element={<EditHotelscreen />} />
        <Route path="/editbooking/:id" element={<EditBookingscreen />} />
        <Route path="/register" element={<Registerscreen />} />
        <Route path="/login" element={<Loginscreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/admin" element={<Adminscreen />} />
        <Route path="/" element={<Landingcreen />} />
      </Routes>
    </div>
  );
}

export default App;
