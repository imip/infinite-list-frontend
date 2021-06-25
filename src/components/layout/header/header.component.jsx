import React from "react";
import PropTypes from "prop-types";
import styles from "./header.module.scss";

export const Header = props => {
    return <div className={styles.header}>{props.title}</div>;
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};
