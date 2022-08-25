import React from "react";
import { Grid,
    List,
     ListItem } from "@material-ui/core";



const ListGuardian = ({list})=>{
    return(
        <Grid container>
        <Grid  md={6}>
          <List >
            <ListItem>
              <strong>Identity</strong>: {list.IDHREmployee}
            </ListItem>
            <ListItem>
              <strong>Father Name</strong>: {list.FatherName}
            </ListItem>
            <ListItem>
              <strong>Father Contact No</strong>: {list.FatherContactNo}
            </ListItem>
            <ListItem>
              <strong>Father Occupation</strong>: {list.FatherOccupation}
            </ListItem>
            <ListItem>
              <strong>FatherWorking Designation</strong>: {list.FatherWorkingDesignation}
            </ListItem>
            <ListItem>
              <strong>Father Working Organization</strong>: {list.FatherWorkingOrganization}
            </ListItem>
            <ListItem>
              <strong>Father Email</strong>: {list.FatherEmail}
            </ListItem>
          </List>
        </Grid>
        <Grid  md={6}>
          <List >
            <ListItem>
              <strong>Mother Name</strong>: {list.MotherName}
            </ListItem>
            <ListItem>
              <strong>Mother Contact No</strong>: {list.MotherContactNo}
            </ListItem>
            <ListItem>
              <strong>Mother Occupation</strong>: {list.MotherOccupation}
            </ListItem>
            <ListItem>
              <strong>MotherWorking Designation</strong>: {list.MotherWorkingDesignation}
            </ListItem>
            <ListItem>
              <strong>Mother Working Organization</strong>: {list.MotherWorkingOrganization}
            </ListItem>
            <ListItem>
              <strong>Mother Email</strong>: {list.MotherEmail}
            </ListItem>
            <ListItem>
              <strong>LocalGuardian Name</strong>: {list.LocalGuardianName}
            </ListItem>
            <ListItem>
              <strong>LocalGuardian Contact No</strong>: {list.LocalGuardianContactNo}
            </ListItem>
            <ListItem>
              <strong>LocalGuardian Occupation</strong>: {list.LocalGuardianOccupation}
            </ListItem>
            <ListItem>
              <strong>LocalGuardianWorking Designation</strong>: {list.LocalGuardianWorkingDesignation}
            </ListItem>
            <ListItem>
              <strong>LocalGuardian Working Organization</strong>: {list.LocalGuardianWorkingOrganization}
            </ListItem>
            <ListItem>
              <strong>LocalGuardian Email</strong>: {list.LocalGuardianEmail}
            </ListItem>
          </List>
        </Grid>
        </Grid>
    )

}

export default ListGuardian;