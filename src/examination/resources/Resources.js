import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";
import {
  Button,
  makeStyles,
  Toolbar,
  TableBody,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import LoadingComp from "../../components/LoadingComp";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import SelectControl from "../../components/controls/SelectControl";
import { Search } from "@material-ui/icons";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import Popup from "../../components/Popup";
import {
  DOWNLOAD_RESOURCES_RESET,
  GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_RESET,
  GET_ALL_RESOURCES_INITIAL_DATA_RESET,
  GET_ALL_RESOURCES_LIST_RESET,
  GET_CREATE_RESOURCES_RESET,
  POST_RESOURCES_RESET,
} from "./ResourcesConstants";
import {
  getAllInitialDataFromSubjectAction,
  getAllInitialResourcesDataAction,
  getAllOtherOptionsForResourcesSelectAction,
  getAllResourcesListAction,
  getCreateResourceAction,
} from "./ResourcesActions";
import ResourcesTableCollapse from "./ResourcesTableCollapse";
import ResourcesForm from "./ResourcesForm";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
  customInput: {
    minWidth: "200px",
  },
}));

const tableHeader = [
  { id: "CourseName", label: "Resource Name" },
  { id: "CourseDescription", label: "Resource Description" },
  { id: "FirstName", label: "Posted By" },
  { id: "Created_On", label: "Effective From" },
  { id: "IsActive", label: "IsActive" },
  { id: "File", label: "Download", disableSorting: true },
];

