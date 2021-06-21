import React,{useState} from 'react'

import Button from '@material-ui/core/Button'
import { useUser } from '@auth0/nextjs-auth0'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '../../src/Link'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/styles'
import Image from 'next/image'
import { useMediaQuery } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useTheme } from '@material-ui/core'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';


const useStyles = makeStyles(theme => ({
    mixin:{...theme.mixins.toolbar,
    tabs:{
        marginLeft:"auto",
        backgroundColor:'transparent',
        borderColor:"transparent"
    }},
    root:{
        marginLeft:"auto",
        textTransform:"none",
        "&:hover":{
            textDecoration:"none"
        }
    },
    logo:{
        marginLeft:"auto"
    },
    icon:{
        width:"40px",
        height:"50px"
    },
    menu:{
        marginTop:"2em",
        backgroundColor:"#556cd6"
    },
    item:{
        color:"white"
    }
}))

export default () => {
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

const {user,error,isLoading} = useUser();

const tabs = (
        <Tabs style={{marginLeft:"auto"}}>
          <Tab classes={{root:classes.root}} label="Home" component={Link} href="/" />
          <Tab  style={{textTransform:"none",textDecoration:"none"}} label="Question" component={Link} href="/portfolios" />
          <Tab style={{textTransform:"none",textDecoration:"none"}} label="Ask Question" component={Link} href="/portfolios/new" />
          {!user && <Tab style={{textTransform:"none",textDecoration:"none"}} label="LOGIN" component={Link} href="/api/auth/login" />}
          {user && <Tab style={{textTransform:"none",textDecoration:"none"}} label="LOGOUT" component={Link} href="/api/auth/logout" />}
        </Tabs>
)

const menu = (
    <>
      <Button className = {classes.logo} aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
        <MenuRoundedIcon className={classes.icon}/>
      </Button>
      <Menu
        elevation = {0}
        classes = {{paper:classes.menu}}
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem classes={{root:classes.item}} onClick={handleClose} component={Link} href="/">Home</MenuItem>
        <MenuItem classes={{root:classes.item}} onClick={handleClose} component={Link} href="/portfolios">Question</MenuItem>
        <MenuItem classes={{root:classes.item}} onClick={handleClose} component={Link} href="/portfolios/new">Ask Question</MenuItem>
        {!user && <MenuItem onClick={handleClose} classes={{root:classes.item}} component={Link} href="/api/auth/login">Login</MenuItem>}
          {user && <MenuItem onClick={handleClose} classes={{root:classes.item}} component={Link} href="/api/auth/logout">Logout</MenuItem>}
      </Menu>
    </>
)

    return <>
    <AppBar>
        <Toolbar>
        <Image src="/title.png" width={250} height={70}/>
            {matchesXs?menu:tabs}
        </Toolbar>
    </AppBar>
    <div className={classes.mixin} />
    </>
}