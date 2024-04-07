const TableHeader = ({ title, onClick, buttonLabel }) => {
    return <div className="flex justify-between items-center px-12">
        <h1 className="font-bold text-3xl">
            {title}
        </h1>
        <button
            onClick={onClick}
        >
            <span
                className="my-3 inline-flex rounded-md border border-primary p-1 py-3 text-center text-paragraph-xsm text-black dark:text-white dark:border-white font-bold bg-white dark:bg-meta-10  hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
                {buttonLabel}
            </span>
        </button>
    </div>
}

export default TableHeader