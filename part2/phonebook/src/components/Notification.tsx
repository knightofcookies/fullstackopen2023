type NotificationProps = {
    message: string | null;
    notificationStyle: string;
};

const Notification = (props: NotificationProps) => {
    if (props.message === '') {
        return null;
    }

    return (
        <div className={props.notificationStyle}>
            {props.message}
        </div>
    );
};

export default Notification;