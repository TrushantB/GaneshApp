import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { positions } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import CallIcon from '@material-ui/icons/Call';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import '../custom.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
    AccountSetting:{
       margin:'60px 16px 16px 16px'
    },
    ChangePass:{
        margin: theme.spacing(2),
    },
    square: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    rounded: {
      color: '#fff',
      backgroundColor: green[500],
    },
    large: {
        width: '130px',
        height: '130px',
        borderRadius: '20px',
        marginTop:100,
        background:'#ff9688'
      },
      ProfileEdit: {
          position: 'absolute',
          left:'68%',
          bottom :'12px'

      },
      ProfileEditPosition :{
          position: 'relative'
      },
      ProfileName :{
          alignSelf:'flex-end',
          marginBottom :'45px',
        //   marginLeft:20
      },
      EditButton : {
          transform:' translate(7px, -46px)',
          marginRight:'24px',
          fontSize:'10px'
      },
      changeCover:{
        fontSize:'10px',
        transform: 'translate(-16px, 16px)'
      },
      media: {
        height: 0,
        paddingTop: '30.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: '#ff9688',
        borderRadius:'20%'
      },
        TextField : {
    width:'100%',
    marginTop: 26
  }
  }),
);
const styles = {
    paper:{
      padding:'30px'
    },
    TextField : {
      width:'100%',
      marginTop: 26
    }
  }
export default function VariantAvatars() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current!.offsetWidth);
  // }, []);
  const [age, setAge] = React.useState('');
  return (
   <div className='account-setting-wrap'>
        <Paper elevation={1} className='profile'>
           <Paper className='profile-details' elevation={1}>
              <div className='changephoto'>
                <Button variant="outlined" color="primary" className={classes.changeCover} >
                    Change Cover Photo
                </Button>
             </div>
             <div className='profil-img'>
                <div className={classes.ProfileEditPosition}>

                    <div className={classes.root}>
                        <Avatar  variant="rounded" alt="Remy Sharp" src="" className={classes.large} />
                    </div>
                    <div className={classes.ProfileEdit}>
                        <Avatar >
                        < EditIcon />
                        </Avatar>
                    </div>
                </div>
                <div className={classes.ProfileName}>
                    <h3 >Yogesh Jadhav</h3>
                    <p className='role'>Member</p>
                </div>
            </div>
            <div className='editprofile'>
                <Button variant="contained" color="primary" className={classes.EditButton}>
                    Edit Profile
                </Button>
            </div>
          </Paper>

            <Paper elevation={2}  className='basic-info'>
              <div className={classes.ChangePass}>
                <h3>Change Password:</h3>
                <form noValidate autoComplete="off">
                  <div style={styles.TextField}>
                      <TextField id="outlined-basic" label="Old Password" variant="outlined"  className='w-100'/>
                  </div>
                  <div style={styles.TextField}>
                      <TextField id="outlined-basic" label="New Password" variant="outlined"  className='w-100'/>
                  </div>
                </form>
            </div>
            <div className={classes.AccountSetting}>
                <h3 style={{margin:0}}>Account Setting:</h3>
                <p className='text-color-size'>Change Laguage</p>
                <FormControl variant="outlined" className='w-100'>
                  <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Select Language
                  </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={age}
                  labelWidth={labelWidth}
                >
              
                  <MenuItem value={10}>Marathi</MenuItem>
                  <MenuItem value={20}>English</MenuItem>
                </Select>
              </FormControl>
              <div className='button'>
                  <Button variant="contained" color="primary">
                      Update
                  </Button>
              </div>
           </div>
         </Paper>   
        </Paper>
   </div>
  );
 }
