export const environment = {
    api: {
        host: "http://localhost",
        port: "8082",
    },
}

export const GEO_API = {
    GATEWAY_URL: "http://192.168.1.201:29080/geoserver/",
    VIETNAME: {
        GET_TRAIN_STATIONS: 'jungdo/ows?service=WFS&' +
            'version=1.0.0&request=GetFeature&typeName=jungdo%3Avn_train_stations&' +
            'maxFeatures=50&outputFormat=application/json'
    }
}

export const API = {
    GATEWAY_URL: "http://192.168.1.201:29082/api/",
    USER: {
      GET_USERS: "users",
      ADD_USER: "users",
      GET_USER_BY_ID: "users/", 
    },

    IMAGE: {
        GET_IMAGES_BY_TYPE: "files"
    },

    TRAIN_STATION: {
        GET_ALL_TRAIN_STATIONS: "train-stations",
        GET_TRAIN_STATION_BY_ID: "train-stations/",
        GET_ALL_NAME_STATIONS: "train-stations/name",
        ADD_TRAIN_STATION: "train-stations",
        EDIT_TRAIN_STATION: "train-stations/",
        DELETE_TRAIN_STATION: "train-stations/"
    },

    HISTORY_MODIFIED_STATION: {
        GET_ALL_HISTORY_MODIFIED_STATIONS: "history-modified-stations",
        GET_HISTORY_MODIFIED_STATION_BY_ID: "history-modified-stations/",
        DELETE_HISTORY_MODIFIED_STATION: "history-modified-stations/"
    },

    TECHNICAL_STATUS: {
        GET_ALL_TECHNICAL_STATUS: "technical-status",
        GET_TECHNICAL_STATUS_BY_ID: "technical-status/",
        ADD_TECHNICAL_STATUS: "technical-status",
        EDIT_TECHNICAL_STATUS: "technical-status/",
        DELETE_TECHNICAL_STATUS: "technical-status/",
        GET_ALL_REQUEST_REPAIR: "technical-status/request-repair",
        DELETE_REQUEST_REPAIR: "technical-status/request-repair/"
    },

    REPORT: {
        GET_ALL_REPORT: "reports",
        GET_REPORT_BY_ID: "reports/",
        ADD_REPORT: "reports",
        EDIT_REPORT: "reports/",
        DELETE_REPORT: "reports/"
    }
}

export const STORAGE_API = {
    GATEWAY_URL: "http://192.168.1.201:29083/",
    IMAGE: {
        UPLOAD_IMAGE: "files",
        DELETE_IMAGE: "files/"
    }
}