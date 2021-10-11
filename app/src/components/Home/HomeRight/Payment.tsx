import { useAppSelector } from "../../../store/hooks";
import { PayButton } from "../../Common/PayButton"
import { CategoryHeader } from "./CategoryHeader"
import { PaymentSummary } from "./PaymentSummary"

export const Payment = () => {
    const paymentOptions = useAppSelector(state => state.payment);
    if(!paymentOptions.coin) {
        return null;
    }
    return(
        <>
            <CategoryHeader heading={"Payment Summary"} />
            <PaymentSummary />
            <PayButton />
        </>
    )
}