import Lottie from "react-lottie";
import loader from "../../assets/loader.json";
export const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className={"loading-view"}>
            <Lottie
                options={defaultOptions}
                height={"200"}
                width={"200"}
            />
        </div>
    )
}
