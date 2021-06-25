import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./list-item.module.scss";
import { BasketContext } from "../../../contexts";
import { HAMMER_DIRECTION } from "../../../constants";
import Hammer from "react-hammerjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const ListItem = props => {
    const basketContext = useContext(BasketContext);
    const [showTrash, setShowTrash] = useState(false);

    const onClick = () => {
        if (showTrash) {
            setShowTrash(false);
        } else {
            props.clickAction(props.item.id);
        }
    };

    const onSwipe = () => {
        if (basketContext.basketItems[props.item.id]) {
            setShowTrash(true);
        }
    };

    const onRemove = () => {
        props.removeAction(props.item.id);
        setShowTrash(false);
    };

    return (
        <>
            <div style={props.style} className={styles["list-item"]}>
                {showTrash && (
                    <div className={styles["item-button"]} onClick={onRemove}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                )}
                <Hammer direction={HAMMER_DIRECTION.right} onTap={onClick} onSwipe={onSwipe}>
                    <div className={styles["item-infos"]}>
                        <span className={styles["item-title"]}>{props.item.name}</span>
                        <span className={styles["item-description"]}>{props.item.description}</span>
                    </div>
                </Hammer>
                {basketContext.basketItems[props.item.id] ? (
                    <div className={styles.quantity}>x{basketContext.basketItems[props.item.id]}</div>
                ) : null}
            </div>
        </>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    clickAction: PropTypes.func.isRequired,
    removeAction: PropTypes.func.isRequired,
};
