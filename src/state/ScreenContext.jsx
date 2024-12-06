import { createContext, useContext, useState } from 'react';

const ScreenContext = createContext();

// eslint-disable-next-line react/prop-types
export const ScreenProvider = ({ children }) => {
  const [screen, setScreen] = useState('form'); // 'form' or 'result'

  const switchToForm = () => setScreen('form');
  const switchToResult = () => setScreen('result');

  return (
    <ScreenContext.Provider value={{ screen, switchToForm, switchToResult }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => useContext(ScreenContext);
