import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Popper,
  Grow,
  Paper
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import DevicesUtils from "../../utils/deviceUtils";
import { signInWithGoogle } from "../../service/integratedLogin";
import googleIcon from "../../assets/google.png";
import { useDispatch, useSelector } from "react-redux";
import { ExitToApp, ExpandMoreRounded } from "@material-ui/icons";
import { useHistory } from "react-router";

export default function Home({ Left, Right }) {
  const { t, i18n } = useTranslation();

  const userLogged = useSelector(state => state.userUidReducer);

  const [anchorMenu, setAnchorMenu] = useState(null);

  const [open, setOpen] = useState(false);

  const anchorRef = React.useRef(null);

  const history = useHistory();

  function toggleMenu() {
    setOpen(!open);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;

    if (window.navigator.language === "pt-BR") {
      i18n.changeLanguage("pt");
    }
  }, [open]);

  function getTitleByRoute() {
    let location = window.location.hash;

    switch (location) {
      case "#/":
        return t("generatorTitle");
      case "#/create-test-case":
        return t("testCaseTitle");
      case "#/emojis":
        return t("emojisLibTitle");

      default:
        return t("testCaseTitle");
    }
  }

  const menus = [
    {
      title: t("testCaseTitle"),
      route: "create-test-case"
    },
    {
      title: t("generatorTitle"),
      route: "/"
    },
    {
      title: t("emojisLibTitle"),
      route: "/emojis"
    }
  ];

  const isMobile = DevicesUtils.checkIfIsMobile();

  return (
    <Grid
      container
      justify={"space-between"}
      style={{
        minHeight: "632.188px",
        border: "1px solid white",
        borderRadius: 13,
        height: "100%",
        alignContent: "flex-start",
        minWidth: isMobile ? "0px" : "1158px"
      }}
    >
      <Grid
        item
        md={5}
        xs={12}
        style={{ padding: "25px", alignContent: "space-between" }}
      >
        <Grid
          container
          style={{ height: "100%", alignContent: "flex-start" }}
          spacing={5}
        >
          <Grid item md={12} xs={12}>
            <Grid container spacing={1} justify={"space-between"}>
              <Grid item md={8} style={{ alignSelf: "center" }}>
                <Typography
                  variant={"subtitle2"}
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {t("copyright")}{" "}
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href={"#"}
                    onClick={() => {
                      window.open("https://github.com/jsdaniell");
                    }}
                  >
                    @jsdaniell
                  </a>
                </Typography>
              </Grid>
              <Grid
                item
                md={3}
                xs={6}
                style={{
                  textAlign: isMobile ? "start" : "end"
                }}
              >
                <Button
                  size={"small"}
                  color={"secondary"}
                  onClick={() => {
                    i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt");
                  }}
                >
                  {i18n.language === "pt" ? "English" : "Português"}
                </Button>
              </Grid>
              {!userLogged ? (
                <Grid
                  item
                  md={1}
                  xs={6}
                  style={{
                    textAlign: isMobile ? "end" : "end",
                    alignSelf: "center"
                  }}
                >
                  <Tooltip title={t("signWithGoogle")}>
                    <IconButton
                      size={"small"}
                      color={"primary"}
                      style={{ marginBottom: 5 }}
                      onClick={() => {
                        const newDataModel = {
                          title: t("titleModel"),
                          id: t("idModel"),
                          environment: t("envModel"),
                          priority: t("priorityModel"),
                          name: t("nameModel"),
                          actor: t("actorModel"),
                          preconditions: [t("preconditionsModel")],
                          procedures: [t("proceduresModel")],
                          postcondition: t("postconditionModel")
                        };

                        signInWithGoogle({
                          success: uid => {
                            window.location.reload();
                          },
                          newUserInsert: data => {
                            // dispatch({
                            //   type: "SET_TEST_CASE_MODAL_REDUCER",
                            //   payload: data
                            // });
                          },
                          newDataModel
                        });
                      }}
                    >
                      <img
                        style={{ maxWidth: "20px", height: "auto" }}
                        src={googleIcon}
                        alt="Sign With Google"
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              ) : (
                <Grid
                  item
                  md={1}
                  xs={6}
                  style={{
                    textAlign: isMobile ? "end" : "end",
                    alignSelf: "center"
                  }}
                >
                  <Tooltip title={t("exitFromApp")}>
                    <IconButton
                      size={"small"}
                      color={"primary"}
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                    >
                      <ExitToApp color={"secondary"} fontSize={"small"} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                style={{ color: "white" }}
              >
                {getTitleByRoute()}{" "}
                <IconButton
                  ref={anchorRef}
                  size={"small"}
                  onClick={e => toggleMenu()}
                >
                  <ExpandMoreRounded fontSize={"small"} color={"secondary"} />
                </IconButton>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  style={{ zIndex: 1000 }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            id="simple-menu"
                            anchorEl={anchorMenu}
                            keepMounted
                            open={Boolean(anchorMenu)}
                            onClose={() => setAnchorMenu(null)}
                          >
                            {menus.map((item, ind) => (
                              <MenuItem
                                style={{ padding: "8px 12px" }}
                                onClick={e => {
                                  history.push(item.route);
                                  handleClose(e);
                                }}
                              >
                                {item.title}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Typography>
            </Grid>
          </Grid>
          {React.createElement(Left)}
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={7}
        style={{
          borderRadius: 12,
          backgroundColor: "white",
          boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.2)",
          minHeight: isMobile ? "100%" : "632px",
          maxHeight: isMobile ? "100%" : "632px"
        }}
      >
        {React.createElement(Right)}
      </Grid>
    </Grid>
  );
}
