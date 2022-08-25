// import React, { useEffect, useState } from "react";
// import { Button, Grid } from "@material-ui/core";
// import InputControl from "../../../components/controls/InputControl";
// import { useForm, Form } from "../../../customHooks/useForm";
// import { useDispatch, useSelector } from "react-redux";
// import SelectControl from "../../../components/controls/SelectControl";
// import { API_URL } from "../../../constants";
// import { putClassScheduleAction } from "./ClassPgScheduleActions";

// const initialFormValues = {
//   Id: 1,
//   Area: "Academic Calendar",
//   Heading: "PG",
//   DocumentName: "",
//   IDHREmployee: 0,
//   IsActive: true,
//   Created_On: "2022-02-06T13:33:17.82",
//   Updated_On: "2022-02-06T13:33:17.82",
// };
// const ClassPgScheduleForm = ({ schedule, setOpenPopup }) => {
//   const [image, setImage] = useState("");
//   const [imgSrc, setImgSrc] = useState("");

//   const dispatch = useDispatch();
//   const validate = () => {
//     let temp = { ...errors };
//     temp.img = !image ? "This feild is required" : "";

//     setErrors({ ...temp });
//     return Object.values(temp).every((x) => x === "");
//   };

//   const { values, setValues, handleInputChange, errors, setErrors } =
//     useForm(initialFormValues);

//   useEffect(() => {
//     if (schedule) {
//       setValues({ ...schedule.dbModel });
//     }
//   }, [schedule]);

//   const test = [{ Key: "", Value: "" }];

//   const handleImage = (event) => {
//     let imageFile = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (x) => {
//       setImgSrc(x.target.result);
//     };
//     reader.readAsDataURL(imageFile);
//     setImage(event.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       dispatch(
//         putClassScheduleAction(values, image, schedule.searchFilterModel)
//       );
//     }
//   };
//   return (
//     <Form onSubmit={handleSubmit}>
//       <Grid container style={{ fontSize: "12px" }}>
//         <Grid item xs={6}>
//           <SelectControl
//             name="IsActive"
//             label="IsActive"
//             value={values.IsActive}
//             onChange={handleInputChange}
//             options={schedule ? schedule.ddlIsActive : test}
//           />
//           <InputControl
//             name="ImageUploaded"
//             label="Select File"
//             onChange={(e) => handleImage(e)}
//             type="file"
//             errors={errors.img}
//           />

//           <img
//             src={imgSrc ? imgSrc : schedule && `${API_URL}${schedule.FullPath}`}
//             height={200}
//             width={200}
//           />
//         </Grid>
//         <Grid item xs={6}></Grid>
//       </Grid>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "end",
//           paddingTop: "10px",
//           marginTop: "10px",
//           borderTop: "1px solid #f3f3f3",
//         }}
//       >
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => setOpenPopup(false)}
//           style={{ margin: "10px 0 0 10px" }}
//         >
//           CANCEL
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           style={{ margin: "10px 0 0 10px" }}
//         >
//           SUBMIT
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default ClassPgScheduleForm;
