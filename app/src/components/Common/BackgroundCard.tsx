import {FunctionComponent} from "react";

export const BackgroundCard: FunctionComponent<any> = ({ children }) => {
    return (
        <div className={"background-card"}>
            {children}
        </div>
    )
}
