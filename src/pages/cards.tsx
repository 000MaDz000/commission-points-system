import { Container } from "@mui/material";
import Layout from "../components/layout";
import CardsTable from "../components/cards-table";

export default function Cards() {
    return (
        <Layout>
            <Container sx={{ marginTop: "0.5rem" }} maxWidth="xl">
                <CardsTable />
            </Container>
        </Layout>
    )
}