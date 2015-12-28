const initialState = {
  open: false,
  component: null,
};

export default function series(state=initialState, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                open: true,
                component: action.component,
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                open: false,
                component: null,
            };
        default:
            return state;
    }
}
