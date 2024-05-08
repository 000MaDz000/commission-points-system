import RfidWaiter from "../components/rfid-waiter";
import Sidebar from "../components/sidebar";

export default function HomePage() {
    return (
        <div dir={"rtl"} className="flex h-screen">
            <Sidebar />
            <RfidWaiter />
        </div>
    )
}