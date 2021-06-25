import React, { useContext } from "react";
import { BasketContext } from "../../../contexts";
import { quantityReducer } from "../../../reducers";
import styles from "./footer.module.scss";

export const Footer = () => {
    const basketContext = useContext(BasketContext);

    const quantity = Object.values(basketContext.basketItems).reduce(quantityReducer);

    return (
        <div onClick={basketContext.submit} className={styles.footer}>
            <div className={styles.title}>Valider</div>
            {quantity && (
                <div className={styles.subtitle}>
                    Vous avez {quantity} élément{quantity > 1 && "s"} dans votre panier
                </div>
            )}
        </div>
    );
};
