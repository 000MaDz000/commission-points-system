import { createContext } from "react";

const PointsContext = createContext({ points: 0, setPoints: (number: number) => { } });

export default PointsContext;