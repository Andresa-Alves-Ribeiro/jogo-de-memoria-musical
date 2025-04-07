import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const selectedFamilies = localStorage.getItem('selectedFamilies');
    
    if (!selectedFamilies || JSON.parse(selectedFamilies).length === 0) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 