declare module 'react-native-push-notification' {
    interface PushNotificationObject {
      title?: string;
      message: string;
      playSound?: boolean;
      soundName?: string;
      number?: number;
      repeatType?: 'time' | 'week' | 'day' | 'hour' | 'minute';
      repeatTime?: number;
      actions?: string;
      [key: string]: any;
    }

    const PushNotification: {
      configure: (options: {
        onNotification: (notification: any) => void;
        requestPermissions?: boolean;
        popInitialNotification?: boolean;
        onRegister?: (token: { os: string; token: string }) => void;
        permissions?: {
          alert?: boolean;
          badge?: boolean;
          sound?: boolean;
        };
      }) => void;
      localNotification: (options: PushNotificationObject) => void;
      cancelAllLocalNotifications: () => void;
    };

    export default PushNotification;
  }
