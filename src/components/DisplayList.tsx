import React, {ReactElement, useEffect, useState} from "react";
import styled from "styled-components";
import {DisplayDataType} from "../types";

const DisplayWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
`



const DisplayContainer = styled.div`
  --gap : 60px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  column-gap: var(--gap);
  width: 100%;
`



interface DisplayListType <T> {
    displayList : T[],
    totalLength: number,
    removeEntity : (id:number) => void,
    displayNode: (displayData : DisplayDataType<T>, removeEntity : (id:number) => void) => ReactElement
}

// Made this list dynamic in such it can render whatever list item we need to render and other required params
function DisplayList <T> ({displayList, totalLength, removeEntity, displayNode} : DisplayListType<T>) {
    const [displayEntities, setDisplayEntites] = useState<DisplayDataType<T>[]>([]);
    useEffect(() => {
        let list : DisplayDataType<T>[] = [];
        displayList.forEach((displayEntity) => {
            list.push({...displayEntity, isPresent: true})
        })
        for(let i = displayList.length-1; i<totalLength-1;i++){
            list.push({isPresent: false})
        }
        setDisplayEntites([...list]);
    },[displayList,totalLength]);
    return (
        <DisplayWrapper>
            <DisplayContainer>
                {
                    displayEntities.map((displayEntity) => {
                        return displayNode(displayEntity, removeEntity)
                    })
                }
            </DisplayContainer>
            <span style={{fontSize:"small", fontWeight:"lighter", color:"black"}}>{`${displayList.length} Product(s) Added`}</span>
        </DisplayWrapper>
    )
}

export default DisplayList;