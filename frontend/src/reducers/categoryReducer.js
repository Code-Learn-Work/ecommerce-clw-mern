import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_CREATE_RESET,
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,
} from '../constants/categoryConstants'

export const categoryListReducer = (state = {
    category: []
}, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return {
                loading: true, categorys: []
            }
        case CATEGORY_LIST_SUCCESS:
            return {
                loading: false,
                category: action.payload
            }
        case CATEGORY_LIST_FAIL:
            return {
                loading: false, error: action.payload
                }
        default:
            return state
    }
}

export const categoryDetailsReducer = (
    state = {
        category: {}
    },
    action
) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return {
                ...state, loading: true
            }
        case CATEGORY_DETAILS_SUCCESS:
            return {
                loading: false, category: action.payload
            }
        case CATEGORY_DETAILS_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return {
                loading: true
            }
        case CATEGORY_DELETE_SUCCESS:
            return {
                loading: false, success: true
            }
        case CATEGORY_DELETE_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return {
                loading: true
            }
        case CATEGORY_CREATE_SUCCESS:
            return {
                loading: false, success: true, category: action.payload
            }
        case CATEGORY_CREATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        case CATEGORY_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const categoryUpdateReducer = (state = {
    category: {}
}, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return {
                loading: true
            }
        case CATEGORY_UPDATE_SUCCESS:
            return {
                loading: false, success: true, category: action.payload
            }
        case CATEGORY_UPDATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        case CATEGORY_UPDATE_RESET:
            return {
                category: {}
            }
        default:
            return state
    }
}