import { Bell, Check, Info, AlertTriangle } from 'lucide-react';
import Card from '../../Common/Card';

export function NotificationsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Notification Settings</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition">
          Save Changes
        </button>
      </div>

      <EmailNotifications />
      <PushNotifications />
      {/* <NotificationHistory /> */}
    </div>
  );
}

function NotificationToggle({ title, description, defaultChecked = false }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-indigo-600 
                        relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full 
                        peer-checked:after:border-white" />
      </label>
    </div>
  );
}

function EmailNotifications() {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Email Notifications</h3>

      <div className="space-y-4">
        <NotificationToggle 
          title="Trading Activity" 
          description="Receive notifications about your trades" 
          defaultChecked={true} 
        />
        <NotificationToggle 
          title="Price Alerts" 
          description="Notifications for market price changes" 
          defaultChecked={true} 
        />
        <NotificationToggle 
          title="Account Security" 
          description="Login attempts and security updates" 
          defaultChecked={true} 
        />
        <NotificationToggle 
          title="Product Updates" 
          description="New features and platform updates" 
          defaultChecked={false} 
        />
      </div>
    </Card>
  );
}

function PushNotifications() {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Push Notifications</h3>

      <div className="space-y-4">
        <NotificationToggle 
          title="Mobile App" 
          description="Enable push notifications on your device" 
          defaultChecked={true} 
        />
        <NotificationToggle 
          title="Trade Execution" 
          description="Get notified when your trades are executed" 
          defaultChecked={true} 
        />
      </div>
    </Card>
  );
}

function NotificationItem({ icon: Icon, color, title, description, date }) {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md flex gap-3 bg-gray-50 dark:bg-gray-800">
      <div className={`bg-${color} p-2 rounded-full flex-shrink-0`}>
        <Icon size={16} className="text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    </div>
  );
}

export default NotificationsPage;