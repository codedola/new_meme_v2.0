import "./App.scss";
import React, { useEffect } from "react";
import ROUTERS from "./routers";
import Notification from "./components/Shared/Notification";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { actFetchCategoriesAsync } from "./store/category/actions";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actFetchCategoriesAsync());
    }, [dispatch]);

    return (
        <div className='container-app'>
            <Header />
            <Switch>
                {ROUTERS &&
                    ROUTERS.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                            >
                                <route.Component />
                            </Route>
                        );
                    })}
            </Switch>

            <Footer />
            <Notification />
        </div>
    );
}

export default App;
