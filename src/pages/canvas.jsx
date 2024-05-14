import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TreeCanvas from '../components/treeCanvas.jsx';
import { setTreeData } from '../redux/features/treeDataSlice.js';

const Container = styled.div`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
`;

const Canvas = () => {
    const dispatch = useDispatch();
    const treeData = useSelector(state => state.treeData);

    // set tree data mockup for testing
    useEffect(() => {
        dispatch(setTreeData({
            name: "brainstorming",
            children: [
                {
                    name: "website",
                    children: [
                        { 
                            name: "Sub-ideia 1.1" ,
                            children: []
                        },
                        { 
                            name: "rede social",
                            children: []
                        }
                    ]
                },
                {
                    name: "Ideia 2",
                    children: [
                        { 
                            name: "Sub-ideia 2.1",
                            children: []
                        },
                        { name: "Sub-ideia 2.2",
                            children: []
                        }
                    ]
                }
            ]
        }));
    }, [dispatch]);

    return (
        <Container>
            {
                treeData && <TreeCanvas data={treeData} />
            }
            
        </Container>
    );
};

export default Canvas;