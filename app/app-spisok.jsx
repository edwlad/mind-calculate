import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import withWidth from '@material-ui/core/withWidth';

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
const styles = {
    spisok: {
        marginTop: marginTop+"px",
        marginBottom: "300px",
    }
};
const spisokVid ={
    'xs':{'selT':'h5', 'selF':'h6', 'prim':6, 'head':'body2'},
    'sm':{'selT':'h4', 'selF':'h5', 'prim':5, 'head':'h6'},
    'md':{'selT':'h3', 'selF':'h4', 'prim':4, 'head':'h6'},
    'lg':{'selT':'h3', 'selF':'h4', 'prim':4, 'head':'h5'},
    'xl':{'selT':'h3', 'selF':'h4', 'prim':4, 'head':'h5'}
};

function ClearNext (props) {
    return (
        <Grid container justify="center">
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={4}>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth 
                    onClick={()=>(props.disp({type:'clear'}))}
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
                    onClick={()=>(props.disp({type:'ajax', data:true}))}
                >
                <b>Дальше</b>
                </Button>
            </Grid>
        </Grid>
    )
}

class Spisok extends React.Component {
    constructor(props) {
        super(props);
        this.spisokCheck = this.spisokCheck.bind(this);
    }
    spisokCheck (ev) {
        //console.log(ev.nativeEvent);
        if (ev.nativeEvent.type == 'click') {
            this.props.spisokCheck(ev.currentTarget.id);
        }
    }
    componentDidMount () {
        let nextEl = document.getElementById(this.props.spisokId);
        if (nextEl != undefined) {
            window.scrollBy(0, nextEl.getBoundingClientRect().top-1.8*marginTop);
            nextEl.focus();
        }
    }
    componentDidUpdate () {
        this.componentDidMount();
    }
    render() {
        const { classes } = this.props;

        return (
            <List className={classes.spisok}>
                <ClearNext disp={this.props.disp} />

                {(this.props.spisokProps.head)
                    ? <Typography align="center" variant={spisokVid[this.props.width].head}>
                        {this.props.spisokProps.head}
                    </Typography>
                    : null
                }

                {this.props.spisok.map((value, index)=>{
                    let sel = (this.props.spisokId==value.id);
                    let par = spisokVid[this.props.width];
                    let txt = ((this.props.spisokState[value.id] && this.props.spisokState[value.id].text) || '');
                    let prov = ((this.props.spisokState[value.id] && this.props.spisokState[value.id].prov) || '');
                    let time = ((this.props.spisokState[value.id] && this.props.spisokState[value.id].timeText) || '');
                    return (
                        <ListItem 
                            button 
                            key={value.id} 
                            id={value.id} 
                            selected={sel}
                            onClick={this.spisokCheck}
                        >
                            <Grid container justify="center">
                                <Grid item xs={1}>
                                <Typography 
                                    component="div" 
                                    variant={sel?par['selT']:par['selF']} 
                                    color={sel?"primary":"initial"}
                                    align="right"
                                    style={{fontWeight: sel?"bold":"normal"}}
                                >
                                {index+1}.
                                </Typography>
                                </Grid>
                                
                                <Grid item xs={par['prim']}>
                                <Typography 
                                    component="div" 
                                    variant={sel?par['selT']:par['selF']} 
                                    color={sel?"primary":"initial"}
                                    align="right"
                                    style={{fontWeight: sel?"bold":"normal"}}
                                >
                                {value.primer} =
                                </Typography>
                                </Grid>

                                <Grid item xs={3}>
                                <Typography 
                                    component="div" 
                                    variant={sel?par['selT']:par['selF']} 
                                    color={sel?"primary":"initial"}
                                    align="left"
                                    style={{fontWeight: sel?"bold":"normal"}}
                                >
                                &nbsp;{txt}
                                <sub>{
                                    (prov=='ok')
                                    ? (<Check style={{color:"green", fontSize:"inherit"}} />)
                                    : (prov=='no')
                                        ? (<Close style={{color:"red", fontSize:"inherit"}} />)
                                        : ''
                                }</sub>
                                {(time != '' && prov != '')
                                    ? <span style={{fontSize:"0.5em"}}>{time}</span>
                                    : null
                                }
                                </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    );
                })}

                <ClearNext disp={this.props.disp} />

            </List>
        );
    }
}

Spisok.propTypes = {classes: PropTypes.object.isRequired};
Spisok = withStyles(styles)(withWidth()(Spisok));

export default Spisok;
