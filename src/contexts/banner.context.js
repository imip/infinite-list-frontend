import React from "react";

const initialValue = {
    showBanner: () => {},
    bannerIsShown: true,
};
export const BannerContext = React.createContext(initialValue);
