import React from "react";
import { Grid,
    List,
    ListItem, } from "@material-ui/core";

    const ListEmail = ({list})=>{
        return (
            
        <Grid container>
        <Grid  md={6}>
          <List >
            <ListItem>
              <strong>Identifier</strong>: {list.IDHREmployee}
            </ListItem>
            <ListItem>
              <strong>Email Address</strong>: {list.EmailID}
            </ListItem>
            <ListItem>
              <strong>Alternate Email Address</strong>: {list.AlternateEmailID}
            </ListItem>
            <ListItem>
              <strong>Skype ID</strong>: {list.SkypeID}
            </ListItem>
          </List>
        </Grid>
        </Grid>
        )
        }
        
        export default ListEmail;