import { AppLayout } from "./components/layout/AppLayout";
import { TabRenderer } from './components/TabRenderer';

function App() {
  return (
    <AppLayout 
      renderTabContent={() => <TabRenderer />}
    />
  );
}

export default App;
