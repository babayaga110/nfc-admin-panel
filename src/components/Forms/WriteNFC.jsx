import { Button, Grid, Box } from "@mui/joy";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "../../useContext/AlertContext";
import { useDrawer } from "../../useContext/DrawerContext";
import { useDispatch, useSelector } from "react-redux";
import FormSelect from "../UI/FormSelect";
import { appState, setDrawerLoading } from "../../reduxStore/Slice/appSlice";
import Template1 from "../TemplateDesgins/Template1";
import nfcServices from "../../services/nfcServices";

export default function WriteNFC({template}) {
  const dispatch = useDispatch();
  const { drawerState, toggleDrawer } = useDrawer();
  const [loading, setLoading] = React.useState(false);
  const { showAlert } = useAlert();
  const { selectedDoctor } = useSelector(appState);

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
      template: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      dispatch(setDrawerLoading({}));
      const body = {
        template: data.template,
        id: selectedDoctor.id,
      };

      await nfcServices.writeNfcCard(body);

      showAlert("Success", "NFC Card written successfully", "success", "success");
      reset();
      toggleDrawer("right", false)();
    } catch (error) {
      console.log(error?.response?.data?.error);
      showAlert("Error", 
      error?.response?.data?.error || "Something went wrong"
        , "danger", "error");
    } finally {
      dispatch(setDrawerLoading({}));
      setLoading(false);
    }
  };

  const getTemplate = () => {
    const temp = template.find((temp) => temp.value === watch("template"));
    if (temp) {
      switch (temp.label) {
        case "Template 1":
          return <Template1 />;
      case "Template 2":
        return <Template1 />;
      case "Template 3":
        return <Template1 />;
      default:
        return null;
      }
    }
  }

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
            <FormSelect
              name="template"
              control={control}
              rules={{ required: true }}
              label="Select Template"
              error={errors.template}
              setValue={setValue}
              register={register}
              options={template}
            />
          </Grid>
          <Grid xs={12} sx={{ p: 2, maxHeight: 350, overflow: "auto" }}>
            {getTemplate()}
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
          Write NFC
        </Button>
      </Box>
    </>
  );
}
