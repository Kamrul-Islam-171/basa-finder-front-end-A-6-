import { Button } from "@/components/ui/button";
import Link from "next/link";

const SuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
                <div className="text-green-500 text-6xl mb-4">✅</div>
                <h1 className="text-2xl font-bold mb-2">Success!</h1>
                <p className="text-gray-600 mb-6">Your Payment is completed successfully.</p>
                <Button 
                    
                    className="">
                   <Link href="/">Go Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default SuccessPage;