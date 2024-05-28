import { CssBaseline } from "@mui/material";
import Layout from "../components/layout";
import PeapleTable from "../components/peaple-table";

export default function PeaplePage() {
    return (
        <Layout>
            <CssBaseline />
            <PeapleTable />
        </Layout>
    )
}