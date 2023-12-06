import React, {useCallback, useEffect, useRef, useState} from "react";
import styled,{keyframes} from "styled-components";
import {DropDownType, OptionsType} from "../types";

// animation keyframe for sliding up and down
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const DropDownContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  background-color: #dbdee8;
  color: lightslategrey;
  outline: none;
  border-radius: 8px;
  padding: 0 10px;
  &:focus {
    background-color: white;
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`

const DropDownContent = styled.div`
   padding: 5px 10px;
   margin-top: 20px;
   width: 100%;
   height: 200px;
   overflow-y: scroll;
   background: white;
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   justify-content: flex-start;
   animation: ${slideDown} 0.3s ease;
`

const DropDownItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 10px 0 10px 0;
  padding: 10px 10px;
  cursor: pointer;
  &:hover {
    background-color: dodgerblue;
        & span {
          color: white;
        }  
    border-radius: 8px; 
    }
  & span {
    color: black;
    display: block;
  }
  & img {
    height: 30px;
    width: 30px;
    object-fit: contain;
    flex-shrink: 0;
    display: block;
  }
`

const EmptyMessageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

function Dropdown <T> ({options, onChange} : DropDownType<T>)  {

    const [dropDownOptions, setDropDownOptions] = useState<OptionsType<T>[]>([...options]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isDropDownOptionsVisible, setIsDropDownOptionsVisible] = useState(false);
    const dropDownRef = useRef(null);

    // TODO : implement debounce logic for search functionality

    useEffect(() => {
        if(inputValue.trim().length){
            setDropDownOptions(() => {
                return options.filter((option) => option.label.includes(inputValue));
            })
        }
        else{
            setDropDownOptions([...options]);
        }
    },[inputValue,options])

    // for closing and opening the Dropdown list based on the mouse events
    useEffect(() => {
        const eventListener = function (event:MouseEvent) {
            // @ts-ignore
            if(dropDownRef.current && !(dropDownRef.current.contains(event.target))){
                setIsDropDownOptionsVisible(false);
            }
        }
        window.addEventListener('click',  eventListener);
        return () => {
            window.removeEventListener('click', eventListener);
        }
    })

    const handleChange = useCallback((option : OptionsType<T>) : void => {
        onChange(option.value);
    },[onChange]);

    return (
        <DropDownContainer ref={dropDownRef} onFocus={() => setIsDropDownOptionsVisible(true)}>
            <SearchInput
                placeholder="Search here" value={inputValue}
                onChange={(e) => setInputValue(e.target.value) } />
            {
                isDropDownOptionsVisible && (
                        <DropDownContent>
                            {
                                dropDownOptions.map((option) => {
                                    return (
                                        <DropDownItem onClick={() => {
                                            handleChange(option)
                                        }} key={option.id}>
                                            <img alt="dropDownLogo" src={option.labelIcon}/>
                                            <span>{option.label}</span>
                                        </DropDownItem>
                                    )
                                })
                            }
                            {
                                !dropDownOptions.length && (
                                    <EmptyMessageContainer>
                                        <span>No Valid Options Found</span>
                                    </EmptyMessageContainer>
                                )
                            }
                        </DropDownContent>
                )
            }
        </DropDownContainer>
    )
}

export default Dropdown;