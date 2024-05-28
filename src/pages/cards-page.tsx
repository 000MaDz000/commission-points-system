import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react";
import Card from "../models/card";
import SetCardDataForm from "../components/set-card-data-form";
import Modal from "../components/modal";
import { ObjectId } from "mongoose";

export default function CardsPage() {
    const { cardId } = useParams<{ cardId: string }>();
    const navigate = useNavigate();
    // null means pending
    // undefined means not found
    // otherwise, the data is exists
    const [cardData, setCardData] = useState<{ person: ObjectId } | null | undefined>(null);

    useEffect(() => {
        const cardFetcher = async () => {
            const cardData = await Card.findOne({ code: cardId });

            if (!cardData) {
                setCardData(undefined);
                return;
            }

            setCardData(cardData.toObject());


        }

        // fetche because null means pending
        if (cardData === null) {
            cardFetcher();
        }

        // if the cardData exists
        if (cardData) {
            navigate("/person/" + cardData.person);
        }

    }, [cardData, cardId, navigate]);

    return (
        <div className="w-full h-full">
            {
                // undefined means there is no exists data about this card
                cardData === undefined && (
                    <Modal onClose={() => { }} open>
                        <SetCardDataForm cardId={cardId as string} onEnd={() => setCardData(null)} />
                    </Modal>
                )
            }
        </div>
    )
}