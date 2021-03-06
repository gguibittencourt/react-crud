import {Dispatch} from 'redux';
import {get, post, put, remove} from '../services/user.service';
import {User} from '../reducers/user.reducer';
import {closeModal} from './modal.action';
import history from '../helpers/history';

export enum UsersActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    GET_USER = 'GET_USER',
    ADD_USER = 'ADD_USER',
    UPDATE_USER = 'UPDATE_USER',
    DELETE_USER = 'DELETE_USER',
    HANDLE_ON_CHANGE = 'HANDLE_ON_CHANGE'
}

const handleFetchUsersSuccess = (dispatch: Dispatch, response: User[]) => {
    dispatch({
        type: UsersActionTypes.FETCH_USERS,
        payload: response
    });
};

export const fetchUsers = (): any => {
    return (dispatch: Dispatch) => {
        return get('/users').then(
            response => handleFetchUsersSuccess(dispatch, response.data),
        );
    }
};

const handleAddUsersSuccess = (dispatch: Dispatch, response: User[]) => {
    dispatch({
        type: UsersActionTypes.ADD_USER,
        payload: response
    });
};

export const addUser = (user: User): any => {
    return (dispatch: Dispatch) => {
        return post('/users', user).then(
            response => {
                handleAddUsersSuccess(dispatch, response.data);
                history.back();
            }
        );
    }
};

const handleOnChangeProps = (props: string, value: any) => {
    return {
        type: UsersActionTypes.HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
};

export const onChangeProps = (props: any, value: any): any => {
    return (dispatch: Dispatch) => {
        dispatch(handleOnChangeProps(props, value));
    }
}

const handleDeleteUsersSuccess = (dispatch: Dispatch, id: string) => {
    dispatch({
        type: UsersActionTypes.DELETE_USER,
        id
    });
};

export const deleteUser = (id: string): any => {
    return (dispatch: Dispatch) => {
        return remove(`/users/${id}`).then(() => {
            handleDeleteUsersSuccess(dispatch, id);
            dispatch(closeModal());
        });
    }
};

const handleGetUserSuccess = (dispatch: Dispatch, user: any) => {
    dispatch({
        type: UsersActionTypes.GET_USER,
        payload: user
    });
};

export const getUser = (id: string): any => {
    return (dispatch: Dispatch) => {
        return get(`/users/${id}`).then((user) => {
            handleGetUserSuccess(dispatch, user.data);
        });
    }
};

const handleUpdateUsersSuccess = (dispatch: Dispatch, response: User) => {
    dispatch({
        type: UsersActionTypes.UPDATE_USER,
        payload: response
    });
};

export const updateUser = (user: User): any => {
    return (dispatch: Dispatch) => {
        return put(`/users/${user.id}`, user).then(
            response => {
                handleUpdateUsersSuccess(dispatch, response.data);
                fetchUsers();
                history.back();
            }
        );
    }
};