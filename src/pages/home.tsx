import Layout from "../components/layout";
import RfidWaiter from "../components/rfid-waiter";

export default function HomePage() {
    return (
        <Layout>
            <div className="h-screen flex">
                <RfidWaiter />
            </div>
        </Layout>
    )
}