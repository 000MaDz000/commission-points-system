import Sidebar from "./sidebar";

export default function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">

            <div className="grow">
                {children}
            </div>

            <Sidebar />
        </div>
    )
}