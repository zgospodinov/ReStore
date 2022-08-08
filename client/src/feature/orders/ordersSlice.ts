import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../app/models/order";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface OrdersState {
    ordersLoaded: boolean;
    status: string;
}

const ordersAdapter = createEntityAdapter<Order>();

export const fetchOrdersAsync = createAsyncThunk<Order[]>(
    'order/fetchOrdersAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Orders.list();
            
        } catch (err: any) {
            thunkAPI.rejectWithValue({ error: err.data })
        }
    }
)

export const fetchOrderAsync = createAsyncThunk<Order, number>(
    'order/fetchOrderAsync',
    async (orderId, thunkAPI) =>{
        try {
            return await agent.Orders.fetch(orderId);
        } catch (error) {
            thunkAPI.rejectWithValue({error: error})
        }
    }
)

export const ordersSlise = createSlice({
    name: 'orders',
    initialState: ordersAdapter.getInitialState<OrdersState>({
        ordersLoaded: false,
        status: 'idle',
    }),
    reducers: {

    },
    extraReducers: (builder => {

        builder.addCase(fetchOrdersAsync.pending, (state) => {
            state.status = 'pendingFetchOrdersAsync';
        });

        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            state.ordersLoaded = true;
            state.status = 'idle';
            ordersAdapter.setAll(state, action.payload);
        });

        builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        
        builder.addCase(fetchOrderAsync.pending, (state) =>{
            state.status = 'pendingFetchOrderAsync';
        });
        builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            ordersAdapter.upsertOne(state, action.payload); 
        });
        builder.addCase(fetchOrderAsync.rejected, (state, action) =>{
            state.status = 'idle';
            console.log(action.payload);
        }) 
    })
})

export const ordersSelector = ordersAdapter.getSelectors((state: RootState) => state.orders);