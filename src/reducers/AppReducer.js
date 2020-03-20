/**
 * Auth User Reducers
 */
import {
    PATIENT_REFEREL,GET_CONTACT,GET_VIDEOS,GET_VIDEOS_FOR_GENERAL,GET_SERVEYS,GET_MEDITATIONS,ADD_CONTACT,ADD_VIDEOS,ADD_SERVEY,UPDATE_SERVEY,DELETE_SURVEY,GET_NOTIFICATION,GET_PAGES,GET_PROFILE,GET_DOSE,EMAIL_CHECK,GET_USER
} from 'Actions/types';


/**
 * initial auth user
 */
const INIT_STATE = {
    loading: false,
    refferel:null,
    get_contact:null,
    get_user:null,
    get_videos:null,
    get_videos_for_general:null,
    get_serveys:null,
    get_meditations:null,
    add_contact:null,
    add_videos:null,
    add_survey:null,
    survey_update:null,
    delete_survey:null,
    notifications:null,
    get_pages:null,
    get_profile:null,
    get_dose:null,
    emailCheck:false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case PATIENT_REFEREL:
            return { ...state, loading: false, refferel: action.payload };

        case GET_CONTACT:
        return { ...state, loading: false, get_contact: action.payload };

        case GET_USER:
        return { ...state, loading: false, get_user: action.payload };
        
        case GET_VIDEOS:
        return { ...state, loading: false, get_videos: action.payload };


        case GET_VIDEOS_FOR_GENERAL:
        return { ...state, loading: false, get_videos_for_general: action.payload };

        case GET_SERVEYS:
        return { ...state, loading: false, get_serveys: action.payload };

        case GET_MEDITATIONS:
        return { ...state, loading: false, get_meditations: action.payload };
    

        case ADD_CONTACT:
        return { ...state, loading: false, add_contact: action.payload };

        case ADD_VIDEOS:
        return { ...state, loading: false, add_videos: action.payload };

        case ADD_SERVEY:
        return { ...state, loading: false, add_survey: action.payload };

        case UPDATE_SERVEY:
        return { ...state, loading: false, survey_update: action.payload };

        case DELETE_SURVEY:
        return { ...state, loading: false, delete_survey: action.payload };

        case GET_NOTIFICATION:
        return { ...state, loading: false, notifications: action.payload };

        case GET_PAGES:
        return { ...state, loading: false, get_pages: action.payload };

        case GET_PROFILE:
        return { ...state, loading: false, get_profile: action.payload };

        case GET_DOSE:
        return { ...state, loading: false, get_dose: action.payload }; 

        case EMAIL_CHECK:
            return { ...state, loading: false, emailCheck: action.payload }; 

        

            
        default: return { ...state };
    }
}
