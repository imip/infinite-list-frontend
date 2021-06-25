import React from "react";

const initialValue = {
    basketItems: {},
    manageBasketItems: () => {},
    submit: () => {},
    showBanner: () => {},
    bannerIsShown: true,
};
export const BasketContext = React.createContext(initialValue);
