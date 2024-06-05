import { Box, Button, CircularProgress, Step, StepLabel, Stepper } from "@mui/material";
import DbCredentialsForm from "../components/db-credentials-form";
import useTranslation from "../hooks/useTranslation";
import { useEffect, useState } from "react";
import LanguageSelectorSetting from "../components/language-selector-setting";
import DbUrlSetting from "../components/dburl-setting";
import Settings from "../classes/settings";
import Db from "../classes/db";

const steps = [
    {
        label: "language.select",
        component: LanguageSelectorSetting,
    },
    {
        label: "db.url",
        component: DbUrlSetting,
    },
    {
        label: "db.login",
        component: DbCredentialsForm,
    }
];

export default function LoginPage() {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const getStep = async () => {
            const lang = await Settings.getLocale();
            const dbUrl = await Db.getUrl();

            let step = 0;
            if (lang) step++;
            if (dbUrl) step++;

            setIsPending(false);
            setCurrentStep(step)
        }

        getStep();
    }, []);


    return (
        isPending ? <div className="w-screen h-screen flex items-center justify-center"><CircularProgress /></div> : (
            <Box className="flex w-screen h-screen justify-center items-center bg-slate-50">
                <Box className="w-3/4 flex flex-col gap-14 justify-center items-center">
                    <Stepper activeStep={currentStep} alternativeLabel className="w-full">
                        {steps.map((step) => (
                            <Step key={step.label} completed={false}>
                                <StepLabel>{t(step.label)}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {steps.map((step, i) => (
                        <div className={"w-3/4 " + (currentStep !== i ? "hidden" : "")}>
                            <step.component />
                        </div>
                    ))}


                    <div className="flex w-full justify-between">
                        <Button color="secondary" disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>{t("buttons.text.back")}</Button>
                        <Button onClick={() => setCurrentStep(currentStep + 1)}>{t("buttons.text.next")}</Button>
                    </div>
                </Box>
            </Box>
        )

    )
}