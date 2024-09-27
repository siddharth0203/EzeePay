
export const Appbar = () => {
    return (
        <div>
            <nav className="dark:bg-gray-800 rounded shadow flex items-center justify-between bg-white p-4">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">EzeePay</span>
                </div>
                <div className=" flex items-center space-x-2">
                    <span className="font-semibold text-xl text-white tracking-tight">Hello, User</span>
                    <button>
                        <img
                            className="w-10 h-10 rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
                            alt="Rounded avatar"
                        />
                    </button>
                </div>
            </nav>
        </div>
    );
};