const Resources = () => {
  const { id: subjectIdFromDashboard } = useParams();
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [programDdl, setProgramDdl] = useState([]);
  const [ddlShift, setDdlShift] = useState([]);
  const [ddlSection, setDdlSection] = useState([]);
  const [ddlSubject, setDdlSubject] = useState([]);

  const [programValue, setProgramValue] = useState("");
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [errors, setErrors] = useState({});

  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.CourseName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const test = [{ Key: "", Value: "" }];

  const { allInitialData, error: allInitialDataError } = useSelector(
    (state) => state.getAllInitialResourcesData
  );
  const {
    allResources,
    loading,
    error: allResourcesError,
  } = useSelector((state) => state.getAllResourcesList);
  const { allOtherResourcesOptions, error: allOtherResourcesOptionsError } =
    useSelector((state) => state.getAllOtherOptionsForResourcesSelect);

  const { getCreateResource, error: getCreateResourceError } = useSelector(
    (state) => state.getCreateResource
  );
  const { success: postResourceSuccess, error: postResourceError } =
    useSelector((state) => state.postResource);

  const {
    success: downloadResourcesSuccess,
    file: downloadFile,
    error: downloadResourcesError,
  } = useSelector((state) => state.downloadResource);

  if (downloadFile) {
    var blob = new Blob([downloadFile]);
    var url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  if (allInitialDataError) {
    setNotify({
      isOpen: true,
      message: allInitialDataError,
      type: "error",
    });
    dispatch({ type: GET_ALL_RESOURCES_INITIAL_DATA_RESET });
  }

  if (downloadResourcesError) {
    setNotify({
      isOpen: true,
      message: downloadResourcesError,
      type: "error",
    });
    dispatch({ type: DOWNLOAD_RESOURCES_RESET });
  }
  // if (allResourcesError) {
  //   setNotify({
  //     isOpen: true,
  //     message: allResourcesError,
  //     type: "error",
  //   });
  //   dispatch({ type: GET_ALL_RESOURCES_LIST_RESET });
  // }
  if (allOtherResourcesOptionsError) {
    setNotify({
      isOpen: true,
      message: allOtherResourcesOptionsError,
      type: "error",
    });
    dispatch({ type: GET_ALL_OTHER_OPTIONS_FOR_RESOURCES_SELECT_RESET });
  }
  if (getCreateResourceError) {
    setNotify({
      isOpen: true,
      message: getCreateResourceError,
      type: "error",
    });
    dispatch({ type: GET_CREATE_RESOURCES_RESET });
  }
  if (postResourceError) {
    setNotify({
      isOpen: true,
      message: postResourceError,
      type: "error",
    });
    dispatch({ type: POST_RESOURCES_RESET });
  }
  if (postResourceSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Created",
      type: "success",
    });
    dispatch({ type: POST_RESOURCES_RESET });
    setOpenPopup(false);
    dispatch(
      getAllResourcesListAction(
        subject,
        acaYear,
        programValue,
        classId,
        section,
        shift
      )
    );
  }

  useEffect(() => {
    if (allInitialData) {
      setDdlSubject(allInitialData.searchFilterModel.ddlSubjectForTeacher);
      setDdlClass(allInitialData.searchFilterModel.ddlLevelPrimitive);
      setAcademicYearDdl(allInitialData.searchFilterModel.ddlAcademicYear);
      setDdlShift(allInitialData.searchFilterModel.ddlAcademicShift);
      setDdlSection(allInitialData.searchFilterModel.ddlSection);
      setProgramDdl(allInitialData.searchFilterModel.ddlFacultyProgramLink);
      if (subjectIdFromDashboard) {
        setSubject(subjectIdFromDashboard);
        dispatch(
          getAllOtherOptionsForResourcesSelectAction(
            allInitialData.modelDb.IDHREmployee,
            subjectIdFromDashboard
          )
        );
      } else {
        setSubject(
          allInitialData.searchFilterModel.ddlSubjectForTeacher[0]?.Key
        );
        dispatch(
          getAllOtherOptionsForResourcesSelectAction(
            allInitialData.modelDb.IDHREmployee,
            allInitialData.searchFilterModel.ddlSubjectForTeacher[0]?.Key
          )
        );
      }
    }
  }, [allInitialData, dispatch]);

  useEffect(() => {
    dispatch({ type: GET_ALL_RESOURCES_LIST_RESET });
    dispatch(getAllInitialResourcesDataAction());
  }, []);

  useEffect(() => {
    if (allResources) {
      setTableData([...allResources.dbModelTeacherLst]);
    }
  }, [allResources]);
  useEffect(() => {
    if (allOtherResourcesOptions) {
      setAcaYear(
        allOtherResourcesOptions.year.length > 0
          ? allOtherResourcesOptions.year[0]?.Key
          : ""
      );
      setProgramValue(
        allOtherResourcesOptions.program.length > 0
          ? allOtherResourcesOptions.program[0]?.Key
          : ""
      );
      setClassId(
        allOtherResourcesOptions.classId.length > 0
          ? allOtherResourcesOptions.classId[0]?.Key
          : ""
      );
      setSection(
        allOtherResourcesOptions.section.length > 0
          ? allOtherResourcesOptions.section[0]?.Key
          : ""
      );
      setShift(
        allOtherResourcesOptions.shift.length > 0
          ? allOtherResourcesOptions.shift[0]?.Key
          : ""
      );
      dispatch(
        getAllResourcesListAction(
          subject,
          allOtherResourcesOptions.year.length > 0
            ? allOtherResourcesOptions.year[0]?.Key
            : "",
          allOtherResourcesOptions.program.length > 0
            ? allOtherResourcesOptions.program[0]?.Key
            : "",
          allOtherResourcesOptions.classId.length > 0
            ? allOtherResourcesOptions.classId[0]?.Key
            : "",
          allOtherResourcesOptions.section.length > 0
            ? allOtherResourcesOptions.section[0]?.Key
            : "",
          allOtherResourcesOptions.shift.length > 0
            ? allOtherResourcesOptions.shift[0]?.Key
            : ""
        )
      );
    }
  }, [allOtherResourcesOptions]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.programValue = !programValue ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.shift = !shift ? "This feild is required" : "";
    temp.section = !section ? "This feild is required" : "";
    temp.subject = !subject ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSearchResources = () => {
    if (validate()) {
      dispatch(
        getAllResourcesListAction(
          subject,
          acaYear,
          programValue,
          classId,
          section,
          shift
        )
      );
    }
  };

  const subjectHandler = (value) => {
    setSubject(value);
    dispatch(
      getAllOtherOptionsForResourcesSelectAction(
        allInitialData.modelDb.IDHREmployee,
        value
      )
    );
  };

  const handleCreate = () => {
    if (validate()) {
      dispatch(
        getCreateResourceAction(
          subject,
          acaYear,
          programValue,
          classId,
          section,
          shift
        )
      );
      setOpenPopup(true);
    }
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Sujbect"
                label="Subject Name"
                value={subject}
                onChange={(e) => subjectHandler(e.target.value)}
                options={ddlSubject ? ddlSubject : test}
                errors={errors.subject}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => setAcaYear(e.target.value)}
                options={academicYearDdl ? academicYearDdl : test}
                errors={errors.acaYear}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <SelectControl
                name="Program/Faculty"
                label="Program/Faculty"
                value={programValue}
                onChange={(e) => setProgramValue(e.target.value)}
                options={programDdl ? programDdl : test}
                errors={errors.programValue}
              />
            </Grid> */}
            {/* <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="Classes"
                label="Class"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass ? ddlClass : test}
                errors={errors.classId}
              />
            </Grid> */}
            {/* <Grid item xs={3}>
              <SelectControl
                name="Shift"
                label="Shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                options={ddlShift ? ddlShift : test}
                errors={errors.shift}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Section"
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                options={ddlSection ? ddlSection : test}
                errors={errors.section}
              />
            </Grid> */}

            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreate}
              >
                CREATE
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleSearchResources}
              >
                SEARCH
              </Button>
              <div style={{ height: "10px" }}></div>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "10px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search E-Materials by Resources Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {allResources && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <ResourcesTableCollapse item={item} key={item.$id} />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {allResources && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Resources Form"
      >
        <ResourcesForm
          setOpenPopup={setOpenPopup}
          searchFilterModel={
            getCreateResource && getCreateResource.searchFilterModel
          }
          dbModel={getCreateResource && getCreateResource.dbModel}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Resources;
