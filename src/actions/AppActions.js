/**
 * App Actions
 * 
 */
import { NotificationManager } from 'react-notifications';
import {
    PATIENT_REFEREL,GET_CONTACT,GET_VIDEOS,GET_VIDEOS_FOR_GENERAL,GET_SERVEYS,GET_MEDITATIONS,ADD_CONTACT,ADD_SERVEY,UPDATE_SERVEY,DELETE_SERVEY,GET_NOTIFICATION,GET_PAGES,GET_PROFILE,GET_DOSE,EMAIL_CHECK,GET_USER
} from 'Actions/types';

import api from './../api/index';

export const patienRefferel = () => (dispatch) => {
    api.get('admin/get_pateint')
     .then((res)=>{
         console.log(res)
        if(res.data.status==1){
            dispatch({type:PATIENT_REFEREL, payload:res.data.payload})
        } 
    })
    .catch((err)=>{
      console.log(err)
    })
      
}


export const getPatientDose = () =>{

    return async dispatch =>{
        try {
             let res = await api.get('admin/patient_dose');
             if(res.data.status==1) {
                  dispatch({type:GET_DOSE, payload:res.data.payload})
             } else {
                
             }
        } catch (error) {
            console.log(error)
        }
    }
}

export const postPatientDose = (obj) =>{

    return async dispatch =>{
        try {
             let res = await api.post('admin/patient_dose_save', obj);
             if(res.data.status==1) {
                //NotificationManager.success(res.data.message);
                NotificationManager.success("Med refill request added successfully");
                  dispatch(getPatientDose())
             } else {
                NotificationManager.success(res.data.message);
                //NotificationManager.success("Med refill request added successfully");
             }
        } catch (error) {
            NotificationManager.success(error.data.message);
            console.log(error)
        }
    }
}


export const patchPatientDose = (obj,doseId) =>{

    return async dispatch =>{
        try {
             let res = await api.patch('admin/patient_dose/'+doseId, obj);
             if(res.data.status==1) {
               // NotificationManager.success(res.data.message);
                NotificationManager.success("Med refill request updated successfully");
                  dispatch(getPatientDose())
             } else {
                NotificationManager.success(res.data.message);
             }
        } catch (error) {
            NotificationManager.success(error.data.message);
            console.log(error)
        }
    }
}

export const deletePatientDose = (doseId) =>{

    return async dispatch =>{
        try {
             let res = await api.delete('admin/patient_dose/'+doseId);
             if(res.data.status==1) {
                NotificationManager.success(res.data.message);
                  dispatch(getPatientDose())
             } else {
                NotificationManager.success(res.data.message);
             }
        } catch (error) {
            NotificationManager.success(error.data.message);
            console.log(error)
        }
    }
}

export const deletePatientReferral = (doseId) =>{

    return async dispatch =>{
        try {
             let res = await api.delete('admin/patient_refferel/'+doseId);
            
             if(res.data.status==1) {
                NotificationManager.success(res.data.message);
                  dispatch(patienRefferel())
             } else {
                NotificationManager.success(res.data.message);
             }
        } catch (error) {
            NotificationManager.success(error.data.message);
            console.log(error)
        }
    }
}

export const deleteCommunication = (status_provided) =>{

    return async dispatch =>{
        try {
            //  let res = await api.delete('admin/patient_refferel/'+doseId);
            
             if(status_provided==1) {
                NotificationManager.success("Deleted Communication successfully");
                  dispatch(patienRefferel())
             } else {
                NotificationManager.success("Failed to delete");
             }
        } catch (error) {
            NotificationManager.success("Something went wrong");
            console.log(error)
        }
    }
}


export const getContact = () => (dispatch) => {
    
    api.get('admin/contact_providers')
     .then((res)=>{
        if(res.data.status==1){
            dispatch({type:GET_CONTACT, payload:res.data.payload})
        } else {
            dispatch({type:GET_CONTACT, payload:res.data.payload})
        }  
    })
    .catch((err)=>{
      console.log(err)
    })
        
}
export const getUser = () => (dispatch) => {
    
    api.get('admin/users')
     .then((res)=>{
        if(res.data.status==1){
            dispatch({type:GET_USER, payload:res.data.payload})
        } else {
            dispatch({type:GET_USER, payload:res.data.payload})
        }  
    })
    .catch((err)=>{
      console.log(err)
    })
        
}
export const addContact = (contactDetails) =>{
    console.log(contactDetails)
    
    return async dispatch =>{
        try {
             let res = await api.post('admin/contact_add',contactDetails);
             if(res.data.status==1) {
                  dispatch(getContact())
                  NotificationManager.success(res.data.message);
                  dispatch({type:ADD_CONTACT, payload:res.data.payload})
                 
             } else {
                NotificationManager.error(res.data.message);
             }
        } catch (error) {
            console.log(error)
        }
    }
}


