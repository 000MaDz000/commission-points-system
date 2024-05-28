import { useEffect, useState } from "react";
import { PersonType } from "../models/person";
import Card, { CardType } from "../models/card";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import useTranslation from "../hooks/useTranslation";
import AddCardButton from "./add-card-button";
export default function PersonCards({ person }: { person: PersonType & { _id: string } }) {
    const [cards, setCards] = useState<CardType[] | null | undefined>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const getCards = async () => {
            const cards = await Card.find({ person: person._id });
            return cards.map(c => c.toObject());
        }
        if (!cards) {
            getCards().then((cards) => {
                if (cards) {
                    setCards(cards as unknown as CardType[]);
                }
                else {
                    setCards(undefined);
                }
            });
        }
    }, [person._id, cards]);

    const addCard = async (cardId: string) => {
        const card = new Card({ "code": cardId, person: person._id });
        await card.save();
        setCards([...(cards as CardType[]), card.toObject()]);
    }

    return (
        cards ?
            <div className="bg-sky-50 rounded-sm">
                <Table>
                    <TableHead>
                        <TableRow className="[&>th]:text-center [&>th]:p-5">
                            <th>{t("person.card.id")}</th>
                            <th>{t("person.card.number")}</th>
                        </TableRow>
                    </TableHead>

                    <TableBody className="[&>*]:text-center [&>tr>td]:p-5">
                        {cards.map((card, i) => (
                            <TableRow>
                                <td>{i + 1}</td>
                                <td>{card.code}</td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <AddCardButton onAdd={addCard} cards={cards} />

            </div> : null
    )
}