import SearchNotFound from "@/assets/SearchNotFound.png";

const NoTaskBoard = () => {
    return (
        <div className="flex flex-col gap-3 justify-center h-[60vh] items-center">
            <img
                src={SearchNotFound}
                alt="empty"
                width={250}
                height={250}
                className="opacity-50"
            />
            <h1 className="font-semibold text-lg text-center">
                It looks like we can't find any results <br />
                that match.
            </h1>
        </div>
    );
}

export default NoTaskBoard