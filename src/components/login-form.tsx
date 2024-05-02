import { FormEventHandler, useEffect, useState } from "react"
import Db from "../classes/db"
import { useNavigate } from "react-router";

export default function LoginForm() {
    const [url, setUrl] = useState<string | null | undefined>(undefined);
    const [err, setErr] = useState<boolean | string | null>(null);
    const navigate = useNavigate();

    const onsubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!url || typeof url !== "string") {
            setErr("please write the database url");
            return;
        };

        navigate("/db-credentials");
    }

    useEffect(() => {
        if (url) {
            setErr("");
        }
        else if (null !== err) {
            setErr(true)
        }
    }, [url]);

    useEffect(() => {
        Db.getUrl().then(res => {
            if (res) {
                navigate("/db-credentials");
            }
        });
    }, []);


    return (
        <form className="flex flex-col gap-5 shadow p-16 bg-white w-[75%] lg:w-1/2" onSubmit={onsubmit}>
            <input onChange={(e) => setUrl(e.target.value)} autoComplete="dburl" name="dburl" placeholder="database url" className={`py-3 px-5 shadow-slate-600 rounded border-2 focus:border-slate-700 outline-none transition-colors ${(err && !url) ? "border-red-700" : ""}`} />
            {err && typeof err !== "boolean" && <h2 className="text-red-600 font-serif">{err}</h2>}
            <input type="submit" value="submit" className="py-3 px-5 shadow-slate-600 rounded border-2 hover:border-slate-700 outline-none transition-colors cursor-pointer" />
        </form>
    )
}
