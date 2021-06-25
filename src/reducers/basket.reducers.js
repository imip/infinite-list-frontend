import { ACTION } from "../constants";
export const basketReducer = (state, action) => {
    const key = action.payload?.item;
    switch (action.type) {
        case ACTION.add:
            return { ...state, [key]: state[key] + 1 || 1 };
        case ACTION.clear:
            return {};
        case ACTION.remove:
            delete state[key];
            return { ...state };
        default:
            throw new Error("Not recognized action");
    }
};

export const quantityReducer = (curr, prev) => curr + prev;
