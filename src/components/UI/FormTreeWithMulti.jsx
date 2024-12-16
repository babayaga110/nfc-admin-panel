import * as React from "react";
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/joy";
import {
  AddBox,
  IndeterminateCheckBox,
  InfoOutlined,
} from "@mui/icons-material";
import { Experimental_CssVarsProvider, styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { Controller } from "react-hook-form";

const CustomTreeItem = styled(TreeItem)({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
});

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

const FormTreeWithMulti = ({
  name,
  register,
  rules,
  label,
  error,
  placeholder,
  setValue,
  control
}) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [parentChildSelection, setParentChildSelection] = React.useState([]);
  const [expandedItems, setExpandedItems] = React.useState([]);

  const handleItemSelectionChange = (event, selectedItems) => {
    if (!parentChildSelection.includes(selectedItems) && undefined !== selectedItems) {
      setValue(name, [...parentChildSelection, selectedItems]);
      setParentChildSelection([...parentChildSelection, selectedItems]);
    } 
  };
  const handleItemSelectionEpand = (event, expandedItems) => {
    if (!parentChildSelection.includes(expandedItems[0]) && undefined !== expandedItems[0]) {
      setValue(name, [...parentChildSelection, expandedItems[0]]);
      setParentChildSelection([...parentChildSelection, expandedItems[0]]);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(name, newValue);
    setParentChildSelection(newValue);
  };

  React.useEffect(() => {
    register(name, { ...rules });
  }, [register, name, rules]);

  React.useEffect(() => {
    console.log(parentChildSelection);
  }, [parentChildSelection]);

  return (
    <FormControl
      error={error}
      sx={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 1,
        alignItems: "center",
      }}
    >
      <FormLabel>{label}</FormLabel>
      <Box>
        <Controller
         name={name}
          control={control}
          render={({ field:{
            ref,
            value,
            onBlur
          } }) => (
            <Autocomplete
              ref={ref}
              multiple
              size="sm"
              onChange={handleChange}
              placeholder={placeholder}
              value={value || []}
              options={value || []}
              onBlur={onBlur}
              freeSolo
              clearOnEscape
              selectOnFocus
              handleHomeEndKeys
              sx={{ mb : 1}}
            />
          )}
        />
        <Experimental_CssVarsProvider>
          <SimpleTreeView
            defaultSelectedItems={"Home"}
            onExpandedItemsChange={handleItemSelectionEpand}
            onSelectedItemsChange={handleItemSelectionChange}
            slots={{
              expandIcon: AddBox,
              collapseIcon: IndeterminateCheckBox,
              endIcon: CloseSquare,
            }}
          >
            <CustomTreeItem itemId="Home" label="Home">
              <CustomTreeItem itemId="Home-1" label="Home-1">
                <CustomTreeItem itemId="home-1-1" label="Home 1-1" />
                <CustomTreeItem itemId="home-1-2" label="Home 1-2" />
              </CustomTreeItem>
              <CustomTreeItem itemId="home-2" label="Home 2" />
              <CustomTreeItem itemId="home-3" label="Home 3" />
              <CustomTreeItem itemId="home-4" label="Home 4" />
              <CustomTreeItem itemId="home-5" label="Home 5" />
              <CustomTreeItem itemId="home-6" label="Home 6" />
            </CustomTreeItem>
          </SimpleTreeView>
        </Experimental_CssVarsProvider>
      </Box>

      {error && (
        <FormHelperText>
          <InfoOutlined />
          {label} is required
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormTreeWithMulti;
