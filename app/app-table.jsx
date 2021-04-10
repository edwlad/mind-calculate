import React from 'react';

import Button from '@material-ui/core/Button';
import { Typography, Grid } from '@material-ui/core';


const table=[
    {d:2,n:'table-2'},
    {d:3,n:'table-3'},
    {d:4,n:'table-4'},
    {d:5,n:'table-5'},
    {d:6,n:'table-6'},
    {d:7,n:'table-7'},
    {d:8,n:'table-8'},
    {d:9,n:'table-9'},
];

function Table (props) {

    return (
        <React.Fragment>
        <Grid container justify="center">
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    Выбор таблиц
                </Typography>
            </Grid>
            {table.map((per, ind)=>(
                <Grid key={ind} item xs={3} sm>
                    <Button 
                        variant={(props.state[per.n])?"contained":"outlined"}
                        color="primary" 
                        fullWidth 
                        onClick={()=>props.disp({type:'add', name:per.n, data:!props.state[per.n]})}
                    >
                    {per.d}
                    </Button>
                </Grid>
            ))}

            <Grid item xs={12} style={{fontSize:"0.5em"}}>&nbsp;</Grid>
            <Grid item xs={4}>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    onClick={()=>table.map(per=>props.disp({type:'add', name:per.n, data:true}))}
                >
                Выбрать все
                </Button>
            </Grid>
            <Grid item xs={1}>&nbsp;</Grid>
            <Grid item xs={4}>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    onClick={()=>table.map(per=>props.disp({type:'add', name:per.n, data:false}))}
                >
                Отменить выбор
                </Button>
            </Grid>
        </Grid>

        <Grid container justify="center">
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    Расположение примеров
                </Typography>
            </Grid>

            <Grid item xs>
                <Button 
                    variant={(props.state.tableSort=='line')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{tableSort:'line'}})}
                >
                По порядку
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(props.state.tableSort=='random')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{tableSort:'random'}})}
                >
                Перемешать
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(props.state.tableSort=='full-random')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{tableSort:'full-random'}})}
                >
                Перемешать всё
                </Button>
            </Grid>
        </Grid>
        </React.Fragment>
    )
}

export default Table;