export const updContact = (id,contactDetails) =>{ 
    console.log(contactDetails)
    
    return async dispatch =>{
        try {
             let res = await api.put('admin/contact_update/'+id , contactDetails);
             if(res.data.status==1) {
                  dispatch(getContact())
                  NotificationManager.success(res.data.message);
                 
             } else {
                NotificationManager.error(res.data.message);
             }
        } catch (error) {
            console.log(error)
        }
    }
}
export const updContact_user = (id,contactDetails) =>{ 
    console.log(contactDetails)
    
    return async dispatch =>{
        try {
             let res = await api.put('admin/contact_update_user/'+id , contactDetails);
             if(res.data.status==1) {
                  dispatch(getUser())
                  NotificationManager.success(res.data.message);
                 
             } else {
                NotificationManager.error(res.data.message);
             }
        } catch (error) {
            console.log(error)
        }
    }
}
export const getVideos = () => (dispatch) => {
    api.get('admin/get_all_videos')
     .then((res)=>{
        if(res.data.status==1){
            dispatch({type:GET_VIDEOS, payload:res.data.payload})
        } else {
            dispatch({type:GET_VIDEOS, payload:res.data.payload})
        } 
    })
    .catch((err)=>{
      console.log(err)
    })
        
}
export const getVideos_for_general = () => (dispatch) => {
    api.get('admin/get_all_videos_for_general')
     .then((res)=>{
        if(res.data.status==1){
            dispatch({type:GET_VIDEOS_FOR_GENERAL, payload:res.data.payload})
        } else {
            dispatch({type:GET_VIDEOS_FOR_GENERAL, payload:res.data.payload})
        } 
    })
    .catch((err)=>{
      console.log(err)
    })
        
}
export const getServeys = () => (dispatch) => {
    api.get('admin/get_servey')
     .then((res)=>{
        if(res.data.status==1){
            dispatch({type:GET_SERVEYS, payload:res.data.payload})
        } else {
            dispatch({type:GET_SERVEYS, payload:res.data.payload})
        } 
    })
    .catch((err)=>{
      console.log(err)
    })
        
}
export const getMeditations = () => (dispatch) => {
    api.get('admin/get_meditations')
     .then((res)=>{
        if(res.data.status==1){
            dispatch({type:GET_MEDITATIONS, payload:res.data.payload})
        } else {
            dispatch({type:GET_MEDITATIONS, payload:res.data.payload})
        } 
    })
    .catch((err)=>{
      console.log(err)
    })
        
}


