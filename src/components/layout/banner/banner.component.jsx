import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./banner.module.scss";
import { BannerContext } from "../../../contexts";

export const Banner = props => {
    const bannerContext = useContext(BannerContext);

    return (
        <div className={!bannerContext.bannerIsShown ? `${styles.banner} ${styles.hidden}` : styles.banner}>
            <img width={"100%"} alt="landscape" src={props.src}></img>
        </div>
    );
};

Banner.propTypes = {
    src: PropTypes.string.isRequired,
};
