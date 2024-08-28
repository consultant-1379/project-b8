import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import DashboardIcon from '@material-ui/icons/Dashboard'

const AppBarStyled = styled(AppBar)`
  background-color: #161b22;
`
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export const AppBarTop = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBarStyled position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <DashboardIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Git Analyze
            </Typography>
          </Toolbar>
        </AppBarStyled>
      </div>
    )
}
