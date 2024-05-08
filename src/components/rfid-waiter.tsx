import useRfid from "../hooks/use-rfid";
import RadarWaves from "./radar-waves";

export default function RfidWaiter() {
    const rfid = useRfid();

    console.log(rfid);

    return (
        <div className="grow relative flex border items-center justify-center overflow-hidden">
            <h1 className="z-50">جار الاستماع لكروت الهوية</h1>
            <RadarWaves />
        </div>
    )
}