export const SelectBlock = (props: { logo: any, name: string }) => {
    return (
        <div style={{height: 120}}>
            <div className={"select-block"}>
                <img src={props.logo} alt={props.logo} height={40} width={40} />
                <p style={{marginTop: 30, fontWeight: 600}}>{props.name}</p>
            </div>
        </div>
    );
}
