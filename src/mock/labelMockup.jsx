import React from 'react';

const CustomLabelComponent = ({ nodeData }) => {
    return (
        <g>
            <circle r={15} fill={nodeData.color} />
            <text x={20} y={4} fontSize={12} fontFamily="Arial" fill="#000000">{nodeData.name}</text>
        </g>
    );
};

export default CustomLabelComponent;
