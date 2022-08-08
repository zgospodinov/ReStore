import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import DeliveryExpensesSummary from "../../app/ccomponents/DeliveryExpensesSummary";
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import BasketTable from "../Basket/BasketTable";
import { fetchOrderAsync, ordersSelector } from "./ordersSlice";

export default function OrderDetails() {
    const history = useHistory();

    const { id } = useParams<{ id: string }>();
    const order = useAppSelector(state => ordersSelector.selectById(state, id));
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!order) {
            dispatch(fetchOrderAsync(parseInt(id)))
        }
    }, [id, order, dispatch])

    return (
        <>
            <Grid container spacing={2} sx={{ mb: 5 }}>
                <Grid item xs={10}>
                    <Typography variant="h4">
                        Order # {order?.id} - {order?.orderStatus}
                    </Typography>
                </Grid>

                <Grid item xs={2} alignContent='right'>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={() => history.push('/order')}>

                        BACK TO ORDERS
                    </Button>
                </Grid>
            </Grid>


            <BasketTable items={order?.orderItems as BasketItem[]} isBasket={false} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <DeliveryExpensesSummary subtotal={order?.subtotal!} deliveryFee={order?.deliveryFee!} />

                </Grid>
            </Grid>
        </>
    )
}