import React, { useReducer, useState } from "react";
import { Header, Footer, Banner } from "./components/layout";
import { BasketContext, BannerContext } from "./contexts";
import { List } from "./components/list";
import styles from "./app.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reducer = (state, action) => {
    const key = action.payload?.item;
    switch (action.type) {
        case "add":
            return { ...state, [key]: state[key] + 1 || 1 };
        case "clear":
            return {};
        case "remove":
            delete state[key];
            return { ...state };
        default:
            throw new Error("Not recognized action");
    }
};

export const App = () => {
    const [basketItems, manageBasketItems] = useReducer(reducer, {});
    const [bannerIsShown, setBannerIsShown] = useState(false);

    const submit = () => {
        toast.success("Votre panier a bien été validé");
        manageBasketItems({ type: "clear" });
    };

    const showBanner = value => {
        setBannerIsShown(value);
    };

    const bannerContextValue = {
        showBanner,
        bannerIsShown,
    };

    const basketValue = {
        basketItems,
        manageBasketItems,
        submit,
    };

    return (
        <div className={styles.container}>
            <Header title={"Infinite list ❤"} />
            <BannerContext.Provider value={bannerContextValue}>
                <Banner src="https://blog.flickr.net/wp-content/uploads/sites/2/2017/11/10285894466_b72616f2c1_b.jpg" />
                <BasketContext.Provider value={basketValue}>
                    <List />
                    {Object.keys(basketItems).length > 0 && <Footer />}
                </BasketContext.Provider>
            </BannerContext.Provider>
            <ToastContainer
                className={styles.toaster}
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
            />
        </div>
    );
};
