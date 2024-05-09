import { FormEventHandler, useEffect, useState } from "react";
import Db from "../classes/db";
import { useNavigate } from "react-router";
import useTranslation from "../hooks/useTranslation";


export default function DbCredentialsForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onsubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const TrueCredentials = await Db.getConnection(username, password);

        if (TrueCredentials) {
            navigate("/home")
        }
        else {
            setErr(true)
        }
    };

    useEffect(() => {
        if (err) {
            setErr(false);
        }
    }, [username, password]);

    return (
        <form className="flex flex-col gap-12 shadow p-16 bg-white w-[75%] lg:w-1/2" onSubmit={onsubmit}>
            <h1 className="font-bold text-lg text-center">{t("db.credentials.login")}</h1>

            <div className="flex flex-col gap-5">
                <input autoComplete="username" type={"text"} onChange={(e) => setUsername(e.target.value)} name="username" placeholder="username" className={`py-3 px-5 shadow-slate-600 rounded border-2 focus:border-slate-700 outline-none transition-colors ${err ? "border-red-700" : ""}`} />
                <input autoComplete="password" type={"password"} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="password" className={`py-3 px-5 shadow-slate-600 rounded border-2 focus:border-slate-700 outline-none transition-colors ${err ? "border-red-700" : ""}`} />
                <input type={"submit"} value="Submit" className="py-3 px-5 shadow-slate-600 rounded border-2 hover:border-slate-700 outline-none transition-colors cursor-pointer" />
            </div>
        </form>
    )
}