export async function askNotificationPermission(callback: any) {
    if (!('Notification' in window)) {
        return;
    }
    if (Notification.permission === "default") {

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            callback();
        }

    } else if (Notification.permission === "granted") {
        callback();
    }
}

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function determineAppServerKey() {
    const PUBLIC_VAPID_KEY = 'BFQFlmmR34pogomIqxakJ8IXpN28CGkBjwMFUJrhBNQINT9M906ETTotms_Hnw_rPHp7ZqXGG6CK6iBTBVcHJb4'
    return urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
}