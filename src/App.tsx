import React, {useCallback, useEffect, useState} from "react";
import Dropdown from "./components/DropDown";
import {CompanyType, DisplayDataType, OptionsType} from "./types";
import DisplayList from "./components/DisplayList";
import CompanyInfoCard from "./components/CompanyInfoCard";
import styled from "styled-components";

const COMPANY_OPTIONS : OptionsType<CompanyType>[]  = [
  {
    "id" : 1,
    "label" : "Bitbucket",
    "labelIcon" : "/assets/bitbucket.jpeg",
    "value" : {
      id: 1,
      companyName: "Bitbucket",
      companyLogo: "/assets/bitbucket.jpeg"
    }
  },
  {
    "id" : 2,
    "label" : "Facebook",
    "labelIcon" : "/assets/facebook.png",
    "value" : {
      id: 2,
      companyName: "Facebook",
      companyLogo: "/assets/facebook.png"
    }
  },
  {
    "id" : 3,
    "label" : "Twitter",
    "labelIcon" : "/assets/twitter.png",
    "value" : {
      id: 3,
      companyName: "Twitter",
      companyLogo: "/assets/twitter.png"
    }
  },
  {
    "id" : 4,
    "label" : "Slack",
    "labelIcon" : "/assets/slack.svg.png",
    "value" : {
      id: 4,
      companyName: "Slack",
      companyLogo: "/assets/slack.svg.png"
    }
  },
  {
    "id" : 5,
    "label" : "Notion",
    "labelIcon" : "/assets/notion.png",
    "value" : {
      id: 5,
      companyName: "Notion",
      companyLogo: "/assets/notion.png"
    }
  }
]

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 20px;
  align-items: stretch;
  justify-content: space-around;
  margin-top: 100px;
  gap: 100px;
  @media screen and (max-width: 900px) {
   flex-direction: column-reverse;
   justify-content: center;
   align-items: center; 
  }
`

const WrapperItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`

const NextButton = styled.button`
  width: 100%;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: lighter;
  margin-top: 40px;
  height: 40px;
  font-size: small;
  background-color: dodgerblue;
  cursor: pointer;
`

function App () {

  const [selectedOptions, setSelectedOptions] = useState<CompanyType[]>([]);
  const [dropDownOptions, setDropDownOptions] = useState<OptionsType<CompanyType>[]>([...COMPANY_OPTIONS]);

  // helper hook to change the dropdown options whenever an option changes
  useEffect(() =>{
      let _dropDownOptions = COMPANY_OPTIONS.filter((companyOption) => {
        return !selectedOptions.some((selectedOption) => selectedOption.id === companyOption.id );
      })
      setDropDownOptions([..._dropDownOptions]);
  },[selectedOptions])

  // helper function called from the dropDown component whenever an option changes
  const onChange  = useCallback(( value : CompanyType ) => {
    setSelectedOptions((prevSelectedState) => {
      return [...prevSelectedState, value];
    })
  },[]);

  // helper function to remove the selected option
  const removeSelectedOption = useCallback((id: number) => {
    setSelectedOptions((prevSelectedState) => {
      return prevSelectedState.filter((selectedOption) => selectedOption.id !== id)
    })
  },[])

  // render Prop function
  const displayNode = (companyEntity : DisplayDataType<CompanyType>, removeSelectedOption : (id:number) => void) => {
    return <CompanyInfoCard companyInfo={companyEntity} removeEntity={removeSelectedOption} />
  }

  // Whatever functionality that needs to be implemented for the API call
  const onSubmitClick = () => {

  }

  return (
     <AppWrapper>
       <WrapperItem>
         <DisplayList displayList={selectedOptions} totalLength={4} removeEntity={removeSelectedOption} displayNode={displayNode} />
       </WrapperItem>
       <WrapperItem>
         <h3>Let's add your internal tools</h3>
         <p style={{fontWeight:"lighter", marginTop:"-5px", marginBottom:"41px"}}>
           Search to quickly add your products your team uses today. You'll be able to add as many as you need later but for now let's add four.
         </p>
         <Dropdown options={dropDownOptions} onChange={onChange}/>
         {selectedOptions.length === 4 &&  <NextButton onClick={onSubmitClick}>Next</NextButton>}
       </WrapperItem>
     </AppWrapper>
  )
}

export default App;