import { useEffect, useState } from "react";
import PersonInfo from "../components/person-info";
import Person, { PersonType } from "../models/person";
import { useParams } from "react-router";
import PointsArrowChart from "../components/points-chart";
import PersonCards from "../components/person-cards";
import PointsContext from "../contexts/points";


export default function PersonPage() {
    const [person, setPerson] = useState<(PersonType & { _id: string }) | null>(null);
    const [points, setPoints] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        Person.findById(id).then((data) => {
            if (data) {
                setPerson(data.toObject())
            }
        });
    }, [person, id, points]);

    return (
        person &&
        <div className="flex flex-col gap-2 min-w-screen p-5 min-h-screen">
            <PersonInfo person={person} />
            <PointsContext.Provider value={{ points: 0, "setPoints": (n) => setPoints(n) }}>
                <PersonCards person={person} />
                <PointsArrowChart person={person} />
            </PointsContext.Provider>
        </div>
    )
}