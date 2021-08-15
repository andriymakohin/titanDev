import React, { Component } from 'react';
import style from './AddPersoneForm.module.css';
import { connect } from 'react-redux';
import addPersoneOperations from '../../redux/operations/AddPersoneOperation.js';

class AddPersoneForm extends Component {
  state = {
    name: '',
    male: false,
    female: false,
    gender: '',
  };

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onClickFemale = () => {
    this.setState({
      female: true,
      male: false,
      gender: 'female',
    });
  };

  onClickMale = () => {
    this.setState({
      male: true,
      female: false,
      gender: 'male',
    });
  };

  preventSubmit = (e) => {
    e.preventDefault();
    this.props.onClose();
  };

  render() {
    const { male, female, name, gender } = this.state;
    const { addPersoneRequest, onClose } = this.props;
    return (
      <div className={style.addPersoneForm_container}>
        <button
          onClick={onClose}
          className={style.addPersoneForm_button__close}
        />
        <h2 className={style.addPersoneForm_title}>Додавання виконавця</h2>
        <form onSubmit={this.preventSubmit}>
          <label className={style.addPersoneForm_label__name}>
            <p className={style.addPersoneForm_title__name}>Введіть ім`я</p>
            <input
              className={style.addPersoneForm_input__name}
              onChange={this.handleChange}
              value={name}
              type="text"
              placeholder="Iм`я"
            />
          </label>
          <h3 className={style.addPersoneForm_title__gender}>
            Оберiть стать
          </h3>
          <div className={style.addPersoneForm_block__gender}>
            <label className={style.addPersoneForm_label__gender}>
              <div
                className={
                  female === true
                    ? style.addPersoneForm_gender__radioBlock_active
                    : style.addPersoneForm_gender__radioBlock
                }
              />
              <input
                className={style.addPersoneForm_input__gender}
                onClick={this.onClickFemale}
                name="gender"
                type="radio"
                defaultChecked={female}
              />
              <p className={style.addPersoneForm_gender}>Жіноча</p>
            </label>
            <label className={style.addPersoneForm_label__gender}>
              <div
                className={
                  male === true
                    ? style.addPersoneForm_gender__radioBlock_active
                    : style.addPersoneForm_gender__radioBlock
                }
              />
              <input
                className={style.addPersoneForm_input__gender}
                onClick={this.onClickMale}
                name="gender"
                type="radio"
                defaultChecked={male}
              />
              <p className={style.addPersoneForm_gender}>Чоловіча</p>
            </label>
          </div>
          <div className={style.addPersoneForm_block__buttons}>
            <button className={style.addPersoneForm_button__cancel}>
              Вiдмiна
            </button>
            <button
              className={style.addPersoneForm_button__save}
              onClick={() => addPersoneRequest(name, gender)}
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addPersoneRequest: addPersoneOperations.addPersone,
};

export default connect(null, mapDispatchToProps)(AddPersoneForm);
