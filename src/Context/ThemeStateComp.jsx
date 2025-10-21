import  { useState } from 'react';
import { themeContext } from './ThemeContext';

const ThemeStateComp = ({ children }) => {
    const [typeTheme, setTypeTheme] = useState("dark");

    return (
        <themeContext.Provider value={{ typeTheme, setTypeTheme }}>
            {children}
        </themeContext.Provider>
    );
};

export default ThemeStateComp;