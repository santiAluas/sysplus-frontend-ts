import React, { useState } from 'react';
import './App.css';
import Index from './pages/Index'; // Importar Index sin llaves porque es un export default
import { AuthProvider } from './Context/AuthContext';

function App() {
    return (
        <div className="App" >
            <AuthProvider>
                <Index />
            </AuthProvider>
        </div>
    );
}

export default App;
