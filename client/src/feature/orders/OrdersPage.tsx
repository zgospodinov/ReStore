import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import { fetchOrdersAsync, ordersSelector } from "./ordersSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";


export default function OrdersPage() {
    const ordersList = useAppSelector(ordersSelector.selectAll);
    const { ordersLoaded } = useAppSelector(state => state.orders);
    const dispatch = useAppDispatch();

    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!ordersLoaded) dispatch(fetchOrdersAsync());
    }, [dispatch, ordersLoaded])

    if (!ordersLoaded) return <LoadingComponent message="Loading orders..." />

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order number</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Order Status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordersList.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                            <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="right">{order.orderStatus}</TableCell>
                            <TableCell align="center">
                                <Button component={Link} to={`/order/${order.id}`} size="small" variant="outlined">View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}