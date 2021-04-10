import React, {useEffect, useReducer} from 'react';

import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import { Typography, Paper, Grid } from '@material-ui/core';

import Table from './app-table.jsx';
import Start from './app-start.jsx';
import Nabor from './app-nabor.jsx';

const useStyles = makeStyles({
    props: {
        marginTop: "100px",
        padding: "10px",
    },
});

function reducer (state, action) {
    switch (action.type) {
        case 'set':
            return {...state, ...action.data};
        case 'add':
            return {...state, [action.name]:action.data};
        default:
            throw new Error();
    }
}

function Props (props) {

    const [state, dispatch] = useReducer(reducer, {...props.spisokProps, cfgSet:[]});

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    
    const classes = useStyles();

    return (
        <Paper className={classes.props}>
            <Typography variant="h5" align="center">
                {props.menu.title} - настройки.
            </Typography>

            {(props.menu.act == 'start')
                ? <Start state={state} disp={dispatch}></Start>
                : null
            }
            {(props.menu.act == 'table')
                ? <Table state={state} disp={dispatch}></Table>
                : null
            }
            {(props.menu.act == 'nabor')
                ? <Nabor state={state} disp={dispatch}></Nabor>
                : null
            }

            <Grid container justify="center">
                <Grid item xs={12}>&nbsp;</Grid>
                <Grid item xs={4}>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        fullWidth 
                        onClick={()=>{props.propsCheck(null)}}
                    >
                    Закрыть
                    </Button>
                </Grid>
                <Grid item xs={1} sm={2}>&nbsp;</Grid>
                <Grid item xs={5}>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        fullWidth 
                        onClick={()=>{props.propsCheck(state)}}
                    >
                    <b>Применить</b>
                    </Button>
                </Grid>
            </Grid>

        </Paper>
    );
}

export default Props;
