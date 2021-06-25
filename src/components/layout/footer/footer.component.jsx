import React, { useContext } from "react";
import { BasketContext } from "../../../contexts";
import styles from "./footer.module.scss";

export const Footer = () => {
    const basketContext = useContext(BasketContext);

    const quantity = Object.values(basketContext.basketItems).reduce((curr, prev) => curr + prev);

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
