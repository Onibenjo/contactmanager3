import React, { Component } from 'react';
import style from './Settings.module.css';
import { connect } from 'react-redux';
import {
    setDisableBalOnAdd,
    setDisableBalOnEdit,
    setAllowReg
} from "../../actions/settingsActions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
    root: {
        color: green[600],
        '&checked': {
            color: green[500],
        },
    },
    checked: {},
    marginTop: {
        marginTop: '4rem',
        padding: '1rem 3rem'
    }
};

class Settings extends Component {

    allowRegChange = () => {
        const { setAllowReg } = this.props;
        setAllowReg();
    }
    disableBalOnAddChange = () => {
        const { setDisableBalOnAdd } = this.props;
        setDisableBalOnAdd();
    }
    disableBalOnEditChange = () => {
        const { setDisableBalOnEdit } = this.props;
        setDisableBalOnEdit();
    }

    render() {
        const { classes } = this.props;
        const {
            disableBalOnAdd,
            disableBalOnEdit,
            allowReg
        } = this.props.settings;

        return (
            <Grid container alignItems='center' className={classes.marginTop}>
                <Grid item xs sm md lg>
                    <div className={style.card}>
                        <div className={style.cardheader}>Edit Settings</div>
                        <div className={style.cardbody}>

                            <FormGroup column='true'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={allowReg}
                                            onChange={this.allowRegChange}
                                            value="setAllowReg"
                                        />
                                    }
                                    label="Allow Registration"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={disableBalOnAdd}
                                            onChange={this.disableBalOnAddChange}
                                            value="setDisableBalOnAdd"
                                        />
                                    }
                                    label="Disable Balance On Add"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={disableBalOnEdit}
                                            onChange={this.disableBalOnEditChange}
                                            value="setDisableBalOnEdit"
                                        />
                                    }
                                    label="Disable Balance On Edit"
                                />


                            </FormGroup>

                        </div>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    setDisableBalOnAdd: PropTypes.func.isRequired,
    setDisableBalOnEdit: PropTypes.func.isRequired,
    setAllowReg: PropTypes.func.isRequired,
};

export default connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
}),
    {
        setDisableBalOnAdd,
        setDisableBalOnEdit,
        setAllowReg
    }

)(withStyles(styles)(Settings));
