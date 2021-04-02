
export default function shopReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_ORDER':
            return {
                ...state,
                order: action.data.order,
                page: 1
            }
        case 'CHANGE_SIZE':
            return {
                ...state,
                size: action.data.size,
                page: 1
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                page: action.data.page
            }
        case 'CHANGE_CATEGORY':
            return {
                ...state,
                category: action.data.category,
                page: 1,
                filter: 'svi',
                ids: '',
                idsSerializedArray: '',
                search: '',
                searchInput: ''
            }
        case 'CHANGE_FILTER':
            return {
                ...state,
                filter: action.data.filter,
                page: 1,
                ids: '',
                idsSerializedArray: '',
                search: '',
                category: ''
            }
        case 'CHANGE_IDS':
            return {
                ...state,
                ids: action.data.ids,
            }
        case 'CLICK_PRETRAGA':
            return {
                ...state,
                idsSerializedArray: getNormalizedIds(state.ids),
                page: 1,
                category: '',
                filter: 'svi',
            }
        case 'CHANGE_SEARCH':
            return {
                ...state,
                search: action.data.search,
            }
        case 'SEARCH_CLEAR':
            return {
                ...state,
                search: '',
            }
        case 'SEARCH_INPUT':
            return {
                ...state,
                searchInput: state.search,
                page: 1,
                category: '',
                filter: 'svi',
            }
        default:
            throw new Error();
    }
}

const getNormalizedIds = (value) => {
    return encodeURIComponent(JSON.stringify(
        value.replaceAll(',', '').split("\n")
    ))
}
