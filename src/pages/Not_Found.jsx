import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import Loading from "../components/Loading/Loading";
import { Box, Button } from "@mui/joy";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Not_Found() {
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    setLoading(true);
    if (routes.some((route) => route.path === location.pathname)) {
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "background.paper",
          }}
        >
          <Player
            autoplay={true}
            loop={true}
            controls={false}
            src="/NotFound.json"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "400px",
              maxWidth: "400px",
            }}
          >
            <Button
              sx={{ mx: "auto", display: "block",
                backgroundColor:"#056e79"
               }}
              onClick={() => navigate("/")}
            >
              LET'S GO HOME
            </Button>
          </Player>
        </Box>
      )}
    </div>
  );
}