export const addVideos = (obj) => {
    return async dispatch =>{
        try {
            let res = await api.post('admin/video_add',obj);

            if(res.data.status==1) {
                dispatch(getVideos())
                dispatch(getVideos_for_general())
                NotificationManager.success(res.data.message);
                dispatch({type:ADD_CONTACT, payload:res.data.payload})
                
            } else {
                NotificationManager.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }  
    }    
}

export const updateVideos = (upd_id,obj) => {
    return async dispatch =>{
        try {
            let res = await api.patch('admin/video_update/'+upd_id,obj);

            if(res.data.status==1) {
                dispatch(getVideos())
                dispatch(getVideos_for_general())
                NotificationManager.success(res.data.message);
                
            } else {
                NotificationManager.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }  
    }    
}


export const deleteVideo = (vid_id) => {
    return async dispatch =>{
        try {
            let res = await api.delete('admin/delete_video/'+vid_id);

            if(res.data.status==1) {
                dispatch(getVideos())
                dispatch(getVideos_for_general())
                NotificationManager.success(res.data.message);
                
                
            } else {
                NotificationManager.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }  
    }    
}

export const getNotification = () =>{
    return async dispatch =>{
        try {
             let res = await api.get('admin/notification_list');
             if(res.data.status==1) {
                 // NotificationManager.success(res.data.message);
                  dispatch({type:GET_NOTIFICATION, payload:res.data.payload})
             } else {
                NotificationManager.error(res.data.message);
             }
        } catch (error) {

            console.log(error)
        }
    }
}

export const sendToAllNotificatons = (data) =>{
    return async dispatch =>{

        try {
            let res = await api.post('admin/send_all', data);
            dispatch(getNotification())
            NotificationManager.success('Notification Sent');
        
        } catch (error) {
               console.log(error)
        }
        
    }
} 

export const surveyAdd = (obj) =>{
    return async dispatch =>{
        try {
             let res = await api.post('admin/survey_registration', obj);
             if(res.data.status==1) {
                 dispatch(getServeys())
                  NotificationManager.success(res.data.message);
                  dispatch({type:ADD_SERVEY, payload:res.data.payload})
             } else {
                NotificationManager.error(res.data.message);
             }
        } catch (error) {

            console.log(error)
        }
    }
}

export const surveyUpdate = (obj,servey_id) =>{
    return async dispatch =>{
        try {
             let res = await api.put('admin/survey_update/'+servey_id, obj);
             console.log(res.data.status)
             if(res.data.status==1) {
                  NotificationManager.success(res.data.message);
                  dispatch({type:UPDATE_SERVEY, payload:res.data.payload})
                  dispatch(getServeys())
             } else {
                NotificationManager.error(res.data.message);
             }
        } catch (error) {

            console.log(error)
        }
    }
}

export const surveyDelete = (servey_id) =>{
    return async dispatch =>{
        try {
             let res = await api.delete('admin/survey_delete/'+servey_id);
             if(res.data.status==1) {
                  dispatch(getServeys())
                  NotificationManager.success(res.data.message);
                  dispatch({type:DELETE_SERVEY, payload:res.data.payload})
                 
             } else {
                NotificationManager.error(res.data.message);
             }
        } catch (error) {
            console.log(error)
        }
    }
}

export const contactDelete = (contact_id) =>{
    return async dispatch =>{
             try {
                    let res = await api.delete('admin/contact_delete/'+contact_id);
                    if(res.data.status==1) {
                       dispatch(getContact());
                       NotificationManager.success(res.data.message);
                    } else {
                        NotificationManager.error(res.data.message);
                    }

             } catch (error) {
                console.log(error)
             }
    }
}
export const contactDelete_user = (contact_id) =>{
    return async dispatch =>{
             try {
                    let res = await api.delete('admin/contact_delete/'+contact_id);
                    if(res.data.status==1) {
                       dispatch(getUser());
                       NotificationManager.success(res.data.message);
                    } else {
                        NotificationManager.error(res.data.message);
                    }

             } catch (error) {
                console.log(error)
             }
    }
}

export const changeUserSatus = (data) =>{
    
    return async dispatch =>{
             try {
                 
                    let res = await api.post('admin/changeUserSatus/',data);
                    console.log("this done")
                    if(res.data.status==1) {
                       dispatch(getUser());
                       NotificationManager.success(res.data.message);
                    } else {
                        NotificationManager.error(res.data.message);
                    }

             } catch (error) {
                console.log(error)
             }
    }
}
export const addPages = (data) =>{
    return async dispatch =>{

        try {
            let res = await api.post('admin/pages', data);
            console.log(res)
            if(res.data.status==1){
                NotificationManager.success(res.data.message);
            } else {
                NotificationManager.error(res.data.message);
            }

        } catch (error) {
               console.log(error)
        }
        
    }
} 

export const getPages = (data) =>{
    return async dispatch =>{

        try {
            let res = await api.get('admin/get_pages', data);
       
        if(res.data.status==1){
            dispatch({type:GET_PAGES, payload:res.data.payload})
        } else {
            
        }

        } catch (error) {
               console.log(error)
        }
        
    }
} 


export const getUserProfile = (data) =>{
    console.log(data)
    return async dispatch =>{
          
        try {
        let res = await api.get('admin/user_profile/5cc9949823bab670e7039437');
           console.log(res)
        if(res.data.status==1){
            dispatch({type:GET_PROFILE, payload:res.data.payload})
        } else {
            dispatch({type:GET_PROFILE, payload:res.data.payload})
        }

        } catch (error) {
               console.log(error)
        }
        
    }
} 

export const emailValidate = (emailVal) =>{
   
    return async dispatch =>{
          
        try { 
               let email = {
                   email:emailVal
               }
            let res = await api.post('admin/email_check', email);
       
        if(res.data.status==1){
            dispatch({type:EMAIL_CHECK, payload:true})
        } else {
            dispatch({type:EMAIL_CHECK, payload:false})
        }

        } catch (error) {
               console.log(error)
        }
        
    }
} 







