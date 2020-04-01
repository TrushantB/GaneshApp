import React from 'react';
import { makeStyles, Theme, createStyles, lighten } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Card, CardContent, TextField, Grid, Button, Checkbox, IconButton, Toolbar, TableSortLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import clsx from 'clsx';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import NativeSelect from '@material-ui/core/NativeSelect';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
//   protein: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
//   protein: number,
): Data {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67),
  createData('Donut', 452, 25.0, 51),
  createData('Eclair', 262, 16.0, 24),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Gingerbread', 356, 16.0, 49),
  createData('Honeycomb', 408, 3.2, 87),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Jelly Bean', 375, 0.0, 94),
  createData('KitKat', 518, 26.0, 65),
  createData('Lollipop', 392, 0.2, 98),
  createData('Marshmallow', 318, 0, 81),
  createData('Nougat', 360, 19.0, 9),
  createData('Oreo', 437, 18.0, 63),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Items Name' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Quantity' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
function EnhancedTableHead(props: EnhancedTableProps) { 
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Billing History
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )  : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            {/* <FilterListIcon /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//table
// function createData(name: string, date: string, amount: number, quantity: number) {
//   return { name, date, amount, quantity };
// } 
// const rows = [
//   createData('Frozen yoghurt', '20-feb', 6.0, 24),
//   createData('Ice cream sandwich', '20-feb', 9.0, 37),
//   createData('Eclair', '20-feb', 16.0, 24),
//   createData('Cupcake', '20-feb', 3.7, 67),
//   createData('Gingerbread', '20-feb', 16.0, 49),
// ];
// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
//   Card:{
//       padding:20,
//       boxShadow:' 0px 7px 30px 0px rgba(77, 84, 93, 0.08), 0px 9px 30px 0px rgba(0, 177, 179, 0.08), 0px 9px 1px -1px rgba(54, 98, 154, 0.08)!important'
//   },
//   table: {
  
//     minWidth: 300,
//   },
//   input:{
//     padding:10,
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   button: {
//     backgroundColor: '#df3088',
//     borderRadius: '15px',
//     color: 'white',
//     padding: '3px 24px'
//   }
// }));
//tooltip
const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize:14
  },
}));
function BootstrapTooltip(props: TooltipProps) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
 // The first commit of Material-UI
 const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [state, setState] = React.useState<{ age: string | number; name: string }>({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const handleChanges = (name: keyof typeof state) => (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
   <div className='main-wrapper'> 
      <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label=" Billing System" {...a11yProps(0)} />
          <Tab label=" Billing History" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
         <div >
             <h3 className='m-0'>Billing Details</h3>
             <CardContent className='p-16'>
                <Grid container  spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            id="outlined-size-small"
                            variant="outlined"
                            
                            placeholder="Item Name"
                            fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            id="outlined-size-small"
                            variant="outlined"
                            
                            placeholder="Amount"
                            fullWidth
                        />
                     </Grid>
                     <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            id="outlined-size-small"
                            variant="outlined"
                            
                            placeholder="Quantity"
                            fullWidth
                        />
                     </Grid>
                     <Grid item xs={6} md={6} lg={6}>
                         <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                     
                                    inputVariant="outlined"
                                    format="MM/dd/yyyy"
                                    fullWidth
                                    placeholder='Date'
                                    value={selectedDate}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={date => handleDateChange(date)}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                     </Grid>
                     <Grid item xs={12} md={12} lg={12}>
                         <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <FormControl variant="outlined" className='w-100 select-wrapper'>
                                    <InputLabel  ref={inputLabel} htmlFor="outliniveed-age-nat-simple" className='transform'>
                                         Concerned Member or person
                                    </InputLabel>
                                        <Select
                                            native
                                            value={state.age}
                                            onChange={handleChanges('age')}
                                            labelWidth={labelWidth}
                                            fullWidth
                                            className='slectbox'
                                            inputProps={{
                                                name: 'age',    
                                                id: 'outlined-age-native-simple',
                                            }}
                                            >
                                            <option value="" />
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                    </Select>
                                </FormControl>
                              
                            </Grid>
                        </MuiPickersUtilsProvider>
                     </Grid>
                     <Grid item xs={12}>
                        <Box className='t-right'>
                              <Button variant="outlined" href='/events' size='small' target='_bank' >
                                save
                              </Button>
                          </Box> 
                     </Grid>
                 </Grid>    
             </CardContent>
             <div className='create-amount border-top'>
                <h3 className='mb-0'>Create Amount</h3>
                <CardContent className='p-16'>
                <Grid container  spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            id="outlined-size-small"
                            variant="outlined"
                            
                            placeholder="Devotee / Sponser"
                            fullWidth
                        />
                     </Grid>
                     <Grid item xs={6} md={6} lg={6}>
                        <TextField
                            id="outlined-size-small"
                            variant="outlined"
                            
                            placeholder="Amount"
                            fullWidth
                        />
                     </Grid>
                     <Grid item xs={6} md={6} lg={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <FormControl variant="outlined" className='w-100 select-wrapper'>
                                        <InputLabel  ref={inputLabel} htmlFor="outliniveed-age-nat-simple" className='transform'>
                                            Type
                                        </InputLabel>
                                            <Select
                                                native
                                                value={state.age}
                                                onChange={handleChanges('age')}
                                                labelWidth={labelWidth}
                                                className=' slectbox'
                                                fullWidth  
                                                inputProps={{
                                                    name: 'age',    
                                                    id: 'outlined-age-native-simple',
                                                }}
                                                >
                                                <option value="" />
                                                <option value={10}>Devotee</option>
                                                <option value={20}>Sponser</option>
                                        </Select>
                                    </FormControl>
                                  
                                </Grid>
                            </MuiPickersUtilsProvider>
                     </Grid>
                     <Grid item xs={12} md={6} lg={6 }>
                     <TextField
                            id="outlined-size-small"
                            variant="outlined"
                            
                            placeholder="Mobile Number"
                            fullWidth
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Box className='t-right'>
                              <Button variant="outlined" href='/events' size='small' target='_bank' >
                                save
                              </Button>
                          </Box> 
                     </Grid>
                 </Grid>    
             </CardContent>
             </div>
             <div className='opening-amount border-top'>
                <div className='opening-heading mt-16'>
                  <h3>Opening Amount</h3>
                 <BootstrapTooltip title="The Amount Can be updated once.">
                     <a href=""  className='ml-10'> <HelpOutlineIcon/></a>
                </BootstrapTooltip>
                </div>
                <CardContent className='p-16'>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <TextField
                            id="outlined-size-small"
                            variant="outlined"
                            
                            placeholder="Amount"
                            fullWidth
                        />
                     </Grid>
                       <Grid item xs={12}>
                        <Box className='t-right'>
                              <Button variant="outlined" href='/events' size='small' target='_bank' >
                                save
                              </Button>
                          </Box> 
                     </Grid>
                 </Grid>    
                </CardContent>
             </div>
                <div className='balance border-top'>
                  <h3 className='mb-0'>Balance</h3>
                  <h2 className='m-0 font-30'>30,00,000</h2>
                </div>
   
         </div>
         
      </TabPanel>
      <TabPanel value={value} index={1}>
         <div className='billing-history'>
            <div className='billing-heading mt-0 mb-16'>
              <h3 className='m-0'>Billing History</h3>
              <a href=""  className='ml-10'> <SearchTwoToneIcon/></a>
            </div>
                <CardContent className='p-0'>
                  <TableContainer>
                     <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      {/* <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
                  </TableContainer>
     
                </CardContent>
           </div>
           <div className='billing-history mt-30'>
            <div className='billing-heading mt-0 mb-16'>
              <h3 className='m-0'>Credit History</h3>
              <a href=""  className='ml-10'> <SearchTwoToneIcon/></a>
            </div>
                <CardContent className='p-0'>
                  <TableContainer>
                     <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      {/* <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
                  </TableContainer>
     
                </CardContent>
           </div>
        
      </TabPanel>
    </div>
  </div>
  );
}
