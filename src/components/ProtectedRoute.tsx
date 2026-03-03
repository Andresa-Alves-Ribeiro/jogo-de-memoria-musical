import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const selectedFamilies = localStorage.getItem('selectedFamilies');

    if (!selectedFamilies) {
        return <Navigate to="/" replace />;
    }

    try {
        const parsed = JSON.parse(selectedFamilies);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            return <Navigate to="/" replace />;
        }
    } catch {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 