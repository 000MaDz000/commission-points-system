import { useParams } from "react-router"
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import Card from "../models/card";
import SetCardDataForm from "../components/set-card-data-form";
import Modal from "../components/modal";

export default function CardsPage() {
    const { cardId } = useParams<{ cardId: string }>();
    // null means pending
    // undefined means not found
    // otherwise, the data is exists
    const [cardData, setCardData] = useState<{} | null | undefined>(null);

    useEffect(() => {
        const cardFetcher = async () => {
            const cardData = await Card.findOne({ code: cardId }).populate("person");

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

    }, [cardData, cardId]);

    return (
        <Layout>
            <div className="w-full h-full">
                {
                    // undefined means there is no exists data about this card
                    cardData === undefined && (
                        <Modal onClose={() => { }}>
                            <div className="w-screen">
                                <SetCardDataForm cardId={cardId as string} onEnd={() => setCardData(null)} />
                            </div>
                        </Modal>
                    )
                }
            </div>

        </Layout>
    )
}