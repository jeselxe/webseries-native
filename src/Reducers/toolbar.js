
const initialState = {
  icon: 'menu',
  onPress: null,
  title: '',
};

export default function toolbar(state=initialState, action) {
    switch (action.type) {
        case 'NEW_TOOLBAR_ICON':
            return {
                ...state,
                icon: action.icon,
            };
        case 'NEW_TOOLBAR_ACTION':
            return {
                ...state,
                onPress: action.onPress,
            };
        case 'NEW_TOOLBAR':
            return {
                icon: action.icon,
                onPress: action.onPress,
                title: action.title,
            };
        default:
            return state;
    }
}
