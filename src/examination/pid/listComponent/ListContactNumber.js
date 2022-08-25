import React from "react";
import { Grid,
    List,
    ListItem, } from "@material-ui/core";

    const ListContactNumber = ({list})=>{
        return (
            
        <Grid container>
        <Grid  md={6}>
          <List >
            <ListItem>
              <strong>Identity</strong>: {list.IDHREmployee}
            </ListItem>
            <ListItem>
              <strong>Office Number</strong>: {list.OfficeNumber}
            </ListItem>
            <ListItem>
              <strong>Home Number</strong>: {list.HomeNumber}
            </ListItem>
            <ListItem>
              <strong>Other Number</strong>: {list.OtherNumber}
            </ListItem>
            <ListItem>
              <strong>Office Number Ext</strong>: {list.OfficeNumberExtension}
            </ListItem>
            <ListItem>
              <strong>Mobile Number</strong>: {list.MobileNumber}
            </ListItem>
          </List>
        </Grid>
        </Grid>
        )
        }
        
        export default ListContactNumber;