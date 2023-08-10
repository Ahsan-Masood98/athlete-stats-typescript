import React, { useState } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  styled,
  useTheme,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { tokens } from "../theme/theme";

interface DropdownOption {
  text: string;
  options?: DropdownOption[];
  link?: string;
}

const DropdownListItem: React.FC<{
  text: string;
  options?: DropdownOption[];
  Icon?: any;
  link?: string;
}> = (props) => {
  const { text, options, Icon, link } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const hasNestedOptions = Array.isArray(options) && options.length > 0;
  return (
    <>
      <ListItem disablePadding onClick={handleClick}>
        <StyledListButton>
          {Icon && <Icon />}
          <ListItemText>
            <Typography
              sx={{
                ml: 2,
                fontSize: "inherit",
              }}
            >
              {text}
            </Typography>
          </ListItemText>
          {hasNestedOptions && (open ? <ExpandLess /> : <ExpandMore />)}
        </StyledListButton>
      </ListItem>
      {open && hasNestedOptions && (
        <List disablePadding>
          {options.map((option) => (
            <ListItem key={option.text} disablePadding>
              <div
                style={{
                  marginLeft: "40px",
                  width: "100%",
                  fontSize: "14px",
                }}
              >
                <DropdownListItem {...option} />
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

const StyledListButton = styled(ListItemButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default DropdownListItem;
