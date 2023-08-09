import { notifications } from '@mantine/notifications';

export class notification {
    static success(message) {
        notifications.show({
            title: 'Success',
            message,
            color: 'green',
        });
    }
    static error(message) {
        notifications.show({
            title: 'Error',
            message,
            color: 'red',
        });
    }
}
