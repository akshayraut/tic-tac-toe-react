import React from "react";

interface participantsDetailsPropI {
    value?: any;
}

const ParticipantsDetails: React.FC<participantsDetailsPropI> = (props) => {
    return (
        <>
            
            <h1 className="message">
                Winner is: {props.value}
            </h1>
            
        
        </>
    )
}

export default ParticipantsDetails;
