import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount } from "../count/countSlice";
import { useGetPostsQuery } from "../../services/auth";
const Count = () => {
    const dispatch = useDispatch()
    const count = useSelector((state) => state.count)
    const { data, error, isLoading } = useGetPostsQuery();
    console.log("redis", data, error, isLoading)
    const onIncrement = () => {
        dispatch(increment())
    }
    const onDecrement = () => {
        dispatch(decrement())
    }
    const onIncrementByAmount = () => {
        dispatch(incrementByAmount(5))
    }
    return(
        <>
        <h4>{count.value}</h4>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrementByAmount}>+++</button>

        </>
    )
}
export default Count;