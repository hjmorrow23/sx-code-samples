import React from 'react';

const DollarInput: React.FunctionComponent = () => {
    return (
        <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">$</span>
        </div>
    );
}

export default DollarInput;