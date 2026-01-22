import { NOTIFICATION_TYPES } from '../constants';

const NotificationContainer = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  const getNotificationStyles = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return 'bg-green-50 text-green-800 border-green-200 shadow-green-100';
      case NOTIFICATION_TYPES.ERROR:
        return 'bg-red-50 text-red-800 border-red-200 shadow-red-100';
      case NOTIFICATION_TYPES.WARNING:
        return 'bg-yellow-50 text-yellow-800 border-yellow-200 shadow-yellow-100';
      case NOTIFICATION_TYPES.INFO:
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200 shadow-blue-100';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return '✅';
      case NOTIFICATION_TYPES.ERROR:
        return '❌';
      case NOTIFICATION_TYPES.WARNING:
        return '⚠️';
      case NOTIFICATION_TYPES.INFO:
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border 
            transform transition-all duration-300 ease-in-out
            animate-fade-in max-w-sm backdrop-blur-sm
            ${getNotificationStyles(notification.type)}
          `}
        >
          <span className="text-lg flex-shrink-0">
            {getNotificationIcon(notification.type)}
          </span>
          <span className="flex-1 text-sm font-medium">
            {notification.message}
          </span>
          <button
            onClick={() => onRemove(notification.id)}
            className="text-slate-500 hover:text-slate-700 transition-colors flex-shrink-0 text-lg"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;