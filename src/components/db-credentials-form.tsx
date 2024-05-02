import { FormEventHandler, useState } from "react";
import Db from "../classes/db";
import { useNavigate } from "react-router";


export default function DbCredentialsForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onsubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log("connecting");

        const TrueCredentials = await Db.getConnection(username, password);
        console.log("connected");

        if (TrueCredentials) {
            navigate("/home")
        }
        else {
            console.log("failed");

        }
    };

    return (
        <form className="flex flex-col gap-12 shadow p-16 bg-white w-[75%] lg:w-1/2" onSubmit={onsubmit}>
            <h1 className="font-bold text-lg text-center">يرجى كتابة حساب قاعدة البيانات</h1>

            <div className="flex flex-col gap-5">
                <input autoComplete="username" type={"text"} onChange={(e) => setUsername(e.target.value)} name="username" placeholder="username" className="py-3 px-5 shadow-slate-600 rounded border-2 focus:border-slate-700 outline-none transition-colors" />
                <input autoComplete="password" type={"password"} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="password" className="py-3 px-5 shadow-slate-600 rounded border-2 focus:border-slate-700 outline-none transition-colors" />
                <input type={"submit"} value="Submit" className="py-3 px-5 shadow-slate-600 rounded border-2 hover:border-slate-700 outline-none transition-colors cursor-pointer" />
            </div>
        </form>
    )
}