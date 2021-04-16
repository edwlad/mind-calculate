import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';

import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

const marginTop = 70;
const useStyles = makeStyles({
    spisok: {
        marginTop: marginTop + "px",
        marginBottom: "300px",
    }
});

function ClearNext(props) {
    return (
        <Grid container justify="center">
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={4}>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => (props.disp({ type: 'clear' }))}
                >
                    Очистить
                </Button>
            </Grid>
            <Grid item xs={1} sm={2}>&nbsp;</Grid>
            <Grid item xs={5}>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => (props.disp({ type: 'ajax', data: true }))}
                >
                    <b>Дальше</b>
                </Button>
            </Grid>
        </Grid>
    )
}

function Spisok(props) {
    const classes = useStyles();
    const point = {
        'xl': useMediaQuery('(min-width:1920px)'),
        'lg': useMediaQuery('(min-width:1280px)'),
        'md': useMediaQuery('(min-width:960px)'),
        'sm': useMediaQuery('(min-width:600px)'),
        'xs': true
    }
    let par;
    if (point['xl']) par = { 'selT': 'h3', 'selF': 'h4', 'prim': 4, 'head': 'h5' };
    else if (point['lg']) par = { 'selT': 'h3', 'selF': 'h4', 'prim': 4, 'head': 'h5' };
    else if (point['md']) par = { 'selT': 'h3', 'selF': 'h4', 'prim': 4, 'head': 'h6' };
    else if (point['sm']) par = { 'selT': 'h4', 'selF': 'h5', 'prim': 5, 'head': 'h6' };
    else par = { 'selT': 'h5', 'selF': 'h6', 'prim': 6, 'head': 'body2' };

    function spisokCheck(ev) {
        //console.log(ev);
        if (ev.type == 'click') {
            props.spisokCheck(ev.target.offsetParent.id);
        }
    };

    useEffect(() => {
        let nextEl = document.getElementById(props.spisokId);
        if (nextEl != undefined) {
            window.scrollBy(0, nextEl.getBoundingClientRect().top - 1.8 * marginTop);
            nextEl.focus();
        }
    });

    return (
        <List className={classes.spisok}>
            <ClearNext disp={props.disp} />

            {(props.spisokProps.head)
                ? <Typography align="center" variant={par.head}>
                    {props.spisokProps.head}
                </Typography>
                : null
            }

            {props.spisok.map((value, index) => {
                let sel = (props.spisokId == value.id);
                let txt = ((props.spisokState[value.id] && props.spisokState[value.id].text) || '');
                let prov = ((props.spisokState[value.id] && props.spisokState[value.id].prov) || '');
                let time = ((props.spisokState[value.id] && props.spisokState[value.id].timeText) || '');
                return (
                    <ListItem
                        button
                        key={value.id}
                        id={value.id}
                        selected={sel}
                        onClick={spisokCheck}
                    >
                        <Grid container justify="center">
                            <Grid item xs={1}>
                                <Typography
                                    component="div"
                                    variant={sel ? par['selT'] : par['selF']}
                                    color={sel ? "primary" : "initial"}
                                    align="right"
                                    style={{ fontWeight: sel ? "bold" : "normal" }}
                                >
                                    {index + 1}.
                            </Typography>
                            </Grid>

                            <Grid item xs={par['prim']}>
                                <Typography
                                    component="div"
                                    variant={sel ? par['selT'] : par['selF']}
                                    color={sel ? "primary" : "initial"}
                                    align="right"
                                    style={{ fontWeight: sel ? "bold" : "normal" }}
                                >
                                    {value.primer} =
                            </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography
                                    component="div"
                                    variant={sel ? par['selT'] : par['selF']}
                                    color={sel ? "primary" : "initial"}
                                    align="left"
                                    style={{ fontWeight: sel ? "bold" : "normal" }}
                                >
                                    &nbsp;{txt}
                                    <sub>{
                                        (prov == 'ok')
                                            ? (<Check style={{ color: "green", fontSize: "inherit" }} />)
                                            : (prov == 'no')
                                                ? (<Close style={{ color: "red", fontSize: "inherit" }} />)
                                                : ''
                                    }</sub>
                                    {(time != '' && prov != '')
                                        ? <span style={{ fontSize: "0.5em" }}>{time}</span>
                                        : null
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                );
            })}

            <ClearNext disp={props.disp} />

        </List>
    );
}

export default Spisok;
