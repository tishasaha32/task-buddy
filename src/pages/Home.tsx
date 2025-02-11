import { Navbar, TopNavbar } from "@/components/common"

const Home = () => {
    return (
        <div className="md:m-10 flex flex-col gap-2 md:gap-5">
            <TopNavbar />
            <Navbar />
        </div>
    )
}

export default Home