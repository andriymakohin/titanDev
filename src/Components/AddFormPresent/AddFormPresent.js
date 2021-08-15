import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './pressentForm.module.scss';
import closeBtn from '../../assets/images/close.svg';
import ballImg from '../../assets/images/changeStar.png';
import tringl from '../../assets/images/changeSelect.png';
import operation from '../../redux/operations/presentOperation';
import selector from '../../redux/selectors/PersoneSelectors';
const FormData = require('form-data');

class AddFormPresent extends Component {
  state = {
    title: '',
    reward: 0,
    personeId: '',
    persone: [],
    selectedFile: null,
  };

  componentDidMount() {
    this.setState({ persone: this.props.persone });
  }

  handleChangeName = (e) => {
    this.setState({ title: e.target.value });
  };
  handleChangeBall = (e) => {
    this.setState({ reward: e.target.value });
  };

  handleChosePersone = (e) => {
    this.setState({ personeId: e.target.value });
  };

  onSelectImageHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  handleCloseWindow = (e) => {
    this.props.isOpenForm();
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { title, reward, personeId, selectedFile } = this.state;
    let fD;
    if (selectedFile) {
      fD = new FormData();
      fD.append('file', selectedFile);
      fD.set('title', title);
      fD.set('reward', reward);
      fD.set('personeId', personeId);
    } else {
      fD = { title, reward, personeId };
    }

    this.props.onAddPresent(fD);

    this.setState({ title: '', reward: '', personeId: '', selectedFile: null });
    this.props.isOpenForm();
  };

  render() {
    const { persone, title, personeId } = this.state;

    return (
      <div className={style.container_presents}>
        <button
          className={style.container_presents__close}
          type="button"
          onClick={this.handleCloseWindow}
        >
          <img src={closeBtn} alt='closeImg' />
        </button>

        <form className={style.present_form} onSubmit={this.handleSubmit}>
          <p className={style.present_form__title}>Додавання подарунку</p>

          <label className={style.present_form__label}>
            {' '}
            Назва
            <input
              className={style.present_form__input}
              placeholder="Введіть назву"
              value={title}
              onChange={this.handleChangeName}
            />
          </label>

          <label className={style.present_form__label}>
            Призначення подарунку
            <img alt='formImg' src={tringl} className={style.present_form__change_persone} />
            <div className={style.present_form__change_persone_block}></div>
            <select
              onChange={this.handleChosePersone}
              value={personeId}
              className={style.present_form__input}
            >
              <option> Оберіть члена сім'ї </option>
              {persone.map((persone) => (
                <option key={persone._id} value={persone._id}>
                  {' '}
                  {persone.name}{' '}
                </option>
              ))}
            </select>
          </label>

          <label className={style.present_form__label}>
            Бал
            <img alt='starImg' src={ballImg} className={style.present_form__ball_star} />
            <input
              className={style.present_form__ball}
              id="grade"
              type="number"
              min="0"
              max="999"
              placeholder="00"
              onChange={this.handleChangeBall}
            />
          </label>

          {/* <label className={style.present_form__label}>
            Завантажити фото (необов’язково)
            <div className={style.present_form__upload_box}>
              <input
                type="file"
                onChange={this.onSelectImageHandler}
                className={style.present_form__upload_box_input}
              />
              <p className={style.present_form__upload_box_text}>
                {changeFileTitle}
              </p>
              <span className={style.present_form__upload_box_btn}>
                {' '}
                Обрати{' '}
              </span>
            </div>
          </label> */}

          <div className={style.present_form__box_botton}>
            <button
              className={style.present_form__box_botton__canceling}
              type="button"
              onClick={this.handleCloseWindow}
            >
              {' '}
              Відміна{' '}
            </button>
            <button
              className={style.present_form__box_botton__save}
              type="submit"
            >
              {' '}
              Зберегти{' '}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  persone: selector.getPersones(state),
});

const mapDispatchToProps = {
  onAddPresent: operation.addPresent,
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddFormPresent);
