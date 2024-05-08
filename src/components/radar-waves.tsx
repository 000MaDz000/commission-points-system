import { useEffect, useState } from "react";
import "../styles/radar-wave.css";

export default function RadarWaves() {
    // render 5 waves, each one sets after 1 second after the previous wave
    const [wavesCount, setWavesCount] = useState(1);

    useEffect(() => {
        if (wavesCount < 5) {
            // increment waves count
            setTimeout(() => {
                setWavesCount(wavesCount + 1);
            }, 1000);
        }
    }, [wavesCount]);


    return (
        <div className="radar-wave absolute flex items-center justify-center w-screen h-[100vw]">
            <div className="absolute circle w-full h-full rounded-full border-2 border-green-500 z-10"></div>
            {
                [...new Array(wavesCount)].map((_v, i) => {
                    return (
                        <div key={i} className="absolute circle w-full h-full rounded-full border-2 border-green-500 z-10"></div>
                    )
                })
            }
        </div>
    )
}