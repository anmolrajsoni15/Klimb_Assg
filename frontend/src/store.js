import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './Reducers/userReducer';
import { uploadReducer } from './Reducers/uploadReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        upload: uploadReducer
    }
});

export default store;