import React from 'react';

import Button from '@material-ui/core/Button';
import { Typography, Grid } from '@material-ui/core';


function Nabor (props) {

    return (
        <Grid container justify="center">
            <Grid item xs={12}>&nbsp;</Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    Выбор готового набора примеров
                </Typography>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(props.state.primer=='nabor1')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{primer:'nabor1'}})}
                >
                Умножение и деление
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(props.state.primer=='nabor2')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{primer:'nabor2'}})}
                >
                Деление
                </Button>
            </Grid>
            <Grid item xs>
                <Button 
                    variant={(props.state.primer=='nabor3')?"contained":"outlined"} 
                    color="primary" 
                    fullWidth 
                    onClick={()=>props.disp({type:'set', data:{primer:'nabor3'}})}
                >
                Повторение
                </Button>
            </Grid>
        </Grid>
    )
}

export default Nabor;
