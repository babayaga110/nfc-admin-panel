/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  Input,
  Select,
  Table,
  Typography,
  Avatar,
  IconButton,
  Sheet,
  iconButtonClasses,
  Option,
  ButtonGroup,
  LinearProgress,
} from "@mui/joy";

import SearchIcon from "@mui/icons-material/Search";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useAlert } from "../../useContext/AlertContext";
import { Delete, Edit, RestartAlt, ZoomIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAlertModal } from "../../useContext/AlertModalContext";
import { useDrawer } from "../../useContext/DrawerContext";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { appState, setAlertLoading } from "../../reduxStore/Slice/appSlice";

export default function DeviceTable({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { drawerLoading } = useSelector(appState);
  const { drawerState, toggleDrawer } = useDrawer();
  const [rows, setRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { showAlertModal, hideAlertModal, modalState } = useAlertModal();

  const [currentPage, setCurrentPage] = React.useState(0);
  const rowsPerPage = 10;
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Next Page Handler
  const handleNext = () => {
    if (endIndex < rows.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Previous Page Handler
  const handlePrevious = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      setRows(data);
    } catch (error) {
      showAlert("Error", "Something went wrong", "danger", "error");
    } finally {
      setLoading(false);
    }
  };

  // Filter rows based on the search query (check all fields)
  const filteredRows = rows?.filter((row) =>
    Object.values(row).some((value) => {
      return String(value).toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  const currentRows = filteredRows?.slice(startIndex, endIndex);

  React.useEffect(() => {
    fetchAdmins();
  }, [navigate]);

  React.useEffect(() => {
    if (!drawerLoading) {
      fetchAdmins();
    }
  }, [drawerLoading]);

  const handleDeleteAdmin = async (row) => {
    dispatch(setAlertLoading({}));
    try {
      alert("In Demo Mode, You can't delete Items");
      showAlert("Success", "Deleted successfully", "success", "info");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      showAlert(`Error ${errorCode}`, errorMessage, "danger", "error");
    } finally {
      dispatch(setAlertLoading({}));
      hideAlertModal();
      fetchAdmins();
    }
  };

  const handleDelete = (row) => {
    showAlertModal({
      title: "Delete Admin",
      desc: "Are you sure you want to delete this Item?",
      buttonTitle: "Delete",
      type: "warning",
      handleConfirm: () => handleDeleteAdmin(row),
    });
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl>
        <Select size="sm" placeholder="Sort by">
          <Option value="all">All</Option>
          <Option value="date-asc">Date (Ascending)</Option>
          <Option value="date-desc">Date (Descending)</Option>
          <Option value="name-asc">Name (Ascending)</Option>
          <Option value="name-desc">Name (Descending)</Option>
        </Select>
      </FormControl>
      <FormControl>
        <Button
          size="sm"
          variant="solid"
          color="neutral"
          onClick={() => setSearchQuery("")}
        >
          Clear Filters
        </Button>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }}>
          <Input
            placeholder="Search by name"
            startDecorator={<SearchIcon />}
            size="sm"
            value={searchQuery}
            onChange={handleSearch}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        // variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          bgcolor: "none",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        {loading ? (
          <LinearProgress />
        ) : (
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            borderAxis="x"
            sx={{
              "--TableCell-headBackground":
                "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground":
                "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "8px",
              "--TableCell-paddingX": "8px",
              [`& th`]: {
                fontSize: "12px",
                letterSpacing: "1px",
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 30, padding: "12px 6px" }}>S.NO</th>
                <th style={{ width: 100, padding: "12px 6px" }}>Device Mac ID</th>
                <th style={{ width: 100, padding: "12px 6px" }}>Hospital Name</th>
                <th style={{ width: 100, padding: "12px 6px" }}>Hospital Address</th>
                <th style={{ width: 140, padding: "12px 6px" }}>CREATED AT</th>
                <th style={{ width: 80, padding: "12px 6px" }}>STATUS</th>
                <th style={{ width: 100, padding: "12px 6px" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentRows?.length > 0 ? (
                currentRows?.map((row, index) => (
                  <tr key={row.id}>
                    <td>
                      <Typography level="body-xs"> {index + 1}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row?.deviceMacId}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row?.hospital}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row?.location}</Typography>
                    </td>

                    <td>
                      <Typography level="body-xs">
                        {/* {dayjs
                          .unix(row?.createdAt?._seconds)
                          .format("MMMM D, YYYY h:mm A")} */}
                        {dayjs(row?.createdAt).format("MMMM D, YYYY h:mm A")}
                      </Typography>
                    </td>
                    <td>
                      <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={
                          row?.status ? <CheckRoundedIcon /> : <BlockIcon />
                        }
                        color={row?.status ? "success" : "danger"}
                      >
                        {row?.status ? "Active" : "Inactive"}
                      </Chip>
                    </td>

                    <td>
                      <ButtonGroup
                        aria-label="radius button group"
                        sx={{ '--ButtonGroup-radius': '40px' }}
                      >
                        <IconButton
                          color="neutral"
                          variant="outlined"
                          size="sm"
                          onClick={() => {
                            // toggleDrawer("right", true)();
                            alert("In Demo Mode, You can't restart Items");
                          }}
                        >
                          <RestartAlt />
                        </IconButton>
                        <IconButton
                          color="neutral"
                          variant="outlined"
                          size="sm"
                          onClick={() => {
                            // toggleDrawer("right", true)();
                            alert("In Demo Mode, You can't edit Items");
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="neutral"
                          variant="outlined"
                          size="sm"
                          onClick={() => handleDelete(row)}
                        >
                          <Delete />
                        </IconButton>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    <Typography level="body-xs">No Result Found</Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{ pt: 4, gap: 1, display: { xs: "none", md: "flex" } }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
          onClick={handlePrevious}
          // disabled={currentPage === 1}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {Array.from({ length: Math.ceil(rows?.length / 10) }, (_, i) => (
          <IconButton
            size="sm"
            key={i + 1}
            variant={currentPage === i + 1 ? "outlined" : "plain"}
            color="neutral"
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
          onClick={handleNext}
          // disabled={currentPage === Math.ceil(rows.length / rowsPerPage)}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
