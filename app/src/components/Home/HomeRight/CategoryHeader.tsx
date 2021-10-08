import {Divider, Typography} from 'antd';

export const CategoryHeader = (props: {heading: String}) => {
    return (
        <div>
            <Typography.Title level={2} style={{color: "#fff", marginTop: 20}}>{props.heading}</Typography.Title>
            <Divider style={{backgroundColor: "#2f85af"}} />
        </div>
    )
}
