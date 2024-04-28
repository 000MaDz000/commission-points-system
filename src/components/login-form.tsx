export default function LoginForm() {
    return (
        <form className="flex flex-col gap-12 shadow p-16 bg-white w-[75%] lg:w-1/2">
            <h1 className="font-bold text-lg text-center">يرجى كتابة حساب قاعدة البيانات</h1>

            <div className="flex flex-col gap-5">
                <input name="username" placeholder="username" className="py-3 px-5 shadow-slate-600 rounded border-2 focus:border-slate-700 outline-none transition-colors" />
                <input name="password" placeholder="password" className="py-3 px-5 shadow-slate-600 rounded border-2 focus:border-slate-700 outline-none transition-colors" />
            </div>
        </form>
    )
}