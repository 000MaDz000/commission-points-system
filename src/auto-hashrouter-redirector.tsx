import { useEffect } from "react";
import { useNavigate } from "react-router";
let loaded = false;
export default function AutoHashrouterRedirector() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) navigate("/");
        loaded = true;
    }, [navigate]);

    return null;
}