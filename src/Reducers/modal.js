const initialState = {
  open: false,
  component: null,
  title: '',
  data: null,
};

export default function series(state=initialState, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                open: true,
                component: action.component,
                title: action.title,
                data: action.data,
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
