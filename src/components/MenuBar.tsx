import { AppContext } from "@/context/AppContext";
import { config } from "@/utils/config";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import NightlightIcon from "@mui/icons-material/Nightlight";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

interface Props {
  activeSectionValue: string;
}

const menus = ["Labor", "Project", "Expense", "Expense-By-Site"];

const MenuBar = ({ activeSectionValue }: Props) => {
  const [activeSection, setActiveSection] =
    useState<string>(activeSectionValue);
  const router = useRouter();
  const { data, setData } = useContext(AppContext);
  const [init, setInit] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const fetchData = async () => {
    try {
      const [laborsResponse, projectsResponse, expensesResponse] =
        await Promise.all([
          fetch(`${config.apiBaseUrl}/labor`),
          fetch(`${config.apiBaseUrl}/project`),
          fetch(`${config.apiBaseUrl}/expense`),
        ]);

      const laborsData = await laborsResponse.json();
      const projectsData = await projectsResponse.json();
      const expensesData = await expensesResponse.json();

      setData({
        ...data,
        labors: laborsData.laborsData,
        projects: projectsData.projectsData,
        expenses: expensesData.expensesData,
      });

      setInit(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (!init) {
      fetchData();
    }
  }, [init]);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    router.push(`/${sectionId}`);
  };

  const handleThemeChange = () => {
    setData({ ...data, isLightTheme: !data.isLightTheme });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 70,
        overflowY: "auto",
        flexDirection: "column",
        position: "relative",
        zIndex: 250,
      }}
    >
      <Box
        sx={{
          width: "100vw",
          height: 70,
          display: { xs: "none", sm: "flex" },
          backgroundColor: "success.main",
          justifyContent: "space-around",
          alignItems: "center",
          position: "fixed",
          top: 0,
          opacity: 0.95,
          zIndex: 50,
        }}
      >
        <Box
          sx={{
            width: "20%",
            textAlign: "center",
            color: "primary.main",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bolder" }}>
            NoteApp
          </Typography>
        </Box>
        <Box
          sx={{
            width: "35%",
            display: { xs: "none", lg: "flex" },
            justifyContent: "space-between",
            cursor: "pointer",
            userSelect: "none",
            color: "info.main",
          }}
        >
          <Typography
            className={activeSection === "labor" ? "active" : ""}
            onClick={() => handleNavClick("labor")}
          >
            LABORS
          </Typography>
          <Typography
            className={activeSection === "project" ? "active" : ""}
            onClick={() => handleNavClick("project")}
          >
            PROJECTS
          </Typography>

          <Typography
            className={activeSection === "expense" ? "active" : ""}
            onClick={() => handleNavClick("expense")}
          >
            EXPENSES
          </Typography>
          <Typography
            className={activeSection === "expense-by-site" ? "active" : ""}
            onClick={() => handleNavClick("expense-by-site")}
          >
            EXPENSES-BY-SITE
          </Typography>
        </Box>

        <Box
          sx={{
            width: "20%",
            textAlign: "center",
            mr: -30,
            mt: 0.7,
          }}
          onClick={handleThemeChange}
        >
          {data.isLightTheme ? (
            <NightlightIcon
              sx={{ fontSize: 31, cursor: "pointer", color: "info.main" }}
            />
          ) : (
            <LightModeIcon
              sx={{ fontSize: 31, cursor: "pointer", color: "info.main" }}
            />
          )}
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",
          height: 70,
          display: { xs: "flex", sm: "none" },
          backgroundColor: "success.main",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          opacity: 0.95,
          zIndex: 250,
        }}
      >
        <Box
          sx={{
            width: "20%",
            textAlign: "center",
            mt: 1,
            mr: -3,
            zIndex: 150,
          }}
          onClick={handleThemeChange}
        >
          {data.isLightTheme ? (
            <NightlightIcon
              sx={{ fontSize: 31, cursor: "pointer", color: "white" }}
            />
          ) : (
            <LightModeIcon
              sx={{ fontSize: 31, cursor: "pointer", color: "white" }}
            />
          )}
        </Box>
        <Box
          sx={{
            width: "20%",
            textAlign: "center",
            color: "white",
            zIndex: 150,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bolder" }}>
            NoteApp
          </Typography>
        </Box>
        <Box>
          <IconButton
            sx={{ display: { xs: "block", lg: "none", zIndex: 350 } }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: "30px", color: "white", mr: 3 }} />
          </IconButton>
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            minWidth: 250,
            backgroundColor: "success.main",
            borderTopRightRadius: "20px",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <CloseIcon
            sx={{
              fontSize: 30,
              color: "white",
              position: "absolute",
              top: 10,
              right: 20,
            }}
            onClick={() => setOpenDrawer(false)}
          />
          <List sx={{ p: 0, mt: 6 }}>
            {menus.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ "&.hover": { backgroundColor: "blue" } }}
              >
                <ListItemButton>
                  <ListItemText
                    primary={item}
                    sx={{ color: "info.main" }}
                    onClick={() => {
                      const menu = item.toLocaleLowerCase();
                      setOpenDrawer(false);
                      router.push(`/${menu}`);
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 5, ml: 3 }}>
            <Button
              sx={{ width: 200, borderRadius: 1 }}
              variant="contained"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
export default MenuBar;

// postgres://ksw_app_render_user:VaPr3uc9oWBTO0R6ITfYVWnrt2NqNpSL@dpg-cpok6o2j1k6c73a8sq6g-a.singapore-postgres.render.com/ksw_app_render
