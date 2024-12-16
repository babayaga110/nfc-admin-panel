import { Button, Grid, Box } from "@mui/joy";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useAlert } from "../../useContext/AlertContext";
import FormSwitch from "../UI/FormSwitch";
import FormInput from "../UI/FormInput";
import FormImage from "../UI/FormImage";
import { useDrawer } from "../../useContext/DrawerContext";
import { useDispatch } from "react-redux";
import FormSelect from "../UI/FormSelect";
import {
  setDrawerLoading,
  setSelectedDrawer,
} from "../../reduxStore/Slice/appSlice";

export default function CreateUser() {
  const dispatch = useDispatch();
  const { drawerState, toggleDrawer } = useDrawer();
  const [loading, setLoading] = React.useState(false);
  const { showAlert } = useAlert();

  const {
    control,
    reset,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "" ,
      email: "" ,
      password: "",
      confirmPassword: "",
      status: true ,
      profile: "",
      designation: "",
      hospital: "",
    },
  });
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      showAlert("Error", "Password does not match", "danger", "error");
      return;
    }
    delete data.confirmPassword;
    data.password = btoa(data.password);
    try {
      setLoading(true);
      dispatch(setDrawerLoading({}));
      console.log("data", data);
      showAlert("Success", "User created successfully", "success", "success");
      reset();
      toggleDrawer("right", false)();
    } catch (error) {
      showAlert("Error", "Something went wrong", "danger", "error");
    } finally {
      dispatch(setDrawerLoading({}));
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          overflowY: "auto",
        }}
      >
        <Grid
          container
          sx={{
            p: 2,
            mx: 0,
          }}
          spacing={1}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid xs={12}>
            <FormInput
              name="name"
              control={control}
              rules={{ required: true }}
              label="Name"
              placeholder="Enter Name"
              error={errors?.name}
            />
          </Grid>
          {
            location.pathname === "/users/doctors" && (
              <Grid xs={12}>
              <FormInput
                name="designation"
                control={control}
                rules={{ required: true }}
                label="Designation"
                placeholder="Enter Designation"
                error={errors?.designation}
              />
            </Grid>)
          }
         
          <Grid xs={12}>
            <FormInput
              name="email"
              control={control}
              rules={{ required: true }}
              label="Email"
              placeholder="Enter Email id"
              error={errors?.email}
            />
          </Grid>
          <Grid xs={12}>
            <FormInput
              name="password"
              control={control}
              rules={{ required: true }}
              label="Password"
              type="password"
              placeholder="Enter Password"
              error={errors?.password}
            />
          </Grid>
          <Grid xs={12}>
            <FormInput
              name="confirmPassword"
              control={control}
              type="password"
              rules={{ required: true }}
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              error={errors?.confirmPassword}
            />
          </Grid>
          <Grid xs={12}>
            <FormImage
              name="profile"
              register={register}
              setValue={setValue}
              rules={{ required: true }}
              label="Profile Image"
              error={errors?.profile}
              accept="image/*"
              numFiles={1}
              folder="profile"
              clearOnSubmit={true} 
              placeholder={"PNG or JPG ( max 5MB)"}
              // defaultValue={selectedDrawer?.thumbnail}
            />
          </Grid>
          <Grid xs={12}>
            <FormSelect
              name="hospital"
              control={control}
              rules={{ required: true }}
              label="Hospital"
              error={errors.hospital}
              setValue={setValue}
              register={register}
              options={
           [
            {
              label: "Hospital 1",
              value: "hospital1",
            },
            {
              label: "Hospital 2",
              value: "hospital2",
            },
            {
              label: "Hospital 3",
              value: "hospital3",
            }
           ]
              }
            />
          </Grid>
          <Grid xs={12}>
            <FormSwitch
              name="status"
              control={control}
              label="Status"
              register={register}
              setValue={setValue}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          height: 70,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 1,
          px: 3,
          py: 1,
          borderTop: "1px solid #E0E0E0",
        }}
      >
        <Button
          color="neutral"
          variant="solid"
          size="md"
          fullWidth
          onClick={() => {
            reset();
            toggleDrawer("right", false)();
          }}
        >
          Cancel
        </Button>

        <Button
          color="primary"
          variant="solid"
          size="md"
          fullWidth
          type="submit"
          onClick={handleSubmit(onSubmit)}
          loading={loading}
        >
          Add Admin
        </Button>
      </Box>
    </>
  );
}
