import { Box, Button, Slide, Typography, Zoom } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const [visibleForTitle, setVisibleForTitle] = useState(false);
  const [visibleForImg, setVisibleForImg] = useState(false);
  const [visibleForTxt, setVisibleForTxt] = useState(false);
  const [visibleForBtn, setVisibleForBtn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisibleForTitle(true);
    }, 500);

    setTimeout(() => {
      setVisibleForImg(true);
    }, 1100);

    setTimeout(() => {
      setVisibleForTxt(true);
    }, 1600);

    setTimeout(() => {
      setVisibleForBtn(true);
    }, 2200);
  }, []);

  if (!session.data) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%vw",
          height: "100%vh",
        }}
      >
        <Slide
          direction="down"
          in={visibleForTitle}
          mountOnEnter
          unmountOnExit
          timeout={900}
        >
          <Typography
            sx={{
              fontSize: 30,
              mt: 5,
              textAlign: "center",
              fontStyle: "italic",
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            Hello, Welcome
          </Typography>
        </Slide>

        <Slide
          direction="left"
          in={visibleForImg}
          mountOnEnter
          unmountOnExit
          timeout={900}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "35%" },
              textAlign: "center",
              ml: { xs: 0, sm: 60 },
            }}
          >
            <Image
              src="/note.jpg"
              alt="profile-image"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "70%",
                height: "auto",
                marginTop: "40px",
                marginBottom: "50px",
              }}
            />
          </Box>
        </Slide>

        <Zoom
          in={visibleForTxt}
          style={{
            transitionDuration: "1100ms",
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              textAlign: "center",
              mb: 8,
            }}
          >
            Manage your business with technology easily.{" "}
          </Typography>
        </Zoom>

        <Slide
          direction="up"
          in={visibleForBtn}
          mountOnEnter
          unmountOnExit
          timeout={900}
        >
          <Button
            sx={{ width: { xs: "70%", sm: "22%" }, margin: "0 auto", mb: 5 }}
            variant="contained"
            onClick={() => signIn("google", { callbackUrl: "/labor" })}
          >
            Sign in
          </Button>
        </Slide>
      </Box>
    );
  } else {
    router.push("/labor");
  }
}
