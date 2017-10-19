import { fade } from 'material-ui/utils/colorManipulator'
import * as Colors from 'material-ui/styles/colors'
import { typography, spacing, getMuiTheme } from 'material-ui/styles'

const themePalette = {
    palette: {
      primary1Color: '#E45409',
      primary2Color: '#ccc',
      primary3Color: Colors.grey500,
      accent1Color: '#EE987F',
      accent2Color: '#f1f0ee',
      accent3Color: Colors.grey500,
      textColor: Colors.grey500,
      alternateTextColor: Colors.grey300,
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
      disabledColor: fade(Colors.darkBlack, 0.3),
  },
}
const theme = {
  ...spacing,
  ...typography,
  ...themePalette,
  fontFamily: 'Roboto, sans-serif',
  appBar: {
    color: themePalette.palette.primary1Color,
    textColor: themePalette.palette.alternateTextColor,
    height: spacing.desktopKeylineIncrement,
    titleFontWeight: typography.fontWeightNormal,
    padding: spacing.desktopGutter,
    },
  button: {
    height: 36,
    minWidth: 88,
    iconButtonSize: spacing.iconSize * 2,
  },
  raisedButton: {
    color: themePalette.palette.alternateTextColor,
    textColor: themePalette.palette.textColor,
    primaryColor: themePalette.palette.primary1Color,
    primaryTextColor: themePalette.palette.alternateTextColor,
    secondaryColor: themePalette.palette.accent1Color,
    secondaryTextColor: themePalette.palette.alternateTextColor,
    fontSize: typography.fontStyleButtonFontSize,
    fontWeight: typography.fontWeightMedium,
  },
  checkbox: {
    boxColor: themePalette.palette.textColor,
    checkedColor: themePalette.palette.primary1Color,
    requiredColor: themePalette.palette.primary1Color,
    disabledColor: themePalette.palette.disabledColor,
    labelColor: themePalette.palette.textColor,
    labelDisabledColor: themePalette.palette.disabledColor,
  },
  radioButton: {
    borderColor: themePalette.palette.textColor,
    backgroundColor: themePalette.palette.alternateTextColor,
    checkedColor: themePalette.palette.primary1Color,
    requiredColor: themePalette.palette.primary1Color,
    disabledColor: themePalette.palette.disabledColor,
    size: 24,
    labelColor: themePalette.palette.textColor,
    labelDisabledColor: themePalette.palette.disabledColor,
  },
  dropDownMenu: {
    accentColor: themePalette.palette.borderColor,
  },
  paper: {
    color: themePalette.palette.textColor,
    backgroundColor: themePalette.palette.canvasColor,
  },
  ripple: {
    color: fade(themePalette.palette.textColor, 0.3),
  },
  stepper: {
    backgroundColor: 'transparent',
    hoverBackgroundColor: 'transparent',
    iconColor: themePalette.palette.primary1Color,
    hoveredIconColor: Colors.grey700,
    inactiveIconColor: themePalette.palette.accent3Color,
    textColor: fade(Colors.black, 0.87),
    disabledTextColor: fade(Colors.black, 0.26),
    connectorLineColor: themePalette.palette.primary3Color,
  },
  svgIcon: {
    color: themePalette.palette.textColor
  },
  textField: {
    textColor: themePalette.palette.textColor,
    hintColor: themePalette.palette.disabledColor,
    floatingLabelColor: themePalette.palette.disabledColor,
    disabledTextColor: themePalette.palette.disabledColor,
    errorColor: Colors.red500,
    focusColor: themePalette.palette.primary1Color,
    backgroundColor: 'transparent',
    borderColor: themePalette.palette.borderColor,
  },
  toggle: {
    thumbOnColor: themePalette.palette.primary1Color,
    thumbOffColor: themePalette.palette.accent2Color,
    thumbDisabledColor: themePalette.palette.borderColor,
    thumbRequiredColor: themePalette.palette.primary1Color,
    trackOnColor: fade(themePalette.palette.primary1Color, 0.5),
    trackOffColor: themePalette.palette.primary3Color,
    trackDisabledColor: themePalette.palette.primary3Color,
    labelColor: themePalette.palette.textColor,
    labelDisabledColor: themePalette.palette.disabledColor,
    trackRequiredColor: fade(themePalette.palette.primary1Color, 0.5),
  },
}

export default getMuiTheme(theme) // must be wrapped in function getMuiTheme

