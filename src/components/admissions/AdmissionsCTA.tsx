
import { Link } from "@aalto-dx/react-components";
import { ArrowRight, User } from '@phosphor-icons/react/dist/ssr';

export default function AdmissionsCTA() {
    return (
        <div className="bg-gray-50 text-black p-8 md:p-12 rounded-3xl relative overflow-hidden my-12">
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-left lg:text-left">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Create your portal account to begin your official application.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-fit lg:w-auto items-start sm:items-center">
                    <Link
                        href="/portal/account/register"
                        className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all text-sm uppercase tracking-wider w-fit"
                    >
                        Create Portal Account
                    </Link>
                    <Link
                        href="/portal/account/login"
                        className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-black px-8 py-4 rounded-full font-bold transition-all text-sm uppercase tracking-wider w-fit"
                    >
                        Existing Student? Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
