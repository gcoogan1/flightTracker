import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ScreenProvider, useScreen } from './state/ScreenContext';
import { FlightProvider } from './state/FlightContext';
import FlightSearchForm from './components/Form';
import Result from './components/Result';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ScreenProvider>
        <FlightProvider>
          <MainScreen />
        </FlightProvider>
      </ScreenProvider>
    </QueryClientProvider>
  );
};

const MainScreen = () => {
  const { screen } = useScreen();

  return screen === 'form' ? <FlightSearchForm /> : <Result />;
};

export default App;
