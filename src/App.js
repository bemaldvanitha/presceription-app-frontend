import { Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/signup/SignupScreen";
import AdminRoute from "./components/routing/AdminRoute";
import HomeScreen from "./screens/home/HomeScreen";
import AnalysisScreen from "./screens/analysis/AnalysisScreen";

import store from "./store";

import './App.css';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Routes>
                <Route path={'/login'} element={<LoginScreen/>}/>
                <Route path={'/signup'} element={<SignupScreen/>}/>
                <Route path={''} element={<AdminRoute/>}>
                    <Route path={'/'} element={<HomeScreen/>}/>
                    <Route path={'/analysis'} element={<AnalysisScreen/>}/>
                </Route>
            </Routes>
        </Provider>
    </div>
  );
}

export default App;
