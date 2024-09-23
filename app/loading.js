import { Skeleton } from "@mui/material";

const LoginSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center mb-6">
                    <Skeleton variant="rectangular" width={120} height={50} />
                </div>
                <div className="flex justify-center mb-6">
                    <Skeleton variant="rectangular" width={150} height={40} />
                </div>
                <div className="flex justify-center mb-6">
                    <Skeleton variant="rectangular" width={150} height={20} />
                </div>
                <div className="mb-4">
                    <Skeleton variant="rectangular" width="100%" height={40} />
                </div>
                <div className="mb-4">
                    <Skeleton variant="rectangular" width="100%" height={40} />
                </div>
                <div className="flex justify-center mb-4">
                    <Skeleton variant="text" width={40} height={40} />
                </div>
                <div className="flex justify-center">
                    <Skeleton variant="rectangular" width="100%" height={40} />
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Skeleton variant="text" width={200} height={20} />
            </div>
        </div>
    );
};

export default LoginSkeleton;
