
const initialState = {
    order: "Naziv",
    page: 1,
    size: 15,
    category: '',
    filter: 'svi',
    ids: '',
    idsSerializedArray: '',
    search: '',
    searchInput: ''
}

function updateInitialFromUrl(location) {
    const params = ["size", "page", "filter", "ids", "search", "category", "order"]

    params.forEach(param => {
        const urlParam = new URLSearchParams(location.search).get(param)
        if (!urlParam || urlParam === "null" || urlParam === "0") return

        switch (param) {
            case "size":
            case "page":
                initialState[param] = Number(urlParam)
                break;
            case "ids":
                if (urlParam) {
                    initialState["idsSerializedArray"] = urlParam
                    initialState["ids"] = JSON.parse(urlParam).join("\n")
                }
                break;
            default:
                initialState[param] = urlParam
                break;
        }
    })
}

function getInitialState(location) {
    updateInitialFromUrl(location)
    return initialState
}

export default getInitialState
