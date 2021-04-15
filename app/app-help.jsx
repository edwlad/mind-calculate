import React from 'react';

import { makeStyles } from '@material-ui/styles';

import ChevronRight from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    helpMark: {
        fontSize: "inherit"
    }
})

function Help(props) {
    const classes = useStyles();

    return (
        <Dialog
            open={props.helpOpen}
            onClose={() => { props.helpToggle(false) }}
            fullWidth={true}
        >
            <DialogTitle align="center">Помощь</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" align="center" >
                    <b>Сервис «Устный счёт» поможет научиться считать в уме.</b>
                </Typography>
                <br />
                <Typography>
                    &nbsp;&nbsp;После загрузки страницы, пример, на который необходимо ответить,
                    выделен крупным шрифтом. Можно, кликнув по любому другому примеру,
                    сделать его текущим. Вся информация, которая вводится на простой
                    или виртуальной клавиатуре, будет записываться в ответ к
                    текущему примеру. После набора ответа нажмите «Enter» на простой
                    клавиатуре или «Ввод» - на виртуальной. Выделится следующий пример и
                    можно вводить новый ответ.
                </Typography>
                <br />
                <Typography>
                    &nbsp;&nbsp;Виртуальная клавиатура обычно нужна для ввода ответов на сенсорных
                    экранах (смартфоны, планшеты и пр.). Но её можно включить и выключить
                    в любой момент, воспользовавшись пунктом меню – «Показать/спрятать клавиатуру».
                </Typography>
                <br />
                <Typography>
                    &nbsp;&nbsp;<b>Клавиатура:</b><br />
                    <ChevronRight className={classes.helpMark} />цифры от 0 до 9 – ввод ответа к текущему примеру;<br />
                    <ChevronRight className={classes.helpMark} />клавиша «Минус» – ввод символа «минус»;<br />
                    <ChevronRight className={classes.helpMark} />клавиши «Точка» или «Запятая» – ввод разделителя для десятичной части числа;<br />
                    <ChevronRight className={classes.helpMark} />клавиши «Enter» или стрелка вниз – переход к следующему примеру;<br />
                    <ChevronRight className={classes.helpMark} />клавиша стрелка вверх – переход к предыдущему примеру;<br />
                    <ChevronRight className={classes.helpMark} />клавиши «Backspace» или стрелка влево – стереть последний символ введённого ответа;<br />
                    <ChevronRight className={classes.helpMark} />клавиши «Delete» или стрелка вправо – стереть первый символ введённого ответа;<br />
                    <ChevronRight className={classes.helpMark} />клавиша «Пробел» - стереть введённый ответ полностью.<br />
                </Typography>
                <br />
                <Typography>
                    &nbsp;&nbsp;<b>Виртуальная клавиатура:</b><br />
                    <ChevronRight className={classes.helpMark} />цифры от 0 до 9 – ввод ответа к текущему примеру;<br />
                    <ChevronRight className={classes.helpMark} />кнопка «Минус» – ввод символа «минус»;<br />
                    <ChevronRight className={classes.helpMark} />кнопка «Точка»  – ввод разделителя для десятичной части числа;<br />
                    <ChevronRight className={classes.helpMark} />кнопка «Ввод» – переход к следующему примеру;<br />
                    <ChevronRight className={classes.helpMark} />кнопка «Стереть» - стереть введённый ответ полностью.<br />
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => { props.helpToggle(false) }}
                >
                    Скрыть
                </Button>
            </DialogActions>
        </Dialog>

    )
}

//Help.propTypes = {classes: PropTypes.object.isRequired};
//Help = withStyles(styles)(Help);

export default Help;
