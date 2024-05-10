import React from 'react';
import { Tree } from 'react-d3-tree';
import CustomLabelComponentMock from '../mock/labelMockup';
import styled from 'styled-components';
import { setTreeData } from '../redux/features/treeDataSlice';
import { useDispatch } from 'react-redux';

const {width, height} = window.screen;


const TreeCanvas = ({ data }) => {
    const dispatch = useDispatch();
    const [selectedNode, setSelectedNode] = React.useState(null);
    const [text, setText] = React.useState('');

    const handleNodeClick = (nodeData) => {  
        let path = [];
        let currentNode = nodeData;
    
        while (currentNode) {
            path.push(currentNode.data.name);
            currentNode = currentNode.parent;
        }
    
        path = path.reverse(); // inverte o caminho para começar da raiz
    
        console.log('Path to clicked node: ', path);
    };

    const handleModalSubmit = () => {
        // atualiza o estado global com o novo texto no nó selecionado
        //FIXME: implementar a atualização do texto no nó selecionado corretamente
        dispatch(setTreeData({
            name: selectedNode.data.name,
            text: text,
        }));
    };

    return (
        <>
            <Tree 
                data={data} 
                orientation="vertical" 
                translate={{ x: width / 2, y: 60 }} 
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
                onNodeClick={handleNodeClick}
                nodeLabelComponent={{
                    render: <CustomLabelComponentMock />,
                    foreignObjectWrapper: {
                        x: -100,
                        y: -50,
                    },
                }}
                zoomable={false}
            />
            {selectedNode && (
                <div
                    style={{
                        position: 'absolute',
                        top: selectedNode.y + 100,
                        left: selectedNode.x,
                    }}
                >
                    <div>
                        <h3>Título</h3>
                        <input type="text" />
                    </div>
                    <div>
                        <h3>Texto</h3>
                        <textarea></textarea>
                    </div>
                    <button onClick={() => handleModalSubmit('Título', 'Texto')}>
                        Enviar
                    </button>
                </div>
            )}
        </>
        
        
    );
};

export default TreeCanvas;