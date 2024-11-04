import React from "react";

interface boardProps {
    value?: string | null;
    onClick?: () => void;
}



const Block: React.FC<boardProps> = (props) => {
    return (
        <div onClick={props.onClick} className="Block">
            {props.value}
        </div>
    )
}

export default Block;