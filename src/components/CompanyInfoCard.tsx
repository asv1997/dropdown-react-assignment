import React from "react";
import {DisplayDataType,CompanyType} from "../types";
import styled from "styled-components"

const CompanyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc((100% - var(--gap))/2);
  padding: 20px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  min-height: 200px;
  gap: 40px;
  &.center-align{
    justify-content: center; 
  }
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  .company-logo{
    height: 30px;
    width: 30px;
    object-fit: contain;
  }
  .company-name{
    font-weight: bold;
  }
`

const RemoveOption = styled.span`
  display: block;
  color: lightslategrey;
  font-size: small;
`

const AddCompanyBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  font-size: 20px;
  font-weight: lighter;
  background-color: rgba(242, 242, 255, 0.89);
  color: lightslategrey;
  border-radius: 8px;
`



const CompanyInfoCard = ({companyInfo, removeEntity}:{companyInfo: DisplayDataType<CompanyType>, removeEntity: (id:number) => void}) => {
    if (!("companyLogo" in companyInfo) || !("companyName" in companyInfo)) {
       return (
           <CompanyWrapper className="center-align">
              <AddCompanyBlock>+</AddCompanyBlock>
           </CompanyWrapper>
       )
    }
    return (
        <CompanyWrapper>
            <CompanyInfo>
                <img className="company-logo" src={companyInfo.companyLogo} alt="company-logo"/>
                <span className="company-name">{companyInfo.companyName}</span>
            </CompanyInfo>
            <RemoveOption onClick={() => removeEntity(companyInfo.id)} style={{cursor:"pointer"}}>
                <span style={{color:"red", fontWeight:"bold"}} className=".remove-cross">{`X `}</span> Remove
            </RemoveOption>
        </CompanyWrapper>
    )
}

export default CompanyInfoCard;