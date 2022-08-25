import React from "react";
import { Grid,
    List,
    ListItem, } from "@material-ui/core";

const ListComponent = ({list})=>{
return (
    
<Grid container>
<Grid  md={6}>
  <List >
    <ListItem>
      <strong>Identity</strong>: {list.IDHREmployee}
    </ListItem>
    <ListItem>
      <strong>Permanent Address Line 1</strong>: {list.PermanentAddressLine1}
    </ListItem>
    <ListItem>
      <strong>Permanent Address Zone</strong>: {list.PermanentAddressZone}
    </ListItem>
    <ListItem>
      <strong>Temporary Address Line 1</strong>: {list.TemporaryAddressLine1}
    </ListItem>
    <ListItem>
      <strong>Temporary Address Zone</strong>: {list.TemporaryAddressZone}
    </ListItem>
    <ListItem>
      <strong>Permanent Address District</strong>: {list.PermanentAddressDistrict}
    </ListItem>
  </List>
</Grid>
<Grid  md={6} style={{}}>
  <List>
    <ListItem>
      <strong>Temporary Address District</strong>: {list.TemporaryAddressDistrict}
    </ListItem>
    <ListItem>
      <strong>Permanent Address Country</strong>: {list.PermanentAddressCountry}
    </ListItem>
    <ListItem>
      <strong>Temporary Address Country</strong>: {list.TemporaryAddressCountry}
    </ListItem>

    <ListItem>
      <strong>Temporary Town/Village</strong>: {list.TemporaryTownVillage}
    </ListItem>

    <ListItem>
      <strong>Temporary Ward No.</strong>: {list.TemporaryWardNo}
    </ListItem>
    <ListItem>
      <strong>Permanent Town/Village</strong>: {list.PermanentTownVillage}
    </ListItem>
    <ListItem>
      <strong>Permanent Ward No</strong>: {list.PermanentWardNo}
    </ListItem>
  </List>
</Grid>
</Grid>
)
}

export default ListComponent;