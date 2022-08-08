import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import DeliveryExpensesSummary from "../../app/ccomponents/DeliveryExpensesSummary";
import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    const { basket } = useAppSelector(state => state.basket);

    const subtotal = basket?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
    const deliveryFee = subtotal/100 > 100 ? 0 : 500;

    return (
        <DeliveryExpensesSummary subtotal={subtotal} deliveryFee={deliveryFee}/>
    )
}