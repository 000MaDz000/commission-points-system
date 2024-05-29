import React, { useCallback, useEffect, useState } from "react"
import Person, { PersonType } from "../models/person";
import { ObjectId } from "bson";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import useTranslation from "../hooks/useTranslation";

export type Peaple = PersonType & { _id: string };
export default function PeapleTable() {
    const [peaple, setPeaple] = useState<Peaple[]>([]);
    const [allDocumentsCount, setAllDocumentsCount] = useState(0);
    const { t } = useTranslation();
    const currentYear = useCallback(() => new Date().getFullYear(), []);
    const [page, setPage] = useState(0);

    // on every change on the page number fetch the page data
    useEffect(() => {
        getPeaple().then((data) => setPeaple([...peaple, ...data]));
    }, [page]);

    // creates a paganation on person table
    // it's get's only page data
    const getPeaple = async (): Promise<Peaple[]> => {
        let query = {};

        if (peaple.length) {
            query = {
                _id: {
                    $gt: new ObjectId(peaple[peaple.length - 1]._id.toString()),
                }
            }
        }

        const data = await Person.collection.find(query).limit(10).toArray();
        if (!allDocumentsCount) {
            setAllDocumentsCount(await Person.estimatedDocumentCount());
        }

        return data as unknown as Peaple[];
    }

    // page data start exists in index (page * 10)
    let pageDataStart = page * 10;
    const pageDataEnd = pageDataStart + 9; // max rows is 10, so we will take the first document and the next 9 with it


    // this function will render the page data recursivly
    const renderPageData = (index = pageDataStart): React.ReactNode => {
        if (index > pageDataEnd) return null;
        const person = peaple[index];
        if (!person) return null;

        return (
            <>
                <TableRow>
                    <TableCell>{person.name}</TableCell>
                    <TableCell colSpan={2}>{person.address}</TableCell>
                    <TableCell>{currentYear() - person.birthDate.getFullYear()}</TableCell>
                </TableRow>
                {renderPageData(index + 1)}
            </>
        )
    }

    return (
        <Container >
            <Paper>
                <TableContainer>
                    <Table className="[&>thead>tr>th]:text-center [&>tbody>tr>td]:text-center">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{t("person.data.name")}</TableCell>
                                <TableCell align="center" colSpan={2}>{t("person.data.address")}</TableCell>
                                <TableCell align="center">{t("person.data.age")}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {renderPageData()}
                        </TableBody>
                    </Table>

                    <TablePagination onPageChange={(_ev, page) => setPage(page)} rowsPerPage={10} page={page} count={allDocumentsCount} component={Paper}></TablePagination>
                </TableContainer>
            </Paper>
        </Container>
    )
}