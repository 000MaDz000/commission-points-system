import { Container } from "@mui/material";
import Layout from "../components/layout";
import DbUrlSetting from "../components/dburl-setting";
import LanguageSelectorSetting from "../components/language-selector-setting";

export default function SettingsPage() {

    return (
        <Layout>
            <Container className="my-3">
                <div className="flex flex-col [&>*]:w-full min-h-[66%] gap-8">
                    <DbUrlSetting />
                    <LanguageSelectorSetting />
                </div>
            </Container>
        </Layout>
    )
}