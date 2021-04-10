import React, {useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import {Build, HelpOutline, KeyboardOutlined} from '@material-ui/icons';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Spisok from './app-spisok.jsx';
import Help from './app-help.jsx';
import Props from './app-props.jsx';

const useStyles = makeStyles({
    grow: {
        flexGrow: 1,
        flex: "auto",
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    keyboard: {
        width: "320px",
        position: "fixed",
        bottom: "0px",
        right: "0px",
        backgroundColor: "azure",
        zIndex: 1000
    },
    max: {
        maxWidth:"960px",
        margin: "0 auto",
        left: "auto",
        right: "auto"
    }
});
const menu = [
    {type:'', text:'Скрыть меню'},
    {type:'line'},
    {type:'check', text:'Таблица умножения', act:'table', title:'Таблица умножения'},
    {type:'check', text:'Готовые наборы примеров', act:'nabor', title:'Набор примеров'},
    {type:'check', text:'"Случайные" примеры', act:'start', title:'Устный счёт'},
    {type:'line'},
    {type:'keyboard', text:'Показать/спрятать клавиатуру'},
    {type:'setup', text:'Настройки'},
    {type:'line'},
    {type:'help', text:'Помощь', title:'Помощь'}
];
const spisokFull = {};
const init = {
    ajax: true,
    ajaxWait: false,
    menuOpen: false,
    popOpen: false,
    popEl: null,
    menu: menu.find((el)=>((el.act == 'start'))),
    keyOpen: !!('ontouchstart' in window) || !!('onmsgesturechange' in window),
    keyHide: false,
    newId: false, //true - если новый id будет известен после применения изменений
    spisok: [],
    spisokId: ' ', //текущийй id
    spisokState: {},
    spisokProps: {},
    helpOpen: false,
    propsOpen: false,
};
function reducer (state, action) {
    //console.log(action);
    let newState={}, temp, temp2;
    switch (action.type) {
        case 'set': return {...state, ...action.data};
        case 'add': return {...state, [action.name]:action.data};
        case 'menu': return {...state, menuOpen:Boolean(action.data)};
        case 'pop': return {...state, popOpen:Boolean(action.data), popEl:action.el};
        case 'help': return {...state, helpOpen:Boolean(action.data)};
        case 'key': return {...state, keyOpen:Boolean(action.data), keyHide:false};
        case 'props': return {...state, propsOpen:Boolean(action.data), keyHide:Boolean(action.data)};
        case 'ajax': return {...state, ajax:Boolean(action.data)};
        case 'ajaxFin':
            if (action.err) {
                return {...state,
                    ajaxWait:false,
                    error:action.data, 
                    spisok:[], 
                    spisokId:' ',
                    spisokState:{},
                    spisokProps:{},
                };
            } else {
                spisokFull[state.menu.act] = {
                    spisok: action.data.spisok,
                    spisokId: action.data.spisok[0].id,
                    spisokState: {},
                    spisokProps: action.data.props
                };
                return {...state, 
                    ...spisokFull[state.menu.act],
                    ajaxWait:false,
                    error:'', 
                    newId:true,
                };
            };
        case 'clear':
            return {...state,
                spisokId:(state.spisok[0] ? state.spisok[0].id : ' '), 
                newId:true,
                spisokState:{}
            };
        case 'select':
            temp = String(action.data); //новый ID
            if (!document.getElementById(temp)) return {...state, newId:false};
            newState = state.spisokState;
            if (!newState[temp]) newState[temp] = {};
            newState[temp].start = Date.now();
            return {...state, newId:false, spisokId:temp, spisokState:newState};
        case 'time':
            newState = state.spisokState;
            // подсчет времени примера
            temp = 0;
            if (newState[state.spisokId].start) temp = Date.now() - newState[state.spisokId].start;
            if (newState[state.spisokId].time) temp += newState[state.spisokId].time;
            newState[state.spisokId].time = temp;
            // подсчет общего времени
            temp = 0;
            Object.values(newState).map(el=>temp += (el.time || 0));
            newState.time = temp;
            // текстовый вариант времени
            temp = new Date(newState[state.spisokId].time);
            newState[state.spisokId].timeText = temp.getMinutes()+':'+temp.getSeconds();
            temp.setTime(newState.time);
            newState.timeText = temp.getMinutes()+':'+temp.getSeconds();
            return {...state, spisokState:newState};
        case 'otvet': // action.data
            newState = state.spisokState;
            temp = (newState[state.spisokId].text || '');
            if (action.data == 'clear') {
                temp = '';
            } else if (action.data == 'del') {
                temp = temp.slice(1);
            } else if (action.data == 'back') {
                temp = temp.slice(0,-1);
            } else {
                temp += action.data;
            }
            newState[state.spisokId].text = temp.trim();
            newState[state.spisokId].prov = '';
            return {...state, spisokState:newState};
        case 'prov':
            newState = state.spisokState;
            temp = state.spisok.findIndex((value)=>(value.id==state.spisokId));
            temp2 = (newState[state.spisokId].text || '');
            newState[state.spisokId].prov = (
                (temp2.length>0)
                ? ((temp2 == state.spisok[temp].otvet)
                    ?'ok'
                    :'no'
                )
                : ''
            );
            return {...state, spisokState:newState};
        default:
            throw new Error();
    }

};

function App () {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, init);
    const upSm = useMediaQuery('(min-width:600px)');

    function popToggle (el=null, newState=!(state.popOpen)) {
        if (el && newState) {
            dispatch({type:'pop', data:newState, el:el.currentTarget});
        } else {
            dispatch({type:'pop', data:false, el:null});
        }
        if (state.helpOpen) dispatch({type:'help', data:false});
        if (state.menuOpen) dispatch({type:'menu', data:false});
    };
    function menuToggle (newState=!(state.menuOpen)) {
        dispatch({type:'menu', data:newState});
        if (state.helpOpen) dispatch({type:'help', data:false});
        if (state.popOpen) dispatch({type:'pop', data:false, el:null});
    };
    function helpToggle (newState=!(state.helpOpen)) {
        dispatch({type:'help', data:newState});
        if (state.menuOpen) dispatch({type:'menu', data:false});
        if (state.popOpen) dispatch({type:'pop', data:false, el:null});
    };
    function keyToggle (newState=!(state.keyOpen)) {
        dispatch({type:'key', data:newState || state.keyHide}); //если скрыто и запрос на клаву - то тоже показать
        if (state.helpOpen) dispatch({type:'help', data:false});
        if (state.menuOpen) dispatch({type:'menu', data:false});
    };
    function propsTogle (newState=!(state.propsOpen)){
        dispatch({type:'props', data:newState});
        if (state.helpOpen) dispatch({type:'help', data:false});
        if (state.menuOpen) dispatch({type:'menu', data:false});
        if (state.popOpen) dispatch({type:'pop', data:false, el:null});
    }
    function menuClick (id) {
        let newMenu = menu[id];
        dispatch({type:'set', data:{menu:newMenu}});
        if (spisokFull[newMenu.act]) {
            dispatch({type:'set', data:{
                spisok: spisokFull[newMenu.act].spisok || [], 
                spisokId: spisokFull[newMenu.act].spisokId || ' ',
                spisokState: spisokFull[newMenu.act].spisokState || {},
                spisokProps: spisokFull[newMenu.act].spisokProps || {},
            }});
            propsTogle(false);
        } else {
            propsCheck({});
        }
        if (state.helpOpen) dispatch({type:'help', data:false});
        if (state.menuOpen) dispatch({type:'menu', data:false});
    };
    function keyControl (event) {
        //console.log(event);
        //console.log(event.currentTarget);
        //console.log(event.nativeEvent);
        if (event == undefined) return;
        if (event.target == undefined) event.target = document.getElementById(state.spisokId);
        if (event.preventDefault == undefined) event.preventDefault = ()=>(false);
        let flDef=false, text=null;
        if (event.key == 'ArrowUp' || event.key == 'Up') {
            let nextEl = event.target.previousElementSibling;
            (nextEl != null && nextEl.id != '') ? spisokCheck(nextEl.id) : spisokCheck(event.target.id);
            flDef = true;
        } else if (event.key == 'ArrowDown' || event.key == 'Down'|| event.key == 'Enter') { 
            let nextEl = event.target.nextElementSibling;
            (nextEl != null && nextEl.id != '') ? spisokCheck(nextEl.id) : spisokCheck(event.target.id);
            flDef = true;
        } else if (event.key == 'Delete' || event.key == 'Del' || event.key == 'ArrowRight' || event.key == 'Right') { 
            text = 'del';
            flDef = true;
        } else if (event.key == 'Backspace' || event.key == 'ArrowLeft' || event.key == 'Left') { 
            text = 'back';
            flDef = true;
        } else if (event.key == 'Spacebar' || event.key == ' ') { 
            text = 'clear';
            flDef = true;
        } else if (event.key == '0') {
            text = '0';
        } else if (event.key == '1') { 
            text = '1';
        } else if (event.key == '2') { 
            text = '2';
        } else if (event.key == '3') { 
            text = '3';
        } else if (event.key == '4') { 
            text = '4';
        } else if (event.key == '5') { 
            text = '5';
        } else if (event.key == '6') { 
            text = '6';
        } else if (event.key == '7') { 
            text = '7';
        } else if (event.key == '8') { 
            text = '8';
        } else if (event.key == '9') { 
            text = '9';
        } else if (event.key == '.' || event.key == ',' || event.key == '/') { 
            text = '.';
        } else if (event.key == '-') { 
            text = '-';
        } else {
        }
        if (text) dispatch({type:'otvet', data:text});
        if (state.helpOpen) dispatch({type:'help', data:false});
        if (state.menuOpen) dispatch({type:'menu', data:false});
        if (flDef) event.preventDefault();
    };
    function propsCheck (newProps=null) {
        propsTogle(false);
        if (newProps!=null) {
            dispatch({type:'set', data:{spisok:[], spisokProps:newProps, ajax:true}});
        } else if (spisokFull[state.menu.act] == undefined) {
            dispatch({type:'set', data:{spisok:[], spisokProps:{}, ajax:true}});
        }
    };
    function spisokCheck (nextId) {
        if (document.getElementById(nextId) != undefined) {
            dispatch({type:'time'});
            dispatch({type:'prov'});
            if (state.helpOpen) dispatch({type:'help', data:false});
            if (state.menuOpen) dispatch({type:'menu', data:false});
            dispatch({type:'select', data:nextId});
        }
    };
     
    useEffect(() => { //onkeydown
        document.onkeydown = keyControl;
        return () => {
            document.onkeydown = null;
        };
    });
    useEffect(() => { //ajax
        if (state.ajax) {
            dispatch({type:'ajax', data:false});
            dispatch({type:'set', data:{ajaxWait:true}});
            window.fetch('./ajax.php', {
                method:'POST', 
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({
                    'act':state.menu.act,
                    'props':state.spisokProps,
                })
            })
            .then((res)=>(res.json()))
            .then(
                (data)=>{
                    dispatch({type:'ajaxFin', data:data, err:false});
                },
                (err)=>{
                    dispatch({type:'ajaxFin', data:err, err:true});
                }
            );
        }
    }, [state.ajax]);
    useEffect(() => { //newId
        if (state.newId) dispatch({type:'select', data:state.spisokId});
    }, [state.newId])

    return (
    <Paper className={classes.max}>
        <CssBaseline />
        <AppBar className={classes.max} position="fixed" id="appbar">
            <Toolbar>
                <IconButton onClick={()=>menuToggle()} color="inherit" aria-label="Menu" className={classes.menuButton}>
                    <MenuIcon />
                    {(upSm) ? <Typography variant="h6">Меню</Typography> : null}
                </IconButton>
                <IconButton color="inherit" className={classes.grow} onClick={(e)=>popToggle(e)}>
                    <Typography align="center" variant="h6" color="inherit" style={{lineHeight:"1em"}}>
                        {state.menu.title}
                        {(state.spisokState.timeText)
                            ? <span style={{fontSize:"0.6em"}}> ({state.spisokState.timeText})</span>
                            : null
                        }
                    </Typography>
                </IconButton>
                <Tooltip title="Виртуальная клавиатура">
                    <IconButton color="inherit" onClick={()=>keyToggle()}>
                        <KeyboardOutlined />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Настройка">
                    <IconButton color="inherit" onClick={()=>propsTogle()}>
                        <Build />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Помощь">
                    <IconButton color="inherit" onClick={()=>helpToggle()}>
                        <HelpOutline />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>

        <Drawer open={state.menuOpen} onClose={()=>menuToggle(false)}>
            <List component ="nav">
                {menu.map((value, index)=>{
                    if (value.type == 'line') {    
                        return (
                            <React.Fragment key={index}>
                                <Divider /><br /><Divider />
                            </React.Fragment>
                        );
                    } else if (value.type == 'check') {
                        return (
                            <ListItem 
                                button 
                                onClick={()=>menuClick(index)}
                                key={'menu'+index}
                                selected={(state.menu.act == value.act)}
                            >
                                <ListItemText primary={value.text} />
                            </ListItem>
                        );
                    } else if (value.type == 'keyboard') {
                        return (
                            <ListItem button onClick={()=>keyToggle()} key={index}>
                                <ListItemText primary={value.text} />
                            </ListItem>
                        );
                    } else if (value.type == 'setup') {
                        return (
                            <ListItem button onClick={()=>propsTogle()} key={index}>
                                <ListItemText primary={value.text} />
                            </ListItem>
                        );
                    } else if (value.type == 'help') {
                        return (
                            <ListItem button onClick={()=>helpToggle()} key={index}>
                                <ListItemText primary={value.text} />
                            </ListItem>
                        );
                    } else {
                        return (
                            <ListItem button key={index} onClick={()=>menuToggle(false)}>
                                <ListItemText primary={value.text} />
                            </ListItem>
                        );
                    }
                })}
            </List>
        </Drawer>

        <Popover open={state.popOpen} 
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            transformOrigin={{vertical:'top', horizontal:'center'}}
            anchorEl={state.popEl}
            onClick={()=>popToggle(null)}
        >
            <List component ="nav">
            {menu.map((val, ind)=>{
                if (val.type == 'check') {return (
                    <ListItem 
                        button
                        onClick={()=>menuClick(ind)}
                        key={'pop'+ind}
                        selected={(state.menu.act == val.act)}
                    >
                        <ListItemText primary={val.text} />
                    </ListItem>
                )}
            })}
            </List>
        </Popover>

        <Slide in={state.keyOpen && !state.keyHide} direction="up">
            <Paper className={classes.keyboard}>
                <Grid container>
                    <Button variant="outlined" fullWidth color="secondary" onClick={()=>{keyControl({key:'Spacebar'})}}>
                        <Typography variant="h6" color="inherit">Стереть</Typography>
                    </Button>
                    {['1','2','3','4','5','6','7','8','9','-','0','.'].map((value, index)=>(
                        <Grid item xs={4} key={index}>
                            <Button variant="outlined" fullWidth onClick={()=>{keyControl({key:value})}}>
                                <Typography variant="h6">{value}</Typography>
                            </Button>
                        </Grid>
                    ))}
                    <Button 
                        variant="outlined" 
                        fullWidth color="primary" 
                        size="large" 
                        onClick={()=>{keyControl({key:'ArrowDown'});}}
                    >
                        <Typography variant="h6" color="inherit"><b>Ввод</b></Typography>
                    </Button>
                </Grid>
            </Paper>
        </Slide>
        
        <Drawer open={state.ajaxWait} />

        <Help helpOpen={state.helpOpen} helpToggle={helpToggle}/>

        {(state.propsOpen)
            ? <Props 
                menu={state.menu} 
                propsCheck={propsCheck}
                spisokProps={state.spisokProps}
            />
            : 
            <Spisok 
                spisok={state.spisok} 
                spisokId={state.spisokId} 
                spisokCheck={spisokCheck}
                spisokState={state.spisokState}
                spisokProps={state.spisokProps}
                disp={dispatch}
            />
        }

    </Paper>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

