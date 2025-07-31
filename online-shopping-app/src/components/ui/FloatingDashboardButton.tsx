import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

export default function FloatingDashboardButton() {
    return (
        <Link
            to="/dashboard"
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 group"
            title="Admin Dashboard"
        >
            <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </Link>
    );
}
