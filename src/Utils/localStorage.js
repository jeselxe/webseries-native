import store from 'react-native-simple-store';

export default {
    save: (key, value) => {
        return store.save(key, value);
    },
    get: (key) => {
        return store.get(key);
    },
    delete: (key) => {
        return store.delete(key);
    },
};
