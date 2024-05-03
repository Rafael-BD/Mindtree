import React from 'react';
import { Tree } from 'react-d3-tree';
import * as d3 from 'd3';
import CustomLabelComponent from './labelMockup';

const MyTreeComponent = ({ data }) => {
    // Função para iniciar o drag do nó
    const dragStarted = (event, d) => {
        if (!event.active) treeLayout.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    // Função para arrastar o nó
    const dragged = (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
    };

    // Função para finalizar o drag do nó
    const dragEnded = (event, d) => {
        if (!event.active) treeLayout.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    };

    // Configuração do layout da árvore
    const treeLayout = d3.tree().size([500, 500]);
    
    return (
        <Tree 
        data={data} 
        orientation="vertical" 
        translate={{ x: 250, y: 50 }} 
        nodeSize={{ x: 200, y: 100 }}
        separation={{ siblings: 1, nonSiblings: 2 }}
        allowForeignObjects
        nodeSvgShape={{
            shape: 'circle',
            shapeProps: {
            r: 10,
            },
        }}
        collapsible={false}
        onClick={null}
        nodeLabelComponent={{
            render: <CustomLabelComponent />,
            foreignObjectWrapper: {
            x: -100,
            y: -50,
            },
        }}
        zoomable={false}
        onNodeClick={null}
        onNodeMouseOver={null}
        onNodeMouseOut={null}
        onLinkClick={null}
        onLinkMouseOver={null}
        onLinkMouseOut={null}
        onNodeDragStart={dragStarted}
        onNodeDrag={dragged}
        onNodeDragEnd={dragEnded}
        />
    );
};

export default MyTreeComponent;
