import React from 'react';

import Button from '@material-ui/core/Button';
import { Typography, Grid } from '@material-ui/core';


function Start (props) {

    const curr = props.state;

    return (
        <React.Fragment>
        <Grid container justify="center">
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    Первое число
                </Typography>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.one=='d1')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{one:'d1'}})}
                >
                Однозначное
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.one=='d2')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{one:'d2'}})}
                >
                Двузначное
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.one=='d3')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{one:'d3'}})}
                >
                Трёхзначное
                </Button>
            </Grid>
        </Grid>

        <Grid container justify="center">
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    Выбор действия
                </Typography>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.plus)?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{plus:!curr.plus}})}
                >
                Сложение
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.minus)?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{minus:!curr.minus}})}
                >
                Вычитание
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.umn)?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{umn:!curr.umn}})}
                >
                Умножение
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.del)?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{del:!curr.del}})}
                >
                Деление
                </Button>
            </Grid>
        </Grid>

        <Grid container justify="center">
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    Второе число
                </Typography>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.two=='d1')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{two:'d1'}})}
                >
                Однозначное
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.two=='d2')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{two:'d2'}})}
                >
                Двузначное
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(curr.two=='d3')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{two:'d3'}})}
                >
                Трёхзначное
                </Button>
            </Grid>
        </Grid>
        </React.Fragment>
    )
}

export default Start;
