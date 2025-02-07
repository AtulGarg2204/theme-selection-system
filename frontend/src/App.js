// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, CssBaseline } from '@mui/material';
import ThemeSelector from './components/ThemeSelector';
import VendorDashboard from './components/VendorDashboard';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Theme Selection
          </Button>
          <Button color="inherit" component={Link} to="/vendor">
            Vendor Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<ThemeSelector />} />
          <Route path="/vendor" element={<VendorDashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;