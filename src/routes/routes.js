import { Route, Routes, Navigate  } from 'react-router-dom';
import {Login} from "../containers/Login.jsx";
import { Items } from '../containers/Items.jsx';
export const Pages = () => (
  <Routes>
  <Route exact path="/" element={<Navigate replace to="/login" />} />

    <Route
      path="/login"
      element={<Login/>}
    />

<Route
      path="/items"
      element={ <Items/>}
    />
    </Routes>


)