export async function askNotificationPermission(callback:any){
    if(!('Notification' in window)){
        return;
    }
    if(Notification.permission === "default"){
        
        const permission = await Notification.requestPermission();
        if(permission === "granted"){
            callback();
        }
        
    }else if(Notification.permission === "granted"){
        callback();
    }
}  