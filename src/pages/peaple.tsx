import Layout from "../components/layout";
import PeapleScatter from "../components/peaple-scatter";
import PeapleTable from "../components/peaple-table";

export default function PeaplePage() {
    return (
        <Layout>
            <div className="my-3">

                <PeapleTable />
                <PeapleScatter />
            </div>
        </Layout>
    )
}