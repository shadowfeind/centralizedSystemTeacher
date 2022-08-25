import React from "react";
import { Grid,
    List,
     ListItem } from "@material-ui/core";



const ListPersonalInformation = ({list})=>{
    return(
        <Grid container>
        <Grid  md={6}>
          <List >
            <ListItem>
              <strong>Identifier</strong>: {list.IDHREmployee}
            </ListItem>
            <ListItem>
              <strong>Login ID</strong>: {list.LoginIDHREmployee}
            </ListItem>
            <ListItem>
              <strong>Title</strong>: {list.Title}
            </ListItem>
            <ListItem>
              <strong>Joined Position</strong>: {list.JoinedPosition}
            </ListItem>
            <ListItem>
              <strong>Position</strong>: {list.Position}
            </ListItem>
            <ListItem>
              <strong>Alternate Email Address</strong>: {list.IDHRSalaryScale}
            </ListItem>
            <ListItem>
              <strong>Joined Level</strong>: {list.JoinedLevel}
            </ListItem>
          </List>
        </Grid>
        <Grid  md={6}>
          <List >
            <ListItem>
              <strong>Date Of Joining</strong>: {list.DOJ.slice(0,10)}
            </ListItem>
            <ListItem>
              <strong>First Name</strong>: {list.FirstName}
            </ListItem>
            <ListItem>
              <strong>Middle Name</strong>: {list.MiddleName}
            </ListItem>
            <ListItem>
              <strong>Last Name</strong>: {list.LastName}
            </ListItem>
            <ListItem>
              <strong>Gender</strong>: {list.Sex}
            </ListItem>
            <ListItem>
              <strong>Is Married</strong>: {list.Married}
            </ListItem>
            <ListItem>
              <strong>Date Of Birth</strong>: {list.DOB.slice(0,10)}
            </ListItem>
            <ListItem>
              <strong>Blood Group</strong>: {list.BloodGroup}
            </ListItem>
            <ListItem>
              <strong>Speaking Language</strong>: {list.SpeakingLanguage}
            </ListItem>
            <ListItem>
              <strong>Reading and Writing Language</strong>: {list.ReadingWritingLanguage}
            </ListItem>
            <ListItem>
              <strong>Computer Literacy Level</strong>: {list.ComputerLiteracyLevel}
            </ListItem>
            <ListItem>
              <strong>Computer Literacy Area</strong>: {list.ComputerLiteracyArea}
            </ListItem>
            <ListItem>
              <strong>Is Nepali Resident</strong>: {list.IsNepaliResident}
            </ListItem>
            {/* <ListItem>
              <strong>Skype ID</strong>: {list.VehicleFacility}
            </ListItem>
            <ListItem>
              <strong>Skype ID</strong>: {list.HomeFacility}
            </ListItem>
            <ListItem>
              <strong>Skype ID</strong>: {list.ComputerFacility}
            </ListItem>
            <ListItem>
              <strong>Skype ID</strong>: {list.MobileFacility}
            </ListItem> */}
            <ListItem>
              <strong>Bank Account</strong>: {list.BankAC}
            </ListItem>
            <ListItem>
              <strong>Religion</strong>: {list.Religion}
            </ListItem>
          </List>
        </Grid>
        </Grid>
    )

}

export default ListPersonalInformation;