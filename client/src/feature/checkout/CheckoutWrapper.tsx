import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../Basket/basketSlice";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51LUrOEKjNAFTLqPH6gTcEAD2vPiKWAuOcTOZ6HF4edcoAvcplPt4E0gnpI4j2aQBkR6wYrtdyaOhrScsP1ifImKy00jXywNEsD');

export default function CheckoutWrapper(){
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [dispatch]);

    if(loading) return <LoadingComponent message="Loading checkout..."/>
    
    
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}