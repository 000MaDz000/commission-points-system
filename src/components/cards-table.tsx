import { useEffect, useRef, useState } from "react"
import Card, { CardType } from "../models/card";
import { ObjectId } from "bson";
import { Paper, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Tooltip } from "@mui/material";
import useTranslation from "../hooks/useTranslation";
import { PersonType } from "../models/person";
import { Peaple } from "./peaple-table";
import { Types } from "mongoose";
import CardRow from "./card-row";
import AddCardButton from "./add-card-button";


export type OneCardsType = (Omit<CardType, "person"> & { _id: ObjectId, person: PersonType });
export type CardsType = OneCardsType[];

export default function CardsTable() {
    const [cards, setCards] = useState<CardsType>([]);
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const hiddenRef = useRef<HTMLDivElement>(null);

    const fetchCards = async () => {
        if (cards.length) {

            // const fetchedCards = await Card.collection.aggregate([
            //     {
            //         "$sort": {
            //             _id: 1
            //         }
            //     },
            //     {
            //         $match: {
            //             _id: {
            //                 $gt: new ObjectId(cards[cards.length - 1]._id.toString()), // id of last fetched document
            //             }
            //         }
            //     },
            //     {
            //         $limit: 20
            //     },
            //     {
            //         $lookup: {
            //             from: "peaple",
            //             localField: "person",
            //             foreignField: "_id",
            //             as: "PP"
            //         }
            //     },
            //     // {
            //     //     $set: {
            //     //         person: { $arrayElemAt: ["$person", 0] },
            //     //     }
            //     // }
            // ]);

            return Card.find({ addedAt: { $gt: cards[cards.length - 1].addedAt } }).sort({ addedAt: 1 }).limit(20).populate("person") as unknown as CardsType;

        }
        else {
            const fetchedCards = await Card.find().sort({ addedAt: 1 }).limit(20).populate("person");
            return fetchedCards.map(obj => obj.toObject()) as unknown as CardsType;
        }

    }

    useEffect(() => {
        if (cards.length) return;

        fetchCards().then((data) => {
            setCards([...cards, ...data]);
        });
    }, [cards]);


    const deleteCard = async (card: OneCardsType) => {
        await Card.deleteOne(card);
        setCards(cards.filter(c => c._id !== card._id));
    }

    const updateCardOwner = async (person: Peaple, card: OneCardsType) => {
        const cardController = await Card.findById(card._id);

        // this condition will never be excuted, it's only for type checking of typescript language
        if (!cardController) return;

        cardController.person = new Types.ObjectId(person._id);

        // save the card data as it's owner changed
        await cardController.save();

        // fetch the owner data again after it changed
        await cardController.populate("person");

        // update the value of the card for re_render
        setCards(cards.map(val => val._id == card._id ? cardController.toObject() : val));
    }

    const onAddCard = async (cardId: string) => {
        const card = new Card({ "code": cardId });
        await card.save();
        setCards([card.toObject(), ...cards]);
    }

    useEffect(() => {
        const listener = () => {

            // if the user scrolled to the bottom of table, fetch more cards
            if ((window.scrollY + 200) >= ((ref.current?.clientHeight || Infinity) - window.screen.availHeight)) {
                fetchCards().then((c) => {
                    setCards([...cards, ...c]);
                });
            }
        };

        window.addEventListener("scroll", listener);

        return () => {
            window.removeEventListener("scroll", listener);
        }
    });


    return (
        <div className="" ref={ref}>
            <Paper className="p-4 text-center">
                <div className="flex justify-end">
                    <Tooltip title={t("card.addCard")}>
                        <AddCardButton cards={cards as unknown as CardType[]} onAdd={onAddCard} />
                    </Tooltip>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center" }}>{t("card.data.person.name")}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{t("card.data.id")}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{t("card.data.date")}</TableCell>
                            <TableCell sx={{ textAlign: "center" }} colSpan={2}>{t("card.data.update")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cards.map((card) => (
                            <CardRow card={card} onDeleteCard={deleteCard} onChangeCardOwner={updateCardOwner} />
                        ))}

                        <div ref={hiddenRef} className=""></div>
                    </TableBody>

                </Table>
            </Paper>

        </div>
    )
}