import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: roleData, isLoading, isError, error } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading && !!user?.email, // wait for user to load
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    return {
        role: roleData?.role || 'user', // fallback if no role
        isLoading,
        isError,
        error,
    };
};

export default useUserRole;
