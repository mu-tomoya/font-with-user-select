import { SettingProvider } from "./components/SettingContext";
import SideMenu from "./components/SideMenu";
import MainPage from "./components/MainPage";

function App() {
  return (
    <SettingProvider>
      <SideMenu />
      <MainPage />
    </SettingProvider>
  );
}

export default App;
