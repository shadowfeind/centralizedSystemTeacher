import React from "react";
import { Grid,
    List,
    ListItem, } from "@material-ui/core";

    const ListJobHistory = ({list})=>{
        return (
            
        <Grid container>
        <Grid  md={6}>
          <List >
            <ListItem>
              <strong>Identity</strong>: {list.IDHREmployee}
            </ListItem>
            <ListItem>
              <strong>Login Name</strong>: {list.LoginIDHREmployee}
            </ListItem>
            <ListItem>
              <strong>Full Name</strong>: {list.FullName}
            </ListItem>
          </List>
        </Grid>
        </Grid>
        )
        }
        
        export default ListJobHistory;    