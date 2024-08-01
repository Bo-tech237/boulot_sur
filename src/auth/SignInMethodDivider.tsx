export function SignInMethodDivider() {
    return (
        <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-boulotSoftWhite px-2 text-boulotRed font-bold">
                    Or continue with
                </span>
            </div>
        </div>
    );
}
