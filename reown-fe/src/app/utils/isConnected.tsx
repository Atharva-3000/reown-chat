import { useAppKitAccount } from '@reown/appkit/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isConnected } = useAppKitAccount();
    const router = useRouter();

    useEffect(() => {
        if (!isConnected) {
            router.push('/'); // Redirect to home if wallet is not connected
        }
    }, [isConnected, router]);

    if (!isConnected) {
        return null;
    }

    return <>{children}</>;
}