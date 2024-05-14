import React from 'react';
import { Tree } from 'react-d3-tree';
import CustomLabelComponentMock from '../mock/labelMockup';
import styled from 'styled-components';
import { setTreeData } from '../redux/features/treeDataSlice';
import { useDispatch } from 'react-redux';
import {cloneDeep} from 'lodash';
import getContexts from '../services/getContextsApi';

const {width, height} = window.screen;

const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #585f6d;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TitleModal = styled.h3`
    margin-bottom: 10px;
`;

const InputModal = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
`;

const CloseButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
`;

const TreeCanvas = ({ data }) => {
    const dispatch = useDispatch();
    const [selectedNode, setSelectedNode] = React.useState(null);
    const [selectedNodePath, setSelectedNodePath] = React.useState([]);
    const [text, setText] = React.useState('');

    const handleNodeClick = (nodeData) => {  
        let path = [];
        let currentNode = nodeData;
        console.log('Node clicked: ', data);
    
        while (currentNode) {
            path.push(currentNode.data.name);
            currentNode = currentNode.parent;
        }
    
        path = path.reverse(); // inverte o caminho para começar da raiz
        setSelectedNode(nodeData);
        setSelectedNodePath(path);
    
        console.log('Path to clicked node: ', nodeData);
    };

    const addNode = (path, text, node) => {
        if (path.length === 0) {
            // Estamos no nó pai, adicione o novo nó aqui
            if (!node.children) {
                node.children = [];
            }
            node.children.push({ name: text, children: [] });
        } else {
            // Ainda não estamos no nó pai, continue procurando
            const nextPathPart = path[0];
            const childNode = node.children.find(child => child.name === nextPathPart);
            if (childNode) {
                addNode(path.slice(1), text, childNode);
            } else {
                console.error('Nó não encontrado: ', nextPathPart);
            }
        }
    };
    
    const handleModalSubmit = async () => {
        let path = [];
        let currentNode = selectedNode;
        while (currentNode) {
            path.push(currentNode.data.name);
            currentNode = currentNode.parent;
        }
        path = path.reverse(); // inverte o caminho para começar da raiz
    
        // Crie uma cópia profunda dos dados atuais
        const newData = cloneDeep(data);

        // Array de novas palavras para adicionar (cada palavra é um novo nó na árvore)
        const contextsCopy = [...selectedNodePath, text];
        const newWords = await getContexts(contextsCopy);
    
        // Adicione o novo nó à cópia dos dados
        newWords.forEach(word => addNode(path.slice(1), word, newData));
    
        // Atualize o estado global com a cópia modificada dos dados
        dispatch(setTreeData(newData));

        handleModalClose();
    };

    const handleGenerateContexts = async () => {
        let path = [];
        let currentNode = selectedNode;
        while (currentNode) {
            path.push(currentNode.data.name);
            currentNode = currentNode.parent;
        }
        path = path.reverse(); // inverte o caminho para começar da raiz
    
        // Crie uma cópia profunda dos dados atuais
        const newData = cloneDeep(data);

        // Array de novas palavras para adicionar (cada palavra é um novo nó na árvore)
        const contextsCopy = [...selectedNodePath];
        const newWords = await getContexts(contextsCopy);
    
        // Adicione o novo nó à cópia dos dados
        newWords.forEach(word => addNode(path.slice(1), word, newData));
    
        // Atualize o estado global com a cópia modificada dos dados
        dispatch(setTreeData(newData));

        handleModalClose();
    }

    const handleModalClose = () => {
        setSelectedNode(null);
        setSelectedNodePath([]);
        setText('');
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
                <Modal>
                    <CloseButton onClick={handleModalClose}>X</CloseButton>
                    <TitleModal>Gerar novas ideias</TitleModal>
                    <button onClick={handleGenerateContexts}>Gerar</button>
                </Modal>
            )}
        </>
        
        
    );
};

export default TreeCanvas;