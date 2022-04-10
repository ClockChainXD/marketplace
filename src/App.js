import logo from './logo.svg';
import './App.css';
import {Layout} from './components/Layouts/Layout';
import { BrowserRouter  } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Pages } from './routes/routes';

function App() {


  return (
    <div className="App">
   <Layout>
   <BrowserRouter>
          <Pages />
        </BrowserRouter>
        </Layout>
    </div>

  );
}

export default App;
