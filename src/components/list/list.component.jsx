import React, { useContext, useState, useEffect, useCallback } from "react";
import { BasketContext, BannerContext } from "../../contexts";
import { List as VirtualizedList, AutoSizer } from "react-virtualized";
import { getItems } from "../../services";
import { ListItem } from "./list-item/list-item.component";
import styles from "./list.module.scss";

// Pas besoin de render le composant, on peut mettre ces variables ici
let currentPage = 1;
let isLoading = false;
export const List = () => {
    const basketContext = useContext(BasketContext);
    const bannerContext = useContext(BannerContext);
    const [data, setData] = useState([]);

    // Instanciation à ce niveau et pas en dessous sinon chaque item instanciera son clickAction...
    const clickAction = useCallback(
        itemId => {
            basketContext.manageBasketItems({ type: "add", payload: { item: itemId } });
        },
        [basketContext]
    );

    const removeAction = useCallback(
        itemId => {
            basketContext.manageBasketItems({ type: "remove", payload: { item: itemId } });
        },
        [basketContext]
    );

    const fetchData = () => {
        isLoading = true;
        getItems(currentPage).then(items => {
            currentPage++;
            setData([...data, ...items]);
            isLoading = false;
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const rowRenderer = ({ index, key, style }) => {
        return (
            <ListItem
                key={key}
                style={style}
                item={data[index]}
                removeAction={removeAction}
                clickAction={clickAction}
            />
        );
    };

    const scrollChanged = e => {
        // On masque l'image au scroll
        if (e.scrollTop >= 1) {
            bannerContext.showBanner(false);
        } else {
            bannerContext.showBanner(true);
        }

        if (e.scrollHeight - e.clientHeight <= e.scrollTop + 100) {
            // Il est demandé de faire l'infinite scroll manuellement
            // Sinon, on a InfiniteLoader proposé par react-virtualized
            // Chargement des données à 100px de la fin (i.e: 2 items de la fin)
            if (!isLoading) {
                fetchData();
            }
        }
    };

    if (data.length) {
        return (
            <div className={styles.container}>
                <AutoSizer>
                    {({ width, height }) => {
                        return (
                            <div style={{ height, width }} onScroll={scrollChanged}>
                                <VirtualizedList
                                    onScroll={scrollChanged}
                                    className={styles.list}
                                    height={height}
                                    rowCount={data.length}
                                    rowHeight={50}
                                    rowRenderer={rowRenderer}
                                    width={width}
                                />
                            </div>
                        );
                    }}
                </AutoSizer>
            </div>
        );
    }
    return null;
};
