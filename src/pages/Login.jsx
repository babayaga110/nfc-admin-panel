import * as React from "react";
import {
  CssVarsProvider,
  useColorScheme,
  GlobalStyles,
  CssBaseline,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Link,
  Input,
  Typography,
  Stack,
} from "@mui/joy";

import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { ShoppingBag } from "@mui/icons-material";
import { useAlert } from "../useContext/AlertContext";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { setCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";

const roles = {
  "superadmin@demo.com": "SA_USER",
  "admin@demo.com": "DA_USER",
  "manager@demo.com": "DM_USER",
  "nurse@demo.com": "DN_USER",
};

function ColorSchemeToggle(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Login() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      persistent: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (
        data.email !== "superadmin@demo.com" &&
        data.email !== "admin@demo.com" &&
        data.email !== "manager@demo.com" &&
        data.email !== "nurse@demo.com"
      ) {
        showAlert(
          "Error",
          `Invalid email address, please try again.`,
          "danger",
          "error"
        );
        return;
      }

      setCookie(
        "_token",
        "asdasdjasjdnjasndjnasjdnasjndjkasndjnasjkdnasjndjansdjnasjdnasjndjkasndjnasjdnasjdnjasdnjasndjnasjkdjasdnjkasndjknasjkdnajksndjk",
        {
          expires: 1,
        }
      );
      setCookie("_email", data.email, {
        expires: 1,
      });
      setCookie("_uid", "asdasjdnksandjkasndjknasd", {
        expires: 1,
      });
      setCookie("_rr", roles[data.email], {
        expires: 1,
      });

      navigate("/");

      showAlert(
        "Success",
        `Welcome back, admin@example.com"`,
        "success",
        "info"
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      showAlert(`Error ${errorCode}`, errorMessage, "danger", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <ShoppingBag />
              </IconButton>
              <Typography level="title-lg">Admin Portal</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Hospital Management System
                </Typography>
                <Typography level="body-sm">
                  Facing issues?{" "}
                  <Link href="#replace-with-a-link" level="title-sm">
                    Support
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            />
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    required
                    render={({ field }) => <Input {...field} />}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Controller
                    name="password"
                    control={control}
                    required
                    render={({ field }) => <Input {...field} type="password" />}
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Controller
                      name="persistent"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} label="Remember me" />
                      )}
                    />
                    <Link level="title-sm" href="#">
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button loading={loading} type="submit" fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © NuLark Solutions {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
